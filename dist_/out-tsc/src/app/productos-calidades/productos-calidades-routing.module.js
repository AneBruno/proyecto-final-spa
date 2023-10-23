import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductosCalidadesListarComponent } from './listar/productos-calidades-listar.component';
import { ProductosCalidadesEditarComponent } from './editar/productos-calidades-editar.component';
const routes = [
    {
        path: '',
        component: ProductosCalidadesListarComponent
    },
    {
        path: 'agregar',
        component: ProductosCalidadesEditarComponent,
    },
    {
        path: ':id',
        component: ProductosCalidadesEditarComponent,
    },
];
let ProductosCalidadesRoutingModule = class ProductosCalidadesRoutingModule {
};
ProductosCalidadesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProductosCalidadesRoutingModule);
export { ProductosCalidadesRoutingModule };
//# sourceMappingURL=productos-calidades-routing.module.js.map