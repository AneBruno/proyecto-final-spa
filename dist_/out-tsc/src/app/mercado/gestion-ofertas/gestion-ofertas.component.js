import { __awaiter, __decorate } from "tslib";
import * as moment from 'moment';
import es from '@angular/common/locales/es';
import { Component } from '@angular/core';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { registerLocaleData } from '@angular/common';
let GestionOfertasComponent = class GestionOfertasComponent extends ListadoComponent {
    constructor(dataSource, apiService, route, breakPointObserver, fechaEntregaHelper) {
        super();
        this.dataSource = dataSource;
        this.apiService = apiService;
        this.route = route;
        this.breakPointObserver = breakPointObserver;
        this.fechaEntregaHelper = fechaEntregaHelper;
        this.posicion = null;
        this.condicionesPago = [];
        this.localidades = [];
        this.consumoInterno = false;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            registerLocaleData(es);
            this.dataSource.autoStart = false;
            yield this.loadRelatedData();
            this.dataSource.uri = '/mercado/ordenes';
            this.dataSource.queryParams = {
                with_relation: 'puerto,producto,empresa,estado,establecimiento'
            };
            this.dataSource.fixedFilters.estados = [1, 2, 3];
            window['dataSource'] = this.dataSource;
            this.dataSource.ordenes = {
                estado_id: 'asc',
                precio: 'asc'
            };
            this.breakPointObserver.observe([
                '(max-width: 768px)'
            ]).subscribe(result => {
                this.clearColumns();
                this.addColumn('vendedor', 'Vendedor', '').renderFn(row => row.empresa.razon_social);
                this.addColumn('tonelada', 'Tonelada', '100px').renderFn(row => row.volumen).setAsNumber();
                this.addColumn('moneda', 'Moneda', '100px').renderFn(row => row.moneda);
                this.addColumn('precio', 'Precio', '100px').renderFn(row => row.precio).setAsNumber();
                this.addColumn('entrega', 'Entrega', '150px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
                this.addColumn('destino', 'Destino', '150px').renderFn(row => this.calculaDestinoOfertas(row));
                this.addColumn('estado', 'Estado', '120px').renderFn(row => row.estado.nombre);
                this.addColumn('_acciones', 'Acciones', '30px').setAsMenu().setAlign('right');
                if (result.matches) {
                    this.getColumn('vendedor').setWidth('400px');
                    this.getColumn('entrega').setWidth('200px');
                    this.getColumn('estado').setWidth('200px');
                    this.getColumn('destino').setWidth('200px');
                }
            });
            this.dataSource.refreshData();
        });
    }
    obtenerClavePosicion() {
        return new Promise((resolve) => {
            this.route.params.subscribe((params) => __awaiter(this, void 0, void 0, function* () {
                if (params.clave) {
                    resolve(params.clave);
                }
            }));
        });
    }
    loadRelatedData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.puertos = yield this.apiService.getData('/puertos', {
                'filtros[estado]': 'todos',
                'limit': 0,
            }).toPromise();
            this.localidades = yield this.apiService.getData('/mercado/ordenes/localidades', {
                'limit': 0,
            }).toPromise();
            this.condicionesPago = yield this.apiService.getData('/mercado/condiciones-pago').toPromise();
            let clave = yield this.obtenerClavePosicion();
            let posicion = yield this.apiService.getData(`/mercado/panel/${clave}`).toPromise();
            this.completarPosicion(posicion);
            this.completarFiltrosPorDefecto(posicion);
        });
    }
    completarPosicion(posicion) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.posicion = {
                producto: posicion.producto,
                calidad: posicion.calidad.nombre,
                precio_moneda: posicion.precio ? posicion.precio + ' ' + posicion.moneda : 'A fijar',
                precio: posicion.precio,
                destino: this.calcularDestinoPosicion(posicion),
                entrega: posicion.entrega,
                moneda: posicion.moneda,
                fecha_entrega_inicio: moment(posicion.fecha_entrega_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                fecha_entrega_fin: moment(posicion.fecha_entrega_fin, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                forma_pago: posicion.condicion_pago.descripcion,
                cosecha: posicion.cosecha,
                puerto: posicion.puerto,
            };
            // Agregar localidad de la posición si no se encuentra previamente.
            let localidadIndex = this.localidades.findIndex(localidad => localidad.localidad_destino == posicion.localidad_destino);
            if (localidadIndex === -1) {
                this.localidades.push({ localidad_destino: posicion.localidad_destino });
            }
            this.listaEmpresas = this.empresasToString(posicion.empresas);
            this.posicionesAgrupadas = posicion.posiciones;
            this.idBase = posicion.posiciones[0].id;
            if (((_a = posicion === null || posicion === void 0 ? void 0 : posicion.puerto) === null || _a === void 0 ? void 0 : _a.id) === "") {
                this.consumoInterno = true;
            }
        });
    }
    completarFiltrosPorDefecto(posicion) {
        var _a;
        this.dataSource.fixedFilters = {};
        if (!posicion.puerto.id) {
            this.dataSource.fixedFilters.puerto_id = 'null';
        }
        this.dataSource.fixedFilters.producto_id = this.posicion.producto.id;
        this.dataSource.fixedFilters.fecha = moment().format('YYYY-MM-DD');
        this.dataSource.setDefaultFilters({
            puerto_id: !this.consumoInterno ? [(_a = posicion.puerto) === null || _a === void 0 ? void 0 : _a.id] : undefined,
            localidad_destino: this.consumoInterno ? [posicion.localidad_destino] : undefined,
            condicion_pago_id: [posicion.condicion_pago.id],
            entrega: [posicion.entrega],
            fechaEntregaInicioDesde: moment(this.posicion.fecha_entrega_inicio, 'DD/MM/YYYY').add(-30, 'day').format('YYYY-MM-DD'),
            fechaEntregaFinHasta: moment(this.posicion.fecha_entrega_fin, 'DD/MM/YYYY').add(30, 'day').format('YYYY-MM-DD'),
            precioDesde: 0,
            moneda: this.posicion.moneda,
        });
    }
    calculaDestinoOfertas(row) {
        var _a;
        if (row.puerto) {
            return (_a = row.puerto) === null || _a === void 0 ? void 0 : _a.nombre;
        }
        else {
            return row.localidad_destino;
        }
    }
    calcularDestinoPosicion(posicion) {
        if (posicion.puerto.id) {
            return posicion.puerto.nombre;
        }
        else if (posicion.establecimiento.id) {
            return posicion.establecimiento.nombre;
        }
        else {
            return posicion.localidad_destino;
        }
    }
    empresasToString(listaEmpresas) {
        if (listaEmpresas != null) {
            return listaEmpresas.map(x => {
                return x.razon_social;
            }).filter((x, i, a) => a.indexOf(x) == i);
        }
        return null;
    }
    // Se usa este método para evitar que se mande el timeZone en el filtro
    // No quitar
    actualizarConFechaFormateada(campo, date) {
        this.dataSource.filtros[campo] = moment(date).format('YYYY-MM-DD');
        this.dataSource.refreshData();
    }
    empresaTooltip(razonSocial) {
        var _a, _b;
        const posicionFiltrada = this.getPosicionByRazonSocialAndPrecio(razonSocial);
        return `
            Precio: ${posicionFiltrada.precio} ${this.posicion.moneda}
            Posición excepcional: ${posicionFiltrada.posicion_excepcional ? 'Si' : 'No'}
            Posición trabajar: ${posicionFiltrada.a_trabajar ? 'Si' : 'No'}
            Volumen limitado: ${posicionFiltrada.volumen_limitado ? 'Si' : 'No'}
            Observación de calidad: ${(_a = posicionFiltrada.calidad_observaciones) !== null && _a !== void 0 ? _a : '-'}
            Observaciones: ${(_b = posicionFiltrada.observaciones) !== null && _b !== void 0 ? _b : '-'}
            Comercial: ${posicionFiltrada.usuario_carga.nombre} ${posicionFiltrada.usuario_carga.apellido}
        `;
    }
    getPosicionByRazonSocialAndPrecio(razonSocial) {
        return this.posicionesAgrupadas.reduce((previousPosicion, currentPosicion) => {
            if (previousPosicion.empresa.razon_social !== razonSocial) {
                return currentPosicion;
            }
            if (currentPosicion.empresa.razon_social !== razonSocial) {
                return previousPosicion;
            }
            return previousPosicion.precio > currentPosicion.precio ? previousPosicion : currentPosicion;
        });
    }
};
GestionOfertasComponent = __decorate([
    Component({
        selector: 'app-gestion-ofertas',
        templateUrl: './gestion-ofertas.component.html',
        styleUrls: ['./gestion-ofertas.component.scss']
    })
], GestionOfertasComponent);
export { GestionOfertasComponent };
//# sourceMappingURL=gestion-ofertas.component.js.map