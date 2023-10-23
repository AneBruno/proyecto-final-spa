import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let ClientesActividadesEditarComponent = class ClientesActividadesEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar actividad';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
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
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
        });
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/actividades');
            });
        });
    }
    get dataUrl() {
        return '/clientes/actividades';
    }
};
ClientesActividadesEditarComponent = __decorate([
    Component({
        selector: 'app-clientes-actividades-editar',
        templateUrl: './clientes-actividades-editar.component.html',
        styleUrls: ['./clientes-actividades-editar.component.scss']
    })
], ClientesActividadesEditarComponent);
export { ClientesActividadesEditarComponent };
//# sourceMappingURL=clientes-actividades-editar.component.js.map