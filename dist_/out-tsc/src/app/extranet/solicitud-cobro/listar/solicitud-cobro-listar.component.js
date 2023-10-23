import { __awaiter, __decorate } from "tslib";
import * as moment from 'moment';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let SolicitudCobroListarComponent = class SolicitudCobroListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, authService, router, utils, messageService) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.authService = authService;
        this.router = router;
        this.utils = utils;
        this.messageService = messageService;
        this.filtros = {
            cuit: []
        };
        this.multiplesClientes = false;
        this.estadoSolicitudes = [];
        this.muestraEstado = false;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.multiplesClientes = this.authService.getLoginData().accounts.length > 1;
            this.dataSource.uri = `/extranet/solicitudes-cobro`;
            this.dataSource.token = this.authService.getToken();
            this.estadoSolicitudes = yield this.apiService.getData('/extranet/solicitudes-estados', {
                token: this.authService.getToken(),
            }).toPromise();
            console.log("estados", this.estadoSolicitudes);
            console.log("datasource", this.dataSource);
            this.verificarRolUsuario();
            this.setTable();
        });
    }
    setTable() {
        this.addColumn('fecha', 'Fecha', '150px').renderFn((row) => {
            let fecha = new Date(row.created_at);
            let stringFecha = fecha.toLocaleDateString();
            for (let index = 0; index < 3; index++) {
                stringFecha = stringFecha.replace('/', '-');
            }
            return stringFecha;
        });
        if (this.multiplesClientes) {
            this.addColumn('razon_social', 'Razón social', '').renderFn(row => row.razon_social);
        }
        this.addColumn('tipo', 'Tipo', '170px').renderFn(row => row.tipo);
        this.addColumn('estado', 'Estado', '100px').renderFn(row => row.estado.descripcion);
        this.addColumn('monto_total', 'Monto', '250px')
            .renderFn((row) => this.formatMonto(this.obtenerMontoAMostrar(row)))
            .setAlign('right');
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('center');
    }
    obtenerMontoAMostrar(row) {
        if (row.tipo === 'Anticipo') {
            if (this.authService.obtenerRol() === '7') {
                return row.monto_aprobado;
            }
            if (this.authService.obtenerRol() === '3' || this.authService.obtenerRol() === '4') {
                if (row.monto_aprobado !== '0.00') {
                    return row.monto_aprobado;
                }
            }
        }
        return row.monto_total;
    }
    formatMonto(monto) {
        let arrayMonto = monto.split('.');
        let enteros = arrayMonto[0];
        let decimales = arrayMonto[1];
        enteros = this.utils.formatNumero(enteros);
        return '$' + enteros + ',' + decimales;
    }
    refreshList() {
        [
            'fecha_desde',
            'fecha_hasta',
        ].map((name) => {
            if (!this.filtros[name]) {
                this.dataSource.filtros[name] = null;
                return;
            }
            this.dataSource.filtros[name] = moment(this.filtros[name]).format('YYYY-MM-DD');
        });
        if (!this.dataSource.filtros.estado_id || this.dataSource.filtros.estado_id.includes('')) {
            delete this.dataSource.filtros["estado_id"];
        }
        this.dataSource.filtros.cuit = this.filtros.cuit.map((x) => x.CUIT);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }
    onClearFilters() {
        [
            'fecha_desde',
            'fecha_hasta',
        ].map((name) => {
            this.filtros[name] = null;
        });
        this.filtros.cuit = [];
    }
    onRowCheckChange(event) {
    }
    verificarRolUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.authService.getLoginData().Usuario.TipoUsuario === '3'
                || this.authService.getLoginData().Usuario.TipoUsuario === '4'
                || this.authService.getLoginData().Usuario.TipoUsuario === '7') {
                this.muestraEstado = true;
            }
            console.log("roles", this.authService.getLoginData().Usuario.TipoUsuario);
        });
    }
    clickGestionar(row) {
        if (row.estado_id === 5) { //Corrección de montos       
            this.messageService.show(`El monto aprobado es de ${this.formatMonto(row.monto_aprobado)}. Modifique los montos de los medios de pago para completar ese valor.`, 'center', 'Modificar')
                .subscribe((event) => {
                if (event) {
                    this.router.navigate([`/app/extranet/solicitudes-cobro/gestionar/${row.id}`]);
                }
            });
            return;
        }
        ;
        this.router.navigate([`/app/extranet/solicitudes-cobro/gestionar/${row.id}`]);
    }
};
__decorate([
    ViewChild('tablaSolicitudes', { static: true })
], SolicitudCobroListarComponent.prototype, "tablaSolicitudes", void 0);
SolicitudCobroListarComponent = __decorate([
    Component({
        selector: 'app-solicitud-cobro-listar',
        templateUrl: './solicitud-cobro-listar.component.html',
        styleUrls: ['./solicitud-cobro-listar.component.scss']
    })
], SolicitudCobroListarComponent);
export { SolicitudCobroListarComponent };
//# sourceMappingURL=solicitud-cobro-listar.component.js.map