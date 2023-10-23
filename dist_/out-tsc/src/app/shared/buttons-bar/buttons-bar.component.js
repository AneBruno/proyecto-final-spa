import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ButtonsBarComponent = class ButtonsBarComponent {
    constructor() { }
    ngOnInit() {
    }
};
ButtonsBarComponent = __decorate([
    Component({
        selector: 'app-buttons-bar',
        template: `
        <ng-content></ng-content>
    `,
        styles: [`
        :host {
            margin-bottom: 25px;
        }
    `]
    })
], ButtonsBarComponent);
export { ButtonsBarComponent };
//# sourceMappingURL=buttons-bar.component.js.map