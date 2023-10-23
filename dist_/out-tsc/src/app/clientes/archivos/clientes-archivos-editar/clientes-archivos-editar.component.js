import { __decorate } from "tslib";
import * as moment from 'moment';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileUploadButtonComponent } from 'src/app/shared/file-upload-button/file-upload-button.component';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let ClientesArchivosEditarComponent = class ClientesArchivosEditarComponent extends FormBaseLocalizacionComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.clickCancelar = new EventEmitter();
        this.title = 'Agregar archivo';
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
                this.title = 'Editar archivos';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }
    get dataUrl() {
        return '/clientes/empresas/' + this.empresa_id + '/archivos';
    }
    loadData() {
        this.apiService.getData('/clientes/empresas/tipos-archivos', { limit: 0 }).subscribe((data) => {
            this.tipos_archivos = data;
        });
    }
    createForm() {
        this.form = this.fb.group({
            empresa_id: new FormControl({ value: '', disabled: true }),
            tipo_archivo_id: new FormControl({ value: '', disabled: false }),
            fecha_vencimiento: new FormControl({ value: '', disabled: false }),
            archivo_adjunto: new FormControl({ value: '', disabled: false }),
        });
    }
    completarCampos(data) {
        this.id = data.id;
        if (data.fecha_vencimiento) {
            data.fecha_vencimiento = moment(data.fecha_vencimiento || '').toDate();
        }
        super.completarCampos(data);
    }
    vuelveAEmpresa() {
        this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
            });
        });
    }
    getFile() {
        if (!this.uploadComponent) {
            return null;
        }
        return this.uploadComponent.choosenFile;
    }
    getFormData() {
        let data = super.getFormData();
        let fileContent = this.getFile();
        fileContent ? data['archivo_adjunto'] = fileContent : data['archivo_adjunto'] = undefined;
        data.fecha_vencimiento = moment(data.fecha_vencimiento).format('YYYY-MM-DD');
        if (this.placeId) {
            data.placeId = this.placeId;
        }
        return data;
    }
    cancelar() {
    }
};
__decorate([
    ViewChild(FileUploadButtonComponent)
], ClientesArchivosEditarComponent.prototype, "uploadComponent", void 0);
__decorate([
    Output()
], ClientesArchivosEditarComponent.prototype, "clickCancelar", void 0);
__decorate([
    Input()
], ClientesArchivosEditarComponent.prototype, "id", void 0);
ClientesArchivosEditarComponent = __decorate([
    Component({
        selector: 'app-clientes-archivos-editar',
        templateUrl: './clientes-archivos-editar.component.html',
        styleUrls: ['./clientes-archivos-editar.component.scss']
    })
], ClientesArchivosEditarComponent);
export { ClientesArchivosEditarComponent };
//# sourceMappingURL=clientes-archivos-editar.component.js.map