import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ButtonComponent = class ButtonComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() {
        this.authService.inicializarObsAuthState();
    }
    signInWithGoogle() {
        this.authService.signInWithGoogle();
    }
};
ButtonComponent = __decorate([
    Component({
        selector: 'app-login-button',
        templateUrl: './button.component.html',
        styleUrls: ['./button.component.scss']
    })
], ButtonComponent);
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map