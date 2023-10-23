import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { FormControl } from '@angular/forms';
let ClientesTiposEventosEditarComponent = class ClientesTiposEventosEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar tipo de evento CRM';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar tipo de evento CRM';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            cantidad_dias_alerta_1: new FormControl({ value: '', disabled: false }),
            cantidad_dias_alerta_2: new FormControl({ value: '', disabled: false }),
        });
    }
    get dataUrl() {
        return '/clientes/tipos-evento';
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/tipos-eventos');
            });
        });
    }
};
ClientesTiposEventosEditarComponent = __decorate([
    Component({
        selector: 'app-clientes-tipos-eventos-editar',
        templateUrl: './clientes-tipos-eventos-editar.component.html',
        styleUrls: ['./clientes-tipos-eventos-editar.component.scss']
    })
], ClientesTiposEventosEditarComponent);
export { ClientesTiposEventosEditarComponent };
//# sourceMappingURL=clientes-tipos-eventos-editar.component.js.map