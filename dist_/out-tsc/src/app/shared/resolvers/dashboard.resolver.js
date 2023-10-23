import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let DashboardResolver = class DashboardResolver {
    constructor(userService, apiService) {
        this.userService = userService;
        this.apiService = apiService;
    }
    resolve(route, state) {
        return this.userService.fetchUserAsync();
    }
};
DashboardResolver = __decorate([
    Injectable()
], DashboardResolver);
export { DashboardResolver };
//# sourceMappingURL=dashboard.resolver.js.map