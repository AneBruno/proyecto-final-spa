import { Component, OnInit } from '@angular/core';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';
import { ApiService        } from 'src/app/shared/services/api.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';

@Component({
    selector:    'usuarios-listar',
    templateUrl: './usuarios-listar.component.html',
    styleUrls:   ['./usuarios-listar.component.scss'],
    providers: [
        ListadoDataSource
    ]
})
export class UsuariosListarComponent implements OnInit {

    public displayedColumns: string[] = [];
    public roles: any[] = [];
    public oficinas: any[] = [];

    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        private client             : ApiService,
        private confirm            : ConfirmService,
    ) { }

    ngOnInit(): void {
        this.dataSource.uri = '/usuarios';
        this.dataSource.filtros = {
            busqueda: null,
            rol_id: null,
        };
        this.displayedColumns = [
            'id','nombre_y_apellido', 
            'rol_nombre', 
            'estado', 
            '_acciones'
        ];

        this.client.getData('/roles', {limit:0}).subscribe((data) => {
            this.roles = data;
        });
    }

    public habilitar(usuario: any) {
        this.confirm.ask(`Desea habilitar el usuario ${usuario.nombreCompleto}`).subscribe(() => {
            this.client.post('/usuarios/' + usuario.id + ':habilitar', {habilitar: true}).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }

    public deshabilitar(usuario: any) {
        this.confirm.ask(`Desea deshabilitar el usuario ${usuario.nombreCompleto}?`).subscribe(() => {
            this.client.post('/usuarios/' + usuario.id + ':habilitar', {habilitar: false}).subscribe(resp => {
                this.dataSource.refreshData();
            });
        });
    }
}
