import { AuthService               } from 'src/app/auth/shared/services/auth.service';
import { Component                 } from '@angular/core';
import { EventEmitter              } from '@angular/core';
import { FileUploadButtonComponent } from 'src/app/shared/file-upload-button/file-upload-button.component';
import { FormBaseComponent         } from 'src/app/shared/form-base.component';
import { FormControl               } from '@angular/forms';
import { FormGroup                 } from '@angular/forms';
import { Input                     } from '@angular/core';
import { Observable                } from 'rxjs';
import { OnInit                    } from '@angular/core';
import { Output                    } from '@angular/core';
import { User                      } from 'src/app/shared/models/user.model';
import { UserService               } from 'src/app/auth/shared/services/user.service';
import { ViewChild                 } from '@angular/core';

@Component({
  selector    : 'usuarios-editar',
  templateUrl : './usuarios-editar.component.html',
  styleUrls   : ['./usuarios-editar.component.scss']
})
export class UsuariosEditarComponent extends FormBaseComponent implements OnInit {

    @ViewChild(FileUploadButtonComponent)
    public uploadComponent: FileUploadButtonComponent;

    @Input()
    public user: User;

    @Input()
    public id: number;

    @Input()
    public title: string = 'Editar usuario';

    @Input()
    public allowAvatarChange: boolean = true;

    @Input()
    public disabledFields: any = {};

    @Input()
    public mostrarBotonCancelar: boolean = true;

    @Input()
    public mostrarLogout: boolean = false;

    @Output()
    public clickSave: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    @Output()
    public clickCancelar: EventEmitter<void> = new EventEmitter<void>();

    public oficinas$: Observable<any[]>

    public roles$: Observable<any[]>

    public avatarUri: string;

    public urlImagen: string;

    public aprobacion_cbu : any;
    public aprobacion_gerencia_comercial : any;
    public actualizarDatos  : any;
    public suscripcionEmails: any;


    constructor(
        private authService : AuthService,
        private userService : UserService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.oficinas$ = this.apiService.getData('/oficinas', {
            limit: 0,
        });
        this.roles$    = this.apiService.getData('/roles', {limit:0});

        this.form = this.fb.group({
            id                            : new FormControl({ value: ''    , disabled: this.disabledFields['id'                            ] }),
            nombre                        : new FormControl({ value: ''    , disabled: this.disabledFields['nombre'                        ] }),
            apellido                      : new FormControl({ value: ''    , disabled: this.disabledFields['apellido'                      ] }),
            telefono                      : new FormControl({ value: ''    , disabled: this.disabledFields['telefono'                      ] }),
            email                         : new FormControl({ value: ''    , disabled: this.disabledFields['email'                         ] }),
            rol_id                        : new FormControl({ value: ''    , disabled: this.disabledFields['rol_id'                        ] }),
            oficina_id                    : new FormControl({ value: ''    , disabled: this.disabledFields['oficina_id'                    ] }),
            aprobacion_cbu                : new FormControl({ value: false , disabled: this.disabledFields['aprobacion_cbu'                ] }),
            aprobacion_gerencia_comercial : new FormControl({ value: false , disabled: this.disabledFields['aprobacion_gerencia_comercial' ] }),
            aprobacion_dpto_creditos      : new FormControl({ value: false , disabled: this.disabledFields['aprobacion_dpto_creditos'      ] }),
            aprobacion_dpto_finanzas      : new FormControl({ value: false , disabled: this.disabledFields['aprobacion_dpto_finanzas'      ] }),
            confirmacion_pagos            : new FormControl({ value: false , disabled: this.disabledFields['confirmacion_pagos'            ] }),
            suscripto_notificaciones      : new FormControl({ value: ''    , disabled: this.disabledFields['suscripto_notificaciones'             ] }),
        });

        if (this.id) {
            this.getUserById(this.id).subscribe(user => {
                this.setUser(user);
            });
        }

        if (this.user) {
            this.setUser(this.user);
        }

        this.userService.getUser$().subscribe(user => {
            this.urlImagen = user.urlImagen;
        })
    }

    protected get dataUrl(): string {
        return '/usuarios';
    }

    private getUserById(id: number): Observable<any> {
        return this.apiService.getData(this.getDataUrl(id));
    }

    public getFile(): File | null {
        if (!this.uploadComponent) {
            return null;
        }
        return this.uploadComponent.choosenFile;
    }

    public onSubmit() {
        let data = this.form.getRawValue();
        let file = this.getFile();
        data['foto'] = file ? file : undefined;
        //console.log('hola',data);
        this.clickSave.emit(data);
    }

    public setUser(user: User) {
        this.user = user;
        console.log("USER TRAE", user);
        this.urlImagen = user.urlImagen;
        this.form.patchValue({
            id                            : user.id,
            nombre                        : user.nombre,
            apellido                      : user.apellido,
            telefono                      : user.telefono,
            email                         : user.email,
            rol_id                        : user.rol.id,
            oficina_id                    : user.oficina?.id,
            aprobacion_cbu                : user.aprobacion_cbu,
            aprobacion_gerencia_comercial : user.aprobacion_gerencia_comercial,
            aprobacion_dpto_creditos      : user.aprobacion_dpto_creditos,
            aprobacion_dpto_finanzas      : user.aprobacion_dpto_finanzas,
            confirmacion_pagos            : user.confirmacion_pagos,
            suscripto_notificaciones      : user.suscripto_notificaciones,
        });
    }

    public dataSaved() {
        this.uploadComponent.reset();
    }

    public cancelar() {

    }

    public clickLogout() {
        this.authService.signOut();
    }

    public onClickCancelar() {
        this.clickCancelar.emit();
    }

}
