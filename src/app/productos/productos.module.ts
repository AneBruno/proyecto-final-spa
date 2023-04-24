import { NgModule, NO_ERRORS_SCHEMA    } from '@angular/core';
import { CommonModule                  } from '@angular/common';
import { SharedModule                  } from '../shared/shared.module';
import { ProductosListarComponent      } from './listar/productos-listar.component';
import { ProductosEditarComponent      } from './editar/productos-editar.component';
import { ProductosRoutingModule        } from './productos-routing.module';
import { TiposProductosEditarComponent } from './tipos-productos/tipos-productos-editar/tipos-productos-editar.component';
import { TiposProductosListarComponent } from './tipos-productos/tipos-productos-listar/tipos-productos-listar.component';


@NgModule({
    declarations: [
        ProductosListarComponent,
        ProductosEditarComponent,
        TiposProductosEditarComponent,
        TiposProductosListarComponent,
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
