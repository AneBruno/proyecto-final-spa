import { NgModule, NO_ERRORS_SCHEMA         } from '@angular/core';
import { CommonModule                       } from '@angular/common';
import { SharedModule                       } from '../shared/shared.module';
import { UsuariosListarComponent            } from './usuarios-listar/usuarios-listar.component';
import { UsuariosRoutingModule              } from './usuarios-routing.module';
import { ActualizarRolYOficinaComponent     } from './actualizar-rol-y-oficina/actualizar-rol-y-oficina.component';
import { ActualizarDatosPersonalesComponent } from './actualizar-datos-personales/actualizar-datos-personales.component';
import { UsuariosEditarComponent            } from './usuarios-editar/usuarios-editar.component';

@NgModule({
  declarations: [
        UsuariosEditarComponent,
        UsuariosListarComponent,
        ActualizarDatosPersonalesComponent,
        ActualizarRolYOficinaComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        UsuariosRoutingModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
export class UsuariosModule {}
