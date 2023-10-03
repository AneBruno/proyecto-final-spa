import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import {MatTableModule} from '@angular/material/table';
import { Item } from 'src/app/shared/models/indicadores.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss'],
  providers   : [ ListadoDataSource ]
})
export class IndicadoresComponent extends ListadoComponent implements OnInit {

  items: Item[] = [
    { id: 1, nombre: 'Órdenes de venta' },
    { id: 2, nombre: 'Posiciones de compra' },
    { id: 3, nombre: 'Clientes' }
  ];
  public currentUser          : User;
  public fechaActual          : Date     = new Date();
  public fechaDesde           : Date     ;
  public fechaHasta           : Date;
  public anioActual           : Number   = this.fechaActual.getFullYear();
  public mesActual            : Number   = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
  public empresa              : any;
  public empresas             : Array<any>;
  public ordenes              : Array<any>;
  public posiciones           : Array<any>;
  public chartOptions         : Array<any> = [];

  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService,
    private userService        : UserService,
    private router             : Router
    ) { 
    super();
  }

  public async ngOnInit(): Promise<void> {
    //this.dataSource.uri = '/indicadores/mercado/ordenes';
    /*this.dataSource.afterFetch.subscribe((data) => {
      console.log('afterFetch this.dataSource.currentData', this.dataSource.currentData);
    });*/
    this.currentUser  = this.userService.getUser();
    this.obtenerDatos(); 
    this.setTable();
    this.actualizarDatos();
    
  }

  public actualizarDatos() {
    this.configurarFiltros();
    this.dataSource.refreshData();
  }

  private setTable(): void {
    this.addColumn('nombre',    'Nombre',    '100px');
    /*this.addColumn('periodo',    'Período',    '100px');
    this.addColumn('Total',      'Total',      '100px');
    this.addColumn('Activa',     'Activa',     '100px');
    this.addColumn('Confirmada', 'Confirmada', '100px');
    this.addColumn('Eliminada',  'Eliminada',  '100px');*/

  }

  public async obtenerDatos(){
    this.empresas     = await this.apiService.getData('/clientes/empresas').toPromise();
    this.ordenes      = await this.apiService.getData('/mercado/ordenes').toPromise();
    this.posiciones   = await this.apiService.getData('/mercado/posiciones').toPromise();
  }

  public configurarFiltros() {
    /*if (this.fechaDesde) {
        this.dataSource.filtros.fecha_desde = moment(this.fechaDesde).format('YYYY-MM-DD');
    }

    if (this.fechaHasta) {
        this.dataSource.filtros.fecha_hasta = moment(this.fechaHasta).format('YYYY-MM-DD');
    }*/
  }

  public onClearFilters() {
    this.fechaDesde = null;
    this.fechaHasta = null;
  }  

  redirectToDetails(id: number): void {
    let url: string;

    if(id===1){
      url = `/app/mercado/indicadores/ordenes`;
    }else if (id==2){
      url = `/app/mercado/indicadores/ordenes`;
    }else if(id===3){
      url = `/app/mercado/indicadores/ordenes`;
    }
    // Luego, navegas a la URL utilizando Router.navigate()
    this.router.navigate([url]);
  }


}
