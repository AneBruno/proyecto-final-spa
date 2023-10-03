import { NgModule                         } from '@angular/core';
import { RouterModule, Routes             } from '@angular/router';
import { CondicionesPagoEditarComponent   } from './condiciones-pago/condiciones-pago-editar/condiciones-pago-editar.component';
import { CondicionesPagoListarComponent   } from './condiciones-pago/condiciones-pago-listar/condiciones-pago-listar.component';
import { CosechasEditarComponent } from './cosechas/cosechas-editar/cosechas-editar.component';
import { CosechasListarComponent } from './cosechas/cosechas-listar/cosechas-listar.component';
import { CerrarSlipComponent } from './gestion-ofertas/cerrar-slip/cerrar-slip.component';
import { GestionOfertasComponent } from './gestion-ofertas/gestion-ofertas.component';
import { MercadoOrdenesEditarComponent } from './ordenes/mercado-ordenes-editar/mercado-ordenes-editar.component';
import { MercadoOrdenesListarComponent } from './ordenes/mercado-ordenes-listar/mercado-ordenes-listar.component';
import { MercadoPanelListarComponent      } from './panel/mercado-panel-listar/mercado-panel-listar.component';
import { MercadoPosicionesEditarComponent } from './posiciones/mercado-posiciones-editar/mercado-posiciones-editar.component';
import { MercadoPosicionesListarComponent } from './posiciones/mercado-posiciones-listar/mercado-posiciones-listar.component';
import { HistorialNegociosComponent } from './historial-negocios/historial-negocios.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { HistorialConsultarComponent } from './historial-negocios/historial-consultar/historial-consultar.component';
import { IndicadorOrdenesComponent } from './indicadores/indicador-ordenes/indicador-ordenes.component';

const routes: Routes = [
    { path: 'condicionesPago',                                  component: CondicionesPagoListarComponent   },
    { path: 'condicionesPago/agregar',                          component: CondicionesPagoEditarComponent   },
    { path: 'condicionesPago/:id',                              component: CondicionesPagoEditarComponent   },

    { path: 'cosechas',                                         component: CosechasListarComponent          },
    { path: 'cosechas/agregar',                                 component: CosechasEditarComponent          },
    { path: 'cosechas/:id',                                     component: CosechasEditarComponent          },

    { path: 'ordenes',                                          component: MercadoOrdenesListarComponent    },
    { path: 'ordenes/agregar',                                  component: MercadoOrdenesEditarComponent    },
    { path: 'ordenes/agregar/:id',                              component: MercadoOrdenesEditarComponent },
    { path: 'ordenes/:accion/:id',                              component: MercadoOrdenesEditarComponent    },

    { path: 'posiciones',                                       component: MercadoPosicionesListarComponent },
    { path: 'posiciones/agregar',                               component: MercadoPosicionesEditarComponent },
    { path: 'posiciones/copiar/:id',                            component: MercadoPosicionesEditarComponent },
    { path: 'posiciones/:accion/:id',                           component: MercadoPosicionesEditarComponent },

    { path: 'panel',                                             component: MercadoPanelListarComponent      },
    { path: 'panel/gestionar-ofertas/:clave',                    component: GestionOfertasComponent  },
    { path: 'panel/gestionar-ofertas/:clave/cerrar-slip/:orden', component: CerrarSlipComponent      },
    { path: 'panel/:agregarPosicion',                            component: MercadoPosicionesEditarComponent },

    { path: 'historial',                                         component: HistorialNegociosComponent      },
    { path: 'historial/consulta/:orden' ,                        component: HistorialConsultarComponent      },
            
    { path: 'indicadores',                                       component: IndicadoresComponent      },
    { path: 'indicadores/ordenes',                               component: IndicadorOrdenesComponent      }

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class MercadoRoutingModule { }
