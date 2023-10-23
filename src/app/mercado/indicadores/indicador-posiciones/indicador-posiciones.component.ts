import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-indicador-posiciones',
  templateUrl: './indicador-posiciones.component.html',
  styleUrls: ['./indicador-posiciones.component.scss']
})
export class IndicadorPosicionesComponent extends ListadoComponent implements OnInit {

  public chartOptions         : any;
  public dConfirmada           : { x: Date, y: number }[] = [];
  public dActiva               : { x: Date, y: number }[] = [];
  public dEliminada            : { x: Date, y: number }[] = [];
  public productos            : Array<any> = [];
  public puertos              : Array<any> = [];
  public formas_pago          : Array<any> = [];
  public cosechas             : Array<any> = [];
  public empresas             : Array<any> = [];

  //Filtros
  public filtroPeriodo       : string= '%Y-%m';
  public filtroProducto      : string | null = '';
  public filtroPuerto        : string | null = '';
  public filtroFormaPago     : string | null = '';
  public filtroCosecha       : string | null = '';
  public filtroEmpresa       : string | null = '';
  
  constructor(
    public  dataSource         : ListadoDataSource<any>,
    private apiService         : ApiService,
    private userService        : UserService,
  ) {
    super();
   }

  ngOnInit(): void {
    this.dataSource.uri = '/indicadores/mercado/posiciones';
    this.dataSource.afterFetch.subscribe((data) => {
      this.dConfirmada.length=0;
      this.dActiva.length=0;
      this.dEliminada.length=0;
      console.log('afterFetch this.dataSource.currentData', this.dataSource.currentData);
      if(this.filtroPeriodo ==='%Y-%m-%d'){
        this.dConfirmada.length=0;
        this.dActiva.length=0;
        this.dEliminada.length=0;
        if(this.dataSource.currentData.length > 0){
          this.dataSource.currentData.forEach((elemento)=>{
            const periodo = elemento.periodo;
            const [anioStr, mesStr, diaStr] = periodo.split('-');
            const anio = parseInt(anioStr, 10);
            const mes = parseInt(mesStr, 10);
            const dia = parseInt(diaStr, 10);
            const fecha = new Date(anio, mes - 1, dia);
            this.dConfirmada.push({ x: fecha, y: +elemento.Confirmada });
            this.dActiva.push({ x: fecha, y: +elemento.Activa });
            this.dEliminada.push({ x: fecha, y: +elemento.Eliminada });
            this.dibujarGraficoDiario(); 
          })
        }
      }
      if(this.filtroPeriodo ==='%Y-%m' ){
        this.dConfirmada.length=0;
        this.dActiva.length=0;
        this.dEliminada.length=0;
        if(this.dataSource.currentData.length > 0){
          this.dataSource.currentData.forEach((elemento)=>{
            const periodo = elemento.periodo;
            const [anioStr, mesStr] = periodo.split('-');
            const anio = parseInt(anioStr, 10);
            const mes = parseInt(mesStr, 10);
            const fecha = new Date(anio, mes - 1);
            this.dConfirmada.push({ x: fecha, y: +elemento.Confirmada });
            this.dActiva.push({ x: fecha, y: +elemento.Activa });
            this.dEliminada.push({ x: fecha, y: +elemento.Eliminada });
            this.dibujarGraficoMensual(); 
          })
        }
      } 
      if(this.filtroPeriodo ==='%Y' ){
        this.dConfirmada.length=0;
        this.dActiva.length=0;
        this.dEliminada.length=0;
        if(this.dataSource.currentData.length > 0){
          this.dataSource.currentData.forEach((elemento)=>{
            const periodo = elemento.periodo;
            this.dConfirmada.push({ x: new Date(periodo, 0), y: +elemento.Confirmada });
            this.dActiva.push({ x: new Date(periodo, 0), y: +elemento.Activa });
            this.dEliminada.push({ x: new Date(periodo, 0), y: +elemento.Eliminada });
            this.dibujarGraficoAnual(); 
          })
        }  
      } 
    });
    this.obtenerDatos(); 
    this.setTable();
    this.actualizarDatos();
  }

  public actualizarDatos() {
    this.dataSource.filtros.tipo_periodo = this.filtroPeriodo;
    this.dataSource.filtros.producto_id = this.filtroProducto;
    this.dataSource.filtros.puerto_id = this.filtroPuerto;
    this.dataSource.filtros.condicion_pago_id = this.filtroFormaPago;
    this.dataSource.filtros.cosecha_id = this.filtroCosecha;
    this.dataSource.filtros.empresa_id = this.filtroEmpresa;
    this.dataSource.refreshData();
    if(this.dataSource.currentData.length > 0){
      if(this.filtroPeriodo ==='%Y-%m%-%d' ){
        this.dibujarGraficoDiario(); 
      }
      if(this.filtroPeriodo ==='%Y-%m' ){
        this.dibujarGraficoMensual();
      }
      if(this.filtroPeriodo ==='%Y' ){
        this.dibujarGraficoAnual();
      }
    }
  }

  private setTable(): void {
    this.addColumn('periodo',    'Período',    '100px');
    //this.addColumn('Activa',     'Activas',     '100px');
    this.addColumn('Confirmada', 'Negocios cerradas', '60px');
    this.addColumn('porcentaje_confirmada',      '%',      '120px');
    
    this.addColumn('Activa', 'Sin cerrar', '60px');
    this.addColumn('porcentaje_activa',      '%',      '120px');

    this.addColumn('Eliminada',  'Eliminadas',  '60px');
    this.addColumn('porcentaje_eliminada',      '%',      '120px');
    this.addColumn('Total',      'Total',      '50px');

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
    this.formas_pago =  await this.apiService.getAllData('/mercado/condiciones-pago',   
    {ordenes: {descripcion:'DESC'}}).toPromise();
    this.cosechas =   await this.apiService.getAllData('/mercado/cosechas',   
    {ordenes: {descripcion:'DESC'}}).toPromise();

    let filtros: any = {};
    filtros.perfil = "COMPRADOR";
    this.empresas = await this.apiService.getAllData('/clientes/empresas',{
      filtros: filtros,
      ordenes: {
          razon_social:'ASC'
      }
    }).toPromise();
    
  }

  public onClearFilters() {
    this.filtroPeriodo        = '%Y-%m';
    this.filtroProducto       = null;
    this.filtroPuerto         = null;
    this.filtroFormaPago      = null;
    this.filtroCosecha        = null;
    this.filtroEmpresa        = null;
    this.actualizarDatos();
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

  public onFiltroCosechaChange(event: any): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroCosecha = selectedOption;
  }
    this.actualizarDatos();
  }

  public onFiltroEmpresaChange(event: any): void {
    console.log(event); 
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = event.target.value;
      this.filtroEmpresa = selectedOption;
  }
    this.actualizarDatos();
  }

  public dibujarGraficoMensual() {
    let chart: any;
    this.chartOptions = {
      animationEnabled: true,
      title:{
      text: "Posiciones de compra por período"
      },
      axisX:{
      title:"Períodos",
      valueFormatString: "YYYY-MM",
      intervalType: "month",
      interval: 1
      
      },
      axisY: {
      title: "Posiciones de compra"
      },
      toolTip: {
      shared: true
      },
      legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        } 
        e.chart.render();
      }
      },
      data: [{
      type: "line",
      showInLegend: true,
      name: "Negocios cerrados",
      color: 'green',
      xValueFormatString: "YYYY-MM",
      dataPoints:   this.dConfirmada
      },{
        type: "line",
        showInLegend: true,
        name: "Sin cerrar",
        xValueFormatString: "YYYY-MM",
        color: 'blue',
        dataPoints:   this.dActiva
        },{
          type: "line",
          showInLegend: true,
          name: "Canceladas",
          xValueFormatString: "YYYY-MM",
          color: 'red',
          dataPoints:   this.dEliminada
          }
    ]
    }
  }

  public dibujarGraficoAnual(){
    let chart: any ;
    this.chartOptions = {
      animationEnabled: true,
      title:{
      text: "Posiciones de compra por período"
      },
      axisX:{
      title:"Períodos",
      valueFormatString: "YYYY", 
      intervalType: "month",
      interval : 1  
      },
      axisY: {
      title: "Posiciones de compra"
      },
      toolTip: {
      shared: true
      },
      legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        } 
        e.chart.render();
      }
      },
      data: [{
      type: "line",
      showInLegend: true,
      name: "Negocios cerrados",
      xValueFormatString: "YYYY",
      dataPoints: this.dConfirmada
      },
      {
        type: "line",
        showInLegend: true,
        name: "Sin cerrar",
        xValueFormatString: "YYYY",
        dataPoints: this.dActiva
        },
        {
          type: "line",
          showInLegend: true,
          name: "Eliminadas",
          xValueFormatString: "YYYY",
          dataPoints: this.dEliminada
          }
    ]
    }
  }

  public dibujarGraficoDiario(){
    let chart: any;
    this.chartOptions = {
      animationEnabled: true,
      title:{
      text: "Posiciones de compra por período"
      },
      axisX:{
      title:"Períodos",
      valueFormatString: "DD/MM",
      intervalType: "day",
      interval: 5
      
      },
      axisY: {
      title: "Posiciones de compra"
      },
      toolTip: {
      shared: true
      },
      legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        } 
        e.chart.render();
      }
      },
      data: [{
      type: "line",
      showInLegend: true,
      name: "Negocios cerrados",
      xValueFormatString: "DD/MM",
      color: 'green',
      dataPoints:   this.dConfirmada
      },{
      type: "line",
      showInLegend: true,
      name: "Sin cerrar",
      xValueFormatString: "DD/MM",
      color: 'blue',
      dataPoints:   this.dActiva
      },
      {
        type: "line",
        showInLegend: true,
        name: "Canceladas",
        xValueFormatString: "DD/MM",
        color: 'red',
        dataPoints:   this.dEliminada
        }

    ]
    }
  }
  
  public exportToXLSX(): void {
    // Crear una hoja de cálculo de datos
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.currentData);
  
    // Crear un libro de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Posiciones de compra'); // nnombre de la hoja
    
  
    // Guardar el archivo en formato .xlsx
    XLSX.writeFile(wb, 'posiciones-compra.xlsx');
  }
}
