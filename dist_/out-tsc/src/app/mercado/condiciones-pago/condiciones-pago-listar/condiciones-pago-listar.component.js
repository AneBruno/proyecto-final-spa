import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let CondicionesPagoListarComponent = class CondicionesPagoListarComponent {
    constructor(dataSource, client, confirm) {
        this.dataSource = dataSource;
        this.client = client;
        this.confirm = confirm;
        this.displayedColumns = ['id', 'descripcion', '_acciones'];
    }
    ngOnInit() {
        this.dataSource.uri = '/mercado/condiciones-pago';
    }
    eliminar(id) {
        this.confirm.ask('Borrará la condición de pago. Continuar?').subscribe(() => {
            this.client.delete('/mercado/condiciones-pago', id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
CondicionesPagoListarComponent = __decorate([
    Component({
        selector: 'app-condiciones-pago-listar',
        templateUrl: './condiciones-pago-listar.component.html',
        styleUrls: ['./condiciones-pago-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], CondicionesPagoListarComponent);
export { CondicionesPagoListarComponent };
//# sourceMappingURL=condiciones-pago-listar.component.js.map