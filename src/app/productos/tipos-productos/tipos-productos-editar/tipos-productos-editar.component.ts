import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
    selector    : 'app-tipos-productos-editar',
    templateUrl : './tipos-productos-editar.component.html',
    styleUrls   : ['./tipos-productos-editar.component.scss']
})
export class TiposProductosEditarComponent extends FormBaseComponent implements OnInit {

    public id        : number;
    public title     : string = 'Agregar tipo de producto';

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

    protected get dataUrl(): string {
        return '/tipos-producto';
    }
    
    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar tipo de producto';
                this.obtenerYCompletar(params.id);
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
                this.router.navigateByUrl('/app/productos/tipo');
            });
        });
    }

}
