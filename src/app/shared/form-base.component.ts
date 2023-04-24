import { HttpErrorResponse } from "@angular/common/http";
import { AbstractControl, FormGroup         } from "@angular/forms";
import { FormBuilder       } from "@angular/forms";
import { MatDialog         } from "@angular/material/dialog";
import { throwError        } from "rxjs";
import { Observable        } from "rxjs";
import { catchError, map   } from "rxjs/operators";
import { ApiService        } from "./services/api.service";
import { ConfirmService    } from "./services/confirm.service";
import { LocatorService    } from "./services/locator.service";
import { MessagesService   } from "./services/messages.service";


export abstract class FormBaseComponent {

    public    id   : any;
    public    form : FormGroup;
    public    apiService     = LocatorService.injector.get(ApiService     );
    protected fb             = LocatorService.injector.get(FormBuilder    );
    protected messages       = LocatorService.injector.get(MessagesService);
    protected confirmService = LocatorService.injector.get(ConfirmService );
    protected matDialog      = LocatorService.injector.get(MatDialog);

    public setErrors(errors: {[key: string]: any}) {
        for (let fieldName in errors) {
            let errorMessage = errors[fieldName][0];
            this.form.get(fieldName)?.setErrors({
                'error': errorMessage,
            });
        }
    }

    public error(fieldName: string, errorCode: string = 'error'): string {
        return this.form.get(fieldName).getError(errorCode);
    }

    public errorObligatorio(fieldname : string){
        return "Obligatorio";
    }

    protected enviarDatos(): Observable<any> {
        return (this.id ? this.actualizar() : this.crear())
            .pipe(
                catchError((e: HttpErrorResponse, c) => {
                    this.setErrors(e.error.errors);
                    return throwError(e);
                }),
                map(d => d['data'])
            );
    }

    protected obtenerDatos(id: any, params? : any): Promise<any> {
        return this.apiService.getData(this.getDataUrl(id), params).toPromise();
    }

    protected crear(): Observable<any> {
        return this.apiService.post(this.getDataUrl(), this.getFormData());
    }

    protected actualizar(): Observable<any> {
        return this.apiService.put(this.getDataUrl() + '/' + this.id, this.getFormData());
    }

    protected abstract get dataUrl(): string;

    protected getDataUrl(id?: any) : string {
        return this.dataUrl + (id ? `/${id}` : '');
    }

    protected getFormData(): any {
        return this.form.getRawValue();
    }

    protected completarCampos(data: any): void {
        this.id = data.id;
        this.form.patchValue(data);
    }

    public async obtenerYCompletar(id: any, params?: any): Promise<any> {
        let data = await this.obtenerDatos(id, params);
        this.completarCampos(data);
        return data;
    }

    public getFormControls(): AbstractControl[] {
        let result = [];

        for (let name in this.form.value) {
            console.log('control name', name);
            result.push(this.form.get(name));
        }

        return result;
    }

    public deshabilitarFormulario() {
        this.getFormControls().map((control: AbstractControl) => {
            control.disable();
        });
    }

    public habilitarFormulario() {
        this.getFormControls().map((control: AbstractControl) => {
            control.enable();
        });
    }

}
