/*import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/form-base.component';

@Component({
  selector: 'app-clientes-actividades-editar',
  templateUrl: './clientes-actividades-editar.component.html',
  styleUrls: ['./clientes-actividades-editar.component.scss']
})
export class ClientesActividadesEditarComponent extends FormBaseComponent implements OnInit {

  public title     : string = 'Agregar actividad'

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
                this.title = 'Editar actividad';
                this.obtenerYCompletar(params.id, {
                    filtros: {
                        borrados: 1,
                    }
                });
            }
        });
    }

    private createForm() {
        this.form = this.fb.group({
            id     : new FormControl({ value: '', disabled: true  }),
            nombre : new FormControl({ value: '', disabled: false }),
        });
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/actividades');
            });
        });
    }

    protected get dataUrl(): string {
        return '/clientes/actividades';
    }

}
*/