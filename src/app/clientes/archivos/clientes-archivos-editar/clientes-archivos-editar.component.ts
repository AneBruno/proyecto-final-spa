import * as moment from 'moment';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl                   } from '@angular/forms';
import { ActivatedRoute, Router        } from '@angular/router';
import { FileUploadButtonComponent     } from 'src/app/shared/file-upload-button/file-upload-button.component';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
  selector: 'app-clientes-archivos-editar',
  templateUrl: './clientes-archivos-editar.component.html',
  styleUrls: ['./clientes-archivos-editar.component.scss']
})
export class ClientesArchivosEditarComponent extends FormBaseLocalizacionComponent implements OnInit {
   
    @ViewChild(FileUploadButtonComponent)
    public uploadComponent: FileUploadButtonComponent;

    @Output()
    public clickCancelar: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public id : number;
    public empresa_id: number;
    
    public title          : string = 'Agregar archivo'
    public tipos_archivos : any[];

    public constructor(
        private route  : ActivatedRoute, 
        private router : Router,
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
                this.title = 'Editar archivos';
                this.id = params.id
                this.obtenerYCompletar(params.id);
            }
        });
    }

    protected get dataUrl(): string {
        return '/clientes/empresas/' + this.empresa_id + '/archivos';
    }

    public loadData() {
        this.apiService.getData('/clientes/empresas/tipos-archivos', {limit:0}).subscribe((data: any) => {
            this.tipos_archivos = data;
        });
    }


    private createForm() {
        this.form = this.fb.group({
            empresa_id            : new FormControl({ value: '', disabled: true  }),
            tipo_archivo_id       : new FormControl({ value: '', disabled: false }),
            fecha_vencimiento     : new FormControl({ value: '', disabled: false }),
            archivo_adjunto       : new FormControl({ value: '', disabled: false }),
        });
    }

    protected completarCampos(data: any) {
        this.id = data.id;
        if (data.fecha_vencimiento) {
            data.fecha_vencimiento = moment(data.fecha_vencimiento||'').toDate();
        }
        super.completarCampos(data);
    }

    public vuelveAEmpresa() {
        this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/empresas/' + this.empresa_id);
            });
        });
    }

    public getFile(): File | null {
        if (!this.uploadComponent) {
            return null;
        }
        return this.uploadComponent.choosenFile;
    }

    protected getFormData(): any {
        let data = super.getFormData();
        let fileContent = this.getFile();
        fileContent ? data['archivo_adjunto'] = fileContent : data['archivo_adjunto'] = undefined;
        data.fecha_vencimiento = moment(data.fecha_vencimiento).format('YYYY-MM-DD');
        if (this.placeId) {
            data.placeId = this.placeId;
        }
        return data;
    }

    public cancelar() {
        
    }

}
