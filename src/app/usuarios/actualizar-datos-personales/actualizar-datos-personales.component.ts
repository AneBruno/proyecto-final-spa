import { Component, OnInit, ViewChild } from '@angular/core';
import { throwError                   } from 'rxjs';
import { UsuariosEditarComponent      } from '../usuarios-editar/usuarios-editar.component';
import { ApiService                   } from 'src/app/shared/services/api.service';
import { catchError                   } from 'rxjs/operators';
import { HttpErrorResponse            } from '@angular/common/http';
import { UserService                  } from 'src/app/auth/shared/services/user.service';
import { SnackBarService              } from 'src/app/shared/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mis-datos-editar',
    templateUrl: './actualizar-datos-personales.component.html',
    styleUrls: ['./actualizar-datos-personales.component.scss']
})
export class ActualizarDatosPersonalesComponent implements OnInit {

    public id: number;

    @ViewChild(UsuariosEditarComponent)
    public form:UsuariosEditarComponent;

    constructor(
        private client: ApiService,
        private snackBar: SnackBarService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.id = this.userService.getUser().id;
    }

    public onClickSave(data: any) {
        this.client.post('/usuarios/actualizarDatosPersonales', data)
        .pipe(catchError((e: HttpErrorResponse) => {
            this.form.setErrors(e.error.errors);
            return throwError(e);
        })).subscribe((data: any) => {
            this.userService.setUser(data.data);
            this.form.dataSaved();
            this.snackBar.show('Datos actualizados');
        });
    }

    public onClickCancelar() {
        this.router.navigateByUrl('/app');
    }

    public cancelar() {

    }

}
