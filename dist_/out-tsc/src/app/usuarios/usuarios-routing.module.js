import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { ActualizarRolYOficinaComponent } from './actualizar-rol-y-oficina/actualizar-rol-y-oficina.component';
import { ActualizarDatosPersonalesComponent } from './actualizar-datos-personales/actualizar-datos-personales.component';
const routes = [
    {
        path: '',
        component: UsuariosListarComponent
    },
    {
        path: 'mis-datos',
        component: ActualizarDatosPersonalesComponent,
    },
    {
        path: ':id',
        component: ActualizarRolYOficinaComponent,
    },
];
let UsuariosRoutingModule = class UsuariosRoutingModule {
};
UsuariosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], UsuariosRoutingModule);
export { UsuariosRoutingModule };
//# sourceMappingURL=usuarios-routing.module.js.map