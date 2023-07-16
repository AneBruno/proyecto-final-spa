/*import { Component, OnInit, } from '@angular/core';
import { ConfirmService     } from 'src/app/shared/services/confirm.service';
import { ApiService         } from 'src/app/shared/services/api.service';
import { ListadoDataSource  } from 'src/app/shared/listado.datasource';
import { ListadoComponent   } from 'src/app/shared/listados/listado.component';
import { AuthService        } from 'src/app/auth/shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector    :   'clientes-categorias-listar',
    templateUrl :   './clientes-categorias-listar.component.html',
    styleUrls   : [ './clientes-categorias-listar.component.scss'],
    providers   : [ ListadoDataSource ]
})
export class ClientesCategoriasListarComponent extends ListadoComponent implements OnInit {

    public displayedColumns : string[] = [];

    public constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        private confirm     : ConfirmService,
        public  authService : AuthService,
        private breakPointObserver : BreakpointObserver,
    ) { 
        super();
    }


    ngOnInit(): void {
        this.dataSource.uri = '/clientes/categorias';

        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.clearColumns();
            this.addColumn('id',         'Id',          '80px').renderFn(row => row.id);
            this.addColumn('nombre',     'Nombre',          '').renderFn(row => row.nombre);
            this.addColumn('perfil',     'Perfil',     '300px').renderFn(row => row.perfil);
            this.addColumn('habilitado', 'Habilitado',  '60px').renderFn(row => row.habilitado ? 'Si' : 'No').setAlign('center');
            this.addColumn('_acciones',  'Acciones',    '90px').setAsMenu().setAlign('right');

            if (result.matches) {
                this.getColumn('nombre'    ).setWidth('300px');
                this.getColumn('perfil'    ).setWidth( '50px');
                this.getColumn('habilitado').setWidth( '50px');
                this.getColumn('_acciones' ).setWidth( '50px');
            }
            this.displayedColumns = this.columnsToShow;

        });
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará el puerto. Continuar?').subscribe(() => {
            this.apiService.delete('/puertos', id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }

    public deshabilitar(id: number) {
        this.confirm.ask('Deshabilitará la categoría. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/categorias', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public habilitar(id: number) {
        this.confirm.ask('Habilitará la categoría. Continuar?').subscribe(() => {
            this.apiService.put('/clientes/categorias/' + id + '/habilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
}
*/