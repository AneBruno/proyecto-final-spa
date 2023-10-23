import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let CosechasListarComponent = class CosechasListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, confirm, authService) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
        this.authService = authService;
    }
    ngOnInit() {
        this.dataSource.uri = '/mercado/cosechas';
        this.dataSource.ordenes = { descripcion: 'DESC' };
        //this.dataSource.fixedFilters = {borrados: 1}
        this.addColumn('id', 'Id', '100px').renderFn(row => row.id);
        this.addColumn('descripcion', 'Descripción', '').renderFn(row => row.descripcion);
        this.addColumn('habilitado', 'Habilitado', '100px').renderFn(row => row.habilitado ? 'Si' : 'No');
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('right');
    }
    deshabilitar(row) {
        this.confirm.ask('Deshabilitará la cosecha. Continuar?').subscribe(() => {
            row.habilitado = 0;
            this.apiService.put('/mercado/cosechas' + '/' + row.id, row).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    habilitar(row) {
        this.confirm.ask('Habilitará la cosecha. Continuar?').subscribe(() => {
            row.habilitado = 1;
            this.apiService.put('/mercado/cosechas' + '/' + row.id, row).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
CosechasListarComponent = __decorate([
    Component({
        selector: 'app-cosechas-listar',
        templateUrl: './cosechas-listar.component.html',
        styleUrls: ['./cosechas-listar.component.scss']
    })
], CosechasListarComponent);
export { CosechasListarComponent };
//# sourceMappingURL=cosechas-listar.component.js.map