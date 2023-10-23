import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
let RichTextFieldComponent = class RichTextFieldComponent {
    constructor() {
        this.balloonEditor = ClassicEditor;
    }
    ngOnInit() {
        this.value = this.form.get(this.controlName).value;
        this.form.get(this.controlName).valueChanges.subscribe((value) => {
            console.log('value', value);
            this.value = value;
        });
        this.balloonEditor;
    }
    onEditorChange(event) {
        const data = event.editor.getData();
        this.form.get(this.controlName).setValue(data);
    }
};
__decorate([
    Input()
], RichTextFieldComponent.prototype, "form", void 0);
__decorate([
    Input()
], RichTextFieldComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], RichTextFieldComponent.prototype, "label", void 0);
RichTextFieldComponent = __decorate([
    Component({
        selector: 'app-rich-text-field',
        templateUrl: './rich-text-field.component.html',
        styleUrls: ['./rich-text-field.component.scss']
    })
], RichTextFieldComponent);
export { RichTextFieldComponent };
//# sourceMappingURL=rich-text-field.component.js.map