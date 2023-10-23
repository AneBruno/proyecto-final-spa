import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GestionSaldosRoutingModule } from './gestion-saldos-routing.module';
import { EnConstruccionComponent } from './en-construccion/en-construccion.component';
import { SolicitudesCBUComponent } from './solicitudes-cbu/solicitudes-cbu.component';
import { SolicitudCobroListarComponent } from './solicitudes-cobro/listar/solicitudes-cobro-listar.component';
import { SolicitudesCobroGestionar } from './solicitudes-cobro/gestionar/solicitudes-cobro-gestionar';
let GestionSaldosModule = class GestionSaldosModule {
};
GestionSaldosModule = __decorate([
    NgModule({
        declarations: [
            EnConstruccionComponent,
            SolicitudesCBUComponent,
            SolicitudCobroListarComponent,
            SolicitudesCobroGestionar
        ],
        imports: [
            CommonModule,
            GestionSaldosRoutingModule,
            SharedModule,
        ],
        schemas: [
            NO_ERRORS_SCHEMA,
        ]
    })
], GestionSaldosModule);
export { GestionSaldosModule };
//# sourceMappingURL=gestion-saldos.module.js.map