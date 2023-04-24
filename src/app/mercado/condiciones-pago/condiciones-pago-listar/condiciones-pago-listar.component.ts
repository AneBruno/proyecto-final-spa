import { Component, OnInit } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ApiService        } from 'src/app/shared/services/api.service';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';

@Component({
  selector    :   'app-condiciones-pago-listar',
  templateUrl :   './condiciones-pago-listar.component.html',
  styleUrls   : [ './condiciones-pago-listar.component.scss' ],
  providers   : [ ListadoDataSource ]
})
export class CondicionesPagoListarComponent implements OnInit {

  public displayedColumns = ['id','descripcion','_acciones'];

    public constructor(
        public dataSource: ListadoDataSource<any>,
        private client: ApiService,
        private confirm: ConfirmService,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/mercado/condiciones-pago';
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará la condición de pago. Continuar?').subscribe(() => {
            this.client.delete('/mercado/condiciones-pago', id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }

}
