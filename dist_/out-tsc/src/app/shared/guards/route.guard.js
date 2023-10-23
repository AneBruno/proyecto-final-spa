import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let RouteGuard = class RouteGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivateChild(childRoute, state) {
        return this.check(state.url.substring(5));
    }
    canActivate() {
        return this.check();
    }
    check(url = null) {
        console.log('url', url);
        if (url !== null && url.length > 0) {
            if (url === 'usuarios/mis-datos')
                return true;
            return this.authService.puedeNavegar(url);
        }
        return true;
    }
};
RouteGuard = __decorate([
    Injectable()
], RouteGuard);
export { RouteGuard };
//# sourceMappingURL=route.guard.js.map