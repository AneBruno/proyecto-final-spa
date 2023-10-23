import { COMMA                        } from '@angular/cdk/keycodes';
import { ENTER                        } from '@angular/cdk/keycodes';

import { AbstractControl, ControlContainer             } from '@angular/forms';
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
    selector    :   'app-chips-field',
    templateUrl :   './template.html',
    styleUrls   : [ './styles.scss', ],
})
export class ChipsFieldComponent implements OnInit {

    public  visible            : boolean  = true;
    public  data               : any[]    = [];
    public  selected           : any[]    = [];
    public  searchText         : string   = '';
    public  separatorKeysCodes : number[] = [ENTER, COMMA];
    private timeOutId          : any      = null;
    public  disabled           : boolean  = false;
    
    @ViewChild('dataInput') dataInput!        : ElementRef<HTMLInputElement>;
    @ViewChild('auto'     ) matAutocomplete!  : MatAutocomplete;
    
    @Input() public title                  : string  = '';
    @Input() public dataUrl                : string  = '';    
    @Input() public placeHolder            : string  = 'Escriba para buscar';
    @Input() public valueColumn            : string  = 'id';
    @Input() public labelColumn            : string  = 'descripcion';
    @Input() public labelColumnFn          : Function | null = null;
    @Input() public chipLinkFn             : Function | null = null;
    @Input() public searchParamForList     : string  = 'busqueda';
    @Input() public searchParamForSelected : string  = 'ids';
    @Input() public selectable             : boolean = true;
    @Input() public removable              : boolean = true;
    @Input() public fieldName              : string  = '';
    @Input() public error                  : string  = '';
    @Input() public readonly               : boolean = false;

    @Output() public inputClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() public chipClick : EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private apiService : ApiService,
        private controlContainer: ControlContainer
    ) { }

    public async ngOnInit() {
        this.selected = this.getCurrentValue();
        this.getControl()?.valueChanges.subscribe((value) => {
            this.selected = value;
        });

        this.getControl()?.statusChanges.subscribe(value => {
            if (value === 'DISABLED') {
                this.disabled = true;
                return;
            }
            if (this.disabled && value === 'VALID') {
                this.disabled = false;
            }
        });
    }

    public getCurrentValue(): any {
        return this.getControl()?.value;
    }

    public getControl(): AbstractControl | null {
        //@ts-ignore
        return this.controlContainer.control.get(this.fieldName)
    }

    private updateFormControlValue() {
        this.getControl()?.setValue(this.selected);
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
        return (await this.apiService.getData(this.dataUrl, {
            filtros: filtros
        }).toPromise());
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
        this.updateFormControlValue();
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
        this.updateFormControlValue();
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
