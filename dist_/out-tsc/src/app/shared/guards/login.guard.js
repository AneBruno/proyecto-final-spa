import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let LoginGuard = class LoginGuard {
    constructor(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    canActivateChild(childRoute, state) {
        return this.check();
    }
    canActivate() {
        return this.check();
    }
    check() {
        if (this.userService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
};
LoginGuard = __decorate([
    Injectable()
], LoginGuard);
export { LoginGuard };
//# sourceMappingURL=login.guard.js.map