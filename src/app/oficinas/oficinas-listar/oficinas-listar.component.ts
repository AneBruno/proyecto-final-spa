import { Component, OnInit } from '@angular/core';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ApiService        } from 'src/app/shared/services/api.service';

@Component({
    selector    :   'oficinas-listar',
    templateUrl :   './oficinas-listar.component.html',
    styleUrls   : [ './oficinas-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class OficinasListarComponent implements OnInit {

    public displayedColumns = ['id','nombre','oficina_madre','_acciones'];

    public constructor(
        public dataSource: ListadoDataSource<any>,
        private client: ApiService,
        private confirm: ConfirmService
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/oficinas';
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará la oficina. Continuar?').subscribe(() => {
            this.client.delete('/oficinas', id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }
}
