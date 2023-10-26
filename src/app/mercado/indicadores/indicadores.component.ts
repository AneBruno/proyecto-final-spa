import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
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
    { id: 3, nombre: 'Clientes compradores' },
    { id: 4, nombre: 'Clientes vendedores' },
    { id: 5, nombre: 'Negocios cerrados' }
  ];
  public currentUser?         : User;
  public fechaActual          : Date     = new Date();
  public fechaDesde?          : Date     ;
  public fechaHasta?          : Date;
  public anioActual           : Number   = this.fechaActual.getFullYear();
  public mesActual            : Number   = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
  public empresa              : any;
  public empresas?            : Array<any>;
  public ordenes?             : Array<any>;
  public posiciones?          : Array<any>;
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
    this.currentUser  = this.userService.getUser();
    this.obtenerDatos(); 
    this.setTable();
    this.actualizarDatos();
    
  }

  public actualizarDatos() {
    this.dataSource.refreshData();
  }

  private setTable(): void {
    this.addColumn('nombre',    'Nombre',    '100px');
  }

  public async obtenerDatos(){
    this.empresas     = await this.apiService.getData('/clientes/empresas').toPromise();
    this.ordenes      = await this.apiService.getData('/mercado/ordenes').toPromise();
    this.posiciones   = await this.apiService.getData('/mercado/posiciones').toPromise();
  }

  redirectToDetails(id: number): void {
    let url: string = '';

    if(id===1){
      url = `/app/mercado/indicadores/ordenes`;
    }else if (id==2){
      url = `/app/mercado/indicadores/posiciones`;
    }else if(id===3){
      url = `/app/mercado/indicadores/clientes`;
    }else if(id===4){
      url = `/app/mercado/indicadores/clientes-vendedores`;
    }else if(id===5){
      url= `/app/mercado/indicadores/negocios`;
    }
    this.router.navigate([url]);
  }


}
