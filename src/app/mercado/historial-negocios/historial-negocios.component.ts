import { Component, OnInit } from '@angular/core';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-historial-negocios',
  templateUrl: './historial-negocios.component.html',
  styleUrls: ['./historial-negocios.component.scss'],
  providers   : [ ListadoDataSource ]
})
export class HistorialNegociosComponent extends ListadoComponent implements OnInit {

  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService,
  ) {
    super();
   }

  ngOnInit(): void {
    this.dataSource.uri = '/mercado/historial';
  }

  public onClearFilters() : void {
    /*this.filtroProductos    = null;
    this.filtroPuertos      = null;
    this.filtroCosecha      = null;
    this.filtroFormaPago    = null;
    this.filtros.empresa_id = [];*/
  }

  private setTable() : void {
    this.clearColumns();
  }
}
