import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BuscarOrdenesComponent } from './eventos/buscar-ordenes/buscar-ordenes.component';
import { ClientesActividadesListarComponent } from './actividades/clientes-actividades-listar/clientes-actividades-listar.component';
import { ClientesActividadesEditarComponent } from './actividades/clientes-actividades-editar/clientes-actividades-editar.component';
import { ClientesArchivosListarComponent } from './archivos/clientes-archivos-listar/clientes-archivos-listar.component';
import { ClientesArchivosEditarComponent } from './archivos/clientes-archivos-editar/clientes-archivos-editar.component';
import { ClientesCategoriasListarComponent } from './categorias/listar/clientes-categorias-listar.component';
import { ClientesCategoriasEditarComponent } from './categorias/editar/clientes-categorias-editar.component';
import { ClientesCargosListarComponent } from './cargos/clientes-cargos-listar/clientes-cargos-listar.component';
import { ClientesCargosEditarComponent } from './cargos/clientes-cargos-editar/clientes-cargos-editar.component';
import { ClientesContactosListarComponent } from './contactos/listar/clientes-contactos-listar.component';
import { ClientesContactosEditarComponent } from './contactos/editar/clientes-contactos-editar.component';
import { ClientesEmpresasListarComponent } from './empresas/listar/clientes-empresas-listar.component';
import { ClientesEmpresasEditarComponent } from './empresas/editar/clientes-empresas-editar.component';
import { ClientesEventosListarComponent } from './eventos/listar/component';
import { ClientesEventosEditarComponent } from './eventos/editar/component';
import { ClientesEstablecimientosListarComponent } from './establecimientos/listar/clientes-establecimientos-listar.component';
import { ClientesEstablecimientosEditarComponent } from './establecimientos/editar/clientes-establecimientos-editar.component';
import { ClientesOficinasEditarComponent } from './oficinas/editar/clientes-oficinas-editar.component';
import { ClientesOficinasListarComponent } from './oficinas/listar/clientes-oficinas-listar.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesTiposEventosListarComponent } from './tipos-eventos/listar/clientes-tipos-eventos-listar.component';
import { ClientesTiposEventosEditarComponent } from './tipos-eventos/editar/clientes-tipos-eventos-editar.component';
import { RedesSocialesEditarComponent } from './redes-sociales/redes-sociales-editar/redes-sociales-editar.component';
import { RedesSocialesListarComponent } from './redes-sociales/redes-sociales-listar/redes-sociales-listar.component';
let ClientesModule = class ClientesModule {
};
ClientesModule = __decorate([
    NgModule({
        declarations: [
            ClientesCategoriasListarComponent,
            ClientesCategoriasEditarComponent,
            ClientesContactosListarComponent,
            ClientesContactosEditarComponent,
            ClientesEmpresasListarComponent,
            ClientesEmpresasEditarComponent,
            ClientesEstablecimientosListarComponent,
            ClientesEstablecimientosEditarComponent,
            ClientesOficinasEditarComponent,
            ClientesOficinasListarComponent,
            RedesSocialesEditarComponent,
            RedesSocialesListarComponent,
            ClientesCargosListarComponent,
            ClientesCargosEditarComponent,
            ClientesActividadesListarComponent,
            ClientesActividadesEditarComponent,
            ClientesArchivosListarComponent,
            ClientesArchivosEditarComponent,
            ClientesTiposEventosListarComponent,
            ClientesTiposEventosEditarComponent,
            ClientesEventosListarComponent,
            ClientesEventosEditarComponent,
            BuscarOrdenesComponent,
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
], ClientesModule);
export { ClientesModule };
//# sourceMappingURL=clientes.module.js.map