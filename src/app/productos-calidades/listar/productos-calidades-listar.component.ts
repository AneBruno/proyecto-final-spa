import { Component, OnInit } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ApiService        } from 'src/app/shared/services/api.service';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';

@Component({
    selector    :   'productos-calidades-listar',
    templateUrl :   './productos-calidades-listar.component.html',
    styleUrls   : [ './productos-calidades-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class ProductosCalidadesListarComponent implements OnInit {

    public displayedColumns = ['id','nombre','_acciones'];

    public constructor(
        private client     : ApiService,
        private confirm    : ConfirmService,
        public  dataSource : ListadoDataSource<any>,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/calidades';
    }

    public eliminar(id: number) {
        this.confirm.ask('Eliminará el registro. Continuar?').subscribe(() => {
            this.client.delete('/calidades', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

}
