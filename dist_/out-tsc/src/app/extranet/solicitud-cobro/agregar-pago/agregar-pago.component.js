import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { FormControl } from '@angular/forms';
let AgregarPagoComponent = class AgregarPagoComponent extends FormBaseComponent {
    constructor(agregarPagoService, router, snackBarService, utils) {
        super();
        this.agregarPagoService = agregarPagoService;
        this.router = router;
        this.snackBarService = snackBarService;
        this.utils = utils;
        this.fechaHoy = new Date();
        this.dataUrl = '';
        this.title = 'Pagos';
        this.formEnviado = false;
        this.cbus = [];
        this.opcionesFormaPago = [
            { value: 'Cheque', text: 'Cheque' },
            { value: 'E-cheq', text: 'e-Cheq' },
            { value: 'Transferencia', text: 'Transferencia' }
        ];
        this.fechaSoloFinDeSemana = false;
        this.myFilter = (d) => {
            if (this.fechaSoloFinDeSemana) {
                const day = (d || new Date()).getDay();
                // Prevent Saturday and Sunday from being selected.
                return day !== 0 && day !== 6;
            }
            return true;
        };
    }
    ngOnInit() {
        this.createForm();
        this.form.get('fecha').setValue(this.fechaHoy);
        this.cbus = this.agregarPagoService.solicitud.cbus;
    }
    createForm() {
        this.form = this.fb.group({
            forma_pago: new FormControl(''),
            fecha: new FormControl(''),
            cbu: new FormControl(''),
            monto: new FormControl(''),
        });
    }
    onSubmit() {
        var _a;
        if (this.form.get('fecha').value === '') {
            this.form.get('fecha').setErrors({ required: true });
        }
        if (this.form.invalid) {
            return;
        }
        if (!this.validarFecha()) {
            this.snackBarService.show('Ingrese una fecha que no corresponda a sábados o domingos');
            return;
        }
        let formaPago = {
            forma_pago: this.form.get('forma_pago').value,
            fecha: this.form.get('fecha').value,
            cbu: this.form.get('cbu').value,
            monto: this.utils.quitarPuntos(this.form.get('monto').value),
            cbuYBanco: (_a = this.cbus.filter((cbu) => {
                return cbu.value === this.form.get('cbu').value;
            })[0]) === null || _a === void 0 ? void 0 : _a.text,
        };
        console.log('value of forma_pago: ', this.form.get('forma_pago').value);
        this.agregarPagoService.solicitud.formasPago.push(formaPago);
        this.router.navigate(['/app/extranet/solicitudes-cobro/agregar']);
    }
    formaDeCobroChange(event) {
        console.log(event);
        if (event.value === 'E-cheq' || event.value === 'Cheque') {
            this.fechaSoloFinDeSemana = true;
        }
        if (event.value === 'Transferencia') {
            this.fechaSoloFinDeSemana = false;
        }
    }
    validarFecha() {
        let formaPago = this.form.get('forma_pago').value;
        if (formaPago === 'Transferencia') {
            return true;
        }
        if (formaPago === 'E-cheq' || formaPago === 'Cheque') {
            let fecha = this.form.get('fecha').value;
            if (fecha.getDay() === 0 || fecha.getDay() === 6) {
                return false;
            }
            return true;
        }
    }
};
AgregarPagoComponent = __decorate([
    Component({
        selector: 'app-agregar-pago',
        templateUrl: './agregar-pago.component.html',
        styleUrls: ['./agregar-pago.component.scss']
    })
], AgregarPagoComponent);
export { AgregarPagoComponent };
//# sourceMappingURL=agregar-pago.component.js.map