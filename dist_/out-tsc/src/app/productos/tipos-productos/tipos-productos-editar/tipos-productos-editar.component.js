import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let TiposProductosEditarComponent = class TiposProductosEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar tipo de producto';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    get dataUrl() {
        return '/tipos-producto';
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar tipo de producto';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
        });
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/productos/tipo');
            });
        });
    }
};
TiposProductosEditarComponent = __decorate([
    Component({
        selector: 'app-tipos-productos-editar',
        templateUrl: './tipos-productos-editar.component.html',
        styleUrls: ['./tipos-productos-editar.component.scss']
    })
], TiposProductosEditarComponent);
export { TiposProductosEditarComponent };
//# sourceMappingURL=tipos-productos-editar.component.js.map