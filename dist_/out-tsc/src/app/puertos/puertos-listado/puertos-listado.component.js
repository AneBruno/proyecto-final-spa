import { __decorate } from "tslib";
import { Component, } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
let PuertosListadoComponent = class PuertosListadoComponent extends ListadoComponent {
    constructor(dataSource, authService, apiService, confirm, breakPointObserver) {
        super();
        this.dataSource = dataSource;
        this.authService = authService;
        this.apiService = apiService;
        this.confirm = confirm;
        this.breakPointObserver = breakPointObserver;
        this.displayedColumns = [];
    }
    ngOnInit() {
        this.dataSource.uri = '/puertos';
        this.dataSource.filtros.estado = 'habilitado';
        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.clearColumns();
            this.addColumn('nombre', 'Nombre', '500px').renderFn(row => row.nombre);
            this.addColumn('terminal', 'Terminal', '300px').renderFn(row => row.terminal);
            this.addColumn('localidad', 'Localidad', '300px').renderFn(row => row.localidad);
            this.addColumn('departamento', 'Departamento', '300px').renderFn(row => row.departamento);
            this.addColumn('provincia', 'Provincia', '300px').renderFn(row => row.provincia);
            this.addColumn('estado', 'Estado', '90px').renderFn(row => row.estado[0] + row.estado.slice(1).toLowerCase());
            this.addColumn('_acciones', 'Acciones', '90px').setAsMenu().setAlign('right');
            if (result.matches) {
                this.getColumn('nombre').setWidth('200px');
            }
            this.displayedColumns = this.columnsToShow;
        });
    }
    eliminar(orden) {
        const nuevoEstado = orden.estado === 'HABILITADO' ? 'DESHABILITADO' : 'HABILITADO';
        this.confirm.ask('Deshabilitará el puerto. Continuar?').subscribe(() => {
            this.apiService.patch(`/puertos/${orden.id}/estado`, { estado: nuevoEstado }).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
    getDeshabilitarButtonText(orden) {
        return orden.estado === 'HABILITADO' ? 'Deshabilitar' : 'Habilitar';
    }
};
PuertosListadoComponent = __decorate([
    Component({
        selector: 'app-puertos-listado',
        templateUrl: './puertos-listado.component.html',
        styleUrls: ['./puertos-listado.component.scss'],
        providers: [ListadoDataSource]
    })
], PuertosListadoComponent);
export { PuertosListadoComponent };
//# sourceMappingURL=puertos-listado.component.js.map