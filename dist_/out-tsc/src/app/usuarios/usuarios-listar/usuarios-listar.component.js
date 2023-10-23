import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
let UsuariosListarComponent = class UsuariosListarComponent {
    constructor(dataSource, client, confirm) {
        this.dataSource = dataSource;
        this.client = client;
        this.confirm = confirm;
        this.displayedColumns = [];
        this.roles = [];
        this.oficinas = [];
    }
    ngOnInit() {
        this.dataSource.uri = '/usuarios';
        this.dataSource.filtros = {
            busqueda: null,
            rol_id: null,
        };
        this.displayedColumns = [
            'id', 'nombre_y_apellido',
            'rol_nombre',
            'oficina_nombre',
            'estado',
            '_acciones'
        ];
        this.client.getData('/roles', { limit: 0 }).subscribe((data) => {
            this.roles = data;
        });
        this.client.getData('/oficinas', {
            limit: 0,
        }).subscribe((data) => {
            this.oficinas = data;
        });
    }
    habilitar(usuario) {
        this.confirm.ask(`Desea habilitar el usuario ${usuario.nombreCompleto}`).subscribe(() => {
            this.client.post('/usuarios/' + usuario.id + ':habilitar', { habilitar: true }).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
    deshabilitar(usuario) {
        this.confirm.ask(`Desea deshabilitar el usuario ${usuario.nombreCompleto}?`).subscribe(() => {
            this.client.post('/usuarios/' + usuario.id + ':habilitar', { habilitar: false }).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
};
UsuariosListarComponent = __decorate([
    Component({
        selector: 'usuarios-listar',
        templateUrl: './usuarios-listar.component.html',
        styleUrls: ['./usuarios-listar.component.scss'],
        providers: [
            ListadoDataSource
        ]
    })
], UsuariosListarComponent);
export { UsuariosListarComponent };
//# sourceMappingURL=usuarios-listar.component.js.map