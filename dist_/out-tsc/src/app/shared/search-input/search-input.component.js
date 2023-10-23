import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let SearchInputComponent = class SearchInputComponent {
    constructor() {
        this.label = 'Buscar...';
        this.value = '';
        this.valueChange = new EventEmitter();
        this.change = new EventEmitter();
    }
    ngOnInit() {
    }
    keyup() {
        if (this.to) {
            clearTimeout(this.to);
        }
        this.to = setTimeout(() => {
            this.emitChange();
        }, 400);
    }
    emitChange() {
        this.valueChange.emit(this.value);
        this.change.emit(this.value);
    }
    clear() {
        this.value = '';
        this.emitChange();
    }
};
__decorate([
    Input()
], SearchInputComponent.prototype, "label", void 0);
__decorate([
    Input()
], SearchInputComponent.prototype, "value", void 0);
__decorate([
    Input()
], SearchInputComponent.prototype, "valueDefault", void 0);
__decorate([
    Output()
], SearchInputComponent.prototype, "valueChange", void 0);
__decorate([
    Output()
], SearchInputComponent.prototype, "change", void 0);
SearchInputComponent = __decorate([
    Component({
        selector: 'app-search-input',
        templateUrl: './search-input.component.html',
        styleUrls: ['./search-input.component.scss']
    })
], SearchInputComponent);
export { SearchInputComponent };
//# sourceMappingURL=search-input.component.js.map