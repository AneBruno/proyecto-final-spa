import { FormBaseComponent } from "./form-base.component";

export abstract class FormBaseLocalizacionComponent extends FormBaseComponent {

    public placeId                  : string = '';
    public urlImagenMapa            : string = '';
    public direccionCompleta        : string = '';

    protected completarCampos(data: any) {
        this.urlImagenMapa     = data.urlImagenMapa;
        this.direccionCompleta = data.direccionCompleta;
        super.completarCampos(data);
    }

    protected getFormData(): any {        
        let data = super.getFormData();
        if (this.placeId) {
            data.placeId = this.placeId;
        }
        return data;
    }
}