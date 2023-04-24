import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesCobroGestionar } from './solicitudes-cobro/gestionar/solicitudes-cobro-gestionar';
import { SolicitudesCBUComponent } from './solicitudes-cbu/solicitudes-cbu.component';
import { SolicitudCobroListarComponent } from './solicitudes-cobro/listar/solicitudes-cobro-listar.component';


const routes: Routes = [
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

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionSaldosRoutingModule { }
