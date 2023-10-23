import { __awaiter } from "tslib";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ApiService } from "./services/api.service";
import { ConfirmService } from "./services/confirm.service";
import { LocatorService } from "./services/locator.service";
import { MessagesService } from "./services/messages.service";
export class FormBaseComponent {
    constructor() {
        this.apiService = LocatorService.injector.get(ApiService);
        this.fb = LocatorService.injector.get(FormBuilder);
        this.messages = LocatorService.injector.get(MessagesService);
        this.confirmService = LocatorService.injector.get(ConfirmService);
        this.matDialog = LocatorService.injector.get(MatDialog);
    }
    setErrors(errors) {
        var _a;
        for (let fieldName in errors) {
            let errorMessage = errors[fieldName][0];
            (_a = this.form.get(fieldName)) === null || _a === void 0 ? void 0 : _a.setErrors({
                'error': errorMessage,
            });
        }
    }
    error(fieldName, errorCode = 'error') {
        return this.form.get(fieldName).getError(errorCode);
    }
    errorObligatorio(fieldname) {
        return "Obligatorio";
    }
    enviarDatos() {
        return (this.id ? this.actualizar() : this.crear())
            .pipe(catchError((e, c) => {
            this.setErrors(e.error.errors);
            return throwError(e);
        }), map(d => d['data']));
    }
    obtenerDatos(id, params) {
        return this.apiService.getData(this.getDataUrl(id), params).toPromise();
    }
    crear() {
        return this.apiService.post(this.getDataUrl(), this.getFormData());
    }
    actualizar() {
        return this.apiService.put(this.getDataUrl() + '/' + this.id, this.getFormData());
    }
    getDataUrl(id) {
        return this.dataUrl + (id ? `/${id}` : '');
    }
    getFormData() {
        return this.form.getRawValue();
    }
    completarCampos(data) {
        this.id = data.id;
        this.form.patchValue(data);
    }
    obtenerYCompletar(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.obtenerDatos(id, params);
            this.completarCampos(data);
            return data;
        });
    }
    getFormControls() {
        let result = [];
        for (let name in this.form.value) {
            console.log('control name', name);
            result.push(this.form.get(name));
        }
        return result;
    }
    deshabilitarFormulario() {
        this.getFormControls().map((control) => {
            control.disable();
        });
    }
    habilitarFormulario() {
        this.getFormControls().map((control) => {
            control.enable();
        });
    }
}
//# sourceMappingURL=form-base.component.js.map