import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CondicionesPagoEditarComponent } from './condiciones-pago/condiciones-pago-editar/condiciones-pago-editar.component';
import { CondicionesPagoListarComponent } from './condiciones-pago/condiciones-pago-listar/condiciones-pago-listar.component';
import { CosechasEditarComponent } from './cosechas/cosechas-editar/cosechas-editar.component';
import { CosechasListarComponent } from './cosechas/cosechas-listar/cosechas-listar.component';
import { CerrarSlipComponent } from './gestion-ofertas/cerrar-slip/cerrar-slip.component';
import { GestionOfertasComponent } from './gestion-ofertas/gestion-ofertas.component';
import { MercadoOrdenesEditarComponent } from './ordenes/mercado-ordenes-editar/mercado-ordenes-editar.component';
import { MercadoOrdenesListarComponent } from './ordenes/mercado-ordenes-listar/mercado-ordenes-listar.component';
import { MercadoPanelListarComponent } from './panel/mercado-panel-listar/mercado-panel-listar.component';
import { MercadoPosicionesEditarComponent } from './posiciones/mercado-posiciones-editar/mercado-posiciones-editar.component';
import { MercadoPosicionesListarComponent } from './posiciones/mercado-posiciones-listar/mercado-posiciones-listar.component';
const routes = [
    { path: 'condicionesPago', component: CondicionesPagoListarComponent },
    { path: 'condicionesPago/agregar', component: CondicionesPagoEditarComponent },
    { path: 'condicionesPago/:id', component: CondicionesPagoEditarComponent },
    { path: 'cosechas', component: CosechasListarComponent },
    { path: 'cosechas/agregar', component: CosechasEditarComponent },
    { path: 'cosechas/:id', component: CosechasEditarComponent },
    { path: 'ordenes', component: MercadoOrdenesListarComponent },
    { path: 'ordenes/agregar', component: MercadoOrdenesEditarComponent },
    { path: 'ordenes/agregar/:id', component: MercadoOrdenesEditarComponent },
    { path: 'ordenes/:accion/:id', component: MercadoOrdenesEditarComponent },
    { path: 'posiciones', component: MercadoPosicionesListarComponent },
    { path: 'posiciones/agregar', component: MercadoPosicionesEditarComponent },
    { path: 'posiciones/copiar/:id', component: MercadoPosicionesEditarComponent },
    { path: 'posiciones/:accion/:id', component: MercadoPosicionesEditarComponent },
    { path: 'panel', component: MercadoPanelListarComponent },
    { path: 'panel/gestionar-ofertas/:clave', component: GestionOfertasComponent },
    { path: 'panel/gestionar-ofertas/:clave/cerrar-slip/:orden', component: CerrarSlipComponent },
    { path: 'panel/:agregarPosicion', component: MercadoPosicionesEditarComponent },
];
let MercadoRoutingModule = class MercadoRoutingModule {
};
MercadoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], MercadoRoutingModule);
export { MercadoRoutingModule };
//# sourceMappingURL=mercado-routing.module.js.map