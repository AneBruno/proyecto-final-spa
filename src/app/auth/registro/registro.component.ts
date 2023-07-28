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
export class RegistroComponent implements OnInit {

  public form!            : FormGroup;
  public hidePassword     : boolean = true;
  
  constructor(
    //private snackBar : SnackBarService,
    private dialog      : MatDialog,
    private router : Router,
    private registroService: RegistroService,
    private apiService: ApiService
  ) { 
  }

  ngOnInit(): void {
    this.setForm();
  }

  public get dataUrl() : string {
      return ""
  }

  /*public onKey($event: any){
      if ($event.key && /^Arrow/.test($event.key)) {
          return;
      }
  }*/

  public getFieldErrorMessage(controlName: string): string | void {
      /*const errors = this.form.get(controlName)!.errors;
      for (const error of Object.values(errors!)) {
          if (typeof error === 'string') {
              return error;
          }
      }*/
  }

  public async submit() {
    await this.apiService.post('/auth/registro', this.form.value).toPromise();
    //this.router.navigateByUrl('/login');
  }

  public passwordKeyPress($event : any) : boolean {
    if ($event.key === "Enter") {
        this.submit();
        return false;
    }
    return true;
}

  public setForm() : void {
      this.form = new FormGroup({
          id    : new FormControl({value: '', disabled: true}),
          nombre    : new FormControl({value: '', disabled: false}),
          apellido    : new FormControl({value: '', disabled: false}),
          telefono    : new FormControl({value: '', disabled: false}),
          email    : new FormControl({value: '', disabled: false}/*, [emailValidator()]*/),
          password : new FormControl({value: '', disabled: false}/*, [minLength(6)    ]*/)
      });
  }

}