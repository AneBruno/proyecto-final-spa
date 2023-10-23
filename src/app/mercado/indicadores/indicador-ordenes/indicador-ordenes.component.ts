  import { Component, OnInit } from '@angular/core';
  import { UserService } from 'src/app/auth/shared/services/user.service';
  import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
  import { ListadoComponent } from 'src/app/shared/listados/listado.component';
  import { User } from 'src/app/shared/models/user.model';
  import { ApiService } from 'src/app/shared/services/api.service';
  import * as CanvasJS from 'canvasjs';
  import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
  import * as XLSX from 'xlsx';


  @Component({
    selector: 'app-indicador-ordenes',
    templateUrl: './indicador-ordenes.component.html',
    styleUrls: ['./indicador-ordenes.component.scss']
  })
  export class IndicadorOrdenesComponent extends ListadoComponent implements OnInit {
    
    public currentUser?          : User;
    public chartOptions          : any;
    public chartOptionsPieProducto2  : any;
    public chartOptionsPiePuerto : any;
    public chartOptionsPiePago   : any;
    public dConfirmada           : { x: Date, y: number }[] = [];
    public dActiva               : { x: Date, y: number }[] = [];
    public dEliminada            : { x: Date, y: number }[] = [];
    public cantTotal             : number= 0;
    public productos             : Array<any> = [];
    public puertos               : Array<any> = [];
    public formas_pago           : Array<any> = [];
    public empresas              : Array<any> = [];
    public periodo_filtro        : any =null;
    public ordenes               : Array<any>=[];

    //Filtros
    public filtroPeriodo       : string= '%Y-%m';
    public filtroProducto      : string | null = '';
    public filtroPuerto        : string | null = '';
    public filtroFormaPago     : string | null = '';
    //public filtroCosecha       : string | null = '';
    public filtroEmpresa       : string | null = '';
    
    //productos
    public cant_cebada  : number = 0;
    public cant_girasol : number = 0;
    public cant_maiz    : number = 0;
    public cant_sorgo   : number = 0;
    public cant_soja    : number = 0;
    public cant_trigo   : number = 0;
    public cant_otros   : number = 0;

    //pago
    public cant_contado          : number = 0;
    public cant_anticipo         : number = 0;
    public cant_contraentrega    : number = 0;
    public cant_formapago_otros  : number = 0;

    //puertos
    public cant_ros_norte       :number = 0;
    public cant_ros_sur         :number = 0;
    public cant_bahia           :number = 0;
    public cant_necochea        :number = 0;
    public cant_puertos_otros   :number = 0;

    constructor(
      public  dataSource         : ListadoDataSource<any>,
      private apiService         : ApiService
    ) { 
      super();
    }

    public async ngOnInit(): Promise<void> {
      this.obtenerDatos(); 
      this.dataSource.uri = '/indicadores/mercado/ordenes';
      this.dataSource.afterFetch.subscribe((data) => {
        this.dConfirmada.length=0;
        this.dActiva.length=0;
        this.dEliminada.length=0;
        console.log('afterFetch this.dataSource.currentData', this.dataSource.currentData);
        if(this.filtroPeriodo ==='%Y-%m-%d'){
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
        if(this.filtroPeriodo ==='%Y-%m'){
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
        if(this.filtroPeriodo ==='%Y'){
          this.dataSource.currentData.forEach((elemento)=>{
            const periodo = elemento.periodo;
            this.dConfirmada.push({ x: new Date(periodo, 0), y: +elemento.Confirmada });
            this.dActiva.push({ x: new Date(periodo, 0), y: +elemento.Activa });
            this.dEliminada.push({ x: new Date(periodo, 0), y: +elemento.Eliminada });       
            this.dibujarGraficoAnual(); 
          })
        }         
      });
      this.dibujarPieProducto2();
      this.dibujarPiePago();
      this.dibujarPiePuerto();
      this.setTable();
      this.actualizarDatos();
    }

    public actualizarDatos() {
      this.dataSource.filtros.tipo_periodo = this.filtroPeriodo;
      this.dataSource.filtros.producto_id = this.filtroProducto;
      this.dataSource.filtros.puerto_id = this.filtroPuerto;
      this.dataSource.filtros.condicion_pago_id = this.filtroFormaPago;
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

    public dibujarGraficoMensual() {
      let chart: any;
      this.chartOptions = {
        animationEnabled: true,
        title:{
        text: "Órdenes de venta por período"
        },
        axisX:{
        title:"Períodos",
        valueFormatString: "YYYY-MM",
        intervalType: "month",
        interval: 1
        
        },
        axisY: {
        title: "Órdenes de venta"
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
        text: "Órdenes de venta por período"
        },
        axisX:{
        title:"Períodos",
        valueFormatString: "YYYY", 
        intervalType: "month",
        interval : 1  
        },
        axisY: {
        title: "Órdenes de venta"
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
        xValueFormatString: "YYYY",
        dataPoints: this.dConfirmada
        },
        {
          type: "line",
          showInLegend: true,
          name: "Sin cerrar",
          xValueFormatString: "YYYY",
          color: 'blue',
          dataPoints: this.dActiva
          },
          {
            type: "line",
            showInLegend: true,
            name: "Eliminadas",
            color: 'red',
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
        text: "Órdenes de venta por período"
        },
        axisX:{
        title:"Períodos",
        valueFormatString: "DD/MM",
        intervalType: "day",
        interval: 5
        
        },
        axisY: {
        title: "Órdenes de ventaa"
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

    public dibujarPieProducto2(){
      this.chartOptionsPieProducto2 = {
        animationEnabled: true,
        title: {
        text: "Total Productos"
        },
        data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: ((this.cant_cebada * 100)/this.cantTotal), name: "Cebada", color:'green' },
          { y: ((this.cant_girasol * 100)/this.cantTotal), name: "Girasol", color:'orange'  },
          { y: ((this.cant_maiz *100)/ this.cantTotal), name: "Maiz" , color: 'red'},
          { y: ((this.cant_soja *100)/ this.cantTotal), name: "Soja" },
          { y: ((this.cant_sorgo *100)/ this.cantTotal), name: "Sorgo" },
          { y: ((this.cant_trigo *100)/ this.cantTotal), name: "Trigo" },
          { y: ((this.cant_otros *100)/ this.cantTotal), name: "Otros" },
        ]
        }]
      }	
    }

    public dibujarPiePago(){
      this.chartOptionsPiePago = {
        animationEnabled: true,
        title: {
        text: "Total Formas de pago"
        },
        data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: ((this.cant_contado * 100)/this.cantTotal), name: "Contado", color:'green' },
          { y: ((this.cant_anticipo * 100)/this.cantTotal), name: "Anticipo", color:'orange'  },
          { y: ((this.cant_contraentrega *100)/ this.cantTotal), name: "Contra entrega" , color: 'red'},
          { y: ((this.cant_formapago_otros *100)/ this.cantTotal), name: "Otros" },
        ]
        }]
      }	
    }

    public dibujarPiePuerto(){
      this.chartOptionsPiePuerto = {
        animationEnabled: true,
        title: {
        text: "Total Puertos"
        },
        data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: [
          { y: ((this.cant_ros_norte * 100)/this.cantTotal), name: "Rosario norte", color:'green' },
          { y: ((this.cant_ros_sur * 100)/this.cantTotal), name: "Rosario sur", color:'orange'  },
          { y: ((this.cant_bahia *100)/ this.cantTotal), name: "Bahía blanca" , color: 'red'},
          { y: ((this.cant_necochea *100)/ this.cantTotal), name: "Quequén/Necochea", color: 'purple'},
          { y: ((this.cant_puertos_otros *100)/ this.cantTotal), name: "Otros" },
        ]
        }]
      }	
    }

    private setTable(): void {
      this.addColumn('periodo',    'Período',    '100px');
      //this.addColumn('Activa',     'Activas',     '100px');
      this.addColumn('Confirmada', 'Negocios cerrados', '60px');
      this.addColumn('porcentaje_confirmada',      '%',      '120px');

      this.addColumn('Activa', 'Sin cerrar', '60px');
      this.addColumn('porcentaje_activa',      '%',      '120px');

      this.addColumn('Eliminada',  'Eliminadas',  '60px');
      this.addColumn('porcentaje_eliminada',      '%',      '120px');
      this.addColumn('Total',      'Total',      '50px');

      
    }

    public async obtenerDatos(){
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
      let filtros: any = {};
      filtros.perfil = "VENDEDOR";
      this.empresas = await this.apiService.getAllData('/clientes/empresas',{
        filtros: filtros,
        ordenes: {
            razon_social:'ASC'
        }
      }).toPromise();
      this.ordenes = await this.apiService.getData('/mercado/ordenes',{}).toPromise();
      console.log("this.ordenes", this.ordenes);
      this.cantTotal = this.ordenes.length;

      this.calcularGraficoProducto();
      this.calcularGraficoFormaPago();
      this.calcularGraficoPuerto();
      console.log("length", this.cantTotal);

      this.dibujarPieProducto2();
      this.dibujarPiePago();
      this.dibujarPiePuerto();
    }

    public onClearFilters() {
      this.filtroPeriodo        = '%Y-%m';
      this.filtroProducto       = '';
      this.filtroPuerto         = '';
      this.filtroFormaPago      = '';
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

    public onFiltroEmpresaChange(event: any): void {
      //console.log(event); 
      if (event.target instanceof HTMLSelectElement) {
        const selectedOption = event.target.value;
        this.filtroEmpresa = selectedOption;
    }
      this.actualizarDatos();
    }

    public exportToXLSX(): void {
      // Crear un libro de Excel
      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      // Crear una hoja de cálculo de datos
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.currentData);
  
      // Agregar información adicional antes de los datos
      if(this.filtroPeriodo==='%Y-%m'){
        this.periodo_filtro='Mensual';
      }
      if(this.filtroPeriodo==='%Y'){
        this.periodo_filtro='Anual';
      }
      if(this.filtroPeriodo==='%Y-%m-%d'){
        this.periodo_filtro='Por día';
      }
      //ws['J1'] = { v: 'Período: ' + (this.filtroPeriodo ? this.periodo_filtro : '-') };
      //ws['J2'] = { v: 'Empresa: ' + (this.filtroEmpresa ? this.filtroEmpresa : '-') };
  
      // Agregar la hoja al libro de Excel
      XLSX.utils.book_append_sheet(wb, ws, 'Órdenes'); // Nombre de la hoja
  
      // Guardar el archivo en formato .xlsx
      XLSX.writeFile(wb, 'ordenes-venta.xlsx');
    }

    public calcularGraficoProducto(){
      this.ordenes.forEach((orden) => {
        if(orden.producto_id ===1){
          this.cant_soja      += 1;
        }else
        if(orden.producto_id ===2){
          this.cant_maiz     += 1;
        }else
        if(orden.producto_id ===3){
          this.cant_trigo     += 1;
        }else
        if(orden.producto_id ===4){
          this.cant_cebada      += 1;
        } else
        if(orden.producto_id ===5){
          this.cant_girasol     += 1;
        } else
        if(orden.producto_id ===6){
          this.cant_sorgo      += 1;
        }else{
          this.cant_otros += 1;
        }
      });
    }

    public calcularGraficoPuerto(){
      this.ordenes.forEach((orden) => {
        if(orden.puerto_id ===1){
          this.cant_ros_norte   += 1;
        }else
        if(orden.puerto_id ===2){
          this.cant_ros_sur     += 1;
        }else
        if(orden.puerto_id ===3){
          this.cant_bahia       += 1;
        }else
        if(orden.puerto_id ===4){
          this.cant_necochea     += 1;
        }
        else{
          this.cant_puertos_otros += 1;
        }
      });
    }

    public calcularGraficoFormaPago(){
      this.ordenes.forEach((orden) => {
        if(orden.condicion_pago_id ===1){
          this.cant_contado      += 1;
        }else
        if(orden.condicion_pago_id ===2){
          this.cant_anticipo     += 1;
        }else
        if(orden.condicion_pago_id ===3){
          this.cant_contraentrega     += 1;
        }else{
          this.cant_formapago_otros += 1;
        }
      });
    }
  }
