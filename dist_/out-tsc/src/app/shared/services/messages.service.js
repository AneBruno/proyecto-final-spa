import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { MessageComponent } from "../message/message.component";
let MessagesService = class MessagesService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    show(message, align = 'end', textoBoton = 'Cerrar') {
        return this.dialog.open(MessageComponent, {
            disableClose: false,
            autoFocus: true,
            data: {
                message: message,
                align: align,
                textoBoton: textoBoton
            }
        }).afterClosed();
    }
};
MessagesService = __decorate([
    Injectable()
], MessagesService);
export { MessagesService };
//# sourceMappingURL=messages.service.js.map