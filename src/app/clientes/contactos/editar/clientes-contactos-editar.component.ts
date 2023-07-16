/*import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormControl       } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'clientes-contactos-editar',
    templateUrl: './clientes-contactos-editar.component.html',
    styleUrls: ['./clientes-contactos-editar.component.scss']
})
export class ClientesContactosEditarComponent extends FormBaseComponent implements OnInit {

    public id         : number;
    public empresa_id : number;
    public title      : string = 'Agregar Contacto'
    public cargos     : any[] = [];
    public empresas   : any[] = [];

    public constructor(
        private route    : ActivatedRoute, 
        private router   : Router,
    ) {
        super();
    }

    public async ngOnInit(): Promise<void> {
        this.createForm();
        this.loadData();
        this.watchRoute();
    }

    private createForm() {
        this.form = this.fb.group({
            id               : new FormControl({ value: '', disabled: true  }),
            empresa_id       : new FormControl({ value: '', disabled: false }),
            nombre           : new FormControl({ value: '', disabled: false }),
            email            : new FormControl({ value: '', disabled: false }),
            direccion        : new FormControl({ value: '', disabled: false }),
            telefono_celular : new FormControl({ value: '', disabled: false }),
            telefono_fijo    : new FormControl({ value: '', disabled: false }),
            fecha_nacimiento : new FormControl({ value: '', disabled: false }),
            nivel_jerarquia  : new FormControl({ value: '', disabled: false }),
            cargo_id         : new FormControl({ value: '', disabled: false }),
        });
    }

    public loadData() {
        this.apiService.getData('/clientes/cargos', {limit:0}).subscribe(data => {
            this.cargos = data;
        });
        this.apiService.getData('/clientes/empresas', {
            limit: 0,
        }).subscribe(data => { 
            this.empresas = data;
        });
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.empresa_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({empresa_id: this.empresa_id});
            }
            if (params.id) {
                
                this.title = 'Editar Contacto';
                this.id = params.id;
                this.obtenerYCompletar(this.id);
            }
        });
    }

    protected  completarCampos(data: any) {
        if (data.fecha_nacimiento) {
            data.fecha_nacimiento = moment(data.fecha_nacimiento||'').toDate();
        }
        super.completarCampos(data);
    }

    public async guardar() {
        await this.verificarExistente();
        this.enviarDatos().subscribe((r) => {
            this.router.navigateByUrl(
                this.id ?                // esta editando uno existente ?
                this.getListadoUrl() :   // entonces va al listado
                this.router.url          // sino, a la vista de edición.
                    .replace('/agregar', `/${r.id}`) 
            );
        });
    }

    public async verificarExistente(): Promise<void> {
        let alertas: any[] = await this.apiService.getData('/clientes/contactos/obtenerAlertaExistente', {
            empresa_id  : this.form.get('empresa_id').value,
            nombre      : this.form.get('nombre'    ).value,
            email       : this.form.get('email'     ).value,
            contacto_id : this.form.get('id'        ).value,
        }).toPromise();

        for(let alerta of alertas) {
            await this.confirmService.askAsync(alerta + " ¿Está seguro que desea ingresarlo?");
        }
    }

    protected get dataUrl(): string {
        return '/clientes/contactos';
    }

    protected getFormData(): any {
        let formData = super.getFormData();
        if (formData.fecha_nacimiento) {
            formData.fecha_nacimiento = moment(formData.fecha_nacimiento).format('YYYY-MM-DD');
        }
        return formData;
    }

    public getListadoUrl(): string {
        return this.empresa_id ? '/app/clientes/empresas/' + this.empresa_id : '/app/clientes/contactos';
    }

    public cancelar() {
        
    }

}
*/