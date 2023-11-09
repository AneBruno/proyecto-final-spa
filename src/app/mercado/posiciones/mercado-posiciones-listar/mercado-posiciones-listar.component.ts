import * as moment from 'moment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput                     } from '@angular/material/input';
import { AuthService                  } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent             } from 'src/app/shared/listados/listado.component';
import { ApiService                   } from 'src/app/shared/services/api.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector    :   'app-mercado-posiciones-listar',
    templateUrl :   './mercado-posiciones-listar.component.html',
    styleUrls   : [ './mercado-posiciones-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class MercadoPosicionesListarComponent extends ListadoComponent implements OnInit {

    @ViewChild('filtroFechaDesde', {
        read: MatInput
    }) filtroFechaDesde?: MatInput;
    @ViewChild('filtroFechaHasta', {
        read: MatInput
    }) filtroFechaHasta?: MatInput;

    public filtros              : any = {};
    public currentUser?          : User;
    public formasPago           : Array<any> = [];
    public puertos              : Array<any> = [];
    public productos             : Array<any> = [];
    public empresas              : Array<any> = [];
    public id_usuario?           : Number;
    public rol_id_usuario?       : Number;
    public fechaActual           : Date     = new Date();
    public fechaDesde?           : Date     ;
    public fechaHasta?           : Date;
    public anioActual            : Number   = this.fechaActual.getFullYear();
    public mesActual             : Number   = this.fechaActual.getMonth() + 1; //Le sumo 1 porque enero es el mes 0
    public filtroProductosOpciones : any = {
        ordenes: {
            nombre: 'asc'
        }
    }

    //Filtros Multiples
    public filtroProductos!    : Array<any>; 
    public filtroPuertos!      : Array<any>;  
    public filtroEstado        : Array<any> = ['activa', 'cerrada'];
    public filtroFormaPago!    : Array<any>;
    public filtroEmpresa!      : Array<any>;


    public constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        public  authService : AuthService,
        private confirm     : ConfirmService,
        private user        : UserService,
        private userService : UserService,
    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        this.dataSource.uri       = '/mercado/posiciones';
        this.dataSource.queryParams = {
            with_relation : 'empresa,usuarioCarga',
        };
        //this.filtros.empresa_id = [];
        this.rol_id_usuario       = (await this.user.fetchUserAsync()).rol.id;
        this.id_usuario           = (await this.user.fetchUserAsync()).id;
        this.currentUser = this.userService.getUser();

        await this.loadRelatedData();
        
        this.addColumn('created_at',    'Fecha',     '50px').renderFn(row => this.formatearFecha(row.created_at));
        this.addColumn('comprador',     'Empresa compradora', '180px').renderFn(row => this.obtenerComprador(row.empresa));
        this.addColumn('producto',      'Producto',       '120px').renderFn(row => row.producto.nombre             );
        //this.addColumn('toneladas', 'Toneladas', '80px').renderFn(row => row.volumen? row.volumen : '0');
        this.addColumn('toneladas', 'Toneladas', '80px').renderFn(row =>  {
            
            const toneladas = parseFloat(row.volumen); // Convierte el valor a número decimal
            if (row.volumen === null || toneladas === 0) {
                return '0'; // Si row.volumen es null, muestra "0"
            }
            // Verifica si los decimales son distintos de cero
            if (toneladas === Math.floor(toneladas)) {
                return Math.floor(toneladas); // Si son iguales a cero, muestra solo el número entero
            } else {
                return toneladas.toFixed(2); // Si son distintos de cero, muestra dos decimales
            }
        });
        this.addColumn('destino',       'Puerto de destino',   '120px').renderFn(row => this.calculaDestino(row)        );
        this.addColumn('forma_pago', 'Forma de Pago', '120px').renderFn(row => row.condicion_pago.descripcion);
        this.addColumn('moneda_precio', 'Precio',    '100px').renderFn(row => `${row.moneda} ${row.precio}`);
        this.addColumn('estado', 'Estado', '80px').renderFn(row => row.estado);
        this.addColumn('_acciones',     'Acciones',   '40px').setAsMenu().setAlign('right');

        this.actualizarDatos();
    }

    public async loadRelatedData() {
      this.puertos = await this.apiService.getData('/puertos', {
          'filtros[estado]': 'todos',
          'limit' : 0,
         }).toPromise();
      this.productos =  await this.apiService.getData('/productos',{
        'ordenes[nombre]': 'asc',
        'limit' : 0,
      }).toPromise();
      this.formasPago = await this.apiService.getAllData('/mercado/condiciones-pago', 
      {ordenes: {descripcion:'DESC'}}).toPromise();
      
      this.buscarEmpresas();
    }

    public buscarEmpresas(busqueda?: any) {
        let filtros: any = {};
        filtros.perfil = "COMPRADOR";
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/clientes/empresas', {
            filtros: filtros,
            ordenes: {
                razon_social:'ASC'
            }
        }).subscribe(data => {
            this.empresas = data;
        });        
    }

    public calculaDestino(row:any) {
        return row.puerto?.nombre;
    }

    public formatearFecha(fecha:any) {
        return moment(fecha).format('DD/MM');
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
      if (this.filtroEstado){
        this.dataSource.filtros.estado = this.filtroEstado;
      }

  }


    public onClearFilters() {
        this.fechaDesde = undefined;
        this.fechaHasta = undefined;
        this.filtroProductos    = [];
        this.filtroPuertos      = [];
        this.filtroEstado       = ['activa', 'cerrada'];
        this.filtroFormaPago    = [];
        this.filtroEmpresa      = [];
        this.actualizarDatos();
    }      

    public estadoPosicion(id:number, estado:string){
        var mensaje;
        mensaje = 'Desea eliminar la posición?';
        this.confirm.ask(mensaje).subscribe(() => {
            this.apiService.patch('/mercado/posiciones/' + id + '/estado', {'estado':estado}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public obtenerComprador(empresa: any): string {
        return empresa.razon_social;
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
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item: any) => item.id);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }

    getEstadoTextoClase(estado: string): string {
        if (estado === 'ACTIVA') {
          return 'estado-activa';
        } else if (estado === 'ELIMINADA') {
          return 'estado-eliminada';
        }else if (estado === 'CERRADA') {
            return 'estado-cerrada';
        }
        // Si no se cumple ninguna condición, no se aplica ninguna clase especial
        return '';
    }

    public isInterno(): any {
        if(this.currentUser?.rol_id===3){
            return true;
        }else{
            return false;
        }
    }

    public isCliente(): any {
        if(this.currentUser?.rol_id===4){
            return true;
        }else{
            return false;
        }
    }
}
