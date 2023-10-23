import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let ProductosListarComponent = class ProductosListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, confirm, authService) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
        this.authService = authService;
    }
    ngOnInit() {
        this.dataSource.uri = '/productos';
        this.dataSource.fixedFilters = {
            habilitado: 'todas'
        };
        this.addColumn('id', 'Id', '300px').renderFn(row => row.id);
        this.addColumn('nombre', 'Nombre', '').renderFn(row => row.nombre);
        this.addColumn('tipo_producto_nombre', 'Tipo Producto', '300px').renderFn(row => row.tipo_producto.nombre);
        this.addColumn('unidad', 'Unidad', '200px').renderFn(row => row.unidad);
        this.addColumn('habilitado', 'Habilitado', '100px').renderFn(row => row.habilitado ? 'Si' : 'No');
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('right');
    }
    deshabilitar(id) {
        this.confirm.ask('Deshabilitará el producto. Continuar?').subscribe(() => {
            this.apiService.put('/productos/' + id + '/deshabilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    habilitar(id) {
        this.confirm.ask('Habilitará el producto. Continuar?').subscribe(() => {
            this.apiService.put('/productos/' + id + '/habilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
ProductosListarComponent = __decorate([
    Component({
        selector: 'productos-listar',
        templateUrl: './productos-listar.component.html',
        styleUrls: ['./productos-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ProductosListarComponent);
export { ProductosListarComponent };
//# sourceMappingURL=productos-listar.component.js.map