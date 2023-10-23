import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let RedesSocialesListarComponent = class RedesSocialesListarComponent {
    constructor(dataSource, confirm, client) {
        this.dataSource = dataSource;
        this.confirm = confirm;
        this.client = client;
        this.displayedColumns = ['red', 'url', '_acciones'];
    }
    ngOnInit() {
        this.dataSource.uri = this.getDataUrl();
    }
    getDataUrl(id) {
        return '/clientes/contactos/' + this.contacto_id + '/redes-sociales' + (id ? '/' + id : '');
    }
    eliminar(id) {
        this.confirm.ask('Borrará el registro. Continuar?').subscribe(() => {
            this.client.delete(this.getDataUrl(), id).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
__decorate([
    Input()
], RedesSocialesListarComponent.prototype, "contacto_id", void 0);
RedesSocialesListarComponent = __decorate([
    Component({
        selector: 'app-redes-sociales-listar',
        templateUrl: './redes-sociales-listar.component.html',
        styleUrls: ['./redes-sociales-listar.component.scss'],
        providers: [ListadoDataSource]
    })
], RedesSocialesListarComponent);
export { RedesSocialesListarComponent };
//# sourceMappingURL=redes-sociales-listar.component.js.map