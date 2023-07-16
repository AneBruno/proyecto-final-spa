/*import { ApiService        } from 'src/app/shared/services/api.service';
import { Component         } from '@angular/core';
import { ListadoComponent  } from 'src/app/shared/listados/listado.component';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { OnInit            } from '@angular/core';
import { TableComponent    } from 'src/app/shared/table/table.component';
import { ViewChild         } from '@angular/core';
import * as moment from 'moment';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
    selector    : 'app-solicitudes-cbu',
    templateUrl : './solicitudes-cbu.component.html',
    styleUrls   : ['./solicitudes-cbu.component.scss']
})
export class SolicitudesCBUComponent extends ListadoComponent implements  OnInit {

    public displayedColumns = [];
    public filtros      : any = {
        cuit: []
    };
    public empresas : Array<any> = [];

    @ViewChild('tablaSolicitudes')
    public tablaSolicitudes : TableComponent<any>;

    constructor(
        private apiService      : ApiService,
        public  dataSource      : ListadoDataSource<any>,
        private snackBarService : SnackBarService,
    ) 
    {
        super();
    }

    ngOnInit(): void {
        this.dataSource.uri = `/cbus`;
        this.dataSource.ordenes.created_at='DESC';
        this.dataSource.ordenes.estado='ASC';
        this.dataSource.setDefaultFilters({
            estado: 'Pendiente',
            cuit: [],
        });
        this.setTable();
    }

    private setTable() : void {
        this.addColumn('fecha',            'Fecha',           '150px '  ).renderFn((row) =>{
            let fecha  = new Date(row.created_at);
            return fecha.toLocaleDateString().replace('/g','-');
        } );
        this.addColumn('cbu',           'CBU',          ''     ).renderFn(row => row.cbu);
        this.addColumn('banco',         'Banco',        '150px').renderFn(row => row.banco);
        this.addColumn('razon_social',  'Razón social', '200px').renderFn(row => row.razon_social);
        this.addColumn('mail',          'Email',        '200px').renderFn(row => row.mail);
        this.addColumn('estado',        'Estado',       '150px').renderFn(row => row.estado);
        this.addColumn('_acciones',     'Acciones',     '50px' ).setAsMenu().setAlign('right');
    }

    public refreshList() {
        [ 'fecha_desde', 'fecha_hasta' ].map((name) => {
            if (!this.filtros[name]) {
                this.dataSource.filtros[name] = null;
                return;
            }
            this.dataSource.filtros[name] = moment(this.filtros[name]).format('YYYY-MM-DD');
        });
        this.dataSource.filtros.cuit = this.filtros.cuit.map((x:any) => x.cuit); 
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }

    public onClearFilters() : void {
        [ 'fecha_desde', 'fecha_hasta', ].map((name: string) => {
            this.filtros[name] = null;
        });
        this.filtros.cuit = [];
    }

    public procesarCbu(id : string) : void {
        try {
            this.apiService.post(`/cbus/${id}:procesar`,{}).subscribe(()=>{
                this.dataSource.refreshData();
            });
        } 
        catch (error) {
            this.snackBarService.show(error);
        }
    }

}
*/