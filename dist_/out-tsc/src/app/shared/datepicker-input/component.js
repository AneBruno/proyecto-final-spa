import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
let DatepickerInputComponent = class DatepickerInputComponent {
    constructor() {
        this.controlName = '';
        this.label = 'Fecha';
        this.valueChange = new EventEmitter();
        this.change = new EventEmitter();
        this.readonly = true;
        this.error = '';
        this.showCleanButton = false;
        this.appearance = 'fill';
    }
    ngOnInit() {
    }
    onChange(event) {
        this.emitChange();
    }
    emitChange() {
        this.valueChange.emit(this.value);
        this.change.emit(this.value);
    }
    get canShowCleanButton() {
        return this.showCleanButton &&
            this.value !== null &&
            this.value !== '' &&
            this.value !== undefined;
    }
    onCleanButtonClick() {
        this.clear();
    }
    clear() {
        this.value = '';
        this.emitChange();
    }
    onDateChange() {
    }
};
__decorate([
    Input()
], DatepickerInputComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], DatepickerInputComponent.prototype, "label", void 0);
__decorate([
    Input()
], DatepickerInputComponent.prototype, "value", void 0);
__decorate([
    Output()
], DatepickerInputComponent.prototype, "valueChange", void 0);
__decorate([
    Output()
], DatepickerInputComponent.prototype, "change", void 0);
__decorate([
    Input()
], DatepickerInputComponent.prototype, "readonly", void 0);
__decorate([
    Input()
], DatepickerInputComponent.prototype, "error", void 0);
__decorate([
    Input()
], DatepickerInputComponent.prototype, "showCleanButton", void 0);
__decorate([
    Input()
], DatepickerInputComponent.prototype, "appearance", void 0);
DatepickerInputComponent = __decorate([
    Component({
        selector: 'app-datepicker-input',
        templateUrl: './template.html',
        styleUrls: ['./styles.scss']
    })
], DatepickerInputComponent);
export { DatepickerInputComponent };
//# sourceMappingURL=component.js.map