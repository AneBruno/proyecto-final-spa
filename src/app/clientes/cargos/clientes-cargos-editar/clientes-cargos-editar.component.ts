import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
    selector    :   'app-clientes-cargos-editar',
    templateUrl :   './clientes-cargos-editar.component.html',
    styleUrls   : [ './clientes-cargos-editar.component.scss' ]
})
export class ClientesCargosEditarComponent extends FormBaseComponent implements OnInit {

  public id        : number;
  public title     : string = 'Agregar cargo';

  public constructor(
      private route    : ActivatedRoute, 
      private router   : Router,
  ) {
      super();
  }

  public ngOnInit(): void {        
      this.createForm();
      this.watchRoute();
  }
  
  private watchRoute() {
      this.route.params.subscribe((params) => {
          if (params.id) {
              this.title = 'Editar cargo';
              this.obtenerYCompletar(params.id);
          }
      });
  }

  private createForm() {
      this.form = this.fb.group({
          id     : new FormControl({ value: '', disabled: true  }),
          nombre : new FormControl({ value: '', disabled: false }),
      });
  }

  protected get dataUrl(): string {
      return '/clientes/cargos';
  }

  public guardar() {
      this.enviarDatos().subscribe(() => {
          this.messages.show('Datos guardados correctamente').subscribe(() => {
              this.router.navigateByUrl('/app/clientes/cargos');
          });
      });
  }

}
