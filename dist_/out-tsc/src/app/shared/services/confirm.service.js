import { __awaiter, __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { ConfirmComponent } from '../confirm/confirm.component';
import { ConfirmYesNoComponent } from "../confirmYesNo/confirm.component";
let ConfirmService = class ConfirmService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    ask(message) {
        return this.dialog.open(ConfirmComponent, {
            disableClose: false,
            autoFocus: true,
            data: {
                message: message,
            }
        }).componentInstance.confirm;
    }
    askfForYesNo(message) {
        return this.dialog.open(ConfirmYesNoComponent, {
            disableClose: false,
            autoFocus: true,
            data: {
                message: message,
            }
        }).componentInstance.confirm;
    }
    askAsync(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.ask(message).subscribe(() => {
                    resolve();
                });
            });
        });
    }
};
ConfirmService = __decorate([
    Injectable()
], ConfirmService);
export { ConfirmService };
//# sourceMappingURL=confirm.service.js.map