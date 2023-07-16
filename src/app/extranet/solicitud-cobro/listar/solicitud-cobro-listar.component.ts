/*import * as moment             from 'moment';
import { Component           } from '@angular/core';
import { OnInit              } from '@angular/core';
import { ViewChild           } from '@angular/core';
import { ListadoDataSource   } from 'src/app/shared/listado.datasource';
import { ListadoComponent    } from 'src/app/shared/listados/listado.component';
import { TableComponent      } from 'src/app/shared/table/table.component';
import { Utils               } from 'src/app/shared/utils';
import { ExtranetAuthService } from '../../extranet.auth.service';
import { ApiService          } from 'src/app/shared/services/api.service';
import { Router              } from '@angular/router';
import { MessagesService     } from 'src/app/shared/services/messages.service';

@Component({
    selector    : 'app-solicitud-cobro-listar',
    templateUrl : './solicitud-cobro-listar.component.html',
    styleUrls   : ['./solicitud-cobro-listar.component.scss']
})
export class SolicitudCobroListarComponent extends ListadoComponent implements OnInit {

    public filtros           : any = {
        cuit: []
    };
    public multiplesClientes : boolean = false;
    public estadoSolicitudes : Array<any> = [];
    public muestraEstado     : boolean = false;


    @ViewChild('tablaSolicitudes', {static: true})
    public tablaSolicitudes : TableComponent<any>;

    constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        public  authService : ExtranetAuthService,
        private router      : Router,
        private utils       : Utils,
        private messageService : MessagesService,

    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        this.multiplesClientes = this.authService.getLoginData().accounts.length > 1;
        this.dataSource.uri    = `/extranet/solicitudes-cobro`;
        this.dataSource.token  = this.authService.getToken();
        this.estadoSolicitudes = await this.apiService.getData('/extranet/solicitudes-estados', {
            token: this.authService.getToken(),
        }).toPromise();
        console.log("estados",this.estadoSolicitudes)
        console.log("datasource",this.dataSource)

        this.verificarRolUsuario();
        this.setTable();
    }

    setTable() {
        this.addColumn('fecha', 'Fecha', '150px').renderFn((row) =>{
            let fecha = new Date(row.created_at);
            let stringFecha = fecha.toLocaleDateString();
            for (let index = 0; index < 3; index++) {
                stringFecha = stringFecha.replace('/','-');
            }
            return stringFecha;
        });

        if (this.multiplesClientes) {
            this.addColumn('razon_social', 'Razón social', '').renderFn(row => row.razon_social);
        }
        this.addColumn('tipo',        'Tipo',    '170px').renderFn(row => row.tipo);
        this.addColumn('estado',      'Estado',   '100px').renderFn(row => row.estado.descripcion);
        this.addColumn('monto_total', 'Monto',    '250px')
            .renderFn((row) => this.formatMonto(this.obtenerMontoAMostrar(row)))
            .setAlign('right');
        this.addColumn('_acciones',   'Acciones',  '50px').setAsMenu().setAlign('center');
    }

    private obtenerMontoAMostrar(row: any): string {
        if(row.tipo === 'Anticipo'){
            if(this.authService.obtenerRol() === '7'){
                return row.monto_aprobado
            }
            if(this.authService.obtenerRol() === '3' || this.authService.obtenerRol() === '4'){
                if(row.monto_aprobado !== '0.00'){
                    return row.monto_aprobado
                }
            }
        }
        return row.monto_total;
    }

    formatMonto(monto : string) : string {
        let arrayMonto = monto.split('.');
        let enteros    = arrayMonto[0];
        let decimales  = arrayMonto[1];
        enteros        = this.utils.formatNumero(enteros);
        return '$' + enteros + ',' + decimales;
    }

    public refreshList() {
        [
            'fecha_desde',
            'fecha_hasta',
        ].map((name) => {
            if (!this.filtros[name]) {
                this.dataSource.filtros[name] = null;
                return;
            }
            this.dataSource.filtros[name] = moment(this.filtros[name]).format('YYYY-MM-DD');
        });

        if(!this.dataSource.filtros.estado_id || this.dataSource.filtros.estado_id.includes( '' )){
            delete  this.dataSource.filtros["estado_id"];
        }

        this.dataSource.filtros.cuit = this.filtros.cuit.map((x:any) => x.CUIT);

        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }

    public onClearFilters() : void {
        [
            'fecha_desde',
            'fecha_hasta',

        ].map((name: string) => {
            this.filtros[name] = null;
        });

        this.filtros.cuit = [];
    }

    public onRowCheckChange(event : any) : void {

    }

    public async verificarRolUsuario(){
        if(this.authService.getLoginData().Usuario.TipoUsuario === '3'
         || this.authService.getLoginData().Usuario.TipoUsuario === '4'
         || this.authService.getLoginData().Usuario.TipoUsuario === '7'){
            this.muestraEstado = true;
        }
        console.log("roles",this.authService.getLoginData().Usuario.TipoUsuario)
    }

    public clickGestionar(row : any) : void {
        if(row.estado_id === 5){ //Corrección de montos       
            this.messageService.show(
                `El monto aprobado es de ${this.formatMonto(row.monto_aprobado)}. Modifique los montos de los medios de pago para completar ese valor.`,
                'center',
                'Modificar'
            )
            .subscribe((event : any) =>{ 
                if(event){
                    this.router.navigate([`/app/extranet/solicitudes-cobro/gestionar/${row.id}`])
                }      
            });
            return;          
        };         
        this.router.navigate([`/app/extranet/solicitudes-cobro/gestionar/${row.id}`]);
    }

}
*/