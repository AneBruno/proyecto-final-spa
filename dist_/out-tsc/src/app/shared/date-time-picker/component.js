import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let DateTimePickerComponent = class DateTimePickerComponent {
    constructor(controlContainer) {
        this.controlContainer = controlContainer;
        this.controlName = '';
        this.label = 'Fecha y Hora';
        this.error = '';
        this.hideTime = false;
        this.required = false;
        this.stepMinute = 1;
        this.defaultTime = [];
        this.minDate = null;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], DateTimePickerComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "label", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "error", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "hideTime", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "required", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "stepMinute", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "defaultTime", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "minDate", void 0);
DateTimePickerComponent = __decorate([
    Component({
        selector: 'app-date-time-picker',
        templateUrl: './template.html',
        styleUrls: ['./styles.scss']
    })
], DateTimePickerComponent);
export { DateTimePickerComponent };
//# sourceMappingURL=component.js.map