import { ActivatedRoute, Router } from '@angular/router';
import { Component,      OnInit } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { UserService            } from 'src/app/auth/shared/services/user.service';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector: 'clientes-empresas-editar',
    templateUrl: './clientes-empresas-editar.component.html',
    styleUrls: ['./clientes-empresas-editar.component.scss']
})
export class ClientesEmpresasEditarComponent extends FormBaseLocalizacionComponent implements OnInit {

    public id                       : number;    
    public title                    : string = 'Agregar Empresa'
    public usuarios                 : any[]  = [];
    public actividades              : any[]  = [];
    public categorias               : any[]  = [];
    public perfil                   : string;
    public mostrarComisionComprador : boolean = false;
    public mostrarComisionVendedor  : boolean = false;
    public isNotAdministrador         : boolean;

    cuitError = '';
    cuitValue = '';

    public constructor(        
        private router      : Router,
        private route       : ActivatedRoute,
        private userService : UserService,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watchRoute();
        this.loadActividades();
        this.loadUsuarios();
        this.createForm();

        let user =  this.userService.getUser();

        if (!this.id) {
            this.form.patchValue({
                usuario_comercial_id: user.id,
            });
        }

        this.isNotAdministrador = !user.isAdministrador();
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                this.loadData();
            }
        });
    }


    private loadData() {
        if (this.id) {
            this.title = 'Editar Empresa';
            this.obtenerYCompletar(this.id);
        }
    }

    private loadActividades() {
        this.apiService.getData('/clientes/actividades', {limit:0}).subscribe((data) => {
            this.actividades = data;
        });
    }

    private loadCategorias(perfil: string|undefined = undefined) {
        this.apiService.getData('/clientes/categorias', {
            filtros: {
                perfil: perfil
            },
            limit: 0
        }).subscribe((data) => {
            this.categorias = data;
        });
    }

    private loadUsuarios() {
        this.apiService.getData('/usuarios', {
            filtros: {
                rol_id: [ 2, 3, 4 ]
            },
            limit:0
        }).subscribe((data) => {
            this.usuarios = data;
        });

    }

    private createForm() {
        this.form = this.fb.group({
            id                    : new FormControl({ value: '', disabled: true  }),
            cuit                  : new FormControl({ value: '', disabled: false }),
            razon_social          : new FormControl({ value: '', disabled: false }),
            abreviacion           : new FormControl({ value: '', disabled: false }),
            telefono              : new FormControl({ value: '', disabled: false }),
            email                 : new FormControl({ value: '', disabled: false }),
            perfil                : new FormControl({ value: '', disabled: false }),
            comision_comprador    : new FormControl({ value: '', disabled: false }),
            comision_vendedor     : new FormControl({ value: '', disabled: false }),
            categoria_crediticia  : new FormControl({ value: '', disabled: false }),
            afinidad              : new FormControl({ value: '', disabled: false }),
            usuario_comercial_id  : new FormControl({ value: '', disabled: false }),
            placeId               : new FormControl({ value: '', disabled: false }),
            actividades_id        : new FormControl({ value: [], disabled: false }),
            categorias_id         : new FormControl({ value: [], disabled: false }),
            descripcion_ubicacion : new FormControl({ value: '', disabled: false }),
        });
        this.form.get('perfil').valueChanges.subscribe((value) => {
            this.perfil = value;
            this.loadCategorias(value === 'COMPRADOR_VENDEDOR' ? undefined : value);
        });
    }

    protected get dataUrl(): string {
        return '/clientes/empresas';
    }

    protected completarCampos(data: any) {
        super.completarCampos(data);
        this.mostrarCamposComisiones(data.perfil);
    }

    public guardar() {
        this.enviarDatos().subscribe((data: any) => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                if (this.id) {
                    this.router.navigateByUrl('/app/clientes/empresas');
                } else {
                    this.router.navigateByUrl('/app/clientes/empresas/' + data.id);
                }
            });
        });
    }

    public mostrarCamposComisiones(valor) {
        this.mostrarComisionComprador = valor === 'COMPRADOR_VENDEDOR' || valor === 'COMPRADOR';
        this.mostrarComisionVendedor  = valor === 'COMPRADOR_VENDEDOR' || valor === 'VENDEDOR';
    }

}