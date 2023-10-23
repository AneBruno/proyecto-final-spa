import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let ClientesOficinasEditarComponent = class ClientesOficinasEditarComponent extends FormBaseLocalizacionComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Oficina';
    }
    ngOnInit() {
        this.createForm();
        this.watchRoute();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.empresa_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({ empresa_id: this.empresa_id });
            }
            if (params.id) {
                this.title = 'Editar Oficina';
                this.obtenerYCompletar(params.id);
            }
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            empresa_id: new FormControl({ value: '', disabled: false }),
            nombre: new FormControl({ value: '', disabled: false }),
            telefono: new FormControl({ value: '', disabled: false }),
            email: new FormControl({ value: '', disabled: false }),
            placeId: new FormControl({ value: '', disabled: false }),
            descripcion_ubicacion: new FormControl({ value: '', disabled: false }),
        });
    }
    get dataUrl() {
        return `/clientes/empresas/${this.empresa_id}/oficinas`;
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
            });
        });
    }
};
ClientesOficinasEditarComponent = __decorate([
    Component({
        selector: 'app-clientes-oficinas-editar',
        templateUrl: './clientes-oficinas-editar.component.html',
        styleUrls: ['./clientes-oficinas-editar.component.scss']
    })
], ClientesOficinasEditarComponent);
export { ClientesOficinasEditarComponent };
//# sourceMappingURL=clientes-oficinas-editar.component.js.map