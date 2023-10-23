import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
let AppComponent = class AppComponent {
    constructor(authService, navigationService) {
        this.authService = authService;
        this.navigationService = navigationService;
        this.accessGroups = {};
        this.ngDestroy$ = new Subject();
    }
    ngOnInit() {
        var self = this;
        this.navigationSubscription = this.navigationService.current$.subscribe((item) => {
            if (item != null) {
                self.close();
            }
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
        this.sidenav.open();
    }
    ngOnDestroy() {
        this.ngDestroy$.complete();
        this.navigationSubscription.unsubscribe();
    }
};
__decorate([
    ViewChild('sidenav')
], AppComponent.prototype, "sidenav", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map