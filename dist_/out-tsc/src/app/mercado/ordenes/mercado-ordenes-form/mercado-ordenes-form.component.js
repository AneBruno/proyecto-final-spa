import { __awaiter, __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { FormBaseLocalizacionComponent } from "src/app/shared/form-base-localizacion.component";
let MercadoOrdenesFormComponent = class MercadoOrdenesFormComponent extends FormBaseLocalizacionComponent {
    constructor(router, route, fechaEntregaHelper) {
        super();
        this.router = router;
        this.route = route;
        this.fechaEntregaHelper = fechaEntregaHelper;
        this.mostrarBotones = true;
        this.datosGuardados = new EventEmitter();
        this.formChange = new EventEmitter();
        this.productos = [];
        this.calidades = [];
        this.condiciones_pago = [];
        this.empresas = [];
        this.puertos = [];
        this.consulta = false;
        this.establecimientos = [];
        this.mostrar_establecimientos = false;
        this.campoVendedorModificado = false;
        this.minDate = moment().format();
        this.entrega_es_forward = false;
        this.fecha_actual = this.fechaEntregaHelper.getToday();
        this.placeIdProcedencia = '';
        this.placeIdDestino = '';
        this.mostrarCampoEstablecimientos = false;
    }
    ngOnInit() {
        this.watchInputs();
        this.createForm();
        this.loadRelatedData();
    }
    loadRelatedData() {
        this.buscarProductos();
        this.buscarCalidades();
        this.buscarEmpresas();
        this.apiService.getData('/mercado/condiciones-pago').subscribe(data => {
            this.condiciones_pago = data;
        });
        this.fetchPuertos();
        if (this.consulta) {
            this.form.disable();
        }
    }
    watchInputs() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accion === 'consulta') {
                this.consulta = true;
                this.loadData();
            }
            else if (this.accion === 'copiar') {
                this.loadData();
            }
            else if (this.accion === 'agregar' && this.id) {
                this.posicion = yield this.apiService.getData(`/mercado/posiciones/${this.id}`).toPromise();
                this.completarFormConPosicion();
            }
        });
    }
    loadData() {
        if (this.id) {
            this.obtenerYCompletar(this.id, { with_relation: 'estado,empresa,calidad,producto,usuarioCarga' });
        }
    }
    completarFormConPosicion() {
        this.form.get('producto_id').setValue(this.posicion.producto_id);
        this.form.get('producto_nombre').setValue(this.posicion.producto.nombre);
        this.form.get('puerto_id').setValue(this.posicion.puerto_id);
        this.form.get('calidad_id').setValue(this.posicion.calidad_id);
        this.form.get('calidad_nombre').setValue(this.posicion.calidad.nombre);
        this.form.get('moneda').setValue(this.posicion.moneda);
        this.form.get('precio').setValue(this.posicion.precio);
        this.form.get('condicion_pago_id').setValue(this.posicion.condicion_pago_id);
        this.form.get('entrega').setValue(this.posicion.entrega);
        this.form.get('fecha_entrega_inicio').setValue(moment(this.posicion.fecha_entrega_inicio).toISOString());
        this.form.get('fecha_entrega_fin').setValue(moment(this.posicion.fecha_entrega_fin).toISOString());
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            producto_id: new FormControl({ value: '', disabled: false }),
            producto_nombre: new FormControl({ value: '', disabled: false }),
            empresa_id: new FormControl({ value: '', disabled: false }),
            establecimiento_id: new FormControl({ value: '', disabled: false }),
            puerto_id: new FormControl({ value: '', disabled: false }),
            calidad_id: new FormControl({ value: '', disabled: false }),
            calidad_nombre: new FormControl({ value: '', disabled: false }),
            volumen: new FormControl({ value: '', disabled: false }),
            moneda: new FormControl({ value: '', disabled: false }),
            precio: new FormControl({ value: '', disabled: false }),
            fecha_entrega_inicio: new FormControl({ value: '', disabled: false }),
            fecha_entrega_fin: new FormControl({ value: '', disabled: false }),
            condicion_pago_id: new FormControl({ value: '', disabled: false }),
            estado_id: new FormControl({ value: '', disabled: false }),
            comercial: new FormControl({ value: '', disabled: false }),
            observaciones: new FormControl({ value: '', disabled: false }),
            empresa_razon_social: new FormControl({ value: '', disabled: false }),
            entrega: new FormControl({ value: '', disabled: false }),
            placeIdProcedencia: new FormControl({ value: '', disabled: false }),
            direccionCompletaProcedencia: new FormControl({ value: '', disabled: false }),
            placeIdDestino: new FormControl({ value: '', disabled: false }),
            opcion_destino: new FormControl({ value: '', disabled: false }),
            direccionCompletaDestino: new FormControl({ value: '', disabled: false })
        });
        this.form.get('empresa_id').valueChanges.subscribe((value) => {
            this.empresa_id = value;
            this.form.get('establecimiento_id').reset();
            this.loadEstablecimientos(value === null ? undefined : value);
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
                if (!this.consulta) {
                    campo_fecha_entrega_fin.enable();
                }
                this.entrega_es_forward = false;
            }
            if (value == 'FORWARD') {
                campo_fecha_entrega_inicio.reset();
                campo_fecha_entrega_fin.reset();
                if (!this.consulta) {
                    campo_fecha_entrega_inicio.enable();
                }
                campo_fecha_entrega_fin.enable();
                this.entrega_es_forward = true;
            }
        });
        this.form.valueChanges.subscribe(value => {
            this.formChange.emit(value);
        });
    }
    loadEstablecimientos(empresa_id = undefined) {
        this.apiService.getData(`/clientes/empresas/${this.empresa_id}/establecimientos`, {
            filtros: {
                empresa_id: empresa_id
            }
        }).subscribe((data) => {
            if (data.length === 0) {
                this.mostrarCampoEstablecimientos = false;
            }
            else {
                this.mostrarCampoEstablecimientos = true;
            }
            this.establecimientos = data;
        });
    }
    get dataUrl() {
        return '/mercado/ordenes';
    }
    completarCampos(data) {
        super.completarCampos(data);
        this.form.patchValue({ 'empresa_razon_social': data.empresa.razon_social });
        if (data.estado_id == 4 || data.estado_id == 5 || data.estado_id == 3) {
            this.form.patchValue({ 'estado_id': "" });
        }
        else {
            this.form.patchValue({ 'estado_id': data.estado_id });
        }
        this.form.patchValue({ 'producto_nombre': data.producto.nombre });
        this.form.patchValue({ 'calidad_nombre': data.calidad.nombre });
        this.form.patchValue({ 'comercial': (data.usuario_carga.nombreCompleto) });
        this.form.patchValue({ 'fecha_entrega_inicio': moment(data.fecha_entrega_inicio).format() });
        this.form.patchValue({ 'fecha_entrega_fin': moment(data.fecha_entrega_fin).format() });
        //Lógica para completar campos de destino:
        if (data.puerto_id !== null) {
            this.opcion_destino = 'exportacion';
            this.form.patchValue({ 'puerto_id': data.puerto_id });
        }
        else {
            this.opcion_destino = 'consumo';
            this.direccionCompletaDestino = data.localidad_destino + ', ' + data.departamento_destino + ', ' + data.provincia_destino;
        }
        //Lógica para completar campos de procedencia:
        if (data.establecimiento_id !== null) {
            this.form.patchValue({ 'establecimiento_id': data.establecimiento_id });
        }
        else {
            this.direccionCompletaProcedencia = data.localidad_procedencia + ', ' + data.departamento_procedencia + ', ' + data.provincia_procedencia;
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
        if (this.placeIdProcedencia) {
            formData.placeIdProcedencia = this.placeIdProcedencia;
        }
        if (this.placeIdDestino) {
            formData.placeIdDestino = this.placeIdDestino;
        }
        return formData;
    }
    guardar() {
        if (this.accion === 'copiar' || this.accion === 'agregar') {
            this.id = null;
        }
        this.enviarDatos().subscribe((data) => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.datosGuardados.emit();
            });
        });
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
        this.direccionCompletaProcedencia = null;
    }
    buscarEmpresas(busqueda) {
        let filtros = {};
        filtros.perfil = "VENDEDOR";
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
    producto_id_selected(ev) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({ producto_id: id });
    }
    producto_id_keyup(ev) {
        if (this.producto_id_to) {
            clearTimeout(this.producto_id_to);
        }
        this.producto_id_to = setTimeout(() => {
            this.buscarProductos(ev.target.value);
        }, 400);
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
    autocompletarEstablecimientoUbicacion(establecimiento) {
        this.direccionCompletaProcedencia = establecimiento.localidad + ', ' + establecimiento.departamento + ', ' + establecimiento.provincia;
    }
    setearOpcionDestino(valor) {
        this.opcion_destino = valor;
        this.form.patchValue({ 'opcion_destino': this.opcion_destino });
    }
};
__decorate([
    Input()
], MercadoOrdenesFormComponent.prototype, "id", void 0);
__decorate([
    Input()
], MercadoOrdenesFormComponent.prototype, "accion", void 0);
__decorate([
    Input()
], MercadoOrdenesFormComponent.prototype, "mostrarBotones", void 0);
__decorate([
    Output()
], MercadoOrdenesFormComponent.prototype, "datosGuardados", void 0);
__decorate([
    Output()
], MercadoOrdenesFormComponent.prototype, "formChange", void 0);
MercadoOrdenesFormComponent = __decorate([
    Component({
        selector: 'app-mercado-ordenes-form',
        templateUrl: './mercado-ordenes-form.component.html',
        styleUrls: ['./mercado-ordenes-form.component.scss']
    })
], MercadoOrdenesFormComponent);
export { MercadoOrdenesFormComponent };
//# sourceMappingURL=mercado-ordenes-form.component.js.map