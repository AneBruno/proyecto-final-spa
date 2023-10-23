import { __decorate, __param } from "tslib";
import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ConfirmYesNoComponent = class ConfirmYesNoComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.confirm = new EventEmitter();
        this.reject = new EventEmitter();
        this.yesNo = false;
    }
    ngOnInit() {
    }
    clickConfirm() {
        this.dialogRef.close();
        this.confirm.emit();
    }
    clickReject() {
        this.dialogRef.close();
        this.reject.emit();
    }
};
ConfirmYesNoComponent = __decorate([
    Component({
        selector: 'app-confirm-yes-no.message',
        templateUrl: './confirm.component.html',
        styleUrls: ['./confirm.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ConfirmYesNoComponent);
export { ConfirmYesNoComponent };
//# sourceMappingURL=confirm.component.js.map