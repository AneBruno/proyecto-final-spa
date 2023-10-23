import { __awaiter, __decorate } from "tslib";
import * as moment from 'moment';
import { Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let MercadoPosicionesListarComponent = class MercadoPosicionesListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, authService, confirm, user, fechaEntregaHelper) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.authService = authService;
        this.confirm = confirm;
        this.user = user;
        this.fechaEntregaHelper = fechaEntregaHelper;
        this.filtros = {};
        this.formasPago = [];
        this.calidades = [];
        this.puertos = [];
        this.productos = [];
        this.fechaActual = new Date();
        this.fechaDesde = new Date();
        this.anioActual = this.fechaActual.getFullYear();
        this.mesActual = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
        this.filtroProductosOpciones = {
            ordenes: {
                uso_frecuente: 'desc',
                nombre: 'asc',
            }
        };
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataSource.uri = '/mercado/posiciones';
            this.dataSource.queryParams = {
                with_relation: 'empresa',
            };
            this.filtros.empresa_id = [];
            this.rol_id_usuario = (yield this.user.fetchUserAsync()).rol.id;
            this.id_usuario = (yield this.user.fetchUserAsync()).id;
            yield this.loadRelatedData();
            this.formasPago = yield this.apiService.getAllData('/mercado/condiciones-pago', { ordenes: { descripcion: 'DESC' } }).toPromise();
            this.addColumn('tipo', '', '100px').setAsFigure();
            this.addColumn('comprador', 'Comprador', '120px').renderFn(row => this.obtenerComprador(row.empresa)).setAsCustom();
            this.addColumn('producto', 'Producto', '').renderFn(row => row.producto.nombre);
            this.addColumn('destino', 'Destino', '150px').renderFn(row => this.calculaDestino(row));
            this.addColumn('entrega', 'Entrega', '150px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
            this.addColumn('calidad', 'Calidad', '200px').renderFn(row => row.calidad.nombre);
            this.addColumn('moneda_precio', 'Precio', '100px').renderFn(row => row.precio ? `${row.moneda} ${row.precio}` : "A fijar").setAlign('right');
            this.addColumn('_acciones', 'Acciones', '80px').setAsMenu().setAlign('right');
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
    posicionExcepcional(row) {
        return row.posicion_excepcional;
    }
    volumenLimitado(row) {
        return row.volumen_limitado;
    }
    aTrabajar(row) {
        return row.a_trabajar;
    }
    calculaDestino(row) {
        var _a, _b;
        if (row.puerto) {
            return (_a = row.puerto) === null || _a === void 0 ? void 0 : _a.nombre;
        }
        else if (row.establecimiento) {
            return (_b = row.establecimiento) === null || _b === void 0 ? void 0 : _b.nombre;
        }
        else {
            return row.localidad_destino;
        }
    }
    filtroProductosIconoFn(row) {
        return row.uso_frecuente ? 'star_outlined' : '';
    }
    formatearFecha(fecha) {
        return moment(fecha).format('DD-MM-YYYY');
    }
    actualizarDatos() {
        this.configurarFiltros();
        this.dataSource.refreshData();
    }
    configurarFiltros() {
        if (this.fechaDesde) {
            this.dataSource.filtros.fecha_desde = moment(this.fechaDesde).format('YYYY-MM-DD');
        }
        if (this.fechaHasta) {
            this.dataSource.filtros.fecha_hasta = moment(this.fechaHasta).format('YYYY-MM-DD');
        }
    }
    onClearFilters() {
        this.fechaDesde = null;
        this.fechaHasta = null;
        this.filtroProductos = null;
        this.filtroPuertos = null;
        this.filtroCalidad = null;
        this.filtroEstado = null;
        this.filtroTipoPosicion = null;
        this.filtros.empresa_id = [];
        this.filtroEntrega = null;
        this.filtroFormaPago = null;
    }
    estadoPosicion(id, estado) {
        var mensaje;
        if (estado == "DENUNCIADA") {
            mensaje = 'Desea denunciar la posición?';
        }
        else if (estado == "ACTIVA") {
            mensaje = 'Desea retirar la denuncia?';
        }
        else if (estado == "RETIRADA") {
            mensaje = 'Desea retirar la posición?';
        }
        else {
            mensaje = 'Desea eliminar la posición?';
        }
        this.confirm.ask(mensaje).subscribe(() => {
            this.apiService.patch('/mercado/posiciones/' + id + '/estado', { 'estado': estado }).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    obtenerComprador(empresa) {
        let abreviacion = empresa.abreviacion;
        return abreviacion ? abreviacion : empresa.razon_social;
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
    refreshList() {
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item) => item.id);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }
};
__decorate([
    ViewChild('filtroFechaDesde', {
        read: MatInput
    })
], MercadoPosicionesListarComponent.prototype, "filtroFechaDesde", void 0);
__decorate([
    ViewChild('filtroFechaHasta', {
        read: MatInput
    })
], MercadoPosicionesListarComponent.prototype, "filtroFechaHasta", void 0);
MercadoPosicionesListarComponent = __decorate([
    Component({
        selector: 'app-mercado-posiciones-listar',
        templateUrl: './mercado-posiciones-listar.component.html',
        styleUrls: ['./mercado-posiciones-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], MercadoPosicionesListarComponent);
export { MercadoPosicionesListarComponent };
//# sourceMappingURL=mercado-posiciones-listar.component.js.map