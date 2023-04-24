import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
    selector    :   'app-date-time-picker',
    templateUrl :   './template.html',
    styleUrls   : [ './styles.scss' ]
})
export class DateTimePickerComponent implements OnInit {

    @Input()
    public controlName: string = '';

    @Input()
    public label: string = 'Fecha y Hora';

    @Input()
    public error: string = '';

    @Input()
    public hideTime: boolean = false;

    @Input()
    public required: boolean = false;

    @Input()
    public stepMinute: number = 1;

    @Input()
    public defaultTime : Array<any> = [];

    @Input()
    public minDate: any = null;

    public constructor(
        public controlContainer: ControlContainer
    ) { }

    public ngOnInit(): void {
    }

}
