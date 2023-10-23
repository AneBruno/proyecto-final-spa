import { __awaiter, __decorate } from "tslib";
import { COMMA } from '@angular/cdk/keycodes';
import { ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';
let ChipsFieldComponent = class ChipsFieldComponent {
    constructor(apiService, controlContainer) {
        this.apiService = apiService;
        this.controlContainer = controlContainer;
        this.visible = true;
        this.data = [];
        this.selected = [];
        this.searchText = '';
        this.separatorKeysCodes = [ENTER, COMMA];
        this.timeOutId = null;
        this.disabled = false;
        this.title = '';
        this.dataUrl = '';
        this.placeHolder = 'Escriba para buscar';
        this.valueColumn = 'id';
        this.labelColumn = 'descripcion';
        this.labelColumnFn = null;
        this.chipLinkFn = null;
        this.searchParamForList = 'busqueda';
        this.searchParamForSelected = 'ids';
        this.selectable = true;
        this.removable = true;
        this.fieldName = '';
        this.error = '';
        this.readonly = false;
        this.inputClick = new EventEmitter();
        this.chipClick = new EventEmitter();
    }
    ngOnInit() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.selected = this.getCurrentValue();
            (_a = this.getControl()) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe((value) => {
                this.selected = value;
            });
            this.getControl().statusChanges.subscribe(value => {
                if (value === 'DISABLED') {
                    this.disabled = true;
                    return;
                }
                if (this.disabled && value === 'VALID') {
                    this.disabled = false;
                }
            });
        });
    }
    getCurrentValue() {
        var _a;
        return (_a = this.getControl()) === null || _a === void 0 ? void 0 : _a.value;
    }
    getControl() {
        return this.controlContainer.control.get(this.fieldName);
    }
    updateFormControlValue() {
        var _a;
        (_a = this.getControl()) === null || _a === void 0 ? void 0 : _a.setValue(this.selected);
    }
    keyup() {
        if (this.timeOutId) {
            clearTimeout(this.timeOutId);
        }
        this.timeOutId = setTimeout(() => {
            this.refreshList();
        }, 400);
    }
    fetchForSelected(value) {
        let params = {};
        params[this.searchParamForSelected] = value;
        return this.fetchData(params);
    }
    fetchForList(value) {
        let params = {};
        params[this.searchParamForList] = value;
        return this.fetchData(params);
    }
    fetchData(filtros) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.apiService.getData(this.dataUrl, {
                filtros: filtros
            }).toPromise());
        });
    }
    refreshList() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.searchText) {
                return;
            }
            this.data = (yield this.fetchForList(this.searchText)).filter((row) => {
                return this.selected.filter((selected) => {
                    return this.getIdValue(row) === this.getIdValue(selected);
                }).length === 0;
            });
        });
    }
    onAddKey($event) {
        // Reset the input value
        if ($event.input) {
            $event.input.value = '';
        }
    }
    removeChip(row) {
        this.selected = this.selected.filter(i => i !== row);
        this.updateFormControlValue();
    }
    optionSelected(event) {
        this.data.filter((row) => {
            return this.getIdValue(row) === this.getIdValue(event.option.value);
        }).map((row) => {
            this.selected.push(row);
        });
        // Para que en la próxima búsquda no aparezca una lista con datos viejos
        this.data = [];
        this.dataInput.nativeElement.value = '';
        this.searchText = '';
        this.updateFormControlValue();
    }
    getIdValue(row) {
        return row[this.valueColumn];
    }
    getLabelValue(row) {
        if ((typeof this.labelColumnFn) === 'function') {
            return this.labelColumnFn(row);
        }
        else {
            return row[this.labelColumn];
        }
    }
    onChipClick(row) {
        if (this.disabled) {
            return;
        }
        this.chipClick.emit(row);
    }
};
__decorate([
    ViewChild('dataInput')
], ChipsFieldComponent.prototype, "dataInput", void 0);
__decorate([
    ViewChild('auto')
], ChipsFieldComponent.prototype, "matAutocomplete", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "title", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "dataUrl", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "placeHolder", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "valueColumn", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "labelColumn", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "labelColumnFn", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "chipLinkFn", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "searchParamForList", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "searchParamForSelected", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "selectable", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "removable", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "fieldName", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "error", void 0);
__decorate([
    Input()
], ChipsFieldComponent.prototype, "readonly", void 0);
__decorate([
    Output()
], ChipsFieldComponent.prototype, "inputClick", void 0);
__decorate([
    Output()
], ChipsFieldComponent.prototype, "chipClick", void 0);
ChipsFieldComponent = __decorate([
    Component({
        selector: 'app-chips-field',
        templateUrl: './template.html',
        styleUrls: ['./styles.scss',],
    })
], ChipsFieldComponent);
export { ChipsFieldComponent };
//# sourceMappingURL=component.js.map