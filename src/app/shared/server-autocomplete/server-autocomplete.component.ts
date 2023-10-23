import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
    selector    :   'app-server-autocomplete',
    templateUrl :   './server-autocomplete.component.html',
    styleUrls   : [ './server-autocomplete.component.scss' ],
    providers   : [
        {
            provide     : NG_VALUE_ACCESSOR,
            useExisting : forwardRef(() => ServerAutocompleteComponent),
            multi       : true,
        }
    ]
})
export class ServerAutocompleteComponent implements OnInit, ControlValueAccessor {

    @Input()
    public value: any = null;

    @Input()
    public label : string = 'Nombre del campo';

    @Input()
    public placeholder : string = 'Escriba para buscar...';

    @Input()
    public labelForAll : string = '';

    @Input()
    public valueColumn : string = 'id';

    @Input()
    public labelColumn : string = 'nombre';

    @Input()
    public dataUrl : string = '';

    @Input()
    public dataParams : any = {};

    @Input()
    public searchParam: string = 'busqueda';

    @Input()
    public searchLimit: number = 10;

    @Input()
    public listIcon: string = '';

    @Input()
    public listIconFn: ((row: any) => string | null) | null = null;

    @Input()
    public appearance: 'outline' | 'fill' = 'fill';

    /*@Input() 
    public formControlName: string;*/

    @Input() 
    public error: string = '';

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public change: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public optionSelected: EventEmitter<any> = new EventEmitter<any>();

    public displayWithFn!: ((value: any) => string) | null;

    public data : any[] = [];

    protected to: any;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.displayWithFn = (value: any) => {
            return (this.data.filter(row => {
                return row[this.valueColumn] === value;
            })[0]||{})[this.labelColumn];
        }

        this.refresh();
    }

    // *******
    // ControlValueAccessor Interface Implementation
    //
    
    public writeValue(obj: any): void {
        if (obj !== undefined) {
            this.value = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.change.subscribe(() => {
            fn(this.value);
        });
    }

    public registerOnTouched(fn: any): void {
        this.change.subscribe(() => {
            fn();
        });
    }

    public setDisabledState(isDisabled: boolean): void {

    }

    //
    // End of ControlValueAccessor Interface Implementation
    // ******

    public refresh(searchString: string | null = null) {
        let params = Object.assign({
            filtros: {},
            ordenes: {},
        }, this.dataParams);
        params.filtros[this.searchParam] = searchString;
        params.limit = this.searchLimit;

        this.apiService.getData(this.dataUrl, params).subscribe(data => {
            this.data = data;
        });
    }

    public keyup() {
        if (this.to) {
            clearTimeout(this.to);
        }
        this.to = setTimeout(() => {
            this.emitChange();
            this.refresh(this.value);
        }, 400);
    }

    public emitChange() {
        this.change.emit(this.value);
    }

    public emitOptionSelected() {        
        this.valueChange.emit(this.value);
        this.optionSelected.emit(this.value);
    }

    public get hasIcon(): boolean {
        return this.listIcon !== '' || this.listIconFn !== null;
    }

    public getIcon(row: any): string {
        let icon: string | null = this.listIcon;
        if (this.listIconFn) {
            icon = this.listIconFn(row);
        }
        return icon || '';
    }

}
