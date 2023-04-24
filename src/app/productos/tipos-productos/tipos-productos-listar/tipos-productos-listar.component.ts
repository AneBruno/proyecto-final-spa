import { Component, OnInit } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ApiService        } from 'src/app/shared/services/api.service';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';

@Component({
  selector    :   'app-tipos-productos-listar',
  templateUrl :   './tipos-productos-listar.component.html',
  styleUrls   : [ './tipos-productos-listar.component.scss' ],
  providers   : [ ListadoDataSource ]
})
export class TiposProductosListarComponent implements OnInit {

    public displayedColumns = ['id','nombre','_acciones'];

    public constructor(
        public  dataSource : ListadoDataSource<any>,
        private client     : ApiService,
        private confirm    : ConfirmService,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/tipos-producto';
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará el tipo de producto. Continuar?').subscribe(() => {
            this.client.delete('/tipos-producto', id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }

}
