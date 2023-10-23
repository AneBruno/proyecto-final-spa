import { __awaiter, __decorate } from "tslib";
import { DataSource } from '@angular/cdk/collections';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
let ListadoDataSource = class ListadoDataSource extends DataSource {
    constructor(client) {
        super();
        this.limit = 10;
        this.pageIndex = 0;
        this.total = 0;
        this.filtros = {};
        this.fixedFilters = {};
        this.defaultFilters = {};
        this.ordenes = {};
        this.queryParams = {};
        this.afterFetch = new EventEmitter();
        this.autoStart = true;
        this.currentData = [];
        this.token = {};
        this.client = client;
        this.data = new Subject();
    }
    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect() {
        if (this.autoStart) {
            this.refreshData();
        }
        return this.data.asObservable();
    }
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }
    setPageIndex(pageIndex) {
        this.pageIndex = pageIndex;
        this.refreshData();
    }
    setDefaultFilters(values) {
        this.defaultFilters = values;
        Object.assign(this.filtros, this.defaultFilters);
    }
    refreshData() {
        return __awaiter(this, void 0, void 0, function* () {
            let params = {};
            params.page = this.pageIndex + 1;
            params.limit = this.limit;
            params.filtros = {};
            params.ordenes = {};
            params.token = this.token;
            Object.assign(params.filtros, this.defaultFilters);
            Object.assign(params.filtros, this.filtros);
            Object.assign(params.filtros, this.fixedFilters);
            Object.assign(params.ordenes, this.ordenes);
            Object.assign(params, this.queryParams);
            for (let key in params.filtros) {
                let value = params.filtros[key];
                if (value === null || value === '') {
                    delete params.filtros[key];
                }
            }
            let result = yield this.client.get(this.uri, params).pipe(map((result) => {
                var _a;
                this.total = ((_a = result === null || result === void 0 ? void 0 : result.meta) === null || _a === void 0 ? void 0 : _a.total) || 0;
                this.data.next(result.data);
                this.currentData = result.data;
                return result;
            })).toPromise();
            this.afterFetch.emit(result);
            return result;
        });
    }
    clearFilters() {
        for (let key in this.filtros) {
            if (this.filtros[key]) {
                this.filtros[key] = null;
            }
        }
        Object.assign(this.filtros, this.defaultFilters);
        this.refreshData();
    }
    canClearFilters() {
        for (let key in this.filtros) {
            if (this.filtros[key]) {
                return true;
            }
        }
        return false;
    }
};
ListadoDataSource = __decorate([
    Injectable()
], ListadoDataSource);
export { ListadoDataSource };
//# sourceMappingURL=listado.datasource.js.map