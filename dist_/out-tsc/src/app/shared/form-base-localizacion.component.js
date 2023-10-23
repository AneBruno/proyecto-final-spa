import { FormBaseComponent } from "./form-base.component";
export class FormBaseLocalizacionComponent extends FormBaseComponent {
    constructor() {
        super(...arguments);
        this.placeId = '';
        this.urlImagenMapa = '';
        this.direccionCompleta = '';
    }
    completarCampos(data) {
        this.urlImagenMapa = data.urlImagenMapa;
        this.direccionCompleta = data.direccionCompleta;
        super.completarCampos(data);
    }
    getFormData() {
        let data = super.getFormData();
        if (this.placeId) {
            data.placeId = this.placeId;
        }
        return data;
    }
}
//# sourceMappingURL=form-base-localizacion.component.js.map