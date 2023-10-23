import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import * as moment from 'moment';
let ClientesEventosListarComponent = class ClientesEventosListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, userService) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.userService = userService;
        this.tipos_evento = [];
        this.oficinas = [];
        this.usuarios = [];
        this.filtros = {};
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataSource.uri = '/clientes/eventos';
            this.dataSource.ordenes['fecha_vencimiento'] = 'asc';
            this.dataSource.ordenes['created_at'] = 'asc';
            this.dataSource.setDefaultFilters({
                estado: 'ABIERTO',
                usuario_responsable_id: [this.getUserId()],
            });
            this.filtros.empresa_id = [];
            this.addColumn('created_at', 'Fecha', '120px').renderFn((row) => {
                return moment(row.created_at).format('DD-MM-YYYY');
            });
            this.addColumn('tipo', 'Tipo', '220px').renderFn((row) => {
                return row.tipo_evento.nombre;
            });
            this.addColumn('titulo', 'Titulo', '');
            this.addColumn('usuario_creador.nombreCompleto', 'Creador', '').renderFn((row) => {
                return row.usuario_creador.nombreCompleto;
            });
            this.addColumn('asignadoA', 'Asignado a', '').setAsCustom();
            this.addColumn('fecha_vencimiento', 'Vencimiento', '120px').renderFn((row) => {
                return moment(row.fecha_vencimiento).format('DD-MM-YYYY');
            });
            this.addColumn('acciones', '', '30px').setAsMenu();
            this.tipos_evento = yield this.apiService.getData('/clientes/tipos-evento').toPromise();
            this.oficinas = yield this.apiService.getData('/oficinas', { limit: 0 }).toPromise();
            this.usuarios = (yield this.apiService.getData('/usuarios', { limit: 0 }).toPromise()).sort((a, b) => {
                return a.id === this.getUserId() ? -1 : 0;
            });
        });
    }
    getUserId() {
        return this.userService.getUser().id;
    }
    refreshList() {
        [
            'created_at_desde',
            'created_at_hasta',
            'fecha_vencimiento_desde',
            'fecha_vencimiento_hasta'
        ].map((name) => {
            if (!this.filtros[name]) {
                this.dataSource.filtros[name] = null;
                return;
            }
            this.dataSource.filtros[name] = moment(this.filtros[name]).format('YYYY-MM-DD');
        });
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item) => {
            return item.id;
        });
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }
    onClearFilters() {
        [
            'created_at_desde',
            'created_at_hasta',
            'fecha_vencimiento_desde',
            'fecha_vencimiento_hasta'
        ].map((name) => {
            this.filtros[name] = null;
        });
    }
    concatenarNombres(lista) {
        return lista
            .map(row => row.nombreCompleto)
            .filter((row, i, a) => a.indexOf(row) == i)
            .join('\n');
    }
    getCellColor(row) {
        if (moment().format('YYYY-MM-DD') > row.fecha_vencimiento) {
            return 'rgba(226, 68, 92, 0.18)';
        }
        return '';
    }
    usuariosLabelFn(row) {
        return row.nombreCompleto;
    }
};
ClientesEventosListarComponent = __decorate([
    Component({
        selector: 'app-clientes-eventos-listar',
        templateUrl: './template.html',
        styleUrls: ['./styles.scss'],
        providers: [ListadoDataSource],
    })
], ClientesEventosListarComponent);
export { ClientesEventosListarComponent };
//# sourceMappingURL=component.js.map