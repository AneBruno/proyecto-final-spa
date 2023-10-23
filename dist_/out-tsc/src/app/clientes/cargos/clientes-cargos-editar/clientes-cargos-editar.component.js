import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let ClientesCargosEditarComponent = class ClientesCargosEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar cargo';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar cargo';
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
    get dataUrl() {
        return '/clientes/cargos';
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/cargos');
            });
        });
    }
};
ClientesCargosEditarComponent = __decorate([
    Component({
        selector: 'app-clientes-cargos-editar',
        templateUrl: './clientes-cargos-editar.component.html',
        styleUrls: ['./clientes-cargos-editar.component.scss']
    })
], ClientesCargosEditarComponent);
export { ClientesCargosEditarComponent };
//# sourceMappingURL=clientes-cargos-editar.component.js.map