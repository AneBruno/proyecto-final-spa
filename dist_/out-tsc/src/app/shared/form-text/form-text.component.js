import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let FormTextComponent = class FormTextComponent {
    constructor() {
        this.valueChange = new EventEmitter();
    }
    ngOnInit() {
    }
    onValueChange(event) {
        this.valueChange.emit(event.target.value);
    }
};
__decorate([
    Input()
], FormTextComponent.prototype, "value", void 0);
__decorate([
    Input()
], FormTextComponent.prototype, "name", void 0);
__decorate([
    Output()
], FormTextComponent.prototype, "valueChange", void 0);
__decorate([
    Input()
], FormTextComponent.prototype, "label", void 0);
__decorate([
    Input()
], FormTextComponent.prototype, "error", void 0);
FormTextComponent = __decorate([
    Component({
        selector: 'app-form-text',
        templateUrl: './form-text.component.html',
        styleUrls: ['./form-text.component.scss']
    })
], FormTextComponent);
export { FormTextComponent };
//# sourceMappingURL=form-text.component.js.map