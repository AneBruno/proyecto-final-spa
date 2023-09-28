import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { RegistroService } from '../shared/services/registro.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends FormBaseComponent implements OnInit {

  public form!                        : FormGroup;
  public hidePassword                 : boolean = true;
  public isSubmitAttempted            = false;
  public errorMessage                 : string = ''; // Inicialización vacía
  public isLoading                    : boolean = false;
  
  constructor(
    private dialog      : MatDialog,
    private router : Router,
    private registroService: RegistroService
   // private apiService: ApiService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.setForm();
  }

  public get dataUrl() : string {
      return ""
  }

  public async submit() {
    this.isLoading = true;
    if (this.form.valid) {
      await this.apiService.post('/auth/registro', this.form.value).toPromise();
      this.isLoading = false;
      this.router.navigateByUrl('/registro-exito');
    }
  }

  public passwordKeyPress($event : any) : boolean {
    if ($event.key === "Enter") {
        this.submit();
        return false;
    }
    return true;
}

  public setForm() : void {
      this.form = this.fb.group({
          id    : new FormControl({value: '', disabled: true}),
          nombre: new FormControl('', [Validators.required]),
          apellido: new FormControl('', [Validators.required]),
          telefono: new FormControl('', [Validators.required]),
          email: new FormControl('', [this.emailValidator()]),
          password: new FormControl('', [Validators.required, this.minLength(8)]),
          empresa_registro: new FormControl('', [Validators.required]),
      });
  }

  public minLength(minLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value.length < minLength && control.value.length >= 1) {
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