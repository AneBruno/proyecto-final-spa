/*import { ActivatedRoute, Router   } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl              } from '@angular/forms';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
    selector: 'clientes-establecimientos-editar',
    templateUrl: './clientes-establecimientos-editar.component.html',
    styleUrls: ['./clientes-establecimientos-editar.component.scss']
})
export class ClientesEstablecimientosEditarComponent extends FormBaseLocalizacionComponent implements OnInit {

    @Input()
    public id : number;
    public empresa_id: number;
    
    public title             : string = 'Agregar Establecimiento'
    public puertos           : any[];

    public constructor(
        private route    : ActivatedRoute, 
        private router   : Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.createForm();
        this.loadData();

        this.route.params.subscribe((params) => {
            if (params.empresa_id) {
                this.empresa_id = params.empresa_id;
                this.completarCampos({empresa_id: this.empresa_id});
            }
            if (params.id) {
                this.title = 'Editar Establecimiento';
                this.id = params.id
                this.obtenerYCompletar(params.id);
            }
        });
    }

    protected get dataUrl(): string {
        return `/clientes/empresas/${this.empresa_id}/establecimientos`;
    }

    public loadData() {
        this.apiService.getData('/puertos', {limit:0}).subscribe((data: any) => {
            this.puertos = data;
        });
    }

    private createForm() {
        this.form = this.fb.group({
            id                    : new FormControl({ value: '', disabled: true  }),
            nombre                : new FormControl({ value: '', disabled: false }),
            placeId               : new FormControl({ value: '', disabled: false }),
            empresa_id            : new FormControl({ value: '', disabled: false }),
            puerto_id             : new FormControl({ value: '', disabled: false }),
            tipo                  : new FormControl({ value: '', disabled: false }),
            propio                : new FormControl({ value: '', disabled: false }),
            hectareas_agricolas   : new FormControl({ value: '', disabled: false }),
            hectareas_ganaderas   : new FormControl({ value: '', disabled: false }),
            capacidad_acopio      : new FormControl({ value: '', disabled: false }),
            descripcion_ubicacion : new FormControl({ value: '', disabled: false }),
        });
    }

    protected completarCampos(data: any) {
        this.id = data.id;
        this.urlImagenMapa = data.urlImagenMapa;
        this.direccionCompleta = data.direccionCompleta;
        super.completarCampos(data);
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
            });
        });
    }

    protected getFormData(): any {
        let data = this.form.getRawValue();
        if (this.placeId) {
            data.placeId = this.placeId;
        }
        return data;
    }

    public cancelar() {
        
    }
}*/