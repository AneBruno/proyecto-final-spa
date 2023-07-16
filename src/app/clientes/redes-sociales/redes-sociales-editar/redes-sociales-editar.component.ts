/*import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
    selector    :  'app-redes-sociales-editar',
    templateUrl :  './redes-sociales-editar.component.html',
    styleUrls   : ['./redes-sociales-editar.component.scss']
})
export class RedesSocialesEditarComponent extends FormBaseComponent implements OnInit {

    public id          : number;
    public title       : string = 'Agregar Red Social';
    public empresa_id  : number;
    public contacto_id : number;
    public redes       : any[]  = ['TWITTER', 'FACEBOOK', 'INSTAGRAM'];

    public constructor(
        private route    : ActivatedRoute, 
        private router   : Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.createForm();
        this.watchRoute();
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.empresa_id && params.contacto_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({empresa_id : this.empresa_id});
            }
            if (params.contacto_id) {
                this.contacto_id = params.contacto_id;
            }
            if (params.id) {
                this.id = params.id;
                this.title = 'Editar Red Social';
                this.obtenerYCompletar(params.id);
            }
        });
    }

    protected get dataUrl(): string {
        return '/clientes/contactos/' + this.contacto_id + '/redes-sociales';
    }

    private createForm() {
        this.form = this.fb.group({
            id          : new FormControl({ value: '', disabled: true  }),
            empresa_id  : new FormControl({ value: '', disabled: false }),
            red         : new FormControl({ value: '', disabled: false }),
            contacto_id : new FormControl({ value: '', disabled: false }),
            url         : new FormControl({ value: '', disabled: false }),
        });
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id + '/contactos/' + this.contacto_id);
            });
        });
    }

    public cancelar() {

    }

}
*/