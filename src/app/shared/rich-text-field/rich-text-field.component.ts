import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FormGroup } from '@angular/forms';

@Component({
    selector    :   'app-rich-text-field',
    templateUrl :   './rich-text-field.component.html',
    styleUrls   : [ './rich-text-field.component.scss' ]
})
export class RichTextFieldComponent implements OnInit {

    public balloonEditor = ClassicEditor;
    public value: any;

    @Input()
    public form: FormGroup;

    @Input()
    public controlName: string;

    @Input()
    public label: string;

    constructor() { }

    public ngOnInit(): void {
        this.value = this.form.get(this.controlName).value;
        this.form.get(this.controlName).valueChanges.subscribe((value) => {
            console.log('value', value);
            this.value = value;
        });
        this.balloonEditor
    }

    public onEditorChange( event: ChangeEvent) {
        const data = event.editor.getData();

        this.form.get(this.controlName).setValue(data);
    }

}
