import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput                     } from '@angular/material/input';
import { AuthService                  } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent             } from 'src/app/shared/listados/listado.component';
import { ApiService                   } from 'src/app/shared/services/api.service';
import { FechaEntregaHelper } from '../../fecha-entrega.helper';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { UserService } from 'src/app/auth/shared/services/user.service';

@Component({
    selector    :   'app-mercado-posiciones-listar',
    templateUrl :   './mercado-posiciones-listar.component.html',
    styleUrls   : [ './mercado-posiciones-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class MercadoPosicionesListarComponent extends ListadoComponent implements OnInit {

    @ViewChild('filtroFechaDesde', {
        read: MatInput
    }) filtroFechaDesde: MatInput;
    @ViewChild('filtroFechaHasta', {
        read: MatInput
    }) filtroFechaHasta: MatInput;

    public filtros              : any = {};
    public formasPago           : Array<any> = [];
    public calidades            : any[]    = [];
    public puertos              : Array<any> = [];
    public productos            : Array<any> = [];
    public id_usuario           : Number;
    public rol_id_usuario       : Number;
    public fechaActual          : Date     = new Date();
    public fechaDesde           : Date     = new Date();
    public fechaHasta           : Date;
    public anioActual           : Number   = this.fechaActual.getFullYear();
    public mesActual            : Number   = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
    public filtroProductosOpciones : any = {
        ordenes: {
            uso_frecuente: 'desc',
            nombre: 'asc',
        }
    }

    //Filtros Multiples
    public filtroProductos!    : Array<any>; 
    public filtroPuertos!      : Array<any>;  
    public filtroCalidad!      : Array<any>; 
    public filtroEstado!       : Array<any>; 
    public filtroEntrega!      : Array<any>; 
    public filtroFormaPago!    : Array<any>;
    public filtroTipoPosicion! : Array<any>;


    public constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        public  authService : AuthService,
        private confirm     : ConfirmService,
        private user        : UserService,
        private fechaEntregaHelper : FechaEntregaHelper,
    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        this.dataSource.uri       = '/mercado/posiciones';
        this.dataSource.queryParams = {
            with_relation : 'empresa',
        };
        this.filtros.empresa_id = [];
        this.rol_id_usuario       = (await this.user.fetchUserAsync()).rol.id;
        this.id_usuario           = (await this.user.fetchUserAsync()).id;

        await this.loadRelatedData();
        this.formasPago = await this.apiService.getAllData('/mercado/condiciones-pago', {ordenes: {descripcion:'DESC'}}).toPromise();


        this.addColumn('tipo',          '',          '100px').setAsFigure();
        this.addColumn('comprador',     'Comprador', '120px').renderFn(row => this.obtenerComprador(row.empresa)).setAsCustom();
        this.addColumn('producto',      'Producto',       '').renderFn(row => row.producto.nombre             );
        this.addColumn('destino',       'Destino',   '150px').renderFn(row => this.calculaDestino(row)        );
        this.addColumn('entrega',       'Entrega',   '150px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
        this.addColumn('calidad',       'Calidad',   '200px').renderFn(row => row.calidad.nombre              );
        this.addColumn('moneda_precio', 'Precio',    '100px').renderFn(row => row.precio? `${row.moneda} ${row.precio}` : "A fijar").setAlign('right');
        this.addColumn('_acciones',     'Acciones',   '80px').setAsMenu().setAlign('right');

        this.actualizarDatos();
    }

    public async loadRelatedData() {
      this.puertos = await this.apiService.getData('/puertos', {
          'filtros[estado]': 'todos',
          'limit' : 0,
         }).toPromise();
      this.productos =  await this.apiService.getData('/productos',{
        'ordenes[uso_frecuente]': 'desc',
        'ordenes[nombre]': 'asc',
        'limit' : 0,
      }).toPromise();
      this.calidades = await this.apiService.getData('/calidades', {
          ordenes: {descripcion:'DESC'},
          'limit': 0,
        }).toPromise();
    }

    public posicionExcepcional(row: any) {
        return row.posicion_excepcional
    }

    public volumenLimitado(row: any) {
        return row.volumen_limitado
    }

    public aTrabajar(row: any) {
        return row.a_trabajar
    }

    public calculaDestino(row:any) {
        if (row.puerto){
            return row.puerto?.nombre;
        } else if (row.establecimiento) {
            return row.establecimiento?.nombre;
        } else {
            return row.localidad_destino;
        }
    }

    public filtroProductosIconoFn(row: any) : string {
        return row.uso_frecuente ? 'star_outlined' : '';
    }

    public formatearFecha(fecha:any) {
        return moment(fecha).format('DD-MM-YYYY');
    }


    public actualizarDatos() {
        this.configurarFiltros();
        this.dataSource.refreshData();
    }

    public configurarFiltros() {
      if (this.fechaDesde) {
          this.dataSource.filtros.fecha_desde = moment(this.fechaDesde).format('YYYY-MM-DD');
      }

      if (this.fechaHasta) {
          this.dataSource.filtros.fecha_hasta = moment(this.fechaHasta).format('YYYY-MM-DD');
      }
  }


    public onClearFilters() {
        this.fechaDesde = null;
        this.fechaHasta = null;
        
        this.filtroProductos    = null;
        this.filtroPuertos      = null;
        this.filtroCalidad      = null;
        this.filtroEstado       = null;
        this.filtroTipoPosicion = null;
        this.filtros.empresa_id = [];
        this.filtroEntrega      = null;
        this.filtroFormaPago    = null;
    }      

    public estadoPosicion(id:number, estado:string){
        var mensaje;
        if (estado == "DENUNCIADA") {
            mensaje = 'Desea denunciar la posición?';
        } else if (estado == "ACTIVA") {
            mensaje = 'Desea retirar la denuncia?';
        } else if (estado == "RETIRADA") {
            mensaje = 'Desea retirar la posición?';
        } else {
            mensaje = 'Desea eliminar la posición?';
        }
        this.confirm.ask(mensaje).subscribe(() => {
            this.apiService.patch('/mercado/posiciones/' + id + '/estado', {'estado':estado}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public obtenerComprador(empresa: any): string {
        let abreviacion = empresa.abreviacion;
        return abreviacion ? abreviacion : empresa.razon_social;
    }

    getPuertoParams() {
        return {
            'filtros[estado]': 'todos'
        };
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

    public refreshList() {
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item) => item.id);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }
}
