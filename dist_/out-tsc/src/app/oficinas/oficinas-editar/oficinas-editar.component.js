import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let OficinasEditarComponent = class OficinasEditarComponent extends FormBaseComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar oficina';
    }
    ngOnInit() {
        this.oficinas$ = this.apiService.getData(this.getDataUrl(), { limit: 0 });
        this.createForm();
        this.watchRoute();
    }
    get dataUrl() {
        return '/oficinas';
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar oficina';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            oficina_madre_id: new FormControl({ value: '', disabled: false }),
        });
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/oficinas');
            });
        });
    }
    cancelar() {
    }
};
OficinasEditarComponent = __decorate([
    Component({
        selector: 'oficinas-editar',
        templateUrl: './oficinas-editar.component.html',
        styleUrls: ['./oficinas-editar.component.scss']
    })
], OficinasEditarComponent);
export { OficinasEditarComponent };
//# sourceMappingURL=oficinas-editar.component.js.map