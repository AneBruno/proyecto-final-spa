import * as moment from 'moment';
import { BreakpointObserver            } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatInput                      } from '@angular/material/input';
import { AuthService                   } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource             } from 'src/app/shared/listado.datasource';
import { ListadoComponent              } from 'src/app/shared/listados/listado.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FechaEntregaHelper } from '../../fecha-entrega.helper';
import { EmpresaHelper } from '../../empresa.helper';

@Component({
    selector    :   'app-mercado-ordenes-listar',
    templateUrl :   './mercado-ordenes-listar.component.html',
    styleUrls   : [ './mercado-ordenes-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class MercadoOrdenesListarComponent extends ListadoComponent implements OnInit {

    @ViewChild('filtroFechaDesde', {
        read: MatInput
    }) filtroFechaDesde: MatInput;
    @ViewChild('filtroFechaHasta', {
        read: MatInput
    }) filtroFechaHasta: MatInput;

    public fechaDesde    : Date;
    public fechaHasta    : Date;
    //public calidades            : any[]    = [];
    public comerciales          : Array<any> = [];
    public puertos              : Array<any> = [];
    public productos            : Array<any> = [];
    public fechaActual          : Date     = new Date();
    public anioActual           : Number   = this.fechaActual.getFullYear();
    public mesActual            : Number   = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
    public estados              : any;
    public rol_id_usuario       : Number;
    private ESTADO_RETIRADA = 4;
    private ESTADO_ELIMINADA = 5;
    public filtroProductosOpciones : any = {
        ordenes: {
            //uso_frecuente: 'desc',
            nombre: 'asc',
        }
    }
    public filtroComercialesOpciones : any = {
        ordenes: {
            id_matches: this.userService.getUser().id,
            rol: [2, 3, 4, 6, 1, 5],
            nombre_completo: 'asc'
        }
    }
    public currentUser: User;

    //Filtros multiples


    public filtroProductos! : Array<any>;
    public filtroPuertos!   : Array<any>;
    //public filtroCalidad!   : Array<any>;
    public filtroComercial  : Array<any>;


    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        public  authService        : AuthService,
        public userService        : UserService,
        private breakPointObserver : BreakpointObserver,
        private apiService         : ApiService,
        private confirm            : ConfirmService,
        private fechaEntregaHelper : FechaEntregaHelper,
        private empresaHelper      : EmpresaHelper,
    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        registerLocaleData( es );
        this.dataSource.autoStart = false;

        this.currentUser = this.userService.getUser();

        this.comerciales          = await this.apiService.getData('/usuarios', {ordenes: {descripcion:'DESC'}}).toPromise();

        await this.loadRelatedData();

        if (this.currentUser.rol.id == 4) {
            this.dataSource.fixedFilters = {
                usuario_carga_id: this.currentUser.id
            }
        }


        this.estados = await this.apiService.getData('/mercado/ordenes/estados').toPromise();
        this.dataSource.uri         = '/mercado/ordenes';
        this.dataSource.queryParams = {
            with_relation : 'puerto,producto,empresa',
            ordenes: {
                "id": "DESC"
            }
        };


        this.breakPointObserver.observe([
            '(max-width: 768px)'
        ]).subscribe(result => {
            this.clearColumns();
            this.addColumn('created_at',    'Fecha',     '120px').renderFn(row => this.formatearFecha(row.created_at));
            this.addColumn('vendedor',      'Vendedor',  '180px').renderFn(row => this.empresaHelper.obtenerNombreEmpresa(row.empresa)).setAsCustom();
            this.addColumn('producto',      'Producto',       '200px').renderFn(row => row.producto.nombre);
            //this.addColumn('entrega',       'Entrega',   '200px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
            this.addColumn('destino',       'Puerto de destino',   '150px').renderFn(row => this.calculaDestino(row));
            this.addColumn('volumen',       'Toneladas',   '50px').renderFn(row => row.volumen).setAsNumber().setAlign('right');
            this.addColumn('precio_moneda', 'Precio',    '100px').renderFn(row => `${row.moneda} ${row.precio}`).setAlign('right');
            this.addColumn('estado',        'Estado',    '120px').renderFn(row => (this.estados.find(estado => estado.id == row.estado_id)).nombre)
            this.addColumn('_acciones',     'Acciones',   '30px').setAsMenu().setAlign('right');

            if (result.matches) {
                this.getColumn('producto' ).setWidth('200px');
                //this.getColumn('entrega'  ).setWidth('200px');
                this.getColumn('destino'  ).setWidth('200px');
                this.getColumn('estado'   ).setWidth('200px');
            }
        });
        this.actualizarDatos();
    }

    public async loadRelatedData() {
      this.puertos = await this.apiService.getData('/puertos', {
          'filtros[estado]': 'todos',
          'limit' : 0,
         }).toPromise();
      this.productos =  await this.apiService.getData('/productos',{
        //'ordenes[uso_frecuente]': 'desc',
        'ordenes[nombre]': 'asc',
        'limit' : 0,
      }).toPromise();
      /*this.calidades = await this.apiService.getData('/calidades', {
          ordenes: {descripcion:'DESC'},
          'limit': 0,
        }).toPromise();*/
    }

    public calculaDestino(row:any) {
        if (row.puerto){
            return row.puerto?.nombre
        } else {
            return row.localidad_destino;
        }
    }

    /*public calculaEntrega(fechaIni: any, fechaFin: any) {
        var mesIni  = Number(fechaIni.substring(5, 7)) - 1;
        var mesFin  = Number(fechaFin.substring(5, 7)) - 1;
        var anioIni = Number(fechaIni.substring(0, 4));
        var anioFin = Number(fechaFin.substring(0, 4));
        var meses     = [
            "ENERO",
            "FEBRERO",
            "MARZO",
            "ABRIL",
            "MAYO",
            "JUNIO",
            "JULIO",
            "AGOSTO",
            "SEPTIEMBRE",
            "OCTUBRE",
            "NOVIEMBRE",
            "DICIEMBRE"
        ];
        if (mesIni === mesFin && anioIni == anioFin) {
            var entrega = mesIni === this.mesActual ? "Disponible" : meses[mesIni];
            return entrega;
        } else {
            return (meses[mesIni] + ' - ' + meses[mesFin]);
        }
    }*/

    public formatearFecha(fecha:any) {
        return moment(fecha).format('DD-MM-YYYY');
    }

    /*public filtroProductosIconoFn(row: any) : string {
        return row.uso_frecuente ? 'star_outlined' : '';
    }*/

    public actualizarDatos() {
        this.configurarFiltros();
        this.dataSource.refreshData();
    }

    public configurarFiltros() {
        if (this.fechaDesde) {
            this.dataSource.filtros.fechaDesde = moment(this.fechaDesde).format('YYYY-MM-DD');
        }

        if (this.fechaHasta) {
            this.dataSource.filtros.fechaHasta = moment(this.fechaHasta).format('YYYY-MM-DD');
        }
    }

    public onClearFilters() {
        this.fechaDesde = null;
        this.fechaHasta = null;

        this.filtroProductos = null;
        this.filtroPuertos   = null;
        //this.filtroCalidad   = null;
        this.filtroComercial = null;
    }


    public estadoPosicion(id:number, estado:number){
      var mensaje;
      if (estado == this.ESTADO_RETIRADA) {
        mensaje = 'Desea retirar la orden?';
      } else if (estado == this.ESTADO_ELIMINADA) {
        mensaje = 'Desea eliminar la orden?';
      }
      this.confirm.ask(mensaje).subscribe(() => {
        this.apiService.patch('/mercado/ordenes/' + id + '/estado', {'estado_id':estado}).subscribe(() => {
            this.dataSource.refreshData();
        });
      });
    }

    isRepresentante() {
        return this.currentUser.rol.id === 4;
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

}
