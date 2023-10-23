import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ExtranetGuard = class ExtranetGuard {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivateChild(childRoute, state) {
        return __awaiter(this, void 0, void 0, function* () {
            let can = yield this.check(state.url.substring(5));
            console.log('canActivateChild', childRoute, can);
            return can;
        });
    }
    canActivate(route, state) {
        return __awaiter(this, void 0, void 0, function* () {
            let can = yield this.check(state.url.substring(5));
            console.log('canActivate', route, can);
            return can;
        });
    }
    check(url = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let urlParts = (url || '').split('/').reverse();
            let token = urlParts[0] || '';
            if (urlParts.length > 0 && token.length == 64) {
                this.authService.storeToken(token);
            }
            if (!this.authService.getIsValid()) {
                let token = this.authService.getToken();
                if (!token) {
                    this.router.navigate(['/login']);
                    return;
                }
                yield this.authService.login(token);
            }
            return this.authService.getIsValid();
        });
    }
};
ExtranetGuard = __decorate([
    Injectable({ providedIn: 'root' })
], ExtranetGuard);
export { ExtranetGuard };
//# sourceMappingURL=extranet.guard.js.map