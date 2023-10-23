import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
let SolicitudCbuAgregarComponent = class SolicitudCbuAgregarComponent extends FormBaseComponent {
    constructor(authService, messagesService, router, snackBarService) {
        super();
        this.authService = authService;
        this.messagesService = messagesService;
        this.router = router;
        this.snackBarService = snackBarService;
        this.dataUrl = '/extranet/cbus';
        this.formEnviado = false;
        this.title = 'Nuevo CBU';
    }
    ngOnInit() {
        let loginData = this.authService.getLoginData();
        this.empresas = loginData.accounts;
        this.createForm();
        this.setFields();
    }
    createForm() {
        this.form = this.fb.group({
            cuit: new FormControl({ value: '', disabled: false }),
            mail: new FormControl({ value: '', disabled: false }, Validators.email),
            banco: new FormControl({ value: '', disabled: false }),
            cbu: new FormControl({ value: '', disabled: false }),
            token: new FormControl({ value: '', disabled: false }),
        });
    }
    setFields() {
        this.form.get('token').setValue(this.authService.getToken());
        if (this.empresas.length === 1) {
            this.form.get('cuit').setValue(this.empresas[0].CUIT);
            this.form.get('cuit').disable();
        }
    }
    changeEmpresa(cuit) {
        let [empresa] = this.empresas.filter((element) => element.CUIT === cuit);
        if (empresa.Email !== '') {
            this.form.get('mail').setValue(empresa.Email);
        }
        else {
            this.form.get('mail').reset();
        }
    }
    keyDownCbu(event) {
        if (['Backspace', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', `Home`, `End`, 'Delete', 'Insert', 'Enter'].includes(event.key)) {
            return true;
        }
        if (/[0-9]/.test(event.key)) {
            return true;
        }
        return false;
    }
    changeCbu(event) {
        let cbu = event.target.value;
        if (cbu.length !== 22) {
            this.form.get('cbu').setErrors({ cbu: true });
        }
    }
    onSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.form.invalid) {
                return;
            }
            try {
                this.formEnviado = true;
                yield this.enviarDatos().toPromise();
                this.messagesService.show(`Datos guardados correctamente. <br>
			El nuevo CBU será evaluado y estará disponible en 24hs.`).subscribe((close) => {
                    this.router.navigateByUrl('/app/extranet/solicitudes-cobro/agregar');
                });
            }
            catch (e) {
                this.snackBarService.show(e.message);
                this.formEnviado = false;
            }
        });
    }
};
SolicitudCbuAgregarComponent = __decorate([
    Component({
        selector: 'app-cbu-agregar',
        templateUrl: './cbu-agregar.component.html',
        styleUrls: ['./cbu-agregar.component.scss']
    })
], SolicitudCbuAgregarComponent);
export { SolicitudCbuAgregarComponent };
//# sourceMappingURL=cbu-agregar.component.js.map