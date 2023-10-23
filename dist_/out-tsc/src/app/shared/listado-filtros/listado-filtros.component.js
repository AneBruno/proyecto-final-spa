import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let ListadoFiltrosComponent = class ListadoFiltrosComponent {
    constructor() {
        this.textoBuscar = 'Buscar...';
        this.filtros = {};
        this.filtrosFijos = {};
        this.botonAgregar = true;
        this.agregarTexto = 'Agregar';
        this.agregarLink = '';
        this.clickBuscar = new EventEmitter();
    }
    ngOnInit() {
        this.dataSource.filtros = this.filtros;
        this.dataSource.filtros.busqueda = null;
        Object.assign(this.dataSource.fixedFilters, this.filtrosFijos);
    }
    buscar() {
        this.clickBuscar.emit();
        this.dataSource.refreshData();
    }
};
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "textoBuscar", void 0);
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "dataSource", void 0);
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "filtros", void 0);
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "filtrosFijos", void 0);
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "botonAgregar", void 0);
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "agregarTexto", void 0);
__decorate([
    Input()
], ListadoFiltrosComponent.prototype, "agregarLink", void 0);
__decorate([
    Output()
], ListadoFiltrosComponent.prototype, "clickBuscar", void 0);
ListadoFiltrosComponent = __decorate([
    Component({
        selector: 'app-listado-filtros',
        templateUrl: './listado-filtros.component.html',
        styleUrls: ['./listado-filtros.component.scss']
    })
], ListadoFiltrosComponent);
export { ListadoFiltrosComponent };
//# sourceMappingURL=listado-filtros.component.js.map