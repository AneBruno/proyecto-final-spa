import { Component    } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input        } from '@angular/core';
import { OnInit       } from '@angular/core';
import { Output       } from '@angular/core';

@Component({
    selector    :   'app-datepicker-input',
    templateUrl :   './template.html',
    styleUrls   : [ './styles.scss' ]
})
export class DatepickerInputComponent implements OnInit {

    @Input()
    public controlName: string = '';

    @Input()
    public label: string = 'Fecha';

    @Input()
    public value: any;

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public change: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    public readonly: boolean = true;

    @Input()
    public error: string = '';

    @Input()
    public showCleanButton : boolean = false;

    @Input()
    public appearance : string = 'fill';


    constructor() { }

    ngOnInit(): void {
    }

    public onChange(event: any) {
        this.emitChange();
    }

    public emitChange() {
        this.valueChange.emit(this.value);
        this.change.emit(this.value);
    }

    public get canShowCleanButton() {
        return  this.showCleanButton &&
                this.value !== null  && 
                this.value !== ''    && 
                this.value !== undefined;
    }

    public onCleanButtonClick() {
        this.clear();
    }

    public clear() {
        this.value = '';
        this.emitChange();
    }

    public onDateChange() {
    }

}
