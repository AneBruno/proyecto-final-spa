import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl       } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form            : FormGroup;
    public hidePassword     : boolean = true;

    constructor(
        private authService : AuthService,
        private fb          : FormBuilder,
        private router      : Router
    ) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    

    public async submit() : Promise<any>{
        if (this.form.valid) {
            const email = this.form.value.email;
            const password = this.form.value.password;
    
            await this.authService.login(email, password);

            this.router.navigateByUrl('/app');
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

    /*public setForm() : void {
        this.form = new FormGroup({
            email    : new FormControl('', [this.emailValidator()]),
            password : new FormControl('', [this.minLength(6)    ])
        });
    }*/

    public minLength(minLength: number) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value.length < minLength) {
                return {
                    minLength: `Al menos ${minLength} caracteres`
                }
            }

            return null;
        }
    }

    public emailValidator(message: string = 'Email inválido', emptyEmailMessage: string = '') {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (emptyEmailMessage.length > 0 && control.value.trim().length === 0) {
                return {
                    email: emptyEmailMessage,
                };
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(control.value)) {
                return {
                    email: message
                };
            }

            return null;
        }
    }
    

}
