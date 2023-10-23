import { __awaiter, __decorate } from "tslib";
import { Component, } from '@angular/core';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ClientesEmpresasListarComponent = class ClientesEmpresasListarComponent extends ListadoComponent {
    constructor(dataSource, authService, apiService, confirm) {
        super();
        this.dataSource = dataSource;
        this.authService = authService;
        this.apiService = apiService;
        this.confirm = confirm;
        this.displayedColumns = [];
        this.actividades = [];
        this.categorias = [];
        this.usuarios = [];
        this.accesoDeshabilitar = false;
        this.accesoHabilitar = true;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.accesoDeshabilitar = this.authService.tieneAcceso('empresas_deshabilitar');
            this.accesoHabilitar = this.authService.tieneAcceso('empresas_habilitar');
            this.dataSource.uri = '/clientes/empresas';
            this.actividades = yield this.apiService.getData('/clientes/actividades', { limit: 0 }).toPromise();
            this.categorias = yield this.apiService.getData('/clientes/categorias', { limit: 0 }).toPromise();
            this.usuarioLogueado = yield this.apiService.getData('/auth/getUser').toPromise();
            this.rol_usuarioLogueado = this.usuarioLogueado.rol.id;
            this.usuarios = yield this.apiService.getData('/usuarios', {
                filtros: {
                    rol_id: [2, 3, 4]
                },
                limit: 0
            }).toPromise();
            this.addColumn('cuit', 'Cuit', '150px').renderFn(row => row.cuit);
            this.addColumn('razon_social', 'Razón social', '').renderFn(row => row.razon_social);
            this.addColumn('habilitada', 'Habilitada', '100px').renderFn(row => row.habilitada ? 'Si' : 'No').setAlign('center');
            this.addColumn('_acciones', 'Acciones', '60px').setAsMenu().setAlign('right');
        });
    }
    deshabilitar(id) {
        this.confirm.ask('Deshabilitará la empresa. Continuar?').subscribe(() => {
            this.apiService.put(`/clientes/empresas/${id}/deshabilitar`, {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    habilitar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let respuesta = yield this.apiService.getData(`/clientes/empresas/${id}/archivos/completos`).toPromise();
            if (respuesta.resultado === false) {
                yield this.confirm.askAsync('La empresa no posee al menos un archivo de cada tipo. Continuar?');
            }
            else {
                yield this.confirm.askAsync('Habilitará la empresa. Continuar?');
            }
            yield this.apiService.put(`/clientes/empresas/${id}/habilitar`, {}).toPromise();
            this.dataSource.refreshData();
        });
    }
};
ClientesEmpresasListarComponent = __decorate([
    Component({
        selector: 'clientes-empresas-listar',
        templateUrl: './clientes-empresas-listar.component.html',
        styleUrls: ['./clientes-empresas-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesEmpresasListarComponent);
export { ClientesEmpresasListarComponent };
//# sourceMappingURL=clientes-empresas-listar.component.js.map