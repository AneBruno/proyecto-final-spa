import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let CosechasEditarComponent = class CosechasEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Cosecha';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Cosecha';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            descripcion: new FormControl({ value: '', disabled: false }, Validators.required)
        });
    }
    get dataUrl() {
        return '/mercado/cosechas';
    }
    completarCampos(data) {
        super.completarCampos(data);
    }
    onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/mercado/cosechas');
            });
        });
    }
};
CosechasEditarComponent = __decorate([
    Component({
        selector: 'app-cosechas-editar',
        templateUrl: './cosechas-editar.component.html',
        styleUrls: ['./cosechas-editar.component.scss']
    })
], CosechasEditarComponent);
export { CosechasEditarComponent };
//# sourceMappingURL=cosechas-editar.component.js.map