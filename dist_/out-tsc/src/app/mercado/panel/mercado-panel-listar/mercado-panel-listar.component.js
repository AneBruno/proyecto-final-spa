import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { RetirarEliminarPosicionComponent } from '../carteles/retirar-eliminar-posicion/retirar-posicion.component';
let MercadoPanelListarComponent = class MercadoPanelListarComponent extends ListadoComponent {
    constructor(dataSource, apiService, authService, fechaEntregaHelper, userService, confirm, dialog) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.authService = authService;
        this.fechaEntregaHelper = fechaEntregaHelper;
        this.userService = userService;
        this.confirm = confirm;
        this.dialog = dialog;
        this.filtros = {};
        this.calidades = [];
        this.cosechas = [];
        this.formasPago = [];
        this.puertos = [];
        this.productos = [];
        this.filtroProductosOpciones = {
            ordenes: {
                uso_frecuente: 'desc',
                nombre: 'asc',
            }
        };
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dataSource.uri = '/mercado/panel';
            this.filtros.empresa_id = [];
            this.currentUser = this.userService.getUser();
            yield this.loadRelatedData();
            this.formasPago = yield this.apiService.getAllData('/mercado/condiciones-pago', { ordenes: { descripcion: 'DESC' } }).toPromise();
            console.log('formaspago', this.formasPago);
            this.cosechas = yield this.apiService.getAllData('/mercado/cosechas', { ordenes: { descripcion: 'DESC' } }).toPromise();
            this.setTable();
            this.actualizarPeriodicamente();
        });
    }
    setTable() {
        this.clearColumns();
        this.addColumn('tipo', '', '100px').setAsFigure();
        this.addColumn('comprador', 'Comprador', '').setAsCustom();
        this.addColumn('producto', 'Producto', '200px').renderFn(row => row.producto.nombre);
        this.addColumn('destino', 'Destino', '150px').renderFn(row => this.calculaDestino(row));
        this.addColumn('entrega', 'Entrega', '100px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
        this.addColumn('calidad', 'Calidad', '100px').renderFn(row => row.calidad.nombre);
        this.addColumn('cosecha_nueva', 'Cosecha', '50px').renderFn(row => this.DescripcionCosecha(row));
        this.addColumn('forma_pago', 'Forma de Pago', '120px').renderFn(row => row.condicion_pago.descripcion);
        this.addColumn('precio_moneda', 'Compra', '80px').renderFn(row => row.precio ? `${row.moneda} ${row.precio}` : "A fijar").setAlign('right');
        this.addColumn('ofertas', 'Venta', '80px').renderFn(row => row.ofertas == 0 ? 0 : `${row.moneda} ${row.ofertas}`).setAlign('right');
        this.addColumn('toneladas', 'Toneladas', '100px').renderFn(row => row.toneladas.toString()).setAlign('right');
        this.addColumn('_acciones', 'Acciones', '80px').setAsMenu().setAlign('right');
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
    concatenaCompradores(listaEmpresas) {
        var resultado = listaEmpresas.map((empresa) => {
            let razon_social = empresa.razon_social.length > 14 ? empresa.razon_social.substr(0, 14) + '...' : empresa.razon_social;
            return empresa.abreviacion ? empresa.abreviacion : razon_social;
        }).filter((empresa, i, a) => a.indexOf(empresa) == i);
        return resultado.join('\n');
    }
    obtenerNombreComprador(empresa) {
        return empresa.abreviacion ? empresa.abreviacion : empresa.razon_social;
    }
    DescripcionCosecha(row) {
        for (const cosecha of this.cosechas) {
            if (cosecha.id == row.cosecha_id) {
                return cosecha.descripcion;
            }
        }
    }
    actualizarPeriodicamente() {
        return __awaiter(this, void 0, void 0, function* () {
            this.interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield this.dataSource.refreshData();
            }), 10 * 1000);
        });
    }
    calculaDestino(row) {
        var _a, _b;
        if (row.puerto.id) {
            return (_a = row.puerto) === null || _a === void 0 ? void 0 : _a.nombre;
        }
        else if (row.establecimiento.id) {
            return (_b = row.establecimiento) === null || _b === void 0 ? void 0 : _b.nombre;
        }
        else {
            return row.localidad_destino;
        }
    }
    calcularTipo(row) {
        if (row.puerto.id) {
            return 'Exportación';
        }
        else {
            return 'Consumo interno';
        }
    }
    filtroProductosIconoFn(row) {
        return row.uso_frecuente ? 'star_outlined' : '';
    }
    getEstadoPosicion(row) {
        if (row.posiciones.some(posicion => posicion.estado === 'DENUNCIADA')) {
            return 'denunciada';
        }
        if (row.establecimiento.id) {
            return 'importacion';
        }
        if (row.puerto.id) {
            return 'exportacion';
        }
    }
    obtenerNombreEmpresas(grupo) {
        grupo.empresas.length > 1 ? this.concatenaCompradores(grupo.empresas) : [this.obtenerNombreComprador(grupo.empresas[0])];
    }
    getPuertoParams() {
        return {
            'filtros[estado]': 'todos'
        };
    }
    denunciarPosiciones(posiciones) {
        this.confirm.ask('Desea denunciar todas las posiciones?').subscribe(() => {
            posiciones.forEach(posicion => {
                if (posicion.estado !== 'DENUNCIADA') {
                    this.apiService.patch('/mercado/posiciones/' + posicion.id + '/estado', { 'estado': 'DENUNCIADA' }).subscribe(() => {
                        this.dataSource.refreshData();
                    });
                }
            });
        });
    }
    retirarPosicion(posiciones, moneda) {
        const dialogRef = this.dialog.open(RetirarEliminarPosicionComponent, {
            width: '400px',
            data: { posiciones: posiciones, monedaPosicion: moneda, accion: 'Retirar' }
        });
        dialogRef.componentInstance.posicionElegida.subscribe((idPosicionElegida) => {
            this.apiService.patch('/mercado/posiciones/' + idPosicionElegida + '/estado', { 'estado': 'RETIRADA' }).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    eliminarPosicion(posiciones, moneda) {
        const dialogRef = this.dialog.open(RetirarEliminarPosicionComponent, {
            width: '400px',
            data: { posiciones: posiciones, monedaPosicion: moneda, accion: 'Eliminar' }
        });
        dialogRef.componentInstance.posicionElegida.subscribe((idPosicionElegida) => {
            this.apiService.patch('/mercado/posiciones/' + idPosicionElegida + '/estado', { 'estado': 'ELIMINADA' }).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
    puedeDenunciarPosicion(grupo) {
        return grupo.posiciones.filter(posicion => posicion.estado === "DENUNCIADA").length < grupo.posiciones.length;
    }
    posicionExcepcional(grupo) {
        return grupo.posiciones.filter(posicion => posicion.posicion_excepcional === 1).length > 0;
    }
    volumenLimitado(grupo) {
        return grupo.posiciones.filter(posicion => posicion.volumen_limitado === 1).length > 0;
    }
    aTrabajar(grupo) {
        return grupo.posiciones.filter(posicion => posicion.a_trabajar === 1).length > 0;
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
    onClearFilters() {
        this.filtroTipoPosicion = null;
        this.filtroProductos = null;
        this.filtroPuertos = null;
        this.filtroCalidad = null;
        this.filtroCosecha = null;
        this.filtroFormaPago = null;
        this.filtroEntrega = null;
        this.filtros.empresa_id = [];
    }
    refreshList() {
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item) => item.id);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }
    ngOnDestroy() {
        clearInterval(this.interval);
    }
};
MercadoPanelListarComponent = __decorate([
    Component({
        selector: 'app-mercado-panel-listar',
        templateUrl: './mercado-panel-listar.component.html',
        styleUrls: ['./mercado-panel-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], MercadoPanelListarComponent);
export { MercadoPanelListarComponent };
//# sourceMappingURL=mercado-panel-listar.component.js.map