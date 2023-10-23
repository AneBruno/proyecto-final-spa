import { __awaiter, __decorate } from "tslib";
import * as moment from 'moment';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let MercadoPosicionesEditarComponent = class MercadoPosicionesEditarComponent extends FormBaseLocalizacionComponent {
    constructor(router, route, _location, fechaEntregaHelper) {
        super();
        this.router = router;
        this.route = route;
        this._location = _location;
        this.fechaEntregaHelper = fechaEntregaHelper;
        this.title = 'Agregar Posición';
        this.productos = [];
        this.calidades = [];
        this.condiciones_pago = [];
        this.empresas = [];
        this.establecimientos = [];
        this.puertos = [];
        this.cosechas = null;
        this.consulta = false;
        this.desdePanel = false;
        this.entrega_es_forward = false;
        this.minDate = moment().format();
        this.fecha_actual = this.fechaEntregaHelper.getToday();
    }
    ngOnInit() {
        this.createForm();
        this.loadRelatedData();
        this.watchRoute();
    }
    loadRelatedData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.buscarProductos();
            this.buscarEmpresas();
            this.cosechas = yield this.apiService.getAllData('/mercado/cosechas', { ordenes: { descripcion: 'DESC' }, filtros: { habilitado: 1 } }).toPromise();
            this.form.get('a_fijar').setValue(0);
            this.calidades = yield this.apiService.getAllData('/calidades').toPromise();
            this.condiciones_pago = yield this.apiService.getAllData('/mercado/condiciones-pago').toPromise();
            this.fetchPuertos();
        });
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                if (params.accion === "consulta") {
                    this.title = 'Consultar posición';
                    this.consulta = true;
                }
                else {
                    this.title = 'Copiar posición';
                    this.consulta = false;
                }
                this.obtenerYCompletar(this.id, { with_relation: 'cosecha' });
            }
            if (params.agregarPosicion) {
                this.desdePanel = true;
                this.consulta = false;
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            producto_id: new FormControl({ value: '', disabled: false }),
            producto_nombre: new FormControl({ value: '', disabled: false }),
            calidad_id: new FormControl({ value: '', disabled: false }),
            calidad_nombre: new FormControl({ value: '', disabled: false }),
            calidad_observaciones: new FormControl({ value: '', disabled: false }),
            posicion_excepcional: new FormControl({ value: '', disabled: false }),
            a_trabajar: new FormControl({ value: '', disabled: false }),
            volumen_limitado: new FormControl({ value: '', disabled: false }),
            cosecha_id: new FormControl({ value: '', disabled: false }),
            entrega: new FormControl({ value: '', disabled: false }),
            fecha_entrega_inicio: new FormControl({ value: '', disabled: false }),
            fecha_entrega_fin: new FormControl({ value: '', disabled: false }),
            a_fijar: new FormControl({ value: '', disabled: false }),
            moneda: new FormControl({ value: '', disabled: false }),
            precio: new FormControl({ value: '', disabled: false }),
            condicion_pago_id: new FormControl({ value: '', disabled: false }),
            empresa_id: new FormControl({ value: '', disabled: false }),
            empresa_razon_social: new FormControl({ value: '', disabled: false }),
            puerto_id: new FormControl({ value: '', disabled: false }),
            establecimiento_id: new FormControl({ value: '', disabled: false }),
            observaciones: new FormControl({ value: '', disabled: false }),
            placeId: new FormControl({ value: '', disabled: false }),
            opcion_destino: new FormControl({ value: '', disabled: false })
        });
        this.form.get('empresa_id').valueChanges.subscribe((value) => {
            this.empresa_id = value;
            this.loadEstablecimientos(value === null ? undefined : value);
        });
        this.form.get('a_fijar').valueChanges.subscribe((value) => {
            var campo_moneda = this.form.get('moneda');
            var campo_precio = this.form.get('precio');
            campo_moneda.reset();
            campo_precio.reset();
            if (value) {
                campo_moneda.disable();
                campo_precio.disable();
            }
            else {
                campo_moneda.enable();
                campo_precio.enable();
            }
        });
        this.form.get('entrega').valueChanges.subscribe((value) => {
            var campo_fecha_entrega_inicio = this.form.get('fecha_entrega_inicio');
            var campo_fecha_entrega_fin = this.form.get('fecha_entrega_fin');
            if (value == 'DISPONIBLE' || value == 'CONTRACTUAL') {
                const fecha_fin = this.fechaEntregaHelper.addOneMonth(this.fecha_actual);
                campo_fecha_entrega_inicio.setValue(this.fecha_actual);
                campo_fecha_entrega_fin.setValue(fecha_fin);
                campo_fecha_entrega_inicio.disable();
                campo_fecha_entrega_fin.disable();
                this.entrega_es_forward = false;
            }
            if (value == 'LIMIT') {
                campo_fecha_entrega_inicio.setValue(this.fecha_actual);
                campo_fecha_entrega_fin.reset();
                campo_fecha_entrega_inicio.disable();
                campo_fecha_entrega_fin.enable();
                this.entrega_es_forward = false;
            }
            if (value == 'FORWARD') {
                campo_fecha_entrega_inicio.reset();
                campo_fecha_entrega_fin.reset();
                campo_fecha_entrega_inicio.enable();
                campo_fecha_entrega_fin.enable();
                this.entrega_es_forward = true;
            }
        });
        this.form.get('fecha_entrega_inicio').valueChanges.subscribe((value) => {
            if (value != null && this.entrega_es_forward) {
                this.form.get('fecha_entrega_fin').setValue(this.fechaEntregaHelper.addOneMonth(value));
            }
        });
    }
    loadEstablecimientos(empresa_id = undefined) {
        this.apiService.getData(`/clientes/empresas/${this.empresa_id}/establecimientos`, {
            filtros: {
                empresa_id: empresa_id
            }
        }).subscribe((data) => {
            this.establecimientos = data;
        });
    }
    get dataUrl() {
        return '/mercado/posiciones';
    }
    completarCampos(data) {
        super.completarCampos(data);
        var cosechaDeshabilitada = data.cosecha.habilitado ? false : true;
        if (this.consulta && cosechaDeshabilitada) {
            this.cosechas.unshift(data.cosecha);
            this.form.get('cosecha_id').setValue(this.cosechas[0].id);
        }
        if (!this.consulta && cosechaDeshabilitada) {
            this.form.get('cosecha_id').setValue(null);
        }
        else {
            this.form.get('cosecha_id').setValue(data.cosecha.id);
        }
        this.form.patchValue({ 'producto_nombre': data.producto.nombre });
        this.form.patchValue({ 'empresa_razon_social': data.empresa.razon_social });
        this.form.patchValue({ 'calidad_nombre': data.calidad.nombre });
        this.form.patchValue({ 'fecha_entrega_inicio': moment(data.fecha_entrega_inicio).format() });
        this.form.patchValue({ 'fecha_entrega_fin': moment(data.fecha_entrega_fin).format() });
        //Lógica para completar campos de puerto y establecimiento:
        if (data.puerto_id !== null) {
            this.opcion_destino = 'exportacion';
            this.form.patchValue({ 'puerto_id': data.puerto_id });
        }
        else {
            this.opcion_destino = 'consumo';
            this.direccionCompleta = this.obtenerUbicacion(data);
            if (data.establecimiento_id !== null) {
                this.form.patchValue({ 'establecimiento_id': data.establecimiento_id });
            }
        }
        this.form.patchValue({ 'opcion_destino': this.opcion_destino });
    }
    getFormData() {
        let formData = super.getFormData();
        if (formData.fecha_entrega_inicio) {
            formData.fecha_entrega_inicio = moment(formData.fecha_entrega_inicio).format('YYYY-MM-DD');
        }
        if (formData.fecha_entrega_fin) {
            formData.fecha_entrega_fin = moment(formData.fecha_entrega_fin).format('YYYY-MM-DD');
        }
        return formData;
    }
    guardar() {
        return __awaiter(this, void 0, void 0, function* () {
            this.id = null; //Con esto hago que se copie la posicion en vez de sobreescribirla
            this.formatearEstablecimientoPuerto();
            this.actualizarFechasFormulario();
            this.enviarDatos().subscribe((data) => {
                this.messages.show('Datos guardados correctamente').subscribe(() => {
                    this._location.back();
                    //this.router.navigateByUrl(this.desdePanel ? '/app/mercado/panel' : '/app/mercado/posiciones');
                });
            });
        });
    }
    formatearEstablecimientoPuerto() {
        if (this.opcion_destino === 'exportacion') {
            this.form.patchValue({ 'establecimiento_id': null });
        }
        else {
            this.form.patchValue({ 'puerto_id': null });
        }
    }
    actualizarFechasFormulario() {
        const estado = this.form.get('entrega').value;
        if (estado == 'DISPONIBLE' || estado == 'CONTRACTUAL' || estado == 'LIMIT') {
            this.form.get('fecha_entrega_inicio').setValue(this.fecha_actual);
        }
        if (estado == 'DISPONIBLE' || estado == 'CONTRACTUAL') {
            this.form.get('fecha_entrega_fin').setValue(this.fechaEntregaHelper.addOneMonth(this.fecha_actual));
        }
    }
    buscarProductos(busqueda) {
        let filtros = {};
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/productos', {
            limit: 20,
            filtros: filtros,
            ordenes: {
                uso_frecuente: 'DESC',
                nombre: 'ASC'
            }
        }).subscribe(data => {
            this.productos = data;
        });
    }
    buscarEmpresas(busqueda) {
        let filtros = {};
        filtros.perfil = "COMPRADOR";
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/clientes/empresas', {
            filtros: filtros,
            ordenes: {
                razon_social: 'ASC'
            }
        }).subscribe(data => {
            this.empresas = data;
        });
    }
    producto_id_keyup(ev) {
        if (this.producto_id_to) {
            clearTimeout(this.producto_id_to);
        }
        this.producto_id_to = setTimeout(() => {
            this.buscarProductos(ev.target.value);
        }, 400);
    }
    producto_id_selected(ev) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({ producto_id: id });
    }
    autocompletarEstablecimientoUbicacion(direccion) {
        this.direccionCompleta = direccion;
    }
    empresa_id_keyup(ev) {
        if (this.empresa_id_to) {
            clearTimeout(this.empresa_id_to);
        }
        this.empresa_id_to = setTimeout(() => {
            this.buscarEmpresas(ev.target.value);
        }, 400);
    }
    empresa_id_selected(ev) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({ empresa_id: id });
    }
    calidad_id_keyup(ev) {
        if (this.calidad_id_to) {
            clearTimeout(this.calidad_id_to);
        }
        this.calidad_id_to = setTimeout(() => {
            this.buscarCalidades(ev.target.value);
        }, 400);
    }
    calidad_id_selected(ev) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({ calidad_id: id });
    }
    buscarCalidades(busqueda) {
        let filtros = {};
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/calidades', {
            limit: 20,
            filtros: filtros,
            ordenes: {
                nombre: 'ASC'
            }
        }).subscribe(data => {
            this.calidades = data;
        });
    }
    fetchPuertos() {
        let filtros = {};
        if (this.consulta) {
            filtros.estado = 'todos';
        }
        this.apiService.getData('/puertos', {
            limit: 0,
            filtros: filtros
        }).subscribe(data => {
            this.puertos = data;
        });
    }
    setearOpcionDestino(valor) {
        this.opcion_destino = valor;
        this.form.patchValue({ 'opcion_destino': this.opcion_destino });
    }
    obtenerUbicacion(posicion) {
        const localidad = posicion.localidad_destino ? posicion.localidad_destino + ', ' : '';
        const departamento = posicion.departamento_destino ? posicion.departamento_destino + ', ' : '';
        const provincia = posicion.provincia_destino ? posicion.provincia_destino : '';
        return localidad + departamento + provincia;
    }
};
MercadoPosicionesEditarComponent = __decorate([
    Component({
        selector: 'app-mercado-posiciones-editar',
        templateUrl: './mercado-posiciones-editar.component.html',
        styleUrls: ['./mercado-posiciones-editar.component.scss']
    })
], MercadoPosicionesEditarComponent);
export { MercadoPosicionesEditarComponent };
//# sourceMappingURL=mercado-posiciones-editar.component.js.map