import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
  selector: 'app-condiciones-pago-editar',
  templateUrl: './condiciones-pago-editar.component.html',
  styleUrls: ['./condiciones-pago-editar.component.scss']
})
export class CondicionesPagoEditarComponent extends FormBaseComponent implements OnInit {

    //public id        : number;
    public title     : string = 'Agregar condición de pago';

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
            if (params.id) {
                this.title = 'Editar condición de pago';
                this.obtenerYCompletar(params.id);
            }
        });
    }

    public get dataUrl(): string {
        return '/mercado/condiciones-pago';
    }

    private createForm() {
        this.form = this.fb.group({
            id          : new FormControl({ value: '', disabled: true  }),
            descripcion : new FormControl({ value: '', disabled: false }),
        });
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/mercado/condicionesPago');
            });
        });
    }

}
