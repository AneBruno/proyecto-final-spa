import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
let DashboardExtranetComponent = class DashboardExtranetComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
        this.ngDestroy$ = new Subject();
    }
    ngOnInit() {
        var self = this;
        this.navigationSubscription = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((s) => {
            this.close();
        });
    }
    close() {
        this.sidenav.close();
    }
    logout() {
        this.ngDestroy$.next();
        this.authService.signOut();
    }
    openSideNav($event) {
        console.log(this.sidenav.opened, 'opened?');
        if (!this.sidenav.opened) {
            this.sidenav.open();
        }
        else {
            this.sidenav.close();
        }
    }
    ngOnDestroy() {
        this.ngDestroy$.complete();
        this.navigationSubscription.unsubscribe();
    }
};
__decorate([
    ViewChild('sidenav')
], DashboardExtranetComponent.prototype, "sidenav", void 0);
DashboardExtranetComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard-extranet.component.html',
        styleUrls: ['./dashboard-extranet.component.scss']
    })
], DashboardExtranetComponent);
export { DashboardExtranetComponent };
//# sourceMappingURL=dashboard-extranet.component.js.map