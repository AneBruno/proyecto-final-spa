import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let RedesSocialesEditarComponent = class RedesSocialesEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Red Social';
        this.redes = ['TWITTER', 'FACEBOOK', 'INSTAGRAM'];
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.empresa_id && params.contacto_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({ empresa_id: this.empresa_id });
            }
            if (params.contacto_id) {
                this.contacto_id = params.contacto_id;
            }
            if (params.id) {
                this.id = params.id;
                this.title = 'Editar Red Social';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    get dataUrl() {
        return '/clientes/contactos/' + this.contacto_id + '/redes-sociales';
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            empresa_id: new FormControl({ value: '', disabled: false }),
            red: new FormControl({ value: '', disabled: false }),
            contacto_id: new FormControl({ value: '', disabled: false }),
            url: new FormControl({ value: '', disabled: false }),
        });
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id + '/contactos/' + this.contacto_id);
            });
        });
    }
    cancelar() {
    }
};
RedesSocialesEditarComponent = __decorate([
    Component({
        selector: 'app-redes-sociales-editar',
        templateUrl: './redes-sociales-editar.component.html',
        styleUrls: ['./redes-sociales-editar.component.scss']
    })
], RedesSocialesEditarComponent);
export { RedesSocialesEditarComponent };
//# sourceMappingURL=redes-sociales-editar.component.js.map