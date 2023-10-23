import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ToolbarComponent = class ToolbarComponent {
    constructor() {
        this.transparent = false;
    }
    ngOnInit() {
    }
};
__decorate([
    Input()
], ToolbarComponent.prototype, "transparent", void 0);
ToolbarComponent = __decorate([
    Component({
        selector: 'app-toolbar',
        templateUrl: './toolbar.component.html',
        styleUrls: ['./toolbar.component.scss']
    })
], ToolbarComponent);
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map