import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OficinasListarComponent } from './oficinas-listar/oficinas-listar.component';
import { OficinasEditarComponent } from './oficinas-editar/oficinas-editar.component';
const routes = [
    {
        path: '',
        component: OficinasListarComponent
    },
    {
        path: 'agregar',
        component: OficinasEditarComponent,
    },
    {
        path: ':id',
        component: OficinasEditarComponent,
    },
];
let OficinasRoutingModule = class OficinasRoutingModule {
};
OficinasRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], OficinasRoutingModule);
export { OficinasRoutingModule };
//# sourceMappingURL=oficinas-routing.module.js.map