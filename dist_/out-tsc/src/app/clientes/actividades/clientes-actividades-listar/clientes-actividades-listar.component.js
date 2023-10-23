import { __decorate } from "tslib";
import { Component, } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let ClientesActividadesListarComponent = class ClientesActividadesListarComponent extends ListadoComponent {
    constructor(dataSource, authService, apiService, confirm) {
        super();
        this.dataSource = dataSource;
        this.authService = authService;
        this.apiService = apiService;
        this.confirm = confirm;
    }
    ngOnInit() {
        this.dataSource.uri = '/clientes/actividades';
        this.addColumn('id', 'Id', '80px').renderFn(row => row.id);
        this.addColumn('nombre', 'Nombre', '').renderFn(row => row.nombre);
        this.addColumn('_acciones', 'Acciones', '90px').setAsMenu().setAlign('right');
    }
    eliminar(id) {
        this.confirm.ask('Borrará la actividad. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/actividades', id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
ClientesActividadesListarComponent = __decorate([
    Component({
        selector: 'app-clientes-actividades-listar',
        templateUrl: './clientes-actividades-listar.component.html',
        styleUrls: ['./clientes-actividades-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesActividadesListarComponent);
export { ClientesActividadesListarComponent };
//# sourceMappingURL=clientes-actividades-listar.component.js.map