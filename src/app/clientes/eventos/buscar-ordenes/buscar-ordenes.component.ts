import * as moment from 'moment';

import { Component         } from '@angular/core';
import { EventEmitter      } from '@angular/core';
import { Inject            } from '@angular/core';
import { OnInit            } from '@angular/core';
import { Output            } from '@angular/core';
import { ViewChild         } from '@angular/core';

import { MatDialogRef      } from '@angular/material/dialog';
import { MAT_DIALOG_DATA   } from '@angular/material/dialog';

import { ApiService        } from 'src/app/shared/services/api.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent  } from 'src/app/shared/listados/listado.component';
import { TableComponent    } from 'src/app/shared/table/table.component';
import { OrdenHelper       } from 'src/app/mercado/orden.helper';
import { map } from 'rxjs/operators';

@Component({
    selector    :   'app-buscar-ordenes',
    templateUrl :   './buscar-ordenes.component.html',
    styleUrls   : [ './buscar-ordenes.component.scss' ]
})
export class BuscarOrdenesComponent extends ListadoComponent implements OnInit {

    @ViewChild('tablaOrdenes')
    public tabla: TableComponent<any>;

    @Output()
    public choosen : EventEmitter<any[]> = new EventEmitter<any[]>();
    
    public estados                 : any[] = [];
    public fechaDesde              : Date;
    public fechaHasta              : Date;
    public puedeAgregar            : boolean = false;
    public filtroProductosOpciones : any = {
        ordenes: {
            uso_frecuente: 'desc',
            nombre: 'asc',
        }
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) 
        public data       : { excluirOrdenesId: any[], empresasId: any[] },
        public dialogRef  : MatDialogRef<BuscarOrdenesComponent>,    
        public dataSource : ListadoDataSource<any>,
        public apiService : ApiService,
    ) {
        super();
        this.dataSource.afterFetch.subscribe(() => {
            this.checkPuedeAgregar();
        });
    }

    public async ngOnInit() {

        this.dataSource.uri = '/mercado/ordenes';
        this.dataSource.fixedFilters.empresa_id = this.data.empresasId;
        this.dataSource.fixedFilters.id_not_in  = this.data.excluirOrdenesId;
        this.dataSource.queryParams = {
            with_relation : 'producto,empresa',
            ordenes: {
                "id": "DESC"
            }
        };

        this.estados = await this.apiService.getData('/mercado/ordenes/estados').toPromise();

        this.tabla.addColumn('orden', '', '').renderFn((row) => {
            return (new OrdenHelper).obtenerAbreviacion(row);
        });
        this.tabla.addColumn('acciones', '', '30px').setAsCheckBox().onClick((row: any, checked: boolean) => {
            this.choosen.emit(row);
        });
    }

    public onClickCerrar() {
        this.dialogRef.close();
    }

    public onClearFilters() {

        this.fechaDesde = null;
        this.fechaHasta = null;
    }

    public configurarFiltros() {
        if (this.fechaDesde) {
            this.dataSource.filtros.fechaDesde = moment(this.fechaDesde).format('YYYY-MM-DD');
        }

        if (this.fechaHasta) {
            this.dataSource.filtros.fechaHasta = moment(this.fechaHasta).format('YYYY-MM-DD');
        }
    }

    public async actualizarDatos() {
        this.configurarFiltros();
        await this.dataSource.refreshData();
    }

    public filtroProductosIconoFn(row: any) : string {
        return row.uso_frecuente ? 'star_outlined' : '';
    }

    public onRowCheckChange(event: any) {
        event.row['__checked'] = event.checked;
        this.checkPuedeAgregar();
    }

    public checkPuedeAgregar() {
        this.puedeAgregar = this.getOrdenesSeleccionadas().length > 0;
    }

    public getOrdenesSeleccionadas() {
        return this.dataSource.currentData.filter((row: any) => {
            return row['__checked'] === true;
        });
    }

    public onClickAgregarSeleccionadas() {
        this.choosen.emit(this.getOrdenesSeleccionadas());
    }
}
