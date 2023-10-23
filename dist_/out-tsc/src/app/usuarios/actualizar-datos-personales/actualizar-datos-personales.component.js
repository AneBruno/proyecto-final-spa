import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { UsuariosEditarComponent } from '../usuarios-editar/usuarios-editar.component';
import { catchError } from 'rxjs/operators';
let ActualizarDatosPersonalesComponent = class ActualizarDatosPersonalesComponent {
    constructor(client, snackBar, userService, router) {
        this.client = client;
        this.snackBar = snackBar;
        this.userService = userService;
        this.router = router;
    }
    ngOnInit() {
        this.id = this.userService.getUser().id;
    }
    onClickSave(data) {
        this.client.post('/usuarios/actualizarDatosPersonales', data)
            .pipe(catchError((e) => {
            this.form.setErrors(e.error.errors);
            return throwError(e);
        })).subscribe((data) => {
            this.userService.setUser(data.data);
            this.form.dataSaved();
            this.snackBar.show('Datos actualizados');
        });
    }
    onClickCancelar() {
        this.router.navigateByUrl('/app');
    }
    cancelar() {
    }
};
__decorate([
    ViewChild(UsuariosEditarComponent)
], ActualizarDatosPersonalesComponent.prototype, "form", void 0);
ActualizarDatosPersonalesComponent = __decorate([
    Component({
        selector: 'mis-datos-editar',
        templateUrl: './actualizar-datos-personales.component.html',
        styleUrls: ['./actualizar-datos-personales.component.scss']
    })
], ActualizarDatosPersonalesComponent);
export { ActualizarDatosPersonalesComponent };
//# sourceMappingURL=actualizar-datos-personales.component.js.map