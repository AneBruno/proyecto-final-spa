import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl       } from '@angular/forms';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import {HttpClient} from '@angular/common/http';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    protected get dataUrl(): string {
        return '/login';
    }

    public form!            : FormGroup;
    public hidePassword     : boolean = true;
    public isSubmitAttempted = false;
    public errorMessage: string = ''; // Inicialización vacía

    constructor(
        private authService : AuthService,
        private router      : Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [this.emailValidator()]],
            password: ['', [this.minLength(8)]]
        });
    }

    public async submit() : Promise<any>{
        if (this.form?.valid) {
            const email = this.form.value.email;
            const password = this.form.value.password;
    
            /*await this.authService.login(email, password);
            this.router.navigateByUrl('/app');*/
            try {
                const response = await this.authService.login(email, password);
                // Redirigir o realizar otras acciones en caso de éxito
                this.router.navigateByUrl('/app');
            } catch (error: any) {
                if (error.error && error.error.message) {
                    // Mostrar el mensaje de error recibido de la API
                    this.errorMessage = error.error.message;
                } else {
                    // Mostrar un mensaje genérico en caso de un error inesperado
                    this.errorMessage = 'Ocurrió un error en el proceso de inicio de sesión.';
                }
            }
        }
            
    }

    //si se presionar enter se envia el formulario:
    public passwordKeyPress($event : any) : boolean {
        if ($event.key === "Enter") {
            this.submit();
            return false;
        }
        return true;
    }  

    public minLength(minLength: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value.length < minLength) {
                return { minLength: { requiredLength: minLength } };
            }
            return null;
        }
    }
    
    public emailValidator() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(control.value)) {
                return { email: true };
            }
            return null;
        }
    }
}
    


