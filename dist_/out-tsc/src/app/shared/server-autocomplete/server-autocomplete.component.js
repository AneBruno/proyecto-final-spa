var ServerAutocompleteComponent_1;
import { __decorate } from "tslib";
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let ServerAutocompleteComponent = ServerAutocompleteComponent_1 = class ServerAutocompleteComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.value = null;
        this.label = 'Nombre del campo';
        this.placeholder = 'Escriba para buscar...';
        this.labelForAll = '';
        this.valueColumn = 'id';
        this.labelColumn = 'nombre';
        this.dataUrl = '';
        this.dataParams = {};
        this.searchParam = 'busqueda';
        this.searchLimit = 10;
        this.listIcon = '';
        this.listIconFn = null;
        this.appearance = 'legacy';
        this.valueChange = new EventEmitter();
        this.change = new EventEmitter();
        this.optionSelected = new EventEmitter();
        this.data = [];
    }
    ngOnInit() {
        this.displayWithFn = (value) => {
            return (this.data.filter(row => {
                return row[this.valueColumn] === value;
            })[0] || {})[this.labelColumn];
        };
        this.refresh();
    }
    // *******
    // ControlValueAccessor Interface Implementation
    //
    writeValue(obj) {
        if (obj !== undefined) {
            this.value = obj;
        }
    }
    registerOnChange(fn) {
        this.change.subscribe(() => {
            fn(this.value);
        });
    }
    registerOnTouched(fn) {
        this.change.subscribe(() => {
            fn();
        });
    }
    setDisabledState(isDisabled) {
    }
    //
    // End of ControlValueAccessor Interface Implementation
    // ******
    refresh(searchString = null) {
        let params = Object.assign({
            filtros: {},
            ordenes: {},
        }, this.dataParams);
        params.filtros[this.searchParam] = searchString;
        params.limit = this.searchLimit;
        this.apiService.getData(this.dataUrl, params).subscribe(data => {
            this.data = data;
        });
    }
    keyup() {
        if (this.to) {
            clearTimeout(this.to);
        }
        this.to = setTimeout(() => {
            this.emitChange();
            this.refresh(this.value);
        }, 400);
    }
    emitChange() {
        this.change.emit(this.value);
    }
    emitOptionSelected() {
        this.valueChange.emit(this.value);
        this.optionSelected.emit(this.value);
    }
    get hasIcon() {
        return this.listIcon !== '' || this.listIconFn !== null;
    }
    getIcon(row) {
        let icon = this.listIcon;
        if (this.listIconFn) {
            icon = this.listIconFn(row);
        }
        return icon || '';
    }
};
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "value", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "label", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "labelForAll", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "valueColumn", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "labelColumn", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "dataUrl", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "dataParams", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "searchParam", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "searchLimit", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "listIcon", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "listIconFn", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "appearance", void 0);
__decorate([
    Input()
], ServerAutocompleteComponent.prototype, "error", void 0);
__decorate([
    Output()
], ServerAutocompleteComponent.prototype, "valueChange", void 0);
__decorate([
    Output()
], ServerAutocompleteComponent.prototype, "change", void 0);
__decorate([
    Output()
], ServerAutocompleteComponent.prototype, "optionSelected", void 0);
ServerAutocompleteComponent = ServerAutocompleteComponent_1 = __decorate([
    Component({
        selector: 'app-server-autocomplete',
        templateUrl: './server-autocomplete.component.html',
        styleUrls: ['./server-autocomplete.component.scss'],
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => ServerAutocompleteComponent_1),
                multi: true,
            }
        ]
    })
], ServerAutocompleteComponent);
export { ServerAutocompleteComponent };
//# sourceMappingURL=server-autocomplete.component.js.map