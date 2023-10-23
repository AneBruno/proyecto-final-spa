import { ActivatedRoute, Router } from '@angular/router';
import { Component,      OnInit } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { UserService            } from 'src/app/auth/shared/services/user.service';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
    selector: 'clientes-empresas-editar',
    templateUrl: './clientes-empresas-editar.component.html',
    styleUrls: ['./clientes-empresas-editar.component.scss']
})
export class ClientesEmpresasEditarComponent extends FormBaseLocalizacionComponent implements OnInit {

    //public id?                       : number;    
    public title                    : string = 'Agregar Empresa'
    public usuarios                 : any[]  = [];
    public perfil?                   : string;
    public isLoading                : boolean = false;
    public opciones: string[] = [
        'Buenos Aires',
        'Capital Federal',
        'Catamarca',
        'Chaco',
        'Chubut',
        'Córdoba',
        'Corrientes',
        'Entre Ríos',
        'Formosa',
        'Jujuy',
        'La Pampa',
        'La Rioja',
        'Mendoza',
        'Misiones',
        'Neuquén',
        'Río Negro',
        'Salta',
        'San Juan',
        'San Luis',
        'Santa Cruz',
        'Santa Fe',
        'Santiago del Estero',
        'Tierra del Fuego',
        'Tucumán'
    ];

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
        this.loadUsuarios();
        this.createForm();

        let user =  this.userService.getUser();
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

    private loadUsuarios() {
        this.apiService.getData('/usuarios', {
            filtros: {
                rol_id: [ 4 ]
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
            telefono              : new FormControl({ value: '', disabled: false }),
            email                 : new FormControl({ value: '', disabled: false }),
            perfil                : new FormControl({ value: '', disabled: false }),
            usuario_comercial_id  : new FormControl({ value: '', disabled: false }),
            direccion             : new FormControl({ value: '', disabled: false }),
            localidad             : new FormControl({value: '', disabled: false}),
            provincia             : new FormControl({ value: '', disabled: false }),
            comision              : new FormControl({ value: '', disabled: false })
        });
        this.form?.get('perfil')?.valueChanges.subscribe((value) => {
            this.perfil = value;
        });
    }

    protected get dataUrl(): string {
        return '/clientes/empresas';
    }

    public guardar() {
        this.isLoading = true;
        this.enviarDatos().subscribe((data: any) => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                if (this.id) {
                    this.isLoading = false; 
                    this.router.navigateByUrl('/app/clientes/empresas');
                } else {
                    this.isLoading = false; 
                    this.router.navigateByUrl('/app/clientes/empresas/' + data.id);
                }
            });
        });
    } 

}