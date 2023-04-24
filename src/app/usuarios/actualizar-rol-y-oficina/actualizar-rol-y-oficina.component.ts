import { HttpErrorResponse            } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router       } from '@angular/router';
import { throwError                   } from 'rxjs';
import { catchError                   } from 'rxjs/operators';
import { ApiService                   } from 'src/app/shared/services/api.service';
import { UsuariosEditarComponent      } from '../usuarios-editar/usuarios-editar.component';

@Component({
  selector: 'app-actualizar-rol-y-oficina',
  templateUrl: './actualizar-rol-y-oficina.component.html',
  styleUrls: ['./actualizar-rol-y-oficina.component.scss']
})
export class ActualizarRolYOficinaComponent implements OnInit {

    @ViewChild(UsuariosEditarComponent)
    public form: UsuariosEditarComponent;

    public id: number;

    constructor(
        private client   : ApiService,
        private route    : ActivatedRoute, 
        private router   : Router,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
            }
        });
    }

    public onClickSave(data: any) {    
        console.log(data,'data en act ryo');
        this.client.post('/usuarios/' + data.id + ':actualizarDatosPorAdministrador', {
            user_id    : data.id,
            rol_id     : data.rol_id,
            oficina_id : data.oficina_id,
            aprobacion_cbu : data.aprobacion_cbu ? 1 : 0,
            aprobacion_gerencia_comercial : data.aprobacion_gerencia_comercial ? 1 : 0,
            aprobacion_dpto_creditos : data.aprobacion_dpto_creditos ? 1 : 0,
            aprobacion_dpto_finanzas : data.aprobacion_dpto_finanzas ? 1 : 0,
            confirmacion_pagos : data.confirmacion_pagos ? 1 : 0,
        }).pipe(catchError((e: HttpErrorResponse) => {
            this.form.setErrors(e.error.errores);
            return throwError(e);
        })).subscribe(() => {
            this.router.navigateByUrl('/app/usuarios');
            // this.messages.show('Datos actualizados');
        });
    }

    public onClickCancelar() {
        this.router.navigateByUrl('/app/usuarios');
    }

}
