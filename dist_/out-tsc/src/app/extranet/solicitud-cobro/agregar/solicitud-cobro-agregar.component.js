import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { _isNumberValue } from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
class FormaPago {
    constructor(forma_pago, monto = '', cbu = '', fecha = '') {
        this.forma_pago = forma_pago;
        this.monto = monto;
        this.cbu = cbu;
        this.fecha = fecha;
    }
}
let SolicitudCobroAgregarComponent = class SolicitudCobroAgregarComponent extends FormBaseComponent {
    constructor(agregarPagoService, authService, messageService, route, router, sanckBarService, utils) {
        super();
        this.agregarPagoService = agregarPagoService;
        this.authService = authService;
        this.messageService = messageService;
        this.route = route;
        this.router = router;
        this.sanckBarService = sanckBarService;
        this.utils = utils;
        this.dataUrl = '/extranet/solicitudes-cobro';
        this.formas_pago = [];
        this.montoTotal = 0;
        this.restante = 0;
        this.fechaActual = new Date();
        this.title = 'Nueva solicitud';
        this.modoConsulta = false;
        this.modoGestion = false;
        this.enviando = false;
        this.formEnviado = false;
    }
    ngOnInit() {
        let loginData = this.authService.getLoginData();
        this.empresas = loginData.accounts;
        this.usuario = loginData.Usuario;
        this.createForm();
        this.setNewTable();
        this.setFields();
        this.formas_pago = this.agregarPagoService.solicitud.formasPago;
        this.posicionarEnEnviarSolicitud();
        this.form.get('cuit').setValue(this.agregarPagoService.solicitud.cuit);
        this.form.get('tipo').setValue(this.agregarPagoService.solicitud.tipo);
        this.form.get('observaciones').setValue(this.agregarPagoService.solicitud.observacion);
        this.calcularMontoTotal();
        //detectar si se modificó algun dato para asignar valores
    }
    //Metodo que verifica si hay formas de pago para posicionar al usuario en el boton enviar.
    posicionarEnEnviarSolicitud() {
        if (this.formas_pago.length != 0) {
            window.scrollTo(0, 9999);
        }
    }
    checkHorario() {
        this.apiService.getData('/extranet/solicitudes-cobro/*/horarioLimiteSolicitudDisponibleDelDia').subscribe((data) => {
            let date = new Date();
            let horaActual = date.getHours();
            let minutosActual = date.getMinutes();
            let arrayHoraMensaje = data.hora.split(':');
            let horaMensaje = Number(arrayHoraMensaje[0]);
            let minutosMensaje = Number(arrayHoraMensaje[1]);
            if (horaActual < horaMensaje) {
                return;
            }
            if (horaActual === horaMensaje && minutosActual < minutosMensaje) {
                return;
            }
            this.messageService.show(`Le recordamos que las solicitudes ingresadas después de las ${data.hora} horas se procesarán durante el día de mañana`, 'center');
        });
    }
    clickNewCbu() {
        this.confirmService.ask('Desea abandonar la carga de la solicitud?').subscribe((option) => {
            this.router.navigateByUrl('/app/extranet/solicitudes-cbu/agregar');
        });
    }
    setNewTable() {
        this.table.addColumn('forma_pago', 'Forma de cobro', '260px', undefined, 'payments', '#85754E').setAsText();
        this.table.addColumn('fecha', 'Fecha', '150px', undefined, 'event', '#6AAAE4').renderFn((row) => {
            let fecha = row.fecha;
            return fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getYear();
        });
        this.table.addColumn('cbu', 'CBU', '', undefined, 'description', '#00BBB4').renderFn((row) => row.cbuYBanco);
        this.table.addColumn('monto', 'Monto', '170px', undefined, 'attach_money', '#D79A2B').setAlign('right').renderFn((row) => {
            return this.utils.fomatNumeroConOSinDecimales(row.monto);
        });
        if (!this.modoConsulta) {
            this.table.addColumn('opciones', '', '32px').setAsMenu();
        }
        this.table.setFnMenuItems((row) => {
            this.table.clearMenuItems();
            this.table.addMenuItem('Eliminar', () => {
                this.borrarFila(row);
            });
        });
    }
    calcularMontoTotal() {
        let monto = 0;
        if (this.modoConsulta) {
            let formas_pago = this.form.get('formas_pago').value;
            formas_pago.forEach(element => {
                monto = monto + Number(String(element.monto).replace(/\./g, '').replace(',', '.'));
            });
            this.montoTotal = monto;
            return;
        }
        this.formas_pago.forEach((element) => {
            monto = monto + Number(String(element.monto).replace(/\./g, '').replace(',', '.'));
        });
        this.montoTotal = monto;
        this.setMontoRestante();
    }
    changeEmpresa() {
        this.empresas.filter((i) => i.CUIT === this.form.get('cuit').value).map((element) => {
            let cbus = element.Cuentas.map((i) => {
                return {
                    value: i.Cbu,
                    text: i.Cbu + ' - ' + i.DescripcionBanco
                };
            });
            this.agregarPagoService.solicitud.cbus = cbus;
        });
        this.agregarPagoService.solicitud.cuit = this.form.get('cuit').value;
        if (this.empresas.length > 1) {
            this.formas_pago = this.agregarPagoService.eliminarTodasLasFormasDePago();
        }
        this.calcularMontoTotal();
    }
    createForm() {
        this.form = this.fb.group({
            cuit: new FormControl({ value: '', disabled: false }),
            tipo: new FormControl({ value: '', disabled: false }),
            fecha_solicitud: new FormControl({ value: '', disabled: true }),
            nombre_usuario: new FormControl({ value: '', disabled: true }),
            observaciones: new FormControl({ value: '', disabled: this.modoConsulta }),
            formas_pago: new FormControl({ value: [], disabled: false }),
            token: new FormControl({ value: '', disabled: false }),
            estado: new FormControl({ value: '', disabled: true }),
            monto_aprobado: new FormControl({ value: '', disabled: true }),
            tasa_interes: new FormControl({ value: '', disabled: true }),
        });
    }
    setFields() {
        let fechaActual = new Date();
        this.form.get('fecha_solicitud').setValue(fechaActual.toLocaleDateString());
        if (!this.id) {
            if (this.empresas.length === 1) {
                this.form.get('cuit').setValue(this.empresas[0].CUIT);
                this.changeEmpresa();
            }
            this.form.get('nombre_usuario').setValue(this.usuario.Descripcion);
        }
        this.agregarFila();
    }
    agregarFila() {
        this.formas_pago = this.formas_pago.concat([new FormaPago()]);
    }
    borrarFila(fila) {
        this.formas_pago = this.agregarPagoService.eliminarFormaPago(fila);
        this.calcularMontoTotal();
    }
    changeTipoRetiro() {
        if (!this.modoConsulta && (this.form.get('tipo').value !== 'Anticipo')) {
            this.checkHorario();
        }
        this.agregarPagoService.solicitud.tipo = this.form.get('tipo').value;
        if (this.formas_pago.length > 0) {
            this.calcularMontoTotal();
        }
        else {
            this.setMontoRestante();
        }
    }
    setMontoRestante() {
        if (this.form.get('cuit').value !== '' && this.form.get('tipo').value !== '') {
            let tipo = this.form.get('tipo').value;
            if (tipo === 'Disponible') {
                this.restante = this.obtenerSaldoDisponibleEmpresa() - this.montoTotal;
            }
            if (tipo === 'Cobranza del día') {
                this.restante = this.obtenerSaldoDelDiaEmpresa() - this.montoTotal;
            }
        }
        else {
            this.restante = 0;
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
    changeObservacion() {
        this.agregarPagoService.solicitud.observacion = this.form.get('observaciones').value;
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            let formasPago = this.formas_pago.map((element) => {
                let cbu = element.cbu.length > 0 ? element.cbu : '';
                let monto = String(element.monto).replace(/\./g, '').replace(',', '.');
                let fecha = null;
                try {
                    fecha = new Date(element.fecha).toISOString().split('T')[0];
                }
                catch (e) {
                }
                return {
                    forma_pago: element.forma_pago,
                    fecha: fecha,
                    cbu: cbu,
                    monto: Number(monto),
                };
            });
            if (formasPago.length < 1) {
                this.sanckBarService.show('Ingrese al menos una forma de cobro.');
                return;
            }
            this.form.get('formas_pago').setValue(formasPago);
            this.form.get('token').setValue(this.authService.getToken());
            if (!this.form.valid) {
                this.sanckBarService.show('Verifique los datos ingresados');
                return;
            }
            if (formasPago.length < 1) {
                this.sanckBarService.show('Ingrese al menos una forma de cobro.');
                return;
            }
            if (this.form.get('tipo').value === 'Disponible') {
                if (this.montoTotal > this.obtenerSaldoDisponibleEmpresa()) {
                    this.sanckBarService.show('El monto total excede el saldo disponible.');
                    return;
                }
            }
            if (this.form.get('tipo').value === 'Cobranza del día') {
                if (this.montoTotal > this.obtenerSaldoDelDiaEmpresa()) {
                    this.sanckBarService.show('El monto total excede el saldo del día.');
                    return;
                }
            }
            this.confirmService.ask(`¿Está seguro que desea confirmar la solicitud de retiro por $${this.utils.formatNumeroConDecimales(this.montoTotal.toString())}?`).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.enviando = true;
                    yield this.enviarDatos().toPromise();
                    this.agregarPagoService.enviarDatos();
                    this.sanckBarService.show('Solicitud registrada con éxito');
                    this.router.navigateByUrl('/app/extranet/solicitudes-cobro/listar');
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
], SolicitudCobroAgregarComponent.prototype, "detalles", void 0);
__decorate([
    ViewChild('table', { static: true })
], SolicitudCobroAgregarComponent.prototype, "table", void 0);
SolicitudCobroAgregarComponent = __decorate([
    Component({
        selector: 'app-solicitud-cobro-agregar',
        templateUrl: './solicitud-cobro-agregar.component.html',
        styleUrls: ['./solicitud-cobro-agregar.component.scss']
    })
], SolicitudCobroAgregarComponent);
export { SolicitudCobroAgregarComponent };
//# sourceMappingURL=solicitud-cobro-agregar.component.js.map