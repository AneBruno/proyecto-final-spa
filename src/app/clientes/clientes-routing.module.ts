import { NgModule                                } from '@angular/core';
import { RouterModule, Routes                    } from '@angular/router';
import { ClientesEmpresasListarComponent         } from './empresas/listar/clientes-empresas-listar.component';
import { ClientesEmpresasEditarComponent         } from './empresas/editar/clientes-empresas-editar.component';

const routes: Routes = [
 
    { path: 'empresas',                                                             component: ClientesEmpresasListarComponent  },
    { path: 'empresas/agregar',                                                     component: ClientesEmpresasEditarComponent, },
    { path: 'empresas/:id',                                                         component: ClientesEmpresasEditarComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }