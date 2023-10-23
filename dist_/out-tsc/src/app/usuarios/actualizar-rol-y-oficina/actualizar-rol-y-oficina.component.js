import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuariosEditarComponent } from '../usuarios-editar/usuarios-editar.component';
let ActualizarRolYOficinaComponent = class ActualizarRolYOficinaComponent {
    constructor(client, route, router) {
        this.client = client;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
            }
        });
    }
    onClickSave(data) {
        console.log(data, 'data en act ryo');
        this.client.post('/usuarios/' + data.id + ':actualizarDatosPorAdministrador', {
            user_id: data.id,
            rol_id: data.rol_id,
            oficina_id: data.oficina_id,
            aprobacion_cbu: data.aprobacion_cbu ? 1 : 0,
            aprobacion_gerencia_comercial: data.aprobacion_gerencia_comercial ? 1 : 0,
            aprobacion_dpto_creditos: data.aprobacion_dpto_creditos ? 1 : 0,
            aprobacion_dpto_finanzas: data.aprobacion_dpto_finanzas ? 1 : 0,
            confirmacion_pagos: data.confirmacion_pagos ? 1 : 0,
        }).pipe(catchError((e) => {
            this.form.setErrors(e.error.errores);
            return throwError(e);
        })).subscribe(() => {
            this.router.navigateByUrl('/app/usuarios');
            // this.messages.show('Datos actualizados');
        });
    }
    onClickCancelar() {
        this.router.navigateByUrl('/app/usuarios');
    }
};
__decorate([
    ViewChild(UsuariosEditarComponent)
], ActualizarRolYOficinaComponent.prototype, "form", void 0);
ActualizarRolYOficinaComponent = __decorate([
    Component({
        selector: 'app-actualizar-rol-y-oficina',
        templateUrl: './actualizar-rol-y-oficina.component.html',
        styleUrls: ['./actualizar-rol-y-oficina.component.scss']
    })
], ActualizarRolYOficinaComponent);
export { ActualizarRolYOficinaComponent };
//# sourceMappingURL=actualizar-rol-y-oficina.component.js.map