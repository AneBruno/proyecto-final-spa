import { NgModule, NO_ERRORS_SCHEMA        } from '@angular/core';
import { CommonModule                      } from '@angular/common';
import { SharedModule                      } from '../shared/shared.module';
import { ProductosCalidadesListarComponent } from './listar/productos-calidades-listar.component';
import { ProductosCalidadesEditarComponent } from './editar/productos-calidades-editar.component';
import { ProductosCalidadesRoutingModule   } from './productos-calidades-routing.module';


@NgModule({
    declarations: [
        ProductosCalidadesListarComponent,
        ProductosCalidadesEditarComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ProductosCalidadesRoutingModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class ProductosCalidadesModule {}
