import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import * as moment from 'moment';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let SolicitudCobroListarComponent = class SolicitudCobroListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, utils, userService) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.utils = utils;
        this.userService = userService;
        this.filtros = {
            cuit: []
        };
        this.aprobacionDptoCreditos = false;
        this.aprobacionDptoFinanzas = false;
        this.aprobacionGerenciaComercial = false;
        this.confirmacionPagos = false;
    }
    ngOnInit() {
        this.dataSource.uri = '/gestion-de-saldos/solicitudes';
        this.dataSource.ordenes.created_at = 'DESC';
        this.dataSource.filtros = {
            estado_id: [],
        };
        this.user = this.userService.getUser();
        this.obtenerEstadoSolicitudes();
        this.setTable();
        this.habilitarGestion();
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
        this.addColumn('Saldo', 'Saldo', '170px').renderFn(row => row.tipo);
        this.addColumn('razon_social', 'Razón social', '').renderFn(row => row.razon_social);
        this.addColumn('monto_total', 'Monto', '250px').renderFn(row => this.formatMonto(this.obtenerMontoAMostrar(row)));
        this.addColumn('estado', 'Estado', '100px').renderFn(row => row.estado.descripcion);
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('center');
    }
    obtenerMontoAMostrar(row) {
        if (row.tipo === 'Anticipo') {
            if (row.monto_aprobado !== '0.00') {
                return row.monto_aprobado;
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
    obtenerEstadoSolicitudes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.estadoSolicitudes = yield this.apiService.getData('/gestion-de-saldos/solicitudes-estados', {
                limit: 0,
            }).toPromise();
        });
    }
    habilitarGestion() {
        if (this.user.aprobacion_dpto_creditos === 1) {
            this.aprobacionDptoCreditos = true;
            this.dataSource.filtros = {
                estado_id: [2],
            };
        }
        if (this.user.aprobacion_dpto_finanzas === 1) {
            this.aprobacionDptoFinanzas = true;
            this.dataSource.filtros = {
                estado_id: [3],
            };
        }
        if (this.user.aprobacion_gerencia_comercial === 1) {
            this.aprobacionGerenciaComercial = true;
            this.dataSource.filtros = {
                estado_id: [10],
            };
        }
        if (this.user.confirmacion_pagos === 1) {
            this.confirmacionPagos = true;
            this.dataSource.filtros = {
                estado_id: [1, 4, 6],
            };
        }
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
        if (this.dataSource.filtros.estado_id.includes('')) {
            delete this.dataSource.filtros["estado_id"];
        }
        this.dataSource.filtros.cuit = this.filtros.cuit.map((x) => x.cuit);
        if (this.dataSource.filtros.tipo !== undefined) {
            if (this.dataSource.filtros.tipo.length === 0 || this.dataSource.filtros.tipo.includes('')) {
                delete this.dataSource.filtros["tipo"];
            }
        }
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
};
__decorate([
    ViewChild('tablaGestionSolicitudes', { static: true })
], SolicitudCobroListarComponent.prototype, "tablaSolicitudes", void 0);
SolicitudCobroListarComponent = __decorate([
    Component({
        selector: 'app-gestion-saldos-solicitudes-cobro-listar',
        templateUrl: './solicitudes-cobro-listar.component.html',
        styleUrls: ['./solicitudes-cobro-listar.component.scss'],
        providers: [
            ListadoDataSource
        ]
    })
], SolicitudCobroListarComponent);
export { SolicitudCobroListarComponent };
//# sourceMappingURL=solicitudes-cobro-listar.component.js.map