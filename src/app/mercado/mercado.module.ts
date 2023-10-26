import { NgModule, NO_ERRORS_SCHEMA       } from '@angular/core';
import { CommonModule                     } from '@angular/common';
import { MercadoRoutingModule             } from './mercado-routing.module';
import { CondicionesPagoEditarComponent   } from './condiciones-pago/condiciones-pago-editar/condiciones-pago-editar.component';
import { CondicionesPagoListarComponent   } from './condiciones-pago/condiciones-pago-listar/condiciones-pago-listar.component';
import { MercadoPosicionesEditarComponent } from './posiciones/mercado-posiciones-editar/mercado-posiciones-editar.component';
import { MercadoPosicionesListarComponent } from './posiciones/mercado-posiciones-listar/mercado-posiciones-listar.component';
import { MercadoPanelListarComponent      } from './panel/mercado-panel-listar/mercado-panel-listar.component';
import { SharedModule                     } from '../shared/shared.module';
import { MercadoOrdenesListarComponent    } from './ordenes/mercado-ordenes-listar/mercado-ordenes-listar.component';
import { MercadoOrdenesEditarComponent    } from './ordenes/mercado-ordenes-editar/mercado-ordenes-editar.component';
import { CosechasListarComponent          } from './cosechas/cosechas-listar/cosechas-listar.component';
import { CosechasEditarComponent          } from './cosechas/cosechas-editar/cosechas-editar.component';
import { GestionOfertasComponent          } from './gestion-ofertas/gestion-ofertas.component';
import { CerrarSlipComponent              } from './gestion-ofertas/cerrar-slip/cerrar-slip.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MercadoOrdenesFormComponent } from './ordenes/mercado-ordenes-form/mercado-ordenes-form.component';
import { HistorialNegociosComponent } from './historial-negocios/historial-negocios.component';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { HistorialConsultarComponent } from './historial-negocios/historial-consultar/historial-consultar.component';
import { IndicadorOrdenesComponent } from './indicadores/indicador-ordenes/indicador-ordenes.component';
import { IndicadorPosicionesComponent } from './indicadores/indicador-posiciones/indicador-posiciones.component';
import { IndicadorClientesComponent } from './indicadores/indicador-clientes/indicador-clientes.component';
import { IndicadorVendedoresComponent } from './indicadores/indicador-vendedores/indicador-vendedores.component';
import { IndicadorNegociosComponent } from './indicadores/indicador-negocios/indicador-negocios.component';


@NgModule({
    declarations: [
        CondicionesPagoListarComponent,
        CondicionesPagoEditarComponent,
        MercadoPosicionesEditarComponent,
        MercadoPosicionesListarComponent,
        MercadoPanelListarComponent,
        MercadoOrdenesListarComponent,
        MercadoOrdenesEditarComponent,
        CosechasListarComponent,
        CosechasEditarComponent,
        GestionOfertasComponent,
        CerrarSlipComponent,
        MercadoOrdenesFormComponent,
        HistorialNegociosComponent,
        IndicadoresComponent,
        HistorialConsultarComponent,
        IndicadorOrdenesComponent,
        IndicadorPosicionesComponent,
        IndicadorClientesComponent,
        IndicadorVendedoresComponent,
        IndicadorNegociosComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MercadoRoutingModule,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: [
                        'YYYY-MM-DD', // from
                        'DD-MM-YYYY', // to
                    ],
                },
                display: {
                    dateInput:          'DD/MM/YYYY',
                    monthYearLabel:     'MMM YYYY',
                    dateA11yLabel:      'DD-MM-YYYY',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            },
        },
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
        },
        {
            provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
            useValue: { useUtc: true }
        },
    ]
})
export class MercadoModule { }
