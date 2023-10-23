import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SolicitudesCobroGestionar } from './solicitudes-cobro/gestionar/solicitudes-cobro-gestionar';
import { SolicitudesCBUComponent } from './solicitudes-cbu/solicitudes-cbu.component';
import { SolicitudCobroListarComponent } from './solicitudes-cobro/listar/solicitudes-cobro-listar.component';
const routes = [
    {
        path: 'solicitudes-cobro',
        component: SolicitudCobroListarComponent,
    },
    {
        path: 'solicitudes-cobro/:id',
        component: SolicitudesCobroGestionar
    },
    {
        path: 'solicitudes-cobro/:id/consultar',
        component: SolicitudesCobroGestionar
    },
    {
        path: 'solicitudes-cbu',
        component: SolicitudesCBUComponent,
    },
];
let GestionSaldosRoutingModule = class GestionSaldosRoutingModule {
};
GestionSaldosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], GestionSaldosRoutingModule);
export { GestionSaldosRoutingModule };
//# sourceMappingURL=gestion-saldos-routing.module.js.map