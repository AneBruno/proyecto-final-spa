import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ClientesEstablecimientosListarComponent = class ClientesEstablecimientosListarComponent {
    constructor(dataSource, apiService, confirm) {
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
        this.displayedColumns = ['id', 'nombre', '_acciones'];
    }
    ngOnInit() {
        this.dataUri = `/clientes/empresas/${this.empresa_id}/establecimientos`;
        this.dataSource.uri = this.dataUri;
        this.dataSource.fixedFilters = {
            empresa_id: this.empresa_id,
        };
    }
    borrar(id) {
        this.confirm.ask('Borrará el registro. Continuar?').subscribe(() => {
            this.apiService.delete(this.dataUri, id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
__decorate([
    Input()
], ClientesEstablecimientosListarComponent.prototype, "empresa_id", void 0);
ClientesEstablecimientosListarComponent = __decorate([
    Component({
        selector: 'clientes-establecimientos-listar',
        templateUrl: './clientes-establecimientos-listar.component.html',
        styleUrls: ['./clientes-establecimientos-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesEstablecimientosListarComponent);
export { ClientesEstablecimientosListarComponent };
//# sourceMappingURL=clientes-establecimientos-listar.component.js.map