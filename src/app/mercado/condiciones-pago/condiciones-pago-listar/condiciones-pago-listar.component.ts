import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService        } from 'src/app/shared/services/api.service';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';

@Component({
  selector    :   'app-condiciones-pago-listar',
  templateUrl :   './condiciones-pago-listar.component.html',
  styleUrls   : [ './condiciones-pago-listar.component.scss' ],
  providers   : [ ListadoDataSource ]
})
export class CondicionesPagoListarComponent implements OnInit {

  public displayedColumns = ['id','descripcion', 'habilitado' , '_acciones'];

    public constructor(
        public dataSource: ListadoDataSource<any>,
        private client: ApiService,
        private confirm: ConfirmService,
        public  authService : AuthService
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/mercado/condiciones-pago';

    }

    public deshabilitar(id: number) {
        this.confirm.ask('Deshabilitará el producto. Continuar?').subscribe(() => {
            this.client.put('/mercado/condiciones-pago/' + id + '/deshabilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public async habilitar(id: number) {
        await this.confirm.askAsync('Habilitará el producto. Continuar?');
        await this.client.put('/mercado/condiciones-pago/' + id + '/habilitar', {}).toPromise();
        this.dataSource.refreshData();
        }
    

    /*public eliminar(orden) {
        const nuevoEstado = orden.estado === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';

        this.confirm.ask('Deshabilitará la condición de pago. Continuar?').subscribe(() => {
            this.client.patch(`/mercado/condiciones-pago/${orden.id}/estado`, {estado: nuevoEstado}).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }*/
    /*
    public eliminar(id: number) {
        this.confirm.ask('Borrará la condición de pago. Continuar?').subscribe(() => {
            this.client.delete('/mercado/condiciones-pago', id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }
*/
    /*public getDeshabilitarButtonText(orden) {
        return orden.estado === 'Habilitado' ? 'Deshabilitar' : 'Habilitar';
    }*/

}
