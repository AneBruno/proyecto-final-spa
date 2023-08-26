import { NgModule                 } from '@angular/core';
import { RouterModule, Routes     } from '@angular/router';
import { ProductosListarComponent } from './listar/productos-listar.component';
import { ProductosEditarComponent } from './editar/productos-editar.component';

const routes: Routes = [

    { path: '',             component: ProductosListarComponent },
    { path: 'agregar',      component: ProductosEditarComponent },
    { path: ':id',          component: ProductosEditarComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRoutingModule { }