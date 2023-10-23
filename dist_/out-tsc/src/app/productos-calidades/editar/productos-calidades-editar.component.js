import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let ProductosCalidadesEditarComponent = class ProductosCalidadesEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Calidad de producto';
        this.tiposProducto$ = this.apiService.get('/tipos-producto');
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Calidad de producto';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }
    get dataUrl() {
        return '/calidades';
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            orden: new FormControl({ value: '', disabled: false }),
        });
    }
    onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/productos-calidades');
            });
        });
    }
};
ProductosCalidadesEditarComponent = __decorate([
    Component({
        selector: 'productos-calidades-editar',
        templateUrl: './productos-calidades-editar.component.html',
        styleUrls: ['./productos-calidades-editar.component.scss']
    })
], ProductosCalidadesEditarComponent);
export { ProductosCalidadesEditarComponent };
//# sourceMappingURL=productos-calidades-editar.component.js.map