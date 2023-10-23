import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, } from '@angular/core';
import { AuthService        } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource  } from 'src/app/shared/listado.datasource';
import { ListadoComponent   } from 'src/app/shared/listados/listado.component';
import { ApiService         } from 'src/app/shared/services/api.service';
import { ConfirmService     } from 'src/app/shared/services/confirm.service';

@Component({
    selector    :   'app-puertos-listado',
    templateUrl :   './puertos-listado.component.html',
    styleUrls   : [ './puertos-listado.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class PuertosListadoComponent extends ListadoComponent implements OnInit {

    public displayedColumns : string[] = [];

    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        public  authService        : AuthService,
        private apiService         : ApiService,
        private confirm            : ConfirmService,
        private breakPointObserver : BreakpointObserver,
    ) { 
        super();
    }


    ngOnInit(): void {
        this.dataSource.uri = '/puertos';
        this.dataSource.filtros.estado = 'habilitado';

        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.clearColumns();
            this.addColumn('id','Id', '100px').renderFn(row=> row.id);
            this.addColumn('nombre',       'Nombre',       '500px').renderFn(row => row.nombre);
            //this.addColumn('terminal',     'Terminal',     '300px').renderFn(row => row.terminal);
            this.addColumn('localidad',    'Localidad',    '300px').renderFn(row => row.localidad);
            //this.addColumn('departamento', 'Departamento', '300px').renderFn(row => row.departamento);
            this.addColumn('provincia',    'Provincia',    '300px').renderFn(row => row.provincia);
            this.addColumn('estado',        'Estado',       '90px').renderFn(row => row.estado[0] + row.estado.slice(1).toLowerCase());
            this.addColumn('_acciones',    'Acciones',      '90px').setAsMenu().setAlign('right');

            if (result.matches) {
                this.getColumn('nombre'      ).setWidth('200px');
            }

            this.displayedColumns = this.columnsToShow;
        });
    }

    public eliminar(orden:any) {
        const nuevoEstado = orden.estado === 'HABILITADO' ? 'DESHABILITADO' : 'HABILITADO';

        this.confirm.ask('Deshabilitará el puerto. Continuar?').subscribe(() => {
            this.apiService.patch(`/puertos/${orden.id}/estado`, {estado: nuevoEstado}).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }

    public getDeshabilitarButtonText(orden: any) {
        return orden.estado === 'HABILITADO' ? 'Deshabilitar' : 'Habilitar';
    }
}
