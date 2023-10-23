import { __decorate } from "tslib";
import { Component, } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let ClientesCargosListarComponent = class ClientesCargosListarComponent extends ListadoComponent {
    constructor(dataSource, authService, apiService, confirm) {
        super();
        this.dataSource = dataSource;
        this.authService = authService;
        this.apiService = apiService;
        this.confirm = confirm;
    }
    ngOnInit() {
        this.dataSource.uri = '/clientes/cargos';
        this.addColumn('id', 'Id', '80px').renderFn(row => row.id);
        this.addColumn('nombre', 'Nombre', '').renderFn(row => row.nombre);
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('right');
    }
    eliminar(id) {
        this.confirm.ask('Borrará el cargo. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/cargos', id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
ClientesCargosListarComponent = __decorate([
    Component({
        selector: 'app-clientes-cargos-listar',
        templateUrl: './clientes-cargos-listar.component.html',
        styleUrls: ['./clientes-cargos-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesCargosListarComponent);
export { ClientesCargosListarComponent };
//# sourceMappingURL=clientes-cargos-listar.component.js.map