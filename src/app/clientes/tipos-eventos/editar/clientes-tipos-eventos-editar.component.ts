/*import { ActivatedRoute     } from '@angular/router';
import { Component          } from '@angular/core';
import { FormBaseComponent  } from 'src/app/shared/form-base.component';
import { FormControl        } from '@angular/forms';
import { OnInit             } from '@angular/core';
import { Router             } from '@angular/router';


@Component({
    selector    :  'app-clientes-tipos-eventos-editar',
    templateUrl :  './clientes-tipos-eventos-editar.component.html',
    styleUrls   : ['./clientes-tipos-eventos-editar.component.scss']
})
export class ClientesTiposEventosEditarComponent extends FormBaseComponent implements OnInit {

    public id       : number;
    public title    : string = 'Agregar tipo de evento CRM';

    constructor(
        private route   : ActivatedRoute,
        private router  : Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.createForm();
        this.watchRoute();
    }

    private watchRoute() : void {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar tipo de evento CRM';
                this.obtenerYCompletar(params.id);
            }
        });
    }
  
    private createForm() : void {
        this.form = this.fb.group({
            id     : new FormControl({ value: '', disabled: true  }),
            nombre : new FormControl({ value: '', disabled: false }),
            cantidad_dias_alerta_1 : new FormControl({ value: '', disabled: false }),
            cantidad_dias_alerta_2 : new FormControl({ value: '', disabled: false }),
        });
    }

    protected get dataUrl(): string {
        return '/clientes/tipos-evento';
    }

    public guardar() : void {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/tipos-eventos');
            });
        });
    }

}
*/