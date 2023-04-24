import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss']
})
export class FormTextComponent implements OnInit {

    @Input()
    public value;

    @Input()
    public name;

    @Output()
    public valueChange: EventEmitter<any> = new EventEmitter();


    @Input()
    public label;

    @Input()
    public error;

    constructor() { }

    ngOnInit(): void {
    }

    onValueChange(event) {
        this.valueChange.emit(event.target.value);
    }

}
