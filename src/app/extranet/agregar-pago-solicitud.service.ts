/*import { Injectable } from '@angular/core';


export class FormaPago {

}
export class Solicitud {
	public cuit        : string = '';
	public tipo        : string = '';
	public cbus        : Array<any> = [];
	public formasPago  : FormaPago[] = [];
	public observacion : string = '';
}
@Injectable({
	providedIn: 'root',
})
export class AgregarPagoSolicitudService {

	public solicitud: Solicitud = new Solicitud();

	public enviarDatos() {
		this.solicitud = new Solicitud();
	}

	public eliminarFormaPago(formaPago : any){
		this.solicitud.formasPago = this.solicitud.formasPago.filter(r => r !== formaPago);
		return this.solicitud.formasPago;
	}

	public eliminarTodasLasFormasDePago() {
		return this.solicitud.formasPago = [];
	}
}*/
