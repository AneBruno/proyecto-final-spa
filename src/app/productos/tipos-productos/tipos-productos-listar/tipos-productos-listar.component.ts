/*import { Component, OnInit } from '@angular/core';
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

    public displayedColumns = ['id','nombre', 'habilitado','_acciones'];

    public constructor(
        public  dataSource : ListadoDataSource<any>,
        private client     : ApiService,
        private confirm    : ConfirmService,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/tipos-producto';
    }

    

    public deshabilitar(id: number) {
        this.confirm.ask('Deshabilitará el tipo de producto. Continuar?').subscribe(() => {
            this.client.put(`/productos/tipo/${id}/deshabilitar`, {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public async habilitar(id: number) {
        await this.confirm.askAsync('Habilitará el tipo de producto. Continuar?');
        await this.client.put(`/productos/tipo/${id}/habilitar`, {}).toPromise();
        this.dataSource.refreshData();
    }

}
*/