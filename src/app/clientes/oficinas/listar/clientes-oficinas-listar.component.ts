import { Component, OnInit, Input } from '@angular/core';
import { ListadoDataSource        } from 'src/app/shared/listado.datasource';
import { ApiService               } from 'src/app/shared/services/api.service';
import { ConfirmService           } from 'src/app/shared/services/confirm.service';

@Component({
    selector    :   'app-clientes-oficinas-listar',
    templateUrl :   './clientes-oficinas-listar.component.html',
    styleUrls   : [ './clientes-oficinas-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})

export class ClientesOficinasListarComponent implements OnInit {

    public displayedColumns = [ 'id', 'nombre', 'telefono', 'departamento', 'provincia', '_acciones' ];
    private dataUri: string;

    @Input() empresa_id: number;

    public constructor(
        public  dataSource : ListadoDataSource<any>,
        private confirm    : ConfirmService,
        private client     : ApiService,
    ) { }

    ngOnInit(): void {
        this.dataUri = `/clientes/empresas/${this.empresa_id}/oficinas`;
        this.dataSource.uri = this.dataUri;
        this.dataSource.fixedFilters = {empresa_id: this.empresa_id};
    }

    public eliminar(id: number) {
        this.confirm.ask('Borrará el registro. Continuar?').subscribe(() => {
            this.client.delete(this.dataUri, id).subscribe(resp=> {
                this.dataSource.refreshData();
            });
        });
    }

}