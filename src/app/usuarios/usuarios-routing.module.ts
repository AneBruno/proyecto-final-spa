import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { ActualizarRolYOficinaComponent } from './actualizar-rol-y-oficina/actualizar-rol-y-oficina.component';
import { ActualizarDatosPersonalesComponent } from './actualizar-datos-personales/actualizar-datos-personales.component';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule { }