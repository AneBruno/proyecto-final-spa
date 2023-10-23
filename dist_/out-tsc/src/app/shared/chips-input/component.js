import { __awaiter, __decorate } from "tslib";
import { COMMA } from '@angular/cdk/keycodes';
import { ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';
let ChipsInputComponent = class ChipsInputComponent {
    constructor(apiService) {
        this.apiService = apiService;
        this.data = [];
        this.searchText = '';
        this.separatorKeysCodes = [ENTER, COMMA];
        this.timeOutId = null;
        this.selected = [];
        this.selectedChange = new EventEmitter();
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
        this.error = '';
        this.readonly = false;
        this.disabled = false;
        this.queryParams = {};
        this.appearance = 'fill';
        this.inputClick = new EventEmitter();
        this.chipClick = new EventEmitter();
        this.selectionChanged = new EventEmitter();
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('hellooo');
        });
    }
    emitChange() {
        console.log('emitChange');
        this.selectedChange.emit(this.selected);
        this.selectionChanged.emit();
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
            let queryParams = Object.assign(this.queryParams, { filtros: filtros });
            return (yield this.apiService.getData(this.dataUrl, queryParams).toPromise());
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
        this.emitChange();
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
        this.emitChange();
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
], ChipsInputComponent.prototype, "dataInput", void 0);
__decorate([
    ViewChild('auto')
], ChipsInputComponent.prototype, "matAutocomplete", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "selected", void 0);
__decorate([
    Output()
], ChipsInputComponent.prototype, "selectedChange", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "title", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "dataUrl", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "placeHolder", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "valueColumn", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "labelColumn", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "labelColumnFn", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "chipLinkFn", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "searchParamForList", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "searchParamForSelected", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "selectable", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "removable", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "error", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "readonly", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "disabled", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "queryParams", void 0);
__decorate([
    Input()
], ChipsInputComponent.prototype, "appearance", void 0);
__decorate([
    Output()
], ChipsInputComponent.prototype, "inputClick", void 0);
__decorate([
    Output()
], ChipsInputComponent.prototype, "chipClick", void 0);
__decorate([
    Output()
], ChipsInputComponent.prototype, "selectionChanged", void 0);
ChipsInputComponent = __decorate([
    Component({
        selector: 'app-chips-input',
        templateUrl: './template.html',
        styleUrls: ['./styles.scss',],
    })
], ChipsInputComponent);
export { ChipsInputComponent };
//# sourceMappingURL=component.js.map