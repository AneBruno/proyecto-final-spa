import { Component, OnInit } from '@angular/core';
import { AuthService       } from 'src/app/auth/shared/services/auth.service';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ListadoComponent  } from 'src/app/shared/listados/listado.component';
import { ApiService        } from 'src/app/shared/services/api.service';
import { ConfirmService    } from 'src/app/shared/services/confirm.service';

@Component({
    selector    :   'productos-listar',
    templateUrl :   './productos-listar.component.html',
    styleUrls   : [ './productos-listar.component.scss' ],
    providers   : [ ListadoDataSource ]
})
export class ProductosListarComponent extends ListadoComponent implements OnInit {

    public constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        private confirm     : ConfirmService,
        public  authService : AuthService,
    ) { 
        super();
    }

    ngOnInit(): void {
        this.dataSource.uri = '/productos';
        this.dataSource.fixedFilters = {
            habilitado: 'todas'
        }

        this.addColumn('id',                   'Id',            '300px').renderFn(row => row.id);
        this.addColumn('nombre',               'Nombre',             '').renderFn(row => row.nombre);
       // this.addColumn('tipo_producto_nombre', 'Tipo Producto', '300px').renderFn(row => row.tipo_producto.nombre);
        this.addColumn('habilitado',           'Habilitado',    '100px').renderFn(row => row.habilitado ? 'Si' : 'No');
        this.addColumn('_acciones',            'Acciones',       '50px').setAsMenu().setAlign('right');
    }

    public deshabilitar(id: number) {
        this.confirm.ask('Deshabilitará el producto. Continuar?').subscribe(() => {
            this.apiService.put('/productos/' + id + '/deshabilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

    public habilitar(id: number) {
        this.confirm.ask('Habilitará el producto. Continuar?').subscribe(() => {
            this.apiService.put('/productos/' + id + '/habilitar', {}).subscribe(() => {
                this.dataSource.refreshData();
            });
        });
    }

}
