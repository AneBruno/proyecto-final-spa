import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { LocatorService } from 'src/app/shared/services/locator.service';
let CerrarSlipComponent = class CerrarSlipComponent extends FormBaseComponent {
    constructor(dataSource, router, route) {
        super();
        this.dataSource = dataSource;
        this.router = router;
        this.route = route;
        this.title = "Cerrar slip";
        this.fb = LocatorService.injector.get(FormBuilder);
    }
    get dataUrl() {
        return `/mercado/ordenes/${this.orden_id}:cerrarSlip`;
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.createForm();
            this.watchRoute();
        });
    }
    watchRoute() {
        this.orden_id = this.route.snapshot.params.orden;
        this.route.params.subscribe((params) => __awaiter(this, void 0, void 0, function* () {
            if (params.clave) {
                this.clave = params.clave;
                this.grupo = yield this.apiService.getData(`/mercado/panel/${this.clave}`).toPromise();
                this.moneda_posicion = this.grupo.moneda;
                this.listaEmpresas = this.grupo.empresas;
                this.listaPosiciones = this.grupo.posiciones;
                this.listaEmpresas.length > 1 ? this.autocompletarPosicionForm = false : this.autocompletarPosicionForm = true;
                if (this.grupo != []) {
                    this.completarFormConPosicion();
                }
                if (this.autocompletarPosicionForm) {
                    this.form.get('posicion_id').setValue(this.listaEmpresas[0].posicion_id);
                }
            }
        }));
    }
    createForm() {
        this.form = this.fb.group({
            volumen: new FormControl({ value: '', disabled: false }),
            posicion_id: new FormControl({ value: '', disabled: false }),
            precio_cierre_slip: new FormControl({ value: '', disabled: false }),
            producto_posicion: new FormControl({ value: '', disabled: false }),
            destino_posicion: new FormControl({ value: '', disabled: false }),
            entrega_posicion: new FormControl({ value: '', disabled: false }),
            precio_posicion: new FormControl({ value: '', disabled: false }),
            forma_pago_posicion: new FormControl({ value: '', disabled: false }),
            calidad_posicion: new FormControl({ value: '', disabled: false }),
            posicion_excepcional_posicion: new FormControl({ value: '', disabled: false }),
            posicion_trabajar_posicion: new FormControl({ value: '', disabled: false }),
            volumen_limitado_posicion: new FormControl({ value: '', disabled: false }),
            calidad_observaciones_posicion: new FormControl({ value: '', disabled: false }),
            observaciones_posicion: new FormControl({ value: '', disabled: false }),
        });
        this.form.get('posicion_id').valueChanges.subscribe((value) => __awaiter(this, void 0, void 0, function* () {
            if (value) {
                this.grupo = yield this.apiService.getData(`/mercado/posiciones/${value}`).toPromise();
                this.completarFormConPosicion();
            }
        }));
    }
    completarFormConPosicion() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.form.get('producto_posicion').setValue(this.grupo.producto.nombre);
            this.form.get('destino_posicion').setValue(this.grupo.puerto ? this.grupo.puerto.nombre : this.grupo.establecimiento.nombre);
            this.form.get('entrega_posicion').setValue(this.grupo.entrega);
            this.form.get('precio_posicion').setValue(this.grupo.precio ? this.grupo.precio + ' ' + this.grupo.moneda : 'A fijar');
            this.form.get('precio_cierre_slip').setValue(this.grupo.precio ? this.grupo.precio : '');
            this.form.get('forma_pago_posicion').setValue((_a = this.grupo.condicion_pago) === null || _a === void 0 ? void 0 : _a.descripcion);
            this.form.get('calidad_posicion').setValue(this.grupo.calidad.nombre);
            this.form.get('posicion_excepcional_posicion').setValue(this.grupo.posicion_excepcional == true ? 'Si' : 'No');
            this.form.get('posicion_trabajar_posicion').setValue(this.grupo.a_trabajar == true ? 'Si' : 'No');
            this.form.get('volumen_limitado_posicion').setValue(this.grupo.volumen_limitado == true ? 'Si' : 'No');
            this.form.get('calidad_observaciones_posicion').setValue(this.grupo.calidad_observaciones);
            this.form.get('observaciones_posicion').setValue(this.grupo.observaciones);
        });
    }
    infoEmpresaPosicion(posicion) {
        var precio = posicion.precio ? posicion.precio + ' ' + this.moneda_posicion : 'A fijar';
        return (posicion.id + " - " + posicion.empresa.razon_social + ' - ' + precio);
    }
    onOrdenFormChange(value) {
        this.form.get('volumen').setValue(value.volumen);
    }
    guardar() {
        this.enviarDatos().subscribe((data) => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl(`/app/mercado/panel`);
            });
        });
    }
};
CerrarSlipComponent = __decorate([
    Component({
        selector: 'app-cerrar-slip',
        templateUrl: './cerrar-slip.component.html',
        styleUrls: ['./cerrar-slip.component.scss']
    })
], CerrarSlipComponent);
export { CerrarSlipComponent };
//# sourceMappingURL=cerrar-slip.component.js.map