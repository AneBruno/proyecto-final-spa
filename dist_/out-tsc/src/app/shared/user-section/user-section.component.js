import { __decorate } from "tslib";
import { Component, EventEmitter, Output, Input } from '@angular/core';
let UserSectionComponent = class UserSectionComponent {
    constructor(userService, authService, extranetAuthService, router) {
        this.userService = userService;
        this.authService = authService;
        this.extranetAuthService = extranetAuthService;
        this.router = router;
        this.isExtranet = false;
        this.extranet = false;
        this.clickLogout = new EventEmitter();
    }
    ngOnInit() {
        this.setIsExtranet();
        this.user = this.userService.getUser();
        this.userService.getUser$().subscribe(user => {
            this.user = user;
        });
    }
    setIsExtranet() {
        if (this.router.url.startsWith('/app/extranet')) {
            this.isExtranet = true;
            let loginData = this.extranetAuthService.getLoginData();
            this.userExtranet = loginData.Usuario.Descripcion;
            if (loginData.accounts.length === 1) {
                this.razon_social = loginData.accounts[0].Empresa;
            }
        }
    }
    logout() {
        this.authService.signOut();
    }
    logoutExtranet() {
        this.extranetAuthService.logout();
        window.location.href = 'http://test.oprcer.com.ar/';
    }
};
__decorate([
    Input()
], UserSectionComponent.prototype, "extranet", void 0);
__decorate([
    Output()
], UserSectionComponent.prototype, "clickLogout", void 0);
UserSectionComponent = __decorate([
    Component({
        selector: 'app-user-section',
        templateUrl: './user-section.component.html',
        styleUrls: ['./user-section.component.scss']
    })
], UserSectionComponent);
export { UserSectionComponent };
//# sourceMappingURL=user-section.component.js.map