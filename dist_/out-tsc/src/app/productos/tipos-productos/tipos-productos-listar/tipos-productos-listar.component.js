import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let TiposProductosListarComponent = class TiposProductosListarComponent {
    constructor(dataSource, client, confirm) {
        this.dataSource = dataSource;
        this.client = client;
        this.confirm = confirm;
        this.displayedColumns = ['id', 'nombre', '_acciones'];
    }
    ngOnInit() {
        this.dataSource.uri = '/tipos-producto';
    }
    eliminar(id) {
        this.confirm.ask('Borrará el tipo de producto. Continuar?').subscribe(() => {
            this.client.delete('/tipos-producto', id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
TiposProductosListarComponent = __decorate([
    Component({
        selector: 'app-tipos-productos-listar',
        templateUrl: './tipos-productos-listar.component.html',
        styleUrls: ['./tipos-productos-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], TiposProductosListarComponent);
export { TiposProductosListarComponent };
//# sourceMappingURL=tipos-productos-listar.component.js.map