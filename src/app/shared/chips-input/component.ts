import { COMMA                        } from '@angular/cdk/keycodes';
import { ENTER                        } from '@angular/cdk/keycodes';

import { Component                    } from '@angular/core';
import { ElementRef                   } from '@angular/core';
import { EventEmitter                 } from '@angular/core';
import { Input                        } from '@angular/core';
import { Output                       } from '@angular/core';
import { OnInit                       } from '@angular/core';
import { ViewChild                    } from '@angular/core';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatAutocomplete              } from '@angular/material/autocomplete';
import { MatChipInputEvent            } from '@angular/material/chips';

import { ApiService                   } from '../services/api.service';

@Component({
    selector    :   'app-chips-input',
    templateUrl :   './template.html',
    styleUrls   : [ './styles.scss', ],
})
export class ChipsInputComponent implements OnInit {

    public  data               : any[]    = [];
    public  searchText         : string   = '';
    public  separatorKeysCodes : number[] = [ENTER, COMMA];
    private timeOutId          : any      = null;
    
    @ViewChild('dataInput') public dataInput!        : ElementRef<HTMLInputElement>;
    @ViewChild('auto'     ) public matAutocomplete!  : MatAutocomplete;
    
    @Input()  public selected               : any[] = [];
    @Output() public selectedChange         : EventEmitter<any> = new EventEmitter<any>();
    @Input()  public title                  : string  = '';
    @Input()  public dataUrl                : string  = '';    
    @Input()  public placeHolder            : string  = 'Escriba para buscar';
    @Input()  public valueColumn            : string  = 'id';
    @Input()  public labelColumn            : string  = 'descripcion';
    @Input()  public labelColumnFn          : Function | null = null;
    @Input()  public chipLinkFn             : Function | null = null;
    @Input()  public searchParamForList     : string  = 'busqueda';
    @Input()  public searchParamForSelected : string  = 'ids';
    @Input()  public selectable             : boolean = true;
    @Input()  public removable              : boolean = true;
    @Input()  public error                  : string  = '';
    @Input()  public readonly               : boolean = false;
    @Input()  public disabled               : boolean = false;
    @Input()  public queryParams            : any     = {};
    @Input()  public appearance             : any  = 'fill';
    @Output() public inputClick             : EventEmitter<any> = new EventEmitter<any>();
    @Output() public chipClick              : EventEmitter<any> = new EventEmitter<any>();
    @Output() public selectionChanged       : EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private apiService : ApiService,
    ) { }

    public async ngOnInit() {
        console.log('hellooo');
    }

    private emitChange() {
        console.log('emitChange');
        this.selectedChange.emit(this.selected);
        this.selectionChanged.emit();
    }

    public keyup() : void {
        
        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }

        this.timeOutId = setTimeout(() => {
            this.refreshList();
        }, 400);
    }

    public fetchForSelected(value: any[]) {
        let params: any = {};
        params[this.searchParamForSelected] = value;
        return this.fetchData(params);
    }

    public fetchForList(value: string) {
        let params: any = {};
        params[this.searchParamForList] = value;
        return this.fetchData(params);

    }

    public async fetchData(filtros: any) {
        let queryParams = Object.assign(this.queryParams, {filtros: filtros});
        return (await this.apiService.getData(this.dataUrl, queryParams).toPromise());
    }

    public async refreshList() {
        if (!this.searchText) {
            return;
        }
        this.data = (await this.fetchForList(this.searchText)).filter((row: any) => {
            return this.selected.filter((selected) => {
                return this.getIdValue(row) === this.getIdValue(selected);
            }).length === 0;
        });
    }

    public onAddKey($event: MatChipInputEvent): void {

        // Reset the input value
        if ($event.input) {
            $event.input.value = '';
        }
    }

    public removeChip(row: any): void {
        this.selected = this.selected.filter(i => i !== row);
        this.emitChange();
    }

    public optionSelected(event: MatAutocompleteSelectedEvent): void {
        this.data.filter((row) => {
            return  this.getIdValue(row) === this.getIdValue(event.option.value);
        }).map((row) => {
            this.selected.push(row);
        });
        // Para que en la próxima búsquda no aparezca una lista con datos viejos
        this.data = [];

        this.dataInput.nativeElement.value = '';
        this.searchText = '';
        this.emitChange();
    }

    public getIdValue(row: any): string {
        return row[this.valueColumn];
    }

    public getLabelValue(row: any): string {
        if ((typeof this.labelColumnFn) === 'function') {
            //@ts-ignore
            return this.labelColumnFn(row);
        } else {
            return row[this.labelColumn]
        }
    }

    public onChipClick(row: any) {
        if (this.disabled) {
            return;
        }
        this.chipClick.emit(row);
    }

}
