import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ClientesTiposEventosListarComponent = class ClientesTiposEventosListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, confirm) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
    }
    ngOnInit() {
        this.dataSource.uri = "/clientes/tipos-evento";
        this.addColumn('id', 'Id', '80px').renderFn(row => row.id);
        this.addColumn('nombre', 'Nombre', '').renderFn(row => row.nombre);
        this.addColumn('habilitado', 'Habilitado', '80px').renderFn(row => row.habilitado === 1 ? "Si" : "No");
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('right');
    }
    deshabilitar(id) {
        this.confirm.ask('Deshabilitará el tipo de evento CRM. Continuar?').subscribe(() => {
            this.apiService.put(`/clientes/tipos-evento/${id}:deshabilitar`, {}).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
    habilitar(id) {
        this.confirm.ask('Habilitará el tipo de evento CRM. Continuar?').subscribe(() => {
            this.apiService.put(`/clientes/tipos-evento/${id}:habilitar`, {}).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
ClientesTiposEventosListarComponent = __decorate([
    Component({
        selector: 'app-clientes-tipos-eventos-listar',
        templateUrl: './clientes-tipos-eventos-listar.component.html',
        styleUrls: ['./clientes-tipos-eventos-listar.component.scss'],
        providers: [ListadoDataSource],
    })
], ClientesTiposEventosListarComponent);
export { ClientesTiposEventosListarComponent };
//# sourceMappingURL=clientes-tipos-eventos-listar.component.js.map