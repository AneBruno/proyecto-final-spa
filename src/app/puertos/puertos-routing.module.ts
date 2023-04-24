import { NgModule                } from '@angular/core';
import { RouterModule, Routes    } from '@angular/router';
import { PuertosListadoComponent } from './puertos-listado/puertos-listado.component';
import { PuertosEditarComponent  } from './puertos-editar/puertos-editar.component';

const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PuertosRoutingModule { }