import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule               } from '@angular/common';
import { SharedModule               } from '../shared/shared.module';
import { PuertosListadoComponent    } from './puertos-listado/puertos-listado.component';
import { PuertosEditarComponent     } from './puertos-editar/puertos-editar.component';
import { PuertosRoutingModule       } from './puertos-routing.module';

@NgModule({
    declarations: [
        PuertosListadoComponent,
        PuertosEditarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PuertosRoutingModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class PuertosModule { }
