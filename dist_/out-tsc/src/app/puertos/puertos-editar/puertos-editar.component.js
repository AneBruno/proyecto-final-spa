import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let PuertosEditarComponent = class PuertosEditarComponent extends FormBaseLocalizacionComponent {
    constructor(route, router) {
        super();
        this.route = route;
        this.router = router;
        this.title = 'Agregar puerto';
        this.sessionToken = '';
        this.resultados = [];
    }
    get dataUrl() {
        return '/puertos';
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.createForm();
            this.watchRoute();
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            nombre: new FormControl({ value: '', disabled: false }),
            terminal: new FormControl({ value: '', disabled: false }),
            placeId: new FormControl({ value: '', disabled: false }),
            descripcion_ubicacion: new FormControl({ value: '', disabled: false }),
        });
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Puerto';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }
    onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/puertos');
            });
        });
    }
};
PuertosEditarComponent = __decorate([
    Component({
        selector: 'app-puertos-editar',
        templateUrl: './puertos-editar.component.html',
        styleUrls: ['./puertos-editar.component.scss'],
    })
], PuertosEditarComponent);
export { PuertosEditarComponent };
//# sourceMappingURL=puertos-editar.component.js.map