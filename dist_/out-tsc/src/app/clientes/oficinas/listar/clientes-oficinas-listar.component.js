import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ClientesOficinasListarComponent = class ClientesOficinasListarComponent {
    constructor(dataSource, confirm, client) {
        this.dataSource = dataSource;
        this.confirm = confirm;
        this.client = client;
        this.displayedColumns = ['id', 'nombre', 'telefono', 'departamento', 'provincia', '_acciones'];
    }
    ngOnInit() {
        this.dataUri = `/clientes/empresas/${this.empresa_id}/oficinas`;
        this.dataSource.uri = this.dataUri;
        this.dataSource.fixedFilters = { empresa_id: this.empresa_id };
    }
    eliminar(id) {
        this.confirm.ask('Borrará el registro. Continuar?').subscribe(() => {
            this.client.delete(this.dataUri, id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
__decorate([
    Input()
], ClientesOficinasListarComponent.prototype, "empresa_id", void 0);
ClientesOficinasListarComponent = __decorate([
    Component({
        selector: 'app-clientes-oficinas-listar',
        templateUrl: './clientes-oficinas-listar.component.html',
        styleUrls: ['./clientes-oficinas-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesOficinasListarComponent);
export { ClientesOficinasListarComponent };
//# sourceMappingURL=clientes-oficinas-listar.component.js.map