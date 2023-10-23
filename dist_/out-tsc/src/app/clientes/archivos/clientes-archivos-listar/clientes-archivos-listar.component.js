import { __decorate } from "tslib";
import * as moment from 'moment';
import { Component, Input } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let ClientesArchivosListarComponent = class ClientesArchivosListarComponent {
    constructor(dataSource, apiService, confirm) {
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.confirm = confirm;
        this.displayedColumns = ['tipo', 'fecha_creacion', 'fecha_vencimiento', '_acciones'];
    }
    ngOnInit() {
        this.dataSource.uri = '/clientes/empresas/' + this.empresa_id + '/archivos';
        this.dataSource.fixedFilters = {
            empresa_id: this.empresa_id,
        };
        this.dataSource.queryParams = {
            with_relation: 'tipoArchivo',
            opciones: {
                with_relation: 'tipoArchivo',
            },
        };
    }
    formateaFecha(fecha_creacion) {
        var fecha_creacion_formateada = moment(fecha_creacion).format('YYYY-MM-DD');
        return fecha_creacion_formateada;
    }
    borrar(id) {
        this.confirm.ask('Borrará el archivo. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/empresas/' + this.empresa_id + '/archivos', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
};
__decorate([
    Input()
], ClientesArchivosListarComponent.prototype, "empresa_id", void 0);
ClientesArchivosListarComponent = __decorate([
    Component({
        selector: 'app-clientes-archivos-listar',
        templateUrl: './clientes-archivos-listar.component.html',
        styleUrls: ['./clientes-archivos-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], ClientesArchivosListarComponent);
export { ClientesArchivosListarComponent };
//# sourceMappingURL=clientes-archivos-listar.component.js.map