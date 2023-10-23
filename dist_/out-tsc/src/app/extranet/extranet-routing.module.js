import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgregarPagoComponent } from './solicitud-cobro/agregar-pago/agregar-pago.component';
import { EnConstruccionComponent } from '../gestion-saldos/en-construccion/en-construccion.component';
import { LoginComponent } from './login/login.component';
import { SolicitudCobroAgregarComponent } from './solicitud-cobro/agregar/solicitud-cobro-agregar.component';
import { SolicitudCobroListarComponent } from './solicitud-cobro/listar/solicitud-cobro-listar.component';
import { SolicitudCbuAgregarComponent } from './solicitudes-cbu/agregar/cbu-agregar.component';
import { SolicitudCobroEditarComponent } from './solicitud-cobro/editar/solicitud-cobro-editar.component';
const routes = [
    {
        path: 'login/:token',
        component: LoginComponent,
    },
    {
        path: 'solicitudes-cobro/agregar',
        component: SolicitudCobroAgregarComponent,
    },
    {
        path: 'solicitudes-cobro/editar/:id',
        component: SolicitudCobroEditarComponent,
    },
    {
        path: 'solicitudes-cobro/gestionar/:id',
        component: SolicitudCobroEditarComponent,
    },
    {
        path: 'solicitudes-cobro/listar',
        component: SolicitudCobroListarComponent,
    },
    {
        path: 'solicitudes-cobro/agregar-pago',
        component: AgregarPagoComponent,
    },
    {
        path: 'solicitudes-cobro',
        component: EnConstruccionComponent,
    },
    {
        path: 'solicitudes-cbu/agregar',
        component: SolicitudCbuAgregarComponent,
    }
];
let ExtranetRoutingModule = class ExtranetRoutingModule {
};
ExtranetRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ExtranetRoutingModule);
export { ExtranetRoutingModule };
//# sourceMappingURL=extranet-routing.module.js.map