/*import { Component, Input, OnInit } from '@angular/core';
import { ListadoDataSource        } from 'src/app/shared/listado.datasource';
import { ApiService               } from 'src/app/shared/services/api.service';
import { ConfirmService           } from 'src/app/shared/services/confirm.service';

@Component({
    selector    :   'app-redes-sociales-listar',
    templateUrl :   './redes-sociales-listar.component.html',
    styleUrls   : [ './redes-sociales-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class RedesSocialesListarComponent implements OnInit {

    public displayedColumns = ['red', 'url', '_acciones'];

    @Input() contacto_id : number;

    public constructor(
        public  dataSource : ListadoDataSource<any>,
        private confirm    : ConfirmService,
        private client     : ApiService,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = this.getDataUrl();
    }

    private getDataUrl(id?: any): string {
        return '/clientes/contactos/' + this.contacto_id + '/redes-sociales' + (id?'/'+id:'');
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará el registro. Continuar?').subscribe(() => {
            this.client.delete(this.getDataUrl(), id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }
}
*/