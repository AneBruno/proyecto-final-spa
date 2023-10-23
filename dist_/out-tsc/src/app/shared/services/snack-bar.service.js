import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let SnackBarService = class SnackBarService {
    constructor(_snackBar) {
        this._snackBar = _snackBar;
    }
    show(message) {
        return this._snackBar.open(message, 'Ok', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
        });
    }
};
SnackBarService = __decorate([
    Injectable()
], SnackBarService);
export { SnackBarService };
//# sourceMappingURL=snack-bar.service.js.map