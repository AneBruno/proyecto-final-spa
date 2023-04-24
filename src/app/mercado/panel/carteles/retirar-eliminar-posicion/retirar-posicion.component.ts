import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { PosicionesData } from '../../mercado-panel-listar/mercado-panel-listar.component';

@Component({
  selector: 'app-retirar-posicion',
  templateUrl: './retirar-posicion.component.html',
  styleUrls: ['./retirar-posicion.component.scss']
})

export class RetirarEliminarPosicionComponent extends FormBaseComponent implements OnInit {

    public readonly posicionElegida: EventEmitter<any> = new EventEmitter();
    public titulo : string;

    protected get dataUrl(): string {
        return undefined;
    }

    public async ngOnInit(): Promise<void> {
        this.data.accion == 'Retirar' ? this.titulo = 'Retirar posición' : this.titulo = 'Eliminar posición';
        this.createForm();
    }

    private createForm() {
      this.form = this.fb.group({
          posicion_id           : new FormControl({ value: '', disabled: false }),
      })
    }

    constructor(
      public dialogRef: MatDialogRef<RetirarEliminarPosicionComponent>,
      @Inject(MAT_DIALOG_DATA) public data: PosicionesData) {
        super()
      }

    cancelar(): void {
      this.dialogRef.close();
    }

    aceptar(): void {
        this.posicionElegida.emit(this.form.get('posicion_id').value);
        this.dialogRef.close();
    }

    public infoPosicion(posicion:any){
      var precio = posicion.precio ? posicion.precio + ' ' + this.data.monedaPosicion : 'A fijar';
      console.log(posicion);
      return (posicion.id + " - " + posicion.empresa.razon_social + ' - ' + precio);
    }

}

