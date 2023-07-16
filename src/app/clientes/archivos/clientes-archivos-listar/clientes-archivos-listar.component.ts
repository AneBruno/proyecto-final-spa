/*import * as moment from 'moment';
import { Component, Input, OnInit } from '@angular/core';
import { ListadoDataSource        } from 'src/app/shared/listado.datasource';
import { ApiService               } from 'src/app/shared/services/api.service';
import { ConfirmService           } from 'src/app/shared/services/confirm.service';

@Component({
  selector    :   'app-clientes-archivos-listar',
  templateUrl :   './clientes-archivos-listar.component.html',
  styleUrls   : [ './clientes-archivos-listar.component.scss' ],
  providers   : [ ListadoDataSource ]
})
export class ClientesArchivosListarComponent implements OnInit {

    @Input()
    public empresa_id: number;

    public displayedColumns = ['tipo', 'fecha_creacion', 'fecha_vencimiento', '_acciones'];

    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        private apiService         : ApiService,
        private confirm            : ConfirmService,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/clientes/empresas/' + this.empresa_id + '/archivos';
        this.dataSource.fixedFilters = {
            empresa_id: this.empresa_id,
        }
        this.dataSource.queryParams = {
            with_relation: 'tipoArchivo',
            opciones: {
                with_relation: 'tipoArchivo',
            },
        }
    }

    public formateaFecha(fecha_creacion: any){
        var fecha_creacion_formateada = moment(fecha_creacion).format('YYYY-MM-DD');
        return fecha_creacion_formateada;
    }

    public borrar(id: number) {
        this.confirm.ask('Borrará el archivo. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/empresas/' + this.empresa_id + '/archivos', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

}
*/