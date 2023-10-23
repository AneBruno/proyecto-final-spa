import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
export class FormaPago {
}
export class Solicitud {
    constructor() {
        this.cuit = '';
        this.tipo = '';
        this.cbus = [];
        this.formasPago = [];
        this.observacion = '';
    }
}
let AgregarPagoSolicitudService = class AgregarPagoSolicitudService {
    constructor() {
        this.solicitud = new Solicitud();
    }
    enviarDatos() {
        this.solicitud = new Solicitud();
    }
    eliminarFormaPago(formaPago) {
        this.solicitud.formasPago = this.solicitud.formasPago.filter(r => r !== formaPago);
        return this.solicitud.formasPago;
    }
    eliminarTodasLasFormasDePago() {
        return this.solicitud.formasPago = [];
    }
};
AgregarPagoSolicitudService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AgregarPagoSolicitudService);
export { AgregarPagoSolicitudService };
//# sourceMappingURL=agregar-pago-solicitud.service.js.map