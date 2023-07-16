/*import { Component, OnInit, } from '@angular/core';
import { AuthService        } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource  } from 'src/app/shared/listado.datasource';
import { ListadoComponent   } from 'src/app/shared/listados/listado.component';
import { ApiService         } from 'src/app/shared/services/api.service';
import { ConfirmService     } from 'src/app/shared/services/confirm.service';

@Component({
  selector    :   'app-clientes-cargos-listar',
  templateUrl :   './clientes-cargos-listar.component.html',
  styleUrls   : [ './clientes-cargos-listar.component.scss' ],
  providers   : [ ListadoDataSource ]
})
export class ClientesCargosListarComponent extends ListadoComponent implements OnInit {

    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        public  authService        : AuthService,
        private apiService         : ApiService,
        private confirm            : ConfirmService,
    ) { 
        super();
    }

    ngOnInit(): void {
        this.dataSource.uri = '/clientes/cargos';
        
        this.addColumn('id',        'Id',        '80px').renderFn(row => row.id);
        this.addColumn('nombre',    'Nombre',        '').renderFn(row => row.nombre);
        this.addColumn('_acciones', 'Acciones',  '50px').setAsMenu().setAlign('right');
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará el cargo. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/cargos', id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }
}
*/