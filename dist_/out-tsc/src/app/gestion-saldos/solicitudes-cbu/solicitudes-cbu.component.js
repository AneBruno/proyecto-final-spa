import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ViewChild } from '@angular/core';
import * as moment from 'moment';
let SolicitudesCBUComponent = class SolicitudesCBUComponent extends ListadoComponent {
    constructor(apiService, dataSource, snackBarService) {
        super();
        this.apiService = apiService;
        this.dataSource = dataSource;
        this.snackBarService = snackBarService;
        this.displayedColumns = [];
        this.filtros = {
            cuit: []
        };
        this.empresas = [];
    }
    ngOnInit() {
        this.dataSource.uri = `/cbus`;
        this.dataSource.ordenes.created_at = 'DESC';
        this.dataSource.ordenes.estado = 'ASC';
        this.dataSource.setDefaultFilters({
            estado: 'Pendiente',
            cuit: [],
        });
        this.setTable();
    }
    setTable() {
        this.addColumn('fecha', 'Fecha', '150px ').renderFn((row) => {
            let fecha = new Date(row.created_at);
            return fecha.toLocaleDateString().replace('/g', '-');
        });
        this.addColumn('cbu', 'CBU', '').renderFn(row => row.cbu);
        this.addColumn('banco', 'Banco', '150px').renderFn(row => row.banco);
        this.addColumn('razon_social', 'Razón social', '200px').renderFn(row => row.razon_social);
        this.addColumn('mail', 'Email', '200px').renderFn(row => row.mail);
        this.addColumn('estado', 'Estado', '150px').renderFn(row => row.estado);
        this.addColumn('_acciones', 'Acciones', '50px').setAsMenu().setAlign('right');
    }
    refreshList() {
        ['fecha_desde', 'fecha_hasta'].map((name) => {
            if (!this.filtros[name]) {
                this.dataSource.filtros[name] = null;
                return;
            }
            this.dataSource.filtros[name] = moment(this.filtros[name]).format('YYYY-MM-DD');
        });
        this.dataSource.filtros.cuit = this.filtros.cuit.map((x) => x.cuit);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }
    onClearFilters() {
        ['fecha_desde', 'fecha_hasta',].map((name) => {
            this.filtros[name] = null;
        });
        this.filtros.cuit = [];
    }
    procesarCbu(id) {
        try {
            this.apiService.post(`/cbus/${id}:procesar`, {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        }
        catch (error) {
            this.snackBarService.show(error);
        }
    }
};
__decorate([
    ViewChild('tablaSolicitudes')
], SolicitudesCBUComponent.prototype, "tablaSolicitudes", void 0);
SolicitudesCBUComponent = __decorate([
    Component({
        selector: 'app-solicitudes-cbu',
        templateUrl: './solicitudes-cbu.component.html',
        styleUrls: ['./solicitudes-cbu.component.scss']
    })
], SolicitudesCBUComponent);
export { SolicitudesCBUComponent };
//# sourceMappingURL=solicitudes-cbu.component.js.map