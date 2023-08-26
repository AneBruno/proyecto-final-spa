import { NgModule, NO_ERRORS_SCHEMA    } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { SharedModule                  } from '../shared/shared.module';
import { ProductosListarComponent      } from './listar/productos-listar.component';
import { ProductosEditarComponent      } from './editar/productos-editar.component';
import { ProductosRoutingModule        } from './productos-routing.module';


@NgModule({
    declarations: [
        ProductosListarComponent,
        ProductosEditarComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProductosRoutingModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class ProductosModule {}
