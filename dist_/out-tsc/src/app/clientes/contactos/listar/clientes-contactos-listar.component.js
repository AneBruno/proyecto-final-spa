import { __awaiter, __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ClientesContactosListarComponent = class ClientesContactosListarComponent {
    constructor(dataSource, apiService, confirm) {
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
        this.displayedColumns = [];
        this.empresas = [];
    }
    ngOnInit() {
        this.loadEmpresas();
        this.dataSource.uri = '/clientes/contactos';
        if (this.empresa_id) {
            this.dataSource.fixedFilters = {
                empresa_id: this.empresa_id || undefined,
            };
        }
        if (!this.empresa_id) {
            this.displayedColumns = ['nombre', 'email', 'telefono_celular', 'empresa', 'cargoNombre', '_acciones'];
        }
        else {
            this.displayedColumns = ['nombre', 'email', 'telefono_celular', 'cargoNombre', '_acciones'];
        }
    }
    loadEmpresas() {
        return __awaiter(this, void 0, void 0, function* () {
            this.empresas = yield this.apiService.getData('/clientes/empresas').toPromise();
        });
    }
    borrar(id) {
        this.confirm.ask('Borrará el contacto. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/contactos', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
__decorate([
    Input()
], ClientesContactosListarComponent.prototype, "empresa_id", void 0);
ClientesContactosListarComponent = __decorate([
    Component({
        selector: 'clientes-contactos-listar',
        templateUrl: './clientes-contactos-listar.component.html',
        styleUrls: ['./clientes-contactos-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesContactosListarComponent);
export { ClientesContactosListarComponent };
//# sourceMappingURL=clientes-contactos-listar.component.js.map