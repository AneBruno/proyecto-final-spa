import { Component         } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { OnInit            } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgregarPagoSolicitudService } from '../../agregar-pago-solicitud.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Utils } from 'src/app/shared/utils';

@Component({
	selector    : 'app-agregar-pago',
	templateUrl : './agregar-pago.component.html',
	styleUrls   : ['./agregar-pago.component.scss']
})
export class AgregarPagoComponent extends FormBaseComponent implements OnInit {

	constructor(
        private agregarPagoService : AgregarPagoSolicitudService,
		private router             : Router,
		private snackBarService    : SnackBarService,
		public  utils              : Utils,
	) {
		super();
	}

	public fechaHoy    : Date   = new Date(); 
	public dataUrl     : string = '';
	public title       : string = 'Pagos';
	public formEnviado : boolean = false;
	public cbus        : Array<any> = [];
	public opcionesFormaPago : Array<any> = [
		{value:'Cheque'        ,text:'Cheque'},
		{value:'E-cheq'        ,text:'e-Cheq'},
		{value:'Transferencia' ,text:'Transferencia'}
	];

	public fechaSoloFinDeSemana : boolean = false;


	ngOnInit(): void {
		this.createForm();
        this.form.get('fecha').setValue(this.fechaHoy);
		this.cbus = this.agregarPagoService.solicitud.cbus;
	}

	private createForm() {
		
		this.form = this.fb.group({
			forma_pago : new FormControl(''),
			fecha      : new FormControl(''),
			cbu        : new FormControl(''),
			monto      : new FormControl(''),
		});	
	}

	public onSubmit() : void {
		
		if(this.form.get('fecha').value === ''){
			this.form.get('fecha').setErrors({required : true});
		}
		if(this.form.invalid){
			return;
		}
		if(!this.validarFecha()){
			this.snackBarService.show('Ingrese una fecha que no corresponda a sábados o domingos');
			return;
		}
		let formaPago : any = {
			forma_pago : this.form.get('forma_pago').value,
			fecha      : this.form.get('fecha'     ).value,
			cbu        : this.form.get('cbu'       ).value,
			monto      : this.utils.quitarPuntos(this.form.get('monto'     ).value),
			cbuYBanco  : this.cbus.filter( (cbu) =>{ 
				return cbu.value === this.form.get('cbu').value
			} )[0]?.text,
		}
		console.log('value of forma_pago: ',this.form.get('forma_pago').value);
		this.agregarPagoService.solicitud.formasPago.push(formaPago);
		this.router.navigate(['/app/extranet/solicitudes-cobro/agregar']);
		
	}

	public myFilter = (d: Date | null): boolean => {
		if(this.fechaSoloFinDeSemana){
			const day = (d || new Date()).getDay();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
		}
		
		return true;
	}

	public formaDeCobroChange(event : any) {
		console.log(event);
		if(event.value === 'E-cheq' || event.value === 'Cheque'){
			this.fechaSoloFinDeSemana = true;
		}
		if(event.value === 'Transferencia'){
			this.fechaSoloFinDeSemana = false;
		}
	}

	private validarFecha() : boolean {
		let formaPago = this.form.get('forma_pago').value;
		if(formaPago === 'Transferencia'){
			return true;
		}
		if(formaPago === 'E-cheq' || formaPago === 'Cheque'){
			let fecha : Date = this.form.get('fecha').value;
			if(fecha.getDay() === 0 || fecha.getDay() === 6){
				return false;
			}
			return true;
		}
	}

}
