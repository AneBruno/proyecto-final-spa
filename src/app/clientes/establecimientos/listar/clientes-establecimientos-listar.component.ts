import { Component, Input, OnInit  } from '@angular/core';
import { ConfirmService     } from 'src/app/shared/services/confirm.service';
import { ApiService         } from 'src/app/shared/services/api.service';
import { ListadoDataSource  } from 'src/app/shared/listado.datasource';

@Component({
    selector    :   'clientes-establecimientos-listar',
    templateUrl :   './clientes-establecimientos-listar.component.html',
    styleUrls   : [ './clientes-establecimientos-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class ClientesEstablecimientosListarComponent implements OnInit {

    @Input()
    public empresa_id: number;

    public displayedColumns = ['id', 'nombre', '_acciones'];
    private dataUri: string;

    public constructor(
        public dataSource: ListadoDataSource<any>,
        private apiService: ApiService,
        private confirm: ConfirmService,
    ) { }

    ngOnInit(): void {
        this.dataUri = `/clientes/empresas/${this.empresa_id}/establecimientos`;
        this.dataSource.uri = this.dataUri;
        this.dataSource.fixedFilters = {
            empresa_id: this.empresa_id,
        }
    }

    public borrar(id: number) {
        this.confirm.ask('Borrará el registro. Continuar?').subscribe(() => {
            this.apiService.delete(this.dataUri, id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
}
