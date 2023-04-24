import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
    selector    : 'clientes-categorias-editar',
    templateUrl : './clientes-categorias-editar.component.html',
    styleUrls   : ['./clientes-categorias-editar.component.scss']
})
export class ClientesCategoriasEditarComponent extends FormBaseComponent implements OnInit {

    public title     : string = 'Agregar Categoría'

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
                this.title = 'Editar Categoría';
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
            perfil : new FormControl({ value: '', disabled: false }),
        });
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/categorias');
            });
        });
    }

    protected get dataUrl(): string {
        return '/clientes/categorias';
    }

}
