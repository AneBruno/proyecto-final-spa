import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-historial-negocios',
  templateUrl: './historial-negocios.component.html',
  styleUrls: ['./historial-negocios.component.scss'],
  providers   : [ ListadoDataSource ]
})
export class HistorialNegociosComponent extends ListadoComponent implements OnInit {

  public currentUser             : User;
  
  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService,
    private userService        : UserService,
  ) {
    super();
   }

  public async ngOnInit(): Promise<void> {
      this.dataSource.uri = '/mercado/ordenes';
      this.dataSource.queryParams = {
        with_relation : 'puerto,producto,empresa,estado'
      };
      const fixedFilters = {
        posicion_id: {
          notnull: true
        }
      };
      
      this.dataSource.fixedFilters = fixedFilters;

      this.dataSource.ordenes = {
        id: 'desc'
      }

      this.currentUser = this.userService.getUser();
      await this.loadRelatedData();
      this.setTable();

      this.dataSource.refreshData();
      
      
  }



  private setTable() : void {
    this.clearColumns();
    this.addColumn('comprador',     'Empresa compradora', '200px');
    this.addColumn('comprador',     'Empresa vendedora', '200px');
    this.addColumn('producto',      'Producto',       '200px');
    this.addColumn('destino',       'Puerto de destino',   '200px');
    this.addColumn('moneda_precio', 'Precio',    '200px');
    this.addColumn('estado', 'Estado', '100px');
    this.addColumn('_acciones',     'Acciones',   '40px').setAsMenu().setAlign('right');
  }


  public async loadRelatedData(){
    //traer productos, puertos, empresas, etc para filtros.
  }

  public onClearFilters() : void {
    //limpiar todos los filtros
    /*
    this.filtroProductos    = null;
    this.filtroPuertos      = null;
    this.filtroCosecha      = null;
    this.filtroFormaPago    = null;
    this.filtros.empresa_id = [];
     */
  }

  //para filtros de seleccion multiple
  public selecetionChangeMultiple(event : any, filterName : string) : void {
    let filtro : Array<any> = event.source.value;
    if(filtro.length === 0 || filtro.includes( '' )){
        delete  this.dataSource.filtros[filterName];
        this.dataSource.refreshData();
        return;
    }
    this.dataSource.filtros[filterName] = filtro;
    this.dataSource.refreshData();
}

}
