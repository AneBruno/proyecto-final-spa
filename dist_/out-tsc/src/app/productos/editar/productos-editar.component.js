import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let ProductosEditarComponent = class ProductosEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Producto';
        this.tiposProducto$ = this.apiService.getData('/tipos-producto');
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Producto';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            tipo_producto_id: new FormControl({ value: '', disabled: false }, Validators.required),
            unidad: new FormControl({ value: '', disabled: false }, Validators.required),
            uso_frecuente: new FormControl({ value: '', disabled: false }, Validators.required),
        });
    }
    get dataUrl() {
        return '/productos';
    }
    completarCampos(data) {
        data.tipo_producto_id = data.tipo_producto.id;
        super.completarCampos(data);
    }
    onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/productos');
            });
        });
    }
};
ProductosEditarComponent = __decorate([
    Component({
        selector: 'productos-editar',
        templateUrl: './productos-editar.component.html',
        styleUrls: ['./productos-editar.component.scss']
    })
], ProductosEditarComponent);
export { ProductosEditarComponent };
//# sourceMappingURL=productos-editar.component.js.map