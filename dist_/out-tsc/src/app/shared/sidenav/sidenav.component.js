import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SidenavComponent = class SidenavComponent {
    constructor(navigationService, userService, router) {
        this.navigationService = navigationService;
        this.userService = userService;
        this.router = router;
        this.accessTree = [];
    }
    ngOnInit() {
        this.accessTree = this.userService.getAccessTree();
    }
    selectMenuItem(item) {
        this.navigationService.establecerSeccion(item);
    }
    onNodeClick(node) {
        this.router.navigateByUrl('/app/' + node.data.uri);
    }
};
SidenavComponent = __decorate([
    Component({
        selector: 'app-sidenav',
        templateUrl: './sidenav.component.html',
        styleUrls: ['./sidenav.component.scss']
    })
], SidenavComponent);
export { SidenavComponent };
//# sourceMappingURL=sidenav.component.js.map