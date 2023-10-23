import { __decorate } from "tslib";
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OficinasEditarComponent } from './oficinas-editar/oficinas-editar.component';
import { OficinasListarComponent } from './oficinas-listar/oficinas-listar.component';
import { OficinasRoutingModule } from './oficinas-routing.module';
let OficinasModule = class OficinasModule {
};
OficinasModule = __decorate([
    NgModule({
        declarations: [
            OficinasEditarComponent,
            OficinasListarComponent,
        ],
        imports: [
            CommonModule,
            SharedModule,
            OficinasRoutingModule,
        ],
        schemas: [
            NO_ERRORS_SCHEMA,
        ]
    })
], OficinasModule);
export { OficinasModule };
//# sourceMappingURL=oficinas.module.js.map