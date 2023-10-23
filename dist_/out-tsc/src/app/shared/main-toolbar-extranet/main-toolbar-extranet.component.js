import { __decorate } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let MainToolbarExtranetComponent = class MainToolbarExtranetComponent {
    constructor(authService, userService, navigationService, router) {
        this.authService = authService;
        this.userService = userService;
        this.navigationService = navigationService;
        this.router = router;
        this.toogleSideNav = new EventEmitter();
        this.accessGroups = {};
        this.isExtranet = false;
    }
    ngOnInit() {
        this.setIsExtranet();
        this.user = this.userService.getUser();
        this.accessGroups = this.userService.getAccessTree();
        console.log('this.accessGroups', this.accessGroups);
        this.getAvatar();
        this.navigationSubscription = this.navigationService.current$.subscribe((item) => {
            this.currentSection = item;
        });
    }
    setIsExtranet() {
        if (this.router.url.startsWith('/app/extranet')) {
            this.isExtranet = true;
        }
    }
    getAvatar() {
        let urlImagen = this.user.urlImagen || '';
        this.avatar = `url(${urlImagen})`;
    }
    logout() {
        this.authService.signOut();
    }
    openMobileMenu() {
        console.log('holas');
        this.toogleSideNav.emit(true);
    }
    ngOnDestroy() {
        this.navigationSubscription.unsubscribe();
    }
};
__decorate([
    Output()
], MainToolbarExtranetComponent.prototype, "toogleSideNav", void 0);
MainToolbarExtranetComponent = __decorate([
    Component({
        selector: 'app-main-toolbar-extranet',
        templateUrl: './main-toolbar-extranet.component.html',
        styleUrls: ['./main-toolbar-extranet.component.scss']
    })
], MainToolbarExtranetComponent);
export { MainToolbarExtranetComponent };
//# sourceMappingURL=main-toolbar-extranet.component.js.map