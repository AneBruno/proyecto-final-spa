import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let ClientesEstablecimientosEditarComponent = class ClientesEstablecimientosEditarComponent extends FormBaseLocalizacionComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar Establecimiento';
    }
    ngOnInit() {
        this.createForm();
        this.loadData();
        this.route.params.subscribe((params) => {
            if (params.empresa_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({ empresa_id: this.empresa_id });
            }
            if (params.id) {
                this.title = 'Editar Establecimiento';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }
    get dataUrl() {
        return `/clientes/empresas/${this.empresa_id}/establecimientos`;
    }
    loadData() {
        this.apiService.getData('/puertos', { limit: 0 }).subscribe((data) => {
            this.puertos = data;
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            placeId: new FormControl({ value: '', disabled: false }),
            empresa_id: new FormControl({ value: '', disabled: false }),
            puerto_id: new FormControl({ value: '', disabled: false }),
            tipo: new FormControl({ value: '', disabled: false }),
            propio: new FormControl({ value: '', disabled: false }),
            hectareas_agricolas: new FormControl({ value: '', disabled: false }),
            hectareas_ganaderas: new FormControl({ value: '', disabled: false }),
            capacidad_acopio: new FormControl({ value: '', disabled: false }),
            descripcion_ubicacion: new FormControl({ value: '', disabled: false }),
        });
    }
    completarCampos(data) {
        this.id = data.id;
        this.urlImagenMapa = data.urlImagenMapa;
        this.direccionCompleta = data.direccionCompleta;
        super.completarCampos(data);
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
            });
        });
    }
    getFormData() {
        let data = this.form.getRawValue();
        if (this.placeId) {
            data.placeId = this.placeId;
        }
        return data;
    }
    cancelar() {
    }
};
__decorate([
    Input()
], ClientesEstablecimientosEditarComponent.prototype, "id", void 0);
ClientesEstablecimientosEditarComponent = __decorate([
    Component({
        selector: 'clientes-establecimientos-editar',
        templateUrl: './clientes-establecimientos-editar.component.html',
        styleUrls: ['./clientes-establecimientos-editar.component.scss']
    })
], ClientesEstablecimientosEditarComponent);
export { ClientesEstablecimientosEditarComponent };
//# sourceMappingURL=clientes-establecimientos-editar.component.js.map