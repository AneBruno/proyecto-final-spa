import { __decorate } from "tslib";
import { Component, } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let ClientesCategoriasListarComponent = class ClientesCategoriasListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, confirm, authService, breakPointObserver) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
        this.authService = authService;
        this.breakPointObserver = breakPointObserver;
        this.displayedColumns = [];
    }
    ngOnInit() {
        this.dataSource.uri = '/clientes/categorias';
        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.clearColumns();
            this.addColumn('id', 'Id', '80px').renderFn(row => row.id);
            this.addColumn('nombre', 'Nombre', '').renderFn(row => row.nombre);
            this.addColumn('perfil', 'Perfil', '300px').renderFn(row => row.perfil);
            this.addColumn('habilitado', 'Habilitado', '60px').renderFn(row => row.habilitado ? 'Si' : 'No').setAlign('center');
            this.addColumn('_acciones', 'Acciones', '90px').setAsMenu().setAlign('right');
            if (result.matches) {
                this.getColumn('nombre').setWidth('300px');
                this.getColumn('perfil').setWidth('50px');
                this.getColumn('habilitado').setWidth('50px');
                this.getColumn('_acciones').setWidth('50px');
            }
            this.displayedColumns = this.columnsToShow;
        });
    }
    eliminar(id) {
        this.confirm.ask('Borrará el puerto. Continuar?').subscribe(() => {
            this.apiService.delete('/puertos', id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
    deshabilitar(id) {
        this.confirm.ask('Deshabilitará la categoría. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/categorias', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    habilitar(id) {
        this.confirm.ask('Habilitará la categoría. Continuar?').subscribe(() => {
            this.apiService.put('/clientes/categorias/' + id + '/habilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
ClientesCategoriasListarComponent = __decorate([
    Component({
        selector: 'clientes-categorias-listar',
        templateUrl: './clientes-categorias-listar.component.html',
        styleUrls: ['./clientes-categorias-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesCategoriasListarComponent);
export { ClientesCategoriasListarComponent };
//# sourceMappingURL=clientes-categorias-listar.component.js.map