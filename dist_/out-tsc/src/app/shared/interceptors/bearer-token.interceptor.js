import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let BearerTokenInterceptor = class BearerTokenInterceptor {
    constructor(userService) {
        this.userService = userService;
    }
    intercept(req, next) {
        const accessToken = this.userService.getAccessToken();
        if (accessToken !== undefined) {
            const authReq = req.clone({
                setHeaders: { Authorization: 'Bearer ' + accessToken }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
};
BearerTokenInterceptor = __decorate([
    Injectable()
], BearerTokenInterceptor);
export { BearerTokenInterceptor };
//# sourceMappingURL=bearer-token.interceptor.js.map