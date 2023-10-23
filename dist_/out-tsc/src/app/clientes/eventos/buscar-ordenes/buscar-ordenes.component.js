import { __awaiter, __decorate, __param } from "tslib";
import * as moment from 'moment';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { OrdenHelper } from 'src/app/mercado/orden.helper';
let BuscarOrdenesComponent = class BuscarOrdenesComponent extends ListadoComponent {
    constructor(data, dialogRef, dataSource, apiService) {
        super();
        this.data = data;
        this.dialogRef = dialogRef;
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.choosen = new EventEmitter();
        this.estados = [];
        this.puedeAgregar = false;
        this.filtroProductosOpciones = {
            ordenes: {
                uso_frecuente: 'desc',
                nombre: 'asc',
            }
        };
        this.dataSource.afterFetch.subscribe(() => {
            this.checkPuedeAgregar();
        });
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataSource.uri = '/mercado/ordenes';
            this.dataSource.fixedFilters.empresa_id = this.data.empresasId;
            this.dataSource.fixedFilters.id_not_in = this.data.excluirOrdenesId;
            this.dataSource.queryParams = {
                with_relation: 'producto,empresa',
                ordenes: {
                    "id": "DESC"
                }
            };
            this.estados = yield this.apiService.getData('/mercado/ordenes/estados').toPromise();
            this.tabla.addColumn('orden', '', '').renderFn((row) => {
                return (new OrdenHelper).obtenerAbreviacion(row);
            });
            this.tabla.addColumn('acciones', '', '30px').setAsCheckBox().onClick((row, checked) => {
                this.choosen.emit(row);
            });
        });
    }
    onClickCerrar() {
        this.dialogRef.close();
    }
    onClearFilters() {
        this.fechaDesde = null;
        this.fechaHasta = null;
    }
    configurarFiltros() {
        if (this.fechaDesde) {
            this.dataSource.filtros.fechaDesde = moment(this.fechaDesde).format('YYYY-MM-DD');
        }
        if (this.fechaHasta) {
            this.dataSource.filtros.fechaHasta = moment(this.fechaHasta).format('YYYY-MM-DD');
        }
    }
    actualizarDatos() {
        return __awaiter(this, void 0, void 0, function* () {
            this.configurarFiltros();
            yield this.dataSource.refreshData();
        });
    }
    filtroProductosIconoFn(row) {
        return row.uso_frecuente ? 'star_outlined' : '';
    }
    onRowCheckChange(event) {
        event.row['__checked'] = event.checked;
        this.checkPuedeAgregar();
    }
    checkPuedeAgregar() {
        this.puedeAgregar = this.getOrdenesSeleccionadas().length > 0;
    }
    getOrdenesSeleccionadas() {
        return this.dataSource.currentData.filter((row) => {
            return row['__checked'] === true;
        });
    }
    onClickAgregarSeleccionadas() {
        this.choosen.emit(this.getOrdenesSeleccionadas());
    }
};
__decorate([
    ViewChild('tablaOrdenes')
], BuscarOrdenesComponent.prototype, "tabla", void 0);
__decorate([
    Output()
], BuscarOrdenesComponent.prototype, "choosen", void 0);
BuscarOrdenesComponent = __decorate([
    Component({
        selector: 'app-buscar-ordenes',
        templateUrl: './buscar-ordenes.component.html',
        styleUrls: ['./buscar-ordenes.component.scss']
    }),
    __param(0, Inject(MAT_DIALOG_DATA))
], BuscarOrdenesComponent);
export { BuscarOrdenesComponent };
//# sourceMappingURL=buscar-ordenes.component.js.map