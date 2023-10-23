import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PuertosListadoComponent } from './puertos-listado/puertos-listado.component';
import { PuertosEditarComponent } from './puertos-editar/puertos-editar.component';
const routes = [
    {
        path: '',
        component: PuertosListadoComponent
    },
    {
        path: 'agregar',
        component: PuertosEditarComponent,
    },
    {
        path: ':id',
        component: PuertosEditarComponent,
    },
];
let PuertosRoutingModule = class PuertosRoutingModule {
};
PuertosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PuertosRoutingModule);
export { PuertosRoutingModule };
//# sourceMappingURL=puertos-routing.module.js.map