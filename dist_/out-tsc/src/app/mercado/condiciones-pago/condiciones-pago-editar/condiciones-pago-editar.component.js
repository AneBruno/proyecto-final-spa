import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let CondicionesPagoEditarComponent = class CondicionesPagoEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar condición de pago';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar condición de pago';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    get dataUrl() {
        return '/mercado/condiciones-pago';
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            descripcion: new FormControl({ value: '', disabled: false }),
        });
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/mercado/condicionesPago');
            });
        });
    }
};
CondicionesPagoEditarComponent = __decorate([
    Component({
        selector: 'app-condiciones-pago-editar',
        templateUrl: './condiciones-pago-editar.component.html',
        styleUrls: ['./condiciones-pago-editar.component.scss']
    })
], CondicionesPagoEditarComponent);
export { CondicionesPagoEditarComponent };
//# sourceMappingURL=condiciones-pago-editar.component.js.map