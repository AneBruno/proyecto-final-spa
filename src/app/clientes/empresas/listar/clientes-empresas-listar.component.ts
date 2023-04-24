import { Component, OnInit,  } from '@angular/core';
import { ApiService          } from 'src/app/shared/services/api.service';
import { AuthService         } from 'src/app/auth/shared/services/auth.service';
import { ConfirmService      } from 'src/app/shared/services/confirm.service';
import { ListadoComponent    } from 'src/app/shared/listados/listado.component';
import { ListadoDataSource   } from 'src/app/shared/listado.datasource';

@Component({
    selector    :   'clientes-empresas-listar',
    templateUrl :   './clientes-empresas-listar.component.html',
    styleUrls   : [ './clientes-empresas-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class ClientesEmpresasListarComponent extends ListadoComponent implements OnInit {

    public displayedColumns     : string[] = [];
    public actividades          : any[]  = [];
    public categorias           : any[]  = [];
    public usuarios             : any[]  = [];
    public usuarioLogueado      : any;
    public rol_usuarioLogueado  : Number;
    public accesoDeshabilitar   : boolean = false;
    public accesoHabilitar      : boolean = true;

    public constructor(
        public  dataSource         : ListadoDataSource<any>,
        public  authService        : AuthService,
        private apiService         : ApiService,
        private confirm            : ConfirmService,
    ) { 
        super();
    }

    public async ngOnInit(): Promise<void> {
        
        this.accesoDeshabilitar  = this.authService.tieneAcceso('empresas_deshabilitar');
        this.accesoHabilitar     = this.authService.tieneAcceso('empresas_habilitar'   );        

        this.dataSource.uri      = '/clientes/empresas';

        this.actividades         = await this.apiService.getData('/clientes/actividades', { limit : 0 }).toPromise();
        this.categorias          = await this.apiService.getData('/clientes/categorias',  { limit : 0 }).toPromise();
        this.usuarioLogueado     = await this.apiService.getData('/auth/getUser'                       ).toPromise();
        this.rol_usuarioLogueado = this.usuarioLogueado.rol.id;

        this.usuarios = await this.apiService.getData('/usuarios', {
            filtros: {
                rol_id: [2,3,4]
            },
            limit:0
        }).toPromise();

        this.addColumn('cuit',         'Cuit',         '150px').renderFn(row => row.cuit);
        this.addColumn('razon_social', 'Razón social',      '').renderFn(row => row.razon_social);
        this.addColumn('habilitada',   'Habilitada',   '100px').renderFn(row => row.habilitada ? 'Si' : 'No').setAlign('center');
        this.addColumn('_acciones',    'Acciones',      '60px').setAsMenu().setAlign('right');
    }

    public deshabilitar(id: number) {
        this.confirm.ask('Deshabilitará la empresa. Continuar?').subscribe(() => {
            this.apiService.put(`/clientes/empresas/${id}/deshabilitar`, {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public async habilitar(id: number) {
        let respuesta = await this.apiService.getData(`/clientes/empresas/${id}/archivos/completos`).toPromise();
        if (respuesta.resultado === false) {
            await this.confirm.askAsync('La empresa no posee al menos un archivo de cada tipo. Continuar?');
        } else {
            await this.confirm.askAsync('Habilitará la empresa. Continuar?');
        }
        
        await this.apiService.put(`/clientes/empresas/${id}/habilitar`, {}).toPromise();
        this.dataSource.refreshData();
    }
}
