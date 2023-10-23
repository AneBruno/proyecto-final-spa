import { __awaiter, __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
let StaticMapPlaceComponent = class StaticMapPlaceComponent {
    constructor(client) {
        this.client = client;
        this.resultados = [];
        this.sessionToken = '';
        this.error = '';
        this.titulo = 'Buscar ubicacion';
        this.disabled = false;
        this.placeIdChange = new EventEmitter();
    }
    ngOnInit() {
    }
    onSearch(ev) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            let text = ev.srcElement.value;
            if (!text) {
                return;
            }
            let response = yield this.client.getData('/google/places/buscar', {
                text: text,
                sessionToken: this.sessionToken,
            }).toPromise();
            this.resultados = response;
        }), 400);
    }
    onClickResultado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.client.getData('/google/places/obtenerDetalles/' + id, {
                sessionToken: this.sessionToken,
            }).toPromise();
            this.direccion = [result.direccion, result.localidad, result.departamento, result.provincia].join(', '),
                this.placeId = id,
                this.placeIdChange.emit(id);
            this.url = 'data:image/png;base64,' + result.mapcontent;
            this.generateSessionToken();
        });
    }
    generateSessionToken() {
        this.sessionToken = uuidv4();
    }
};
__decorate([
    Input()
], StaticMapPlaceComponent.prototype, "direccion", void 0);
__decorate([
    Input()
], StaticMapPlaceComponent.prototype, "placeId", void 0);
__decorate([
    Input()
], StaticMapPlaceComponent.prototype, "url", void 0);
__decorate([
    Input()
], StaticMapPlaceComponent.prototype, "error", void 0);
__decorate([
    Input()
], StaticMapPlaceComponent.prototype, "titulo", void 0);
__decorate([
    Input()
], StaticMapPlaceComponent.prototype, "disabled", void 0);
__decorate([
    Output()
], StaticMapPlaceComponent.prototype, "placeIdChange", void 0);
StaticMapPlaceComponent = __decorate([
    Component({
        selector: 'app-static-map-place',
        templateUrl: './static-map-place.component.html',
        styleUrls: ['./static-map-place.component.scss']
    })
], StaticMapPlaceComponent);
export { StaticMapPlaceComponent };
//# sourceMappingURL=static-map-place.component.js.map