import { ApiService         } from 'src/app/shared/services/api.service';
import { Component          } from '@angular/core';
import { ConfirmService     } from 'src/app/shared/services/confirm.service';
import { ListadoComponent   } from 'src/app/shared/listados/listado.component';
import { ListadoDataSource  } from 'src/app/shared/listado.datasource';
import { OnInit             } from '@angular/core';

@Component({
    selector    : 'app-clientes-tipos-eventos-listar',
    templateUrl :  './clientes-tipos-eventos-listar.component.html',
    styleUrls   : ['./clientes-tipos-eventos-listar.component.scss'],
    providers   : [ListadoDataSource],
})
export class ClientesTiposEventosListarComponent extends ListadoComponent implements OnInit {

    constructor(
        public  dataSource : ListadoDataSource<any>,
        private apiService : ApiService,
        private confirm    : ConfirmService
    ) {
        super();
    }

    public ngOnInit(): void {
        this.dataSource.uri = "/clientes/tipos-evento";
        this.addColumn('id',            'Id',           '80px'  ).renderFn(row => row.id);
        this.addColumn('nombre',        'Nombre',       ''      ).renderFn(row => row.nombre);
        this.addColumn('habilitado',    'Habilitado',   '80px'  ).renderFn(row => row.habilitado === 1 ? "Si" : "No");
        this.addColumn('_acciones',     'Acciones',     '50px'  ).setAsMenu().setAlign('right');
    }

    public deshabilitar(id: number) : void {
        this.confirm.ask('Deshabilitará el tipo de evento CRM. Continuar?').subscribe(() => {
            this.apiService.put(`/clientes/tipos-evento/${id}:deshabilitar`,{}).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }

    public habilitar(id: number) : void {
        this.confirm.ask('Habilitará el tipo de evento CRM. Continuar?').subscribe(() => {
            this.apiService.put(`/clientes/tipos-evento/${id}:habilitar`,{}).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }
    
}
