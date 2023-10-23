import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { ColumnDef } from './column-def';
import { MenuItem } from './menu-item';
let TableComponent = class TableComponent {
    constructor() {
        this.dataSource = [];
        this.hideHeaders = false;
        this.rowCheckChange = new EventEmitter;
        this.columns = [];
        this.rowIdFn = (row) => row === null || row === void 0 ? void 0 : row.id;
        this.menuItems = [];
        this.fnMenuItems = (row) => { return []; };
    }
    ngOnInit() {
    }
    clearColumns() {
        this.columns = [];
    }
    setColumns(columns) {
        this.columns = columns;
    }
    getColumn(name) {
        let list = this.columns.filter(c => c.name === name);
        if (list.length !== 1) {
            throw new Error('No existe la columna ' + name);
        }
        return list[0];
    }
    clickMenu(row) {
        this.menuItems = [];
        this.fnMenuItems(row);
    }
    get columnsToShow() {
        return this.columns.filter(column => column.visible).map(column => column.name);
    }
    addColumn(name, title, width, valueFn = function () { }, icon, titleColor) {
        console.log('icon', icon);
        let columnDef = new ColumnDef(name, title, width, valueFn, icon, titleColor);
        this.columns.push(columnDef);
        return columnDef;
    }
    setRowIdFn(fn) {
        this.rowIdFn = fn;
        return this;
    }
    onRowChecked(event, row) {
        this.rowCheckChange.emit({
            checked: event.checked,
            row: row
        });
    }
    keyDownNumberInput(event) {
        if (['Backspace', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', `Home`, `End`, 'Delete', 'Insert', 'Enter'].includes(event.key)) {
            return true;
        }
        if (/[0-9]/.test(event.key)) {
            return true;
        }
        return false;
    }
    addMenuItem(label, onClick) {
        this.menuItems.push(new MenuItem(label, onClick));
        return this;
    }
    clearMenuItems() {
        this.menuItems = [];
        return this;
    }
    setFnMenuItems(fn) {
        this.fnMenuItems = fn;
        return this;
    }
};
__decorate([
    Input()
], TableComponent.prototype, "dataSource", void 0);
__decorate([
    Input()
], TableComponent.prototype, "hideHeaders", void 0);
__decorate([
    Output()
], TableComponent.prototype, "rowCheckChange", void 0);
__decorate([
    Input()
], TableComponent.prototype, "columns", void 0);
TableComponent = __decorate([
    Component({
        selector: 'app-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss']
    })
], TableComponent);
export { TableComponent };
//# sourceMappingURL=table.component.js.map