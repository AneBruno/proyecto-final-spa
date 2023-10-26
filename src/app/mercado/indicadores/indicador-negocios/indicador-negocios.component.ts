import { Component, OnInit } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-indicador-negocios',
  templateUrl: './indicador-negocios.component.html',
  styleUrls: ['./indicador-negocios.component.scss']
})
export class IndicadorNegociosComponent extends ListadoComponent implements OnInit {

  public chartOptionsPieProducto   : any;
  public chartOptionsPiePuerto     : any;
  public chartOptionsPiePago       : any;
  public ordenes                   : Array<any>=[];
  public ordenes2                  : Array<any>=[];
  public cantTotal                 : number = 0;
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
    this.ordenes = await this.apiService.getData('/mercado/ordenes',{}).toPromise();
    this.ordenes.forEach((orden) => {
      if(orden.estado_id === 3){
        this.ordenes2.push(orden);
      }
    });
    console.log("this.ordenes2", this.ordenes2);
    this.cantTotal = this.ordenes2.length;
    console.log("length", this.cantTotal);

    this.calcularGraficoProducto();
    this.calcularGraficoFormaPago();
    this.calcularGraficoPuerto();

    this.dibujarPieProducto();
    this.dibujarPiePago();
    this.dibujarPiePuerto();
   
  }

  public calcularGraficoProducto(){
    this.ordenes2.forEach((orden) => {
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
    console.log("cant_soja", this.cant_soja);
    console.log("cant_trigo", this.cant_trigo);
  }

  public calcularGraficoPuerto(){
    this.ordenes2.forEach((orden) => {
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
    this.ordenes2.forEach((orden) => {
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

  public dibujarPieProducto(){
    this.chartOptionsPieProducto = {
      animationEnabled: true,
      title: {
      text: "Total Productos",
      fontFamily: "Poppins", 
      fontSize: 22,
      fontWeight: 500
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
      text: "Total Formas de pago",
      fontFamily: "Poppins", 
      fontSize: 22,
      fontWeight: 500
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
      text: "Total Puertos",
      fontFamily: "Poppins", 
      fontSize: 22,
      fontWeight: 500
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

}
