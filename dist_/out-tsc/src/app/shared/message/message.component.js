import { __decorate, __param } from "tslib";
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let MessageComponent = class MessageComponent {
    constructor(data, dialogRef) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.confirm = new EventEmitter();
    }
    ngOnInit() {
    }
    close() {
        this.dialogRef.close(true);
    }
};
MessageComponent = __decorate([
    Component({
        selector: 'app-message',
        templateUrl: './message.component.html',
        styleUrls: ['./message.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], MessageComponent);
export { MessageComponent };
//# sourceMappingURL=message.component.js.map