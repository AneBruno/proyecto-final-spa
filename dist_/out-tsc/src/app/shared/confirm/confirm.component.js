import { __decorate, __param } from "tslib";
import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let ConfirmComponent = class ConfirmComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.confirm = new EventEmitter();
        this.reject = new EventEmitter();
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
ConfirmComponent = __decorate([
    Component({
        selector: 'app-confirm.message',
        templateUrl: './confirm.component.html',
        styleUrls: ['./confirm.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], ConfirmComponent);
export { ConfirmComponent };
//# sourceMappingURL=confirm.component.js.map