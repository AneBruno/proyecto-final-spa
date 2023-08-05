import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { RegistroService } from '../shared/services/registro.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends FormBaseComponent implements OnInit {

  public form!            : FormGroup;
  public hidePassword     : boolean = true;
  
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
    await this.apiService.post('/auth/registro', this.form.value).toPromise();
    this.router.navigateByUrl('/registro-exito');
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
          nombre    : new FormControl({value: '', disabled: false}),
          apellido    : new FormControl({value: '', disabled: false}),
          telefono    : new FormControl({value: '', disabled: false}),
          email    : new FormControl({value: '', disabled: false}),
          password : new FormControl({value: '', disabled: false})
      });
  }
  
  /*error(controlName: string): string {
    const control = this.form.get(controlName);
    if (control.hasError('required') && control.touched) {
      return 'Obligatorio';
    }
    return '';
  }*/
}