import { BreakpointObserver           } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService                  } from 'src/app/auth/shared/services/auth.service';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent             } from 'src/app/shared/listados/listado.component';
import { User } from 'src/app/shared/models/user.model';
import { ApiService                   } from 'src/app/shared/services/api.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { FechaEntregaHelper           } from '../../fecha-entrega.helper';
import { MatDialog } from '@angular/material/dialog';
import { RetirarEliminarPosicionComponent } from '../carteles/retirar-eliminar-posicion/retirar-posicion.component';

@Component({
    selector    :   'app-mercado-panel-listar',
    templateUrl :   './mercado-panel-listar.component.html',
    styleUrls   : [ './mercado-panel-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class MercadoPanelListarComponent extends ListadoComponent implements OnInit, OnDestroy {

    public filtros                 : any = {};
    private interval               : any;
    public  calidades              : any[] = [];
    public  cosechas               : any[] = [];
    public  formasPago             : any[] = [];
    public  puertos                : Array<any> = [];
    public  productos              : Array<any> = [];
    public currentUser             : User;
    public animal: string;
    public name: string;

    public filtroProductosOpciones : any = {
        ordenes: {
            uso_frecuente: 'desc',
            nombre: 'asc',
        }
    }

    //Filtros Multiples
    public filtroProductos!    : Array<any>;
    public filtroPuertos!      : Array<any>;
    public filtroEntrega!      : Array<any>;
    public filtroCalidad!      : Array<any>;
    public filtroCosecha!      : Array<any>;
    public filtroFormaPago!    : Array<any>;
    public filtroTipoPosicion! : Array<any>;


    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        private apiService         : ApiService,
        public  authService        : AuthService,
        private fechaEntregaHelper : FechaEntregaHelper,
        private userService        : UserService,
        private confirm            : ConfirmService,
        public dialog              : MatDialog
    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        this.dataSource.uri = '/mercado/panel';
        this.filtros.empresa_id = [];


        this.currentUser = this.userService.getUser();

        await this.loadRelatedData();

        this.formasPago = await this.apiService.getAllData('/mercado/condiciones-pago', {ordenes: {descripcion:'DESC'}}).toPromise();
        console.log('formaspago' ,this.formasPago);
        this.cosechas   = await this.apiService.getAllData('/mercado/cosechas', {ordenes: {descripcion:'DESC'}}).toPromise();

        this.setTable();
        
        this.actualizarPeriodicamente();

    }

    private setTable() : void {
        this.clearColumns();
        this.addColumn('tipo',          '',      '100px').setAsFigure();
        this.addColumn('comprador',     'Comprador',      '').setAsCustom();
        this.addColumn('producto',      'Producto',  '200px').renderFn(row => row.producto.nombre             );
        this.addColumn('destino',       'Destino',   '150px').renderFn(row => this.calculaDestino(row)        );
        this.addColumn('entrega',       'Entrega',   '100px').renderFn(row => this.fechaEntregaHelper.calculaEntrega(row));
        this.addColumn('calidad',       'Calidad',   '100px').renderFn(row => row.calidad.nombre              );
        this.addColumn('cosecha_nueva', 'Cosecha',    '50px').renderFn(row => this.DescripcionCosecha(row));
        this.addColumn('forma_pago', 'Forma de Pago', '120px').renderFn(row => row.condicion_pago.descripcion);
        this.addColumn('precio_moneda', 'Compra',     '80px').renderFn(row => row.precio ? `${row.moneda} ${row.precio}` : "A fijar").setAlign('right');
        this.addColumn('ofertas',       'Venta',    '80px').renderFn(row => row.ofertas == 0 ? 0 : `${row.moneda} ${row.ofertas}`).setAlign('right');
        this.addColumn('toneladas',     'Toneladas',  '100px').renderFn(row => row.toneladas.toString()).setAlign('right');
        this.addColumn('_acciones',     'Acciones',   '80px').setAsMenu().setAlign('right');
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

    public concatenaCompradores(listaEmpresas: any) {
        var resultado = listaEmpresas.map((empresa) => {
            let razon_social = empresa.razon_social.length > 14 ? empresa.razon_social.substr(0, 14) + '...' : empresa.razon_social;
            return empresa.abreviacion ? empresa.abreviacion : razon_social;
        }).filter((empresa, i, a) => a.indexOf(empresa) == i);
        return resultado.join('\n');
    }

    public obtenerNombreComprador(empresa: any): string {
        return empresa.abreviacion ? empresa.abreviacion : empresa.razon_social;
    }

    public DescripcionCosecha(row: any){
        for (const cosecha of this.cosechas) {
            if (cosecha.id == row.cosecha_id) {
                return cosecha.descripcion;
            }
        }
    }


    private async actualizarPeriodicamente() {
        this.interval = setInterval(async () => {
            await this.dataSource.refreshData();
        }, 10 * 1000);
    }

    public calculaDestino(row:any) {
        if (row.puerto.id){
            return row.puerto?.nombre;
        } else if (row.establecimiento.id) {
            return row.establecimiento?.nombre;
        } else {
            return row.localidad_destino;
        }
    }

    public calcularTipo(row:any){
        if (row.puerto.id){
            return 'Exportación';
        } else {
            return 'Consumo interno';
        }
    }

    public filtroProductosIconoFn(row: any) : string {
        return row.uso_frecuente ? 'star_outlined' : '';
    }

    public getEstadoPosicion (row:any) {
        if (row.posiciones.some(posicion => posicion.estado === 'DENUNCIADA')) {
            return 'denunciada';
        }
        if (row.establecimiento.id) {
            return 'importacion';
        }
        if (row.puerto.id) {
            return 'exportacion';
        }
    }

    public obtenerNombreEmpresas(grupo:any) {
        grupo.empresas.length > 1 ? this.concatenaCompradores(grupo.empresas) : [this.obtenerNombreComprador(grupo.empresas[0])]
    }

    getPuertoParams() {
        return {
            'filtros[estado]': 'todos'
        };
    }

    denunciarPosiciones (posiciones : any[any]) {
            this.confirm.ask('Desea denunciar todas las posiciones?').subscribe(() => {
            posiciones.forEach(posicion => {
                if (posicion.estado !== 'DENUNCIADA') {
                    this.apiService.patch('/mercado/posiciones/' + posicion.id + '/estado', {'estado':'DENUNCIADA'}).subscribe(() => {
                        this.dataSource.refreshData();
                    });
                }
            });
        });
    }

    retirarPosicion (posiciones: any[], moneda:String) {
      const dialogRef = this.dialog.open(RetirarEliminarPosicionComponent, {
        width: '400px',
        data: {posiciones: posiciones, monedaPosicion: moneda, accion:'Retirar'}
      });

      dialogRef.componentInstance.posicionElegida.subscribe((idPosicionElegida) => {
          this.apiService.patch('/mercado/posiciones/' + idPosicionElegida + '/estado', {'estado':'RETIRADA'}).subscribe(() => {
              this.dataSource.refreshData();
          });
      });

    }

    eliminarPosicion (posiciones: any[], moneda: String) {
      const dialogRef = this.dialog.open(RetirarEliminarPosicionComponent, {
        width: '400px',
        data: {posiciones: posiciones, monedaPosicion: moneda, accion:'Eliminar'}
      });

      dialogRef.componentInstance.posicionElegida.subscribe((idPosicionElegida) => {
          this.apiService.patch('/mercado/posiciones/' + idPosicionElegida + '/estado', {'estado':'ELIMINADA'}).subscribe(() => {
              this.dataSource.refreshData();
          });
      });

    }

    public puedeDenunciarPosicion(grupo: any): boolean {
        return grupo.posiciones.filter(posicion => posicion.estado === "DENUNCIADA").length < grupo.posiciones.length;
    }

    public posicionExcepcional(grupo: any) {
        return grupo.posiciones.filter(posicion => posicion.posicion_excepcional === 1).length > 0;
    }

    public volumenLimitado(grupo: any) {
        return grupo.posiciones.filter(posicion => posicion.volumen_limitado === 1).length > 0;
    }

    public aTrabajar(grupo: any) {
        return grupo.posiciones.filter(posicion => posicion.a_trabajar === 1).length > 0;
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

    public onClearFilters() : void {
        this.filtroTipoPosicion = null;
        this.filtroProductos    = null;
        this.filtroPuertos      = null;
        this.filtroCalidad      = null;
        this.filtroCosecha      = null;
        this.filtroFormaPago    = null;
        this.filtroEntrega      = null;
        this.filtros.empresa_id = [];
    }

    public refreshList() {
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item) => item.id);
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}

export interface PosicionesData {
  posiciones: any[];
  monedaPosicion: String;
  accion: String;
}
