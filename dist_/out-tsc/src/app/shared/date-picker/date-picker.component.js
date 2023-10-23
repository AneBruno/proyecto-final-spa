import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let DatePickerComponent = class DatePickerComponent {
    constructor(controlContainer) {
        this.controlContainer = controlContainer;
        this.controlName = '';
        this.label = 'Fecha';
        this.readonly = true;
        this.required = false;
        this.error = '';
        this.minDate = null;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], DatePickerComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "label", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "readonly", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "required", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "error", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "minDate", void 0);
DatePickerComponent = __decorate([
    Component({
        selector: 'app-date-picker',
        templateUrl: './date-picker.component.html',
        styleUrls: ['./date-picker.component.scss']
    })
], DatePickerComponent);
export { DatePickerComponent };
//# sourceMappingURL=date-picker.component.js.map