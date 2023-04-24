import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-cosechas-listar',
  templateUrl: './cosechas-listar.component.html',
  styleUrls: ['./cosechas-listar.component.scss']
})
export class CosechasListarComponent extends ListadoComponent implements OnInit {

    public constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        private confirm     : ConfirmService,
        public  authService : AuthService,
    ) { 
        super();
    }

    ngOnInit(): void {
        this.dataSource.uri = '/mercado/cosechas';
        this.dataSource.ordenes = {descripcion: 'DESC'};
        //this.dataSource.fixedFilters = {borrados: 1}

        this.addColumn('id',                   'Id',            '100px').renderFn(row => row.id);
        this.addColumn('descripcion',          'Descripción',        '').renderFn(row => row.descripcion);
        this.addColumn('habilitado',           'Habilitado',    '100px').renderFn(row => row.habilitado ? 'Si' : 'No');
        this.addColumn('_acciones',            'Acciones',       '50px').setAsMenu().setAlign('right');
    }

    public deshabilitar(row: any) {
        this.confirm.ask('Deshabilitará la cosecha. Continuar?').subscribe(() => {
            row.habilitado = 0;
            this.apiService.put('/mercado/cosechas' + '/' + row.id, row).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public habilitar(row: any) {
        this.confirm.ask('Habilitará la cosecha. Continuar?').subscribe(() => {
            row.habilitado = 1;
            this.apiService.put('/mercado/cosechas' + '/' + row.id, row).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

}
