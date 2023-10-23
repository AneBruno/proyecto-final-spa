import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let ClientesCategoriasEditarComponent = class ClientesCategoriasEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Categoría';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
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
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            perfil: new FormControl({ value: '', disabled: false }),
        });
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/categorias');
            });
        });
    }
    get dataUrl() {
        return '/clientes/categorias';
    }
};
ClientesCategoriasEditarComponent = __decorate([
    Component({
        selector: 'clientes-categorias-editar',
        templateUrl: './clientes-categorias-editar.component.html',
        styleUrls: ['./clientes-categorias-editar.component.scss']
    })
], ClientesCategoriasEditarComponent);
export { ClientesCategoriasEditarComponent };
//# sourceMappingURL=clientes-categorias-editar.component.js.map