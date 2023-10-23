import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { User } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-indicador-vendedores',
  templateUrl: './indicador-vendedores.component.html',
  styleUrls: ['./indicador-vendedores.component.scss']
})
export class IndicadorVendedoresComponent extends ListadoComponent implements OnInit {

  public currentUser?         : User;
  public chartOptions         : Array<any> = [];
  public productos            : Array<any> = [];
  public puertos              : Array<any> = [];
  public formas_pago          : Array<any> = [];

  //Filtros
  public filtroPeriodo       : string= '%Y-%m';
  public filtroProducto      : string = '';
  public filtroPuerto        : string = '';
  public filtroFormaPago     : string = '';

  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService,
    private userService        : UserService,
  ) { 
    super();
  }

  ngOnInit(): void {
    this.dataSource.uri = '/indicadores/mercado/vendedores';
    this.dataSource.afterFetch.subscribe((data) => {
      console.log('afterFetch this.dataSource.currentData', this.dataSource.currentData);
    });
    this.currentUser  = this.userService.getUser();
    this.obtenerDatos(); 
    this.setTable();
    this.actualizarDatos();
  }

  public actualizarDatos() {
    this.dataSource.filtros.tipo_periodo = this.filtroPeriodo;
    console.log('periodo', this.filtroPeriodo);
    this.dataSource.filtros.producto_id = this.filtroProducto;
    this.dataSource.filtros.puerto_id = this.filtroPuerto;
    this.dataSource.filtros.condicion_pago_id = this.filtroFormaPago;
    this.dataSource.refreshData();
  }

  private setTable(): void {
    this.addColumn('periodo',    'Periodo',    '100px');
    this.addColumn('razon_social',    'Razón social',    '100px');
    this.addColumn('Cerrada',    'Negocios cerrados',    '100px');
    this.addColumn('Activa',    'Sin cerrar',    '100px');
    this.addColumn('Eliminada',    'Eliminadas',    '100px');
    this.addColumn('Total',    'Total de Posiciones',    '30px');
  }

  public async obtenerDatos(){
    /*this.empresas     = await this.apiService.getData('/clientes/empresas').toPromise();*/
    this.productos =  await this.apiService.getData('/productos',{
      'ordenes[nombre]': 'asc',
      'limit' : 0,
    }).toPromise();
    this.puertos =  await this.apiService.getData('/puertos',{
      'ordenes[nombre]': 'asc',
      'limit' : 0,
    }).toPromise();
    this.formas_pago =  await this.apiService.getData('/mercado/condiciones-pago',{
      ordenes: {descripcion:'DESC'}
    }).toPromise();
  }

  public onClearFilters() {
    this.filtroPeriodo       = '%Y-%m';
    this.filtroProducto      = '';
    this.filtroPuerto         = '';
    this.filtroFormaPago      = '';
  }  

  public onFiltroPeriodoChange(event: any): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroPeriodo = selectedOption;
  }
    this.actualizarDatos();
  }

  public onFiltroProductoChange(event: any): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroProducto = selectedOption;
  }
    this.actualizarDatos();
  }

  public onFiltroPuertoChange(event: any): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroPuerto = selectedOption;
  }
    this.actualizarDatos();
  }

  public onFiltroFormaPagoChange(event: any): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroFormaPago = selectedOption;
  }
    this.actualizarDatos();
  }

  public exportToXLSX(): void {
    // Crear una hoja de cálculo de datos
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.currentData);
  
    // Crear un libro de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendedores'); // nnombre de la hoja
  
    // Guardar el archivo en formato .xlsx
    XLSX.writeFile(wb, 'vendedores.xlsx');
  }


}
