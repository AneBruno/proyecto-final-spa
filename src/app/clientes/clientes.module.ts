import { NgModule                                } from '@angular/core';
import { NO_ERRORS_SCHEMA                        } from '@angular/core';
import { CommonModule                            } from '@angular/common';
import { SharedModule                            } from '../shared/shared.module';
import { ClientesEmpresasListarComponent         } from './empresas/listar/clientes-empresas-listar.component';
import { ClientesEmpresasEditarComponent         } from './empresas/editar/clientes-empresas-editar.component';
import { ClientesRoutingModule                   } from './clientes-routing.module';

@NgModule({
    declarations: [
        ClientesEmpresasListarComponent,
        ClientesEmpresasEditarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ClientesRoutingModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ClientesModule {}
