import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
    selector    : 'productos-calidades-editar',
    templateUrl : './productos-calidades-editar.component.html',
    styleUrls   : ['./productos-calidades-editar.component.scss']
})
export class ProductosCalidadesEditarComponent extends FormBaseComponent implements OnInit {

    public title : string = 'Agregar Calidad de producto';

    public tiposProducto$  = this.apiService.get('/tipos-producto');

    constructor(
        private route  : ActivatedRoute,
        private router : Router,
    ) {
        super()
    }

    ngOnInit(): void {
        this.createForm();
        this.watchRoute();
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Calidad de producto';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }

    protected get dataUrl(): string {
        return '/calidades';
    }

    protected createForm() {
        this.form = this.fb.group({
            id     : new FormControl({ value: '', disabled: true  }),
            nombre : new FormControl({ value: '', disabled: false }),
            orden  : new FormControl({ value: '', disabled: false }),
        })
        
    }

    public onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/productos-calidades');
            });
        });
    }

}
