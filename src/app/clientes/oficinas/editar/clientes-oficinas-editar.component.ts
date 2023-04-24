import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
    selector: 'app-clientes-oficinas-editar',
    templateUrl: './clientes-oficinas-editar.component.html',
    styleUrls: ['./clientes-oficinas-editar.component.scss']
})
export class ClientesOficinasEditarComponent extends FormBaseLocalizacionComponent implements OnInit {

    public id                : number;
    public title             : string = 'Agregar Oficina';
    public empresa_id        : number;
  
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
            if (params.empresa_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({empresa_id : this.empresa_id});
            }
            if (params.id) {
                this.title = 'Editar Oficina';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    
    private createForm() {
        this.form = this.fb.group({
            id                    : new FormControl({ value: '', disabled: true  }),
            empresa_id            : new FormControl({ value: '', disabled: false }),
            nombre                : new FormControl({ value: '', disabled: false }),
            telefono              : new FormControl({ value: '', disabled: false }),
            email                 : new FormControl({ value: '', disabled: false }),
            placeId               : new FormControl({ value: '', disabled: false }),
            descripcion_ubicacion : new FormControl({ value: '', disabled: false }), 
        });
    }

    protected get dataUrl(): string {
        return `/clientes/empresas/${this.empresa_id}/oficinas`;
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
            });
        });
    }

}