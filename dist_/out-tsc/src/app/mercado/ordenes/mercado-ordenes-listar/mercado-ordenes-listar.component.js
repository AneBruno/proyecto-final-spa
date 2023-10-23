import { __awaiter, __decorate } from "tslib";
import * as moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
let MercadoOrdenesListarComponent = class MercadoOrdenesListarComponent extends ListadoComponent {
    constructor(dataSource, authService, userService, breakPointObserver, apiService, confirm, fechaEntregaHelper, empresaHelper) {
        super();
        this.dataSource = dataSource;
        this.authService = authService;
        this.userService = userService;
        this.breakPointObserver = breakPointObserver;
        this.apiService = apiService;
        this.confirm = confirm;
        this.fechaEntregaHelper = fechaEntregaHelper;
        this.empresaHelper = empresaHelper;
        this.calidades = [];
        this.comerciales = [];
        this.puertos = [];
        this.productos = [];
        this.fechaActual = new Date();
        this.anioActual = this.fechaActual.getFullYear();
        this.mesActual = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
        this.ESTADO_RETIRADA = 4;
        this.ESTADO_ELIMINADA = 5;
        this.filtroProductosOpciones = {
            ordenes: {
                uso_frecuente: 'desc',
                nombre: 'asc',
            }
        };
        this.filtroComercialesOpciones = {
            ordenes: {
                id_matches: this.userService.getUser().id,
                rol: [2, 3, 4, 6, 1, 5],
                nombre_completo: 'asc'
            }
        };
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            registerLocaleData(es);
            this.dataSource.autoStart = false;
            this.currentUser = this.userService.getUser();
            this.comerciales = yield this.apiService.getData('/usuarios', { ordenes: { descripcion: 'DESC' } }).toPromise();
            yield this.loadRelatedData();
            if (this.currentUser.rol.id == 4) {
                this.dataSource.fixedFilters = {
                    usuario_carga_id: this.currentUser.id
                };
            }
            this.estados = yield this.apiService.getData('/mercado/ordenes/estados').toPromise();
            this.dataSource.uri = '/mercado/ordenes';
            this.dataSource.queryParams = {
                with_relation: 'puerto,producto,empresa',
                ordenes: {
                    "id": "DESC"
                }
            };
            this.breakPointObserver.observe([
                '(max-width: 768px)'
            ]).subscribe(result => {
                this.clearColumns();
                this.addColumn('created_at', 'Fecha', '120px').renderFn(row => this.formatearFecha(row.created_at));
                this.addColumn('vendedor', 'Vendedor', '120px').renderFn(row => this.empresaHelper.obtenerNombreEmpresa(row.empresa)).setAsCustom();
                this.addColumn('producto', 'Producto', '').renderFn(row => row.producto.nombre);
                this.addColumn('entrega', 'Entrega', '200px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
                this.addColumn('destino', 'Destino', '150px').renderFn(row => this.calculaDestino(row));
                this.addColumn('volumen', 'Volumen', '50px').renderFn(row => row.volumen).setAsNumber().setAlign('right');
                this.addColumn('precio_moneda', 'Precio', '100px').renderFn(row => `${row.precio} ${row.moneda}`).setAlign('right');
                this.addColumn('estado', 'Estado', '150px').renderFn(row => (this.estados.find(estado => estado.id == row.estado_id)).nombre);
                this.addColumn('_acciones', 'Acciones', '30px').setAsMenu().setAlign('right');
                if (result.matches) {
                    this.getColumn('producto').setWidth('200px');
                    this.getColumn('entrega').setWidth('200px');
                    this.getColumn('destino').setWidth('200px');
                    this.getColumn('estado').setWidth('200px');
                }
            });
            this.actualizarDatos();
        });
    }
    loadRelatedData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.puertos = yield this.apiService.getData('/puertos', {
                'filtros[estado]': 'todos',
                'limit': 0,
            }).toPromise();
            this.productos = yield this.apiService.getData('/productos', {
                'ordenes[uso_frecuente]': 'desc',
                'ordenes[nombre]': 'asc',
                'limit': 0,
            }).toPromise();
            this.calidades = yield this.apiService.getData('/calidades', {
                ordenes: { descripcion: 'DESC' },
                'limit': 0,
            }).toPromise();
        });
    }
    calculaDestino(row) {
        var _a;
        if (row.puerto) {
            return (_a = row.puerto) === null || _a === void 0 ? void 0 : _a.nombre;
        }
        else {
            return row.localidad_destino;
        }
    }
    calculaEntrega(fechaIni, fechaFin) {
        var mesIni = Number(fechaIni.substring(5, 7)) - 1;
        var mesFin = Number(fechaFin.substring(5, 7)) - 1;
        var anioIni = Number(fechaIni.substring(0, 4));
        var anioFin = Number(fechaFin.substring(0, 4));
        var meses = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE"
        ];
        if (mesIni === mesFin && anioIni == anioFin) {
            var entrega = mesIni === this.mesActual ? "Disponible" : meses[mesIni];
            return entrega;
        }
        else {
            return (meses[mesIni] + ' - ' + meses[mesFin]);
        }
    }
    formatearFecha(fecha) {
        return moment(fecha).format('DD-MM-YYYY');
    }
    filtroProductosIconoFn(row) {
        return row.uso_frecuente ? 'star_outlined' : '';
    }
    actualizarDatos() {
        this.configurarFiltros();
        this.dataSource.refreshData();
    }
    configurarFiltros() {
        if (this.fechaDesde) {
            this.dataSource.filtros.fechaDesde = moment(this.fechaDesde).format('YYYY-MM-DD');
        }
        if (this.fechaHasta) {
            this.dataSource.filtros.fechaHasta = moment(this.fechaHasta).format('YYYY-MM-DD');
        }
    }
    onClearFilters() {
        this.fechaDesde = null;
        this.fechaHasta = null;
        this.filtroProductos = null;
        this.filtroPuertos = null;
        this.filtroCalidad = null;
        this.filtroComercial = null;
    }
    estadoPosicion(id, estado) {
        var mensaje;
        if (estado == this.ESTADO_RETIRADA) {
            mensaje = 'Desea retirar la orden?';
        }
        else if (estado == this.ESTADO_ELIMINADA) {
            mensaje = 'Desea eliminar la orden?';
        }
        this.confirm.ask(mensaje).subscribe(() => {
            this.apiService.patch('/mercado/ordenes/' + id + '/estado', { 'estado_id': estado }).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    isRepresentante() {
        return this.currentUser.rol.id === 4;
    }
    getPuertoParams() {
        return {
            'filtros[estado]': 'todos'
        };
    }
    selecetionChangeMultiple(event, filterName) {
        let filtro = event.source.value;
        if (filtro.length === 0 || filtro.includes('')) {
            delete this.dataSource.filtros[filterName];
            this.dataSource.refreshData();
            return;
        }
        this.dataSource.filtros[filterName] = filtro;
        this.dataSource.refreshData();
    }
};
__decorate([
    ViewChild('filtroFechaDesde', {
        read: MatInput
    })
], MercadoOrdenesListarComponent.prototype, "filtroFechaDesde", void 0);
__decorate([
    ViewChild('filtroFechaHasta', {
        read: MatInput
    })
], MercadoOrdenesListarComponent.prototype, "filtroFechaHasta", void 0);
MercadoOrdenesListarComponent = __decorate([
    Component({
        selector: 'app-mercado-ordenes-listar',
        templateUrl: './mercado-ordenes-listar.component.html',
        styleUrls: ['./mercado-ordenes-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], MercadoOrdenesListarComponent);
export { MercadoOrdenesListarComponent };
//# sourceMappingURL=mercado-ordenes-listar.component.js.map