import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss']
})
export class FormTextComponent implements OnInit {

    @Input()
    public value: any;

    @Input()
    public name: any;

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter();


    @Input()
    public label: any;

    @Input()
    public error : any;

    constructor() { }

    ngOnInit(): void {
    }

    onValueChange(event: any) {
        this.valueChange.emit(event.target.value);
    }

}
