import { Component, Input, OnInit } from '@angular/core';
import { ConfirmService           } from 'src/app/shared/services/confirm.service';
import { ApiService               } from 'src/app/shared/services/api.service';
import { ListadoDataSource        } from 'src/app/shared/listado.datasource';

@Component({
    selector    :   'clientes-contactos-listar',
    templateUrl :   './clientes-contactos-listar.component.html',
    styleUrls   : [ './clientes-contactos-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class ClientesContactosListarComponent implements OnInit {

    public displayedColumns = [];
    public empresas : any[] = [];    

    @Input()
    public empresa_id: number;

    public constructor(
        public  dataSource : ListadoDataSource<any>,
        private apiService : ApiService,
        private confirm    : ConfirmService,
    ) { }

    ngOnInit(): void {
        this.loadEmpresas();
        this.dataSource.uri = '/clientes/contactos';
        if (this.empresa_id) {
            this.dataSource.fixedFilters = {
                empresa_id : this.empresa_id || undefined,
            };
        }
        if(!this.empresa_id){
            this.displayedColumns = ['nombre', 'email', 'telefono_celular', 'empresa','cargoNombre', '_acciones'];
        } else {
            this.displayedColumns = ['nombre', 'email', 'telefono_celular','cargoNombre', '_acciones'];
        }
    }

    private async loadEmpresas(): Promise<void>  {
        this.empresas = await this.apiService.getData('/clientes/empresas').toPromise();
    }
    

    public borrar(id: number) {
        this.confirm.ask('Borrará el contacto. Continuar?').subscribe(() => {
            this.apiService.delete('/clientes/contactos', id).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }
}
