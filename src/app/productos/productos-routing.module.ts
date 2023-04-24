import { NgModule                 } from '@angular/core';
import { RouterModule, Routes     } from '@angular/router';
import { ProductosListarComponent } from './listar/productos-listar.component';
import { ProductosEditarComponent } from './editar/productos-editar.component';
import { TiposProductosEditarComponent } from './tipos-productos/tipos-productos-editar/tipos-productos-editar.component';
import { TiposProductosListarComponent } from './tipos-productos/tipos-productos-listar/tipos-productos-listar.component';

const routes: Routes = [
    { path: 'tipo',         component: TiposProductosListarComponent },
    { path: 'tipo/agregar', component: TiposProductosEditarComponent },
    { path: 'tipo/:id',     component: TiposProductosEditarComponent },

    { path: '',             component: ProductosListarComponent },
    { path: 'agregar',      component: ProductosEditarComponent },
    { path: ':id',          component: ProductosEditarComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRoutingModule { }