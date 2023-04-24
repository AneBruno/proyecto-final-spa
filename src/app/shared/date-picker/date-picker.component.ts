import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    selector    :   'app-date-picker',
    templateUrl :   './date-picker.component.html',
    styleUrls   : [ './date-picker.component.scss' ]
})
export class DatePickerComponent implements OnInit {

    @Input()
    public controlName: string = '';

    @Input()
    public label: string = 'Fecha';

    @Input()
    public readonly: boolean = true;

    @Input()
    public required: boolean = false;

    @Input()
    public error: string = '';

    @Input()
    public minDate: any = null;

    public constructor(
        public controlContainer: ControlContainer
    ) { }

    ngOnInit(): void {
    }

}
