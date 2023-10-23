import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ProductosCalidadesListarComponent = class ProductosCalidadesListarComponent {
    constructor(client, confirm, dataSource) {
        this.client = client;
        this.confirm = confirm;
        this.dataSource = dataSource;
        this.displayedColumns = ['id', 'nombre', '_acciones'];
    }
    ngOnInit() {
        this.dataSource.uri = '/calidades';
    }
    eliminar(id) {
        this.confirm.ask('Eliminará el registro. Continuar?').subscribe(() => {
            this.client.delete('/calidades', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
ProductosCalidadesListarComponent = __decorate([
    Component({
        selector: 'productos-calidades-listar',
        templateUrl: './productos-calidades-listar.component.html',
        styleUrls: ['./productos-calidades-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ProductosCalidadesListarComponent);
export { ProductosCalidadesListarComponent };
//# sourceMappingURL=productos-calidades-listar.component.js.map