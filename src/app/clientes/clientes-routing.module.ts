import { NgModule                                } from '@angular/core';
import { RouterModule, Routes                    } from '@angular/router';
import { ClientesEstablecimientosEditarComponent } from './establecimientos/editar/clientes-establecimientos-editar.component';
import { ClientesEstablecimientosListarComponent } from './establecimientos/listar/clientes-establecimientos-listar.component';
import { ClientesEmpresasListarComponent         } from './empresas/listar/clientes-empresas-listar.component';
import { ClientesCategoriasListarComponent       } from './categorias/listar/clientes-categorias-listar.component';
import { ClientesCategoriasEditarComponent       } from './categorias/editar/clientes-categorias-editar.component';
import { ClientesOficinasEditarComponent         } from './oficinas/editar/clientes-oficinas-editar.component';
import { ClientesOficinasListarComponent         } from './oficinas/listar/clientes-oficinas-listar.component';
import { ClientesContactosListarComponent        } from './contactos/listar/clientes-contactos-listar.component';
import { ClientesContactosEditarComponent        } from './contactos/editar/clientes-contactos-editar.component';
import { RedesSocialesListarComponent            } from './redes-sociales/redes-sociales-listar/redes-sociales-listar.component';
import { RedesSocialesEditarComponent            } from './redes-sociales/redes-sociales-editar/redes-sociales-editar.component';
import { ClientesCargosListarComponent           } from './cargos/clientes-cargos-listar/clientes-cargos-listar.component';
import { ClientesCargosEditarComponent           } from './cargos/clientes-cargos-editar/clientes-cargos-editar.component';
import { ClientesEmpresasEditarComponent         } from './empresas/editar/clientes-empresas-editar.component';
import { ClientesActividadesListarComponent      } from './actividades/clientes-actividades-listar/clientes-actividades-listar.component';
import { ClientesActividadesEditarComponent      } from './actividades/clientes-actividades-editar/clientes-actividades-editar.component';
import { ClientesArchivosEditarComponent         } from './archivos/clientes-archivos-editar/clientes-archivos-editar.component';
import { ClientesTiposEventosListarComponent     } from './tipos-eventos/listar/clientes-tipos-eventos-listar.component';
import { ClientesTiposEventosEditarComponent     } from './tipos-eventos/editar/clientes-tipos-eventos-editar.component';
import { ClientesEventosListarComponent          } from './eventos/listar/component';
import { ClientesEventosEditarComponent          } from './eventos/editar/component';

const routes: Routes = [
    { path: 'eventos',                                                              component: ClientesEventosListarComponent },
    { path: 'eventos/agregar',                                                      component: ClientesEventosEditarComponent },
    { path: 'eventos/:id',                                                          component: ClientesEventosEditarComponent },
    { path: 'eventos/:id/:accion',                                                  component: ClientesEventosEditarComponent },


    { path: 'tipos-eventos',                                                        component: ClientesTiposEventosListarComponent },
    { path: 'tipos-eventos/agregar',                                                component: ClientesTiposEventosEditarComponent },
    { path: 'tipos-eventos/:id',                                                    component: ClientesTiposEventosEditarComponent },
    
    { path: 'actividades',                                                          component: ClientesActividadesListarComponent },
    { path: 'actividades/agregar',                                                  component: ClientesActividadesEditarComponent },
    { path: 'actividades/:id',                                                      component: ClientesActividadesEditarComponent },

    { path: 'categorias',                                                           component: ClientesCategoriasListarComponent },             
    { path: 'categorias/agregar',                                                   component: ClientesCategoriasEditarComponent },
    { path: 'categorias/:id',                                                       component: ClientesCategoriasEditarComponent },

    { path: 'cargos',                                                               component: ClientesCargosListarComponent},
    { path: 'cargos/agregar',                                                       component: ClientesCargosEditarComponent},
    { path: 'cargos/:id',                                                           component: ClientesCargosEditarComponent},
    
    { path: 'contactos/:contacto_id/redes-sociales/agregar',                        component: RedesSocialesEditarComponent, },
    { path: 'contactos/:contacto_id/redes-sociales/:id',                            component: RedesSocialesEditarComponent, },
    { path: 'contactos/agregar',                                                    component: ClientesContactosEditarComponent },
    { path: 'contactos/:id',                                                        component: ClientesContactosEditarComponent },
    { path: 'contactos',                                                            component: ClientesContactosListarComponent },

    { path: 'empresas',                                                             component: ClientesEmpresasListarComponent  },
    { path: 'empresas/agregar',                                                     component: ClientesEmpresasEditarComponent, },
    { path: 'empresas/:id',                                                         component: ClientesEmpresasEditarComponent, },

    { path: 'empresas/:empresa_id/archivos/agregar',                                component: ClientesArchivosEditarComponent},
    { path: 'empresas/:empresa_id/archivos/:id',                                    component: ClientesArchivosEditarComponent},

    { path: 'empresas/:empresa_id/establecimientos/',                               component: ClientesEstablecimientosListarComponent, },
    { path: 'empresas/:empresa_id/establecimientos/agregar',                        component: ClientesEstablecimientosEditarComponent, },
    { path: 'empresas/:empresa_id/establecimientos/:id',                            component: ClientesEstablecimientosEditarComponent, },

    { path: 'empresas/:empresa_id/oficinas/',                                       component: ClientesOficinasListarComponent, },
    { path: 'empresas/:empresa_id/oficinas/agregar',                                component: ClientesOficinasEditarComponent, },
    { path: 'empresas/:empresa_id/oficinas/:id',                                    component: ClientesOficinasEditarComponent, },

    { path: 'empresas/:empresa_id/contactos/',                                      component: ClientesContactosListarComponent, },
    { path: 'empresas/:empresa_id/contactos/agregar',                               component: ClientesContactosEditarComponent, },
    { path: 'empresas/:empresa_id/contactos/:id',                                   component: ClientesContactosEditarComponent, },
    
    { path: 'empresas/:empresa_id/contactos/:contacto_id/redes-sociales',           component: RedesSocialesListarComponent, },
    { path: 'empresas/:empresa_id/contactos/:contacto_id/redes-sociales/agregar',   component: RedesSocialesEditarComponent, },
    { path: 'empresas/:empresa_id/contactos/:contacto_id/redes-sociales/:id',       component: RedesSocialesEditarComponent, },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }