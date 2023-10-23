import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FileUploadButtonComponent } from 'src/app/shared/file-upload-button/file-upload-button.component';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ViewChild } from '@angular/core';
let UsuariosEditarComponent = class UsuariosEditarComponent extends FormBaseComponent {
    constructor(authService, userService) {
        super();
        this.authService = authService;
        this.userService = userService;
        this.title = 'Editar usuario';
        this.allowAvatarChange = true;
        this.disabledFields = {};
        this.mostrarBotonCancelar = true;
        this.mostrarLogout = false;
        this.clickSave = new EventEmitter();
        this.clickCancelar = new EventEmitter();
    }
    ngOnInit() {
        this.oficinas$ = this.apiService.getData('/oficinas', {
            limit: 0,
        });
        this.roles$ = this.apiService.getData('/roles', { limit: 0 });
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: this.disabledFields['id'] }),
            nombre: new FormControl({ value: '', disabled: this.disabledFields['nombre'] }),
            apellido: new FormControl({ value: '', disabled: this.disabledFields['apellido'] }),
            telefono: new FormControl({ value: '', disabled: this.disabledFields['telefono'] }),
            email: new FormControl({ value: '', disabled: this.disabledFields['email'] }),
            rol_id: new FormControl({ value: '', disabled: this.disabledFields['rol_id'] }),
            oficina_id: new FormControl({ value: '', disabled: this.disabledFields['oficina_id'] }),
            aprobacion_cbu: new FormControl({ value: false, disabled: this.disabledFields['aprobacion_cbu'] }),
            aprobacion_gerencia_comercial: new FormControl({ value: false, disabled: this.disabledFields['aprobacion_gerencia_comercial'] }),
            aprobacion_dpto_creditos: new FormControl({ value: false, disabled: this.disabledFields['aprobacion_dpto_creditos'] }),
            aprobacion_dpto_finanzas: new FormControl({ value: false, disabled: this.disabledFields['aprobacion_dpto_finanzas'] }),
            confirmacion_pagos: new FormControl({ value: false, disabled: this.disabledFields['confirmacion_pagos'] }),
            suscripto_notificaciones: new FormControl({ value: '', disabled: this.disabledFields['suscripto_notificaciones'] }),
        });
        if (this.id) {
            this.getUserById(this.id).subscribe(user => {
                this.setUser(user);
            });
        }
        if (this.user) {
            this.setUser(this.user);
        }
        this.userService.getUser$().subscribe(user => {
            this.urlImagen = user.urlImagen;
        });
    }
    get dataUrl() {
        return '/usuarios';
    }
    getUserById(id) {
        return this.apiService.getData(this.getDataUrl(id));
    }
    getFile() {
        if (!this.uploadComponent) {
            return null;
        }
        return this.uploadComponent.choosenFile;
    }
    onSubmit() {
        let data = this.form.getRawValue();
        let file = this.getFile();
        data['foto'] = file ? file : undefined;
        console.log('hola', data);
        this.clickSave.emit(data);
    }
    setUser(user) {
        var _a;
        this.user = user;
        console.log("USER TRAE", user);
        this.urlImagen = user.urlImagen;
        this.form.patchValue({
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            email: user.email,
            rol_id: user.rol.id,
            oficina_id: (_a = user.oficina) === null || _a === void 0 ? void 0 : _a.id,
            aprobacion_cbu: user.aprobacion_cbu,
            aprobacion_gerencia_comercial: user.aprobacion_gerencia_comercial,
            aprobacion_dpto_creditos: user.aprobacion_dpto_creditos,
            aprobacion_dpto_finanzas: user.aprobacion_dpto_finanzas,
            confirmacion_pagos: user.confirmacion_pagos,
            suscripto_notificaciones: user.suscripto_notificaciones,
        });
    }
    dataSaved() {
        this.uploadComponent.reset();
    }
    cancelar() {
    }
    clickLogout() {
        this.authService.signOut();
    }
    onClickCancelar() {
        this.clickCancelar.emit();
    }
};
__decorate([
    ViewChild(FileUploadButtonComponent)
], UsuariosEditarComponent.prototype, "uploadComponent", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "user", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "id", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "title", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "allowAvatarChange", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "disabledFields", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "mostrarBotonCancelar", void 0);
__decorate([
    Input()
], UsuariosEditarComponent.prototype, "mostrarLogout", void 0);
__decorate([
    Output()
], UsuariosEditarComponent.prototype, "clickSave", void 0);
__decorate([
    Output()
], UsuariosEditarComponent.prototype, "clickCancelar", void 0);
UsuariosEditarComponent = __decorate([
    Component({
        selector: 'usuarios-editar',
        templateUrl: './usuarios-editar.component.html',
        styleUrls: ['./usuarios-editar.component.scss']
    })
], UsuariosEditarComponent);
export { UsuariosEditarComponent };
//# sourceMappingURL=usuarios-editar.component.js.map