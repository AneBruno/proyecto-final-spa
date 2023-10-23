import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let MercadoOrdenesEditarComponent = class MercadoOrdenesEditarComponent extends FormBaseLocalizacionComponent {
    constructor(router, route) {
        super();
        this.router = router;
        this.route = route;
        this.title = 'Agregar Orden';
        this.accion = 'agregar';
    }
    ngOnInit() {
        this.watchRoute();
    }
    get dataUrl() {
        return '/mercado/ordenes';
    }
    watchRoute() {
        this.route.params.subscribe((params) => __awaiter(this, void 0, void 0, function* () {
            if (params.accion) {
                this.accion = params.accion;
            }
            if (params.id) {
                this.id = params.id;
            }
            if (params.accion === 'consulta') {
                this.title = 'Consulta orden';
            }
            else if (params.accion === 'copiar') {
                this.title = 'Copiar orden';
            }
        }));
    }
    onDatosGuardados() {
        this.router.navigateByUrl('/app/mercado/ordenes');
    }
};
MercadoOrdenesEditarComponent = __decorate([
    Component({
        selector: 'app-mercado-ordenes-editar',
        templateUrl: './mercado-ordenes-editar.component.html',
        styleUrls: ['./mercado-ordenes-editar.component.scss']
    })
], MercadoOrdenesEditarComponent);
export { MercadoOrdenesEditarComponent };
//# sourceMappingURL=mercado-ordenes-editar.component.js.map