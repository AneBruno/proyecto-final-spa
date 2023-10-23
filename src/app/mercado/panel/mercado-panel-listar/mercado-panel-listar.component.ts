import { BreakpointObserver           } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService                  } from 'src/app/auth/shared/services/auth.service';
import { UserService } from 'src/app/auth/shared/services/user.service';
import { ListadoDataSource            } from 'src/app/shared/listado.datasource';
import { ListadoComponent             } from 'src/app/shared/listados/listado.component';
import { User } from 'src/app/shared/models/user.model';
import { ApiService                   } from 'src/app/shared/services/api.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector    :   'app-mercado-panel-listar',
    templateUrl :   './mercado-panel-listar.component.html',
    styleUrls   : [ './mercado-panel-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class MercadoPanelListarComponent extends ListadoComponent implements OnInit, OnDestroy {

    public filtros                 : any = {};
    private interval               : any;
    public  cosechas               : any[] = [];
    public  formasPago             : any[] = [];
    public  puertos                : Array<any> = [];
    public  productos              : Array<any> = [];
    public empresas                : Array<any> = [];
    public currentUser?             : User;
    public animal?: string;
    public name?: string;

    public filtroProductosOpciones : any = {
        ordenes: {
            nombre: 'asc',
        }
    }

    //Filtros Multiples
    public filtroProductos    : Array<any> = [];
    public filtroPuertos      : Array<any> = [];
    public filtroCosecha      : Array<any> = [];
    public filtroFormaPago    : Array<any> = [];
    public filtroEmpresa      : Array<any> = [];


    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        private apiService         : ApiService,
        public  authService        : AuthService,
        private userService        : UserService,
        public dialog              : MatDialog
    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        this.dataSource.uri = '/mercado/panel';
        this.dataSource.queryParams = {
            with_relation : 'usuarioCarga, empresa'
        };
        this.filtros.empresa_id = [];
        this.currentUser = this.userService.getUser();
        await this.loadRelatedData();
        this.formasPago = await this.apiService.getAllData('/mercado/condiciones-pago', {ordenes: {descripcion:'DESC'}}).toPromise();
        this.cosechas   = await this.apiService.getAllData('/mercado/cosechas', {ordenes: {descripcion:'DESC'}}).toPromise();
        this.setTable();
        this.actualizarPeriodicamente();

    }

    private setTable() : void {
        this.clearColumns();
        this.addColumn('comprador',     'Empresa compradora',      '150px').renderFn(row => row.empresa.razon_social             );;
        this.addColumn('producto',      'Producto',  '100px').renderFn(row => row.producto.nombre             );
        this.addColumn('volumen',      'Toneladas',  '100px').renderFn(row => (row.volumen-row.toneladas_cerradas)             );
        this.addColumn('destino',       'Puerto de destino',   '150px').renderFn(row => row.puerto.nombre        );
        this.addColumn('cosecha_nueva', 'Cosecha',    '100px').renderFn(row => row.cosecha.descripcion);
        this.addColumn('forma_pago', 'Forma de Pago', '90px').renderFn(row => row.condicion_pago.descripcion);
        this.addColumn('precio_moneda', 'Precio compra',     '100px').renderFn(row => `${row.moneda} ${row.precio}`).setAlign('right');
        this.addColumn('cantidad_ofertas', 'Oportunidades encontradas', '80px')
        .renderFn(row => {
            return row.cantidad_ofertas === 0 ? '-' : row.cantidad_ofertas;
        })
        .setAlign('right');
        
        //Falta todavía.
        //this.addColumn('toneladas',     'Toneladas',  '80px').renderFn(row => row.toneladas.toString());
        //this.addColumn('_acciones',     'Acciones',   '80px').setAsMenu().setAlign('right');
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

    public concatenaCompradores(listaEmpresas: any) {
        var resultado = listaEmpresas.map((empresa: any) => {
            let razon_social = empresa.razon_social.length > 14 ? empresa.razon_social.substr(0, 14) + '...' : empresa.razon_social;
            return empresa.abreviacion ? empresa.abreviacion : razon_social;
        }).filter((empresa: any, i: any, a: any) => a.indexOf(empresa) == i);
        return resultado.join('\n');
    }

    public obtenerNombreComprador(empresa: any): string {
        return empresa.razon_social;
    }

    //Actualiza el listado del home cada 10segundos asi no queda desactualizado.
    private async actualizarPeriodicamente() {
        this.interval = setInterval(async () => {
            await this.dataSource.refreshData();
        }, 10 * 1000);
    }

    public obtenerNombreEmpresas(grupo:any) {
        grupo.empresas.length > 1 ? this.concatenaCompradores(grupo.empresas) : [this.obtenerNombreComprador(grupo.empresas[0])]
        this.obtenerNombreComprador(grupo.empresas[0]);
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

    public onClearFilters() : void {
        this.filtroProductos    = [];
        this.filtroPuertos      = [];
        this.filtroCosecha      = [];
        this.filtroFormaPago    = [];
        this.filtroEmpresa      = [];
    }

    public refreshList() {
        this.dataSource.filtros.empresa_id = this.filtros.empresa_id.map((item: any) => item.id);
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
