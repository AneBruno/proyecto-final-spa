import { Component           } from '@angular/core';
import { ExtranetAuthService } from '../../extranet.auth.service';
import { FormBaseComponent   } from 'src/app/shared/form-base.component';
import { FormControl         } from '@angular/forms';
import { MessagesService     } from 'src/app/shared/services/messages.service';
import { OnInit              } from '@angular/core';
import { Router              } from '@angular/router';
import { SnackBarService     } from 'src/app/shared/services/snack-bar.service';
import { Validators          } from '@angular/forms';

@Component({
	selector    : 'app-cbu-agregar',
	templateUrl : './cbu-agregar.component.html',
	styleUrls   : ['./cbu-agregar.component.scss']
})
export class SolicitudCbuAgregarComponent extends FormBaseComponent implements OnInit {

	constructor(
		private authService     : ExtranetAuthService,
		private messagesService : MessagesService,
		private router          : Router,
		private snackBarService : SnackBarService,
	) { 
		super();
	}

	public dataUrl = '/extranet/cbus';
	public empresas : any;
	public formEnviado : boolean = false;
	public title : string = 'Nuevo CBU';


	ngOnInit(): void {
		let loginData = this.authService.getLoginData();
		this.empresas = loginData.accounts;

		this.createForm();
		this.setFields();
	}

	private createForm(): void {
        this.form = this.fb.group({
            cuit  : new FormControl({ value: '', disabled: false }),
            mail  : new FormControl({ value: '', disabled: false } , Validators.email ),
            banco : new FormControl({ value: '', disabled: false }),
            cbu   : new FormControl({ value: '', disabled: false }),

            token : new FormControl({ value: '', disabled: false }),

			/*
			{
				"token": "6f67285ff310f536822b30e4161e9e67276e57e14bfd70ee87c75934acc5995d",
				"cuit": "30708663278",
				"mail": "mail@valido.com",
				"banco": "Banco Pcia de Bs As",
				"cbu": "0140417701630005106006"
			}
			*/
        });
    }

	private setFields() : void {
		this.form.get('token').setValue(this.authService.getToken());
		if(this.empresas.length === 1){
			this.form.get('cuit').setValue(this.empresas[0].CUIT);
			this.form.get('cuit').disable();
		}
	}

	public changeEmpresa(cuit : any) : void {
		let [empresa] = this.empresas.filter((element) =>	element.CUIT === cuit );
		if(empresa.Email !== ''){
			this.form.get('mail').setValue(empresa.Email);
		}
		else{
			this.form.get('mail').reset();
		}
	}

	public keyDownCbu(event : any) {
		if( ['Backspace','ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', `Home`, `End`, 'Delete', 'Insert','Enter'].includes(event.key)){
			return true;
		}
		if (/[0-9]/.test(event.key)) {
            return true;
        }
		return false;
	}
	
	public changeCbu(event : any) : void {
		let cbu = event.target.value;
		if(cbu.length !== 22){
			this.form.get('cbu').setErrors({cbu : true});
		}
	}

	public async onSubmit() : Promise<void> {
		if(this.form.invalid){
			return;
		}

        try{
			this.formEnviado = true;
			await this.enviarDatos().toPromise();
			this.messagesService.show(`Datos guardados correctamente. <br>
			El nuevo CBU será evaluado y estará disponible en 24hs.`).subscribe((close)=>{
				this.router.navigateByUrl('/app/extranet/solicitudes-cobro/agregar');
			});
        }
        catch(e){
            this.snackBarService.show(e.message);
			this.formEnviado = false;
        }
	}

}



