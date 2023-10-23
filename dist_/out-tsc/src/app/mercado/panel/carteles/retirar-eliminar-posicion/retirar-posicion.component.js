import { __awaiter, __decorate, __param } from "tslib";
import { Component, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
let RetirarEliminarPosicionComponent = class RetirarEliminarPosicionComponent extends FormBaseComponent {
    constructor(dialogRef, data) {
        super();
        this.dialogRef = dialogRef;
        this.data = data;
        this.posicionElegida = new EventEmitter();
    }
    get dataUrl() {
        return undefined;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.accion == 'Retirar' ? this.titulo = 'Retirar posición' : this.titulo = 'Eliminar posición';
            this.createForm();
        });
    }
    createForm() {
        this.form = this.fb.group({
            posicion_id: new FormControl({ value: '', disabled: false }),
        });
    }
    cancelar() {
        this.dialogRef.close();
    }
    aceptar() {
        this.posicionElegida.emit(this.form.get('posicion_id').value);
        this.dialogRef.close();
    }
    infoPosicion(posicion) {
        var precio = posicion.precio ? posicion.precio + ' ' + this.data.monedaPosicion : 'A fijar';
        console.log(posicion);
        return (posicion.id + " - " + posicion.empresa.razon_social + ' - ' + precio);
    }
};
RetirarEliminarPosicionComponent = __decorate([
    Component({
        selector: 'app-retirar-posicion',
        templateUrl: './retirar-posicion.component.html',
        styleUrls: ['./retirar-posicion.component.scss']
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], RetirarEliminarPosicionComponent);
export { RetirarEliminarPosicionComponent };
//# sourceMappingURL=retirar-posicion.component.js.map