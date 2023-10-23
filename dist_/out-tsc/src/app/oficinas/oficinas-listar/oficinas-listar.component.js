import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let OficinasListarComponent = class OficinasListarComponent {
    constructor(dataSource, client, confirm) {
        this.dataSource = dataSource;
        this.client = client;
        this.confirm = confirm;
        this.displayedColumns = ['id', 'nombre', 'oficina_madre', '_acciones'];
    }
    ngOnInit() {
        this.dataSource.uri = '/oficinas';
    }
    eliminar(id) {
        this.confirm.ask('Borrará la oficina. Continuar?').subscribe(() => {
            this.client.delete('/oficinas', id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
OficinasListarComponent = __decorate([
    Component({
        selector: 'oficinas-listar',
        templateUrl: './oficinas-listar.component.html',
        styleUrls: ['./oficinas-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], OficinasListarComponent);
export { OficinasListarComponent };
//# sourceMappingURL=oficinas-listar.component.js.map