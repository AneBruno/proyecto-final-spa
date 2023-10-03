import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-indicador-posiciones',
  templateUrl: './indicador-posiciones.component.html',
  styleUrls: ['./indicador-posiciones.component.scss']
})
export class IndicadorPosicionesComponent extends ListadoComponent implements OnInit {

  public chartOptions         : Array<any> = [];

  //Filtros
  public filtroPeriodo       : string= '%Y-%m';
  
  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService,
    private userService        : UserService,
  ) {
    super();
   }

  ngOnInit(): void {
    //crear componente y cambiar
    this.dataSource.uri = '/indicadores/mercado/ordenes';
    this.dataSource.afterFetch.subscribe((data) => {
      console.log('afterFetch this.dataSource.currentData', this.dataSource.currentData);
    });
    this.obtenerDatos(); 
    this.setTable();
    this.actualizarDatos();
  }

  public actualizarDatos() {
    this.dataSource.filtros.tipo_periodo = this.filtroPeriodo;
    this.dataSource.refreshData();
  }

  private setTable(): void {
    this.addColumn('periodo',    'Período',    '100px');
    //this.addColumn('Activa',     'Activas',     '100px');
    this.addColumn('Confirmada', 'Total Confirmadas', '100px');
    this.addColumn('porcentaje_confirmada',      'Porcentaje',      '100px');
    this.addColumn('Eliminada',  'Eliminadas',  '100px');
    this.addColumn('porcentaje_eliminada',      'Porcentaje',      '100px');
    this.addColumn('Total',      'Total',      '100px');

  }

  public async obtenerDatos(){
    /*this.empresas     = await this.apiService.getData('/clientes/empresas').toPromise();
    this.ordenes      = await this.apiService.getData('/mercado/ordenes').toPromise();
    this.posiciones   = await this.apiService.getData('/mercado/posiciones').toPromise();*/
  }

  public onClearFilters() {
    this.filtroPeriodo       = null;
  }  

  public onFiltroPeriodoChange(event: Event): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroPeriodo = selectedOption;

    }
  
    this.actualizarDatos();
  }
  
}
