import { Component, OnInit } from '@angular/core';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
  providers   : [ ListadoDataSource ]
})
export class IndicadoresComponent extends ListadoComponent implements OnInit {

  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService
    ) { 
    super();
  }

  ngOnInit(): void {
    this.dataSource.uri = '/mercado/indicadores';

    this.addColumn('nombre',          'Nombre',        '').renderFn(row => row.id ? '-' : '-');
    this.addColumn('periodo',           'Período',    '100px').renderFn(row => row.id ? '-' : '-');
    this.addColumn('valor',            'Valor',       '100px').renderFn(row => row.id ? '-' : '-');
  }

  public onClearFilters() : void {
  }

  private setTable() : void {
    this.clearColumns();
  }

}
