import { __awaiter, __decorate } from "tslib";
import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
class FormaPago {
    constructor(forma_pago, monto = '', cbu = '', fecha = '') {
        this.forma_pago = forma_pago;
        this.monto = monto;
        this.cbu = cbu;
        this.fecha = fecha;
    }
}
let SolicitudesCobroGestionar = class SolicitudesCobroGestionar extends FormBaseComponent {
    constructor(route, sanckBarService, utils, router) {
        super();
        this.route = route;
        this.sanckBarService = sanckBarService;
        this.utils = utils;
        this.router = router;
        this.dataUrl = '/gestion-de-saldos/solicitudes/';
        this.formas_pago = [];
        this.montoTotal = 0;
        this.restante = 0;
        this.fechaActual = new Date();
        this.title = 'Nueva solicitud';
        this.modoGestion = false;
        this.enviando = false;
        this.estadosPosibles = [];
        this.esTipoAnticipo = false;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.createForm();
            yield this.watchRoute();
            this.setTable(),
                this.setFields();
        });
    }
    watchRoute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.route.params.subscribe((params) => __awaiter(this, void 0, void 0, function* () {
                if (!params.id) {
                    throw new Error('Falta el parámetro id');
                }
                this.id = params.id;
                this.title = 'Gestionar Solicitud';
                this.modoGestion = true;
                this.solicitud = yield this.apiService.getData(`/gestion-de-saldos/solicitudes/${params.id}`, {
                    opciones: {
                        with_relation: 'historialEstados',
                    }
                }).toPromise();
                this.estadosPosibles = [this.solicitud.estado];
                this.estadoId = this.solicitud.estado_id;
                (yield this.apiService.getData(`/gestion-de-saldos/solicitudes/${this.id}/listar-estados-posibles`, {
                    limit: 0
                }).toPromise()).forEach((i) => {
                    this.estadosPosibles.push(i);
                });
                this.completarCampos(this.solicitud);
                this.form.get('fecha_solicitud').setValue(this.formatFecha(this.solicitud.created_at));
                this.form.get('monto_aprobado').setValue(this.utils.formatNumeroConDecimales(this.solicitud.monto_aprobado));
                this.form.get('porcentaje_interes').setValue(this.utils.formatNumeroConDecimales(this.solicitud.porcentaje_interes));
                this.verificarTipoSolicitud();
                this.montoTotal = this.solicitud.monto_total;
                if (this.router.url.includes('consulta')) {
                    this.title = 'Consulta solicitud';
                    this.form.disable();
                    this.modoGestion = false;
                }
                else {
                    if (this.solicitud.estado_id === 3) {
                        this.form.get('monto_aprobado').setValue(null);
                        this.form.get('porcentaje_interes').setValue(null);
                        this.form.get('monto_aprobado').enable();
                        this.form.get('porcentaje_interes').enable();
                    }
                    else {
                        this.form.get('monto_aprobado').disable();
                        this.form.get('porcentaje_interes').disable();
                    }
                }
                this.formas_pago = this.solicitud.formas_pago;
                this.formas_pago.forEach((element) => {
                    var _a;
                    let fecha = new Date(element.fecha);
                    fecha.setDate(fecha.getDate() + 1);
                    element.fecha = fecha;
                    if (element.cbu.length > 0) {
                        element.cbu = element.cbu + ' - ' + ((_a = element.cuenta) === null || _a === void 0 ? void 0 : _a.DescripcionBanco);
                    }
                    element.monto = element.monto.replace('.', ',');
                    element.monto = this.utils.formatNumeroConDecimales(element.monto);
                });
            }));
        });
    }
    setTable() {
        let opcionesFormaPago = [{ value: 'Cheque', text: 'Cheque' }, { value: 'E-cheq', text: 'e-Cheq' }, { value: 'Transferencia', text: 'Transferencia' }];
        this.detalles.addColumn('forma_pago', 'Forma de cobro', '100px').setAsSelect(opcionesFormaPago).setDisabledFn(() => true);
        this.detalles.addColumn('fecha', 'Fecha', '100px').setAsDatePicker().setDisabledFn(() => true);
        this.detalles.addColumn('cbu', 'CBU', '').setAsInput().setDisabledFn(() => true);
        this.detalles.addColumn('monto', 'Monto', '150px').setAsNumberInput().setDisabledFn(() => true);
    }
    createForm() {
        this.form = this.fb.group({
            razon_social: new FormControl({ value: '', disabled: true }),
            tipo: new FormControl({ value: '', disabled: true }),
            fecha_solicitud: new FormControl({ value: '', disabled: true }),
            nombre_usuario: new FormControl({ value: '', disabled: true }),
            observaciones: new FormControl({ value: '', disabled: true }),
            formas_pago: new FormControl([]),
            estado_id: new FormControl(''),
            monto_aprobado: new FormControl(''),
            porcentaje_interes: new FormControl(''),
            observaciones_cambio_estado: new FormControl(''),
        });
    }
    setFields() {
        let fechaActual = new Date();
        this.form.get('fecha_solicitud').setValue(fechaActual.toLocaleDateString());
        if (!this.id) {
            this.form.get('nombre_usuario').setValue(this.usuario.Descripcion);
        }
    }
    formatMonto(number) {
        number = Number(number);
        number.toFixed(2);
        if (!_isNumberValue(number)) {
            return '0';
        }
        if (number > 0) {
            return '0';
        }
        else {
            return (number * -1).toFixed(2).toString();
        }
    }
    formatFecha(fecha) {
        fecha = fecha.split('T')[0];
        fecha = fecha.replace(/-/g, "/");
        let arrayFecha = fecha.split('/');
        arrayFecha.reverse();
        fecha = arrayFecha[0] + '/' + arrayFecha[1] + "/" + arrayFecha[2];
        return fecha;
    }
    obtenerSaldoDisponibleEmpresa() {
        let saldo = 0;
        this.empresas.filter((i) => i.CUIT === this.form.get('cuit').value).map((element) => {
            saldo = element.Saldos.Disponibles * (-1);
        });
        return saldo;
    }
    obtenerSaldoDelDiaEmpresa() {
        let saldo = 0;
        this.empresas.filter((i) => i.CUIT === this.form.get('cuit').value).map((element) => {
            if (!element.Saldos['del Día']) {
                saldo = 0;
                return;
            }
            saldo = (element.Saldos['del Día'] * (-1)) * 95 / 100;
        });
        return saldo;
    }
    verificarTipoSolicitud() {
        this.esTipoAnticipo = false;
        if (this.solicitud.tipo == 'Anticipo') {
            this.esTipoAnticipo = true;
        }
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.solicitud.estado_id === 3 && this.form.get('estado_id').value != 8) {
                //solicitud.estado actual = Aprobado crediticio
                //solicitud.estado nuevo != No aprobado
                let error = false;
                if (this.form.get('monto_aprobado').value === null || this.form.get('monto_aprobado').value === '') {
                    this.form.get('monto_aprobado').setErrors({ required: true });
                    error = true;
                }
                if (this.form.get('porcentaje_interes').value === null || this.form.get('porcentaje_interes').value === '') {
                    this.form.get('porcentaje_interes').setErrors({ required: true });
                    error = true;
                }
                if (error) {
                    this.sanckBarService.show('Verifique los datos ingresados');
                    return;
                }
                if (Number(this.form.get('monto_aprobado').value) > Number(this.montoTotal)) {
                    this.form.get('monto_aprobado').setErrors({ invalido_menor: true });
                    return;
                }
                if (Number(this.form.get('monto_aprobado').value) < 1) {
                    this.form.get('monto_aprobado').setErrors({ invalido_mayor: true });
                    return;
                }
                if (this.form.get('porcentaje_interes').value.includes('.')) {
                    this.form.get('porcentaje_interes').setErrors({ invalido: true });
                    return;
                }
            }
            this.confirmService.ask(`¿Confirmar cambio?`).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.enviando = true;
                    let montoAprobado = this.form.get('monto_aprobado').value.replaceAll('.', '');
                    montoAprobado = montoAprobado.replace(',', '.');
                    let porcentajeInteres = this.form.get('porcentaje_interes').value.replaceAll('.', '');
                    porcentajeInteres = porcentajeInteres.replace(',', '.');
                    yield this.apiService.post(`/gestion-de-saldos/solicitudes/${this.id}/actualizar-estado`, {
                        id: this.id,
                        estado_id: this.form.get('estado_id').value,
                        observaciones: this.form.get('observaciones_cambio_estado').value,
                        monto_aprobado: montoAprobado,
                        porcentaje_interes: porcentajeInteres,
                    }).toPromise();
                    this.sanckBarService.show('Solicitud registrada con éxito');
                    this.router.navigateByUrl('/app/gestion-saldos/solicitudes-cobro');
                }
                finally {
                    this.enviando = false;
                }
            }));
        });
    }
};
__decorate([
    ViewChild('detalles', { static: true })
], SolicitudesCobroGestionar.prototype, "detalles", void 0);
SolicitudesCobroGestionar = __decorate([
    Component({
        selector: 'app-gestion-saldos-solicitudes-cobro-gestionar',
        templateUrl: './solicitudes-cobro-gestionar.html',
        styleUrls: ['./solicitudes-cobro-gestionar.scss']
    })
], SolicitudesCobroGestionar);
export { SolicitudesCobroGestionar };
//# sourceMappingURL=solicitudes-cobro-gestionar.js.map