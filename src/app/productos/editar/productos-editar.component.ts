import { Component, OnInit       } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormBaseComponent       } from 'src/app/shared/form-base.component';

@Component({
    selector    : 'productos-editar',
    templateUrl : './productos-editar.component.html',
    styleUrls   : ['./productos-editar.component.scss']
})
export class ProductosEditarComponent extends FormBaseComponent implements OnInit {

    public id      : number;
    public title   : string = 'Agregar Producto';

    public tiposProducto$  = this.apiService.getData('/tipos-producto');

    constructor(
        private route    : ActivatedRoute,
        private router   : Router,
    ) {
        super();
    }

    ngOnInit(): void {
        this.createForm();
        this.watchRoute();
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Producto';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }

    private createForm() {
        this.form = this.fb.group({
            id               : new FormControl({ value: '', disabled: true  }),
            nombre           : new FormControl({ value: '', disabled: false }),
            tipo_producto_id : new FormControl({ value: '', disabled: false }, Validators.required),
          //  unidad           : new FormControl({ value: '', disabled: false }, Validators.required),
            //uso_frecuente    : new FormControl({ value: '', disabled: false }, Validators.required),
        });
    }

    protected get dataUrl() {
        return '/productos';
    }

    protected completarCampos(data: any) {
        data.tipo_producto_id = data.tipo_producto.id;
        super.completarCampos(data);
    }

    public onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/productos');
            });
        });
    }

}
