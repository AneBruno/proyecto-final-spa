import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { LocatorService } from 'src/app/shared/services/locator.service';

@Component({
  selector: 'app-cerrar-slip',
  templateUrl: './cerrar-slip.component.html',
  styleUrls: ['./cerrar-slip.component.scss']
})
export class CerrarSlipComponent extends FormBaseComponent implements OnInit {

    protected get dataUrl(): string {
        return `/mercado/ordenes/${this.orden_id}:cerrarSlip`;
    }

        public title                        : string = "Cerrar slip"
        public grupo                        : any;
        public clave                        : String;
        public orden_id                     : number;
        public listaEmpresas                : Array<any>;
        public listaPosiciones              : Array<any>;
        public moneda_posicion              : string;
        public form                         : FormGroup;
        public autocompletarPosicionForm    : boolean;
        
        protected fb  = LocatorService.injector.get(FormBuilder);


        public constructor(
            public  dataSource  : ListadoDataSource<any>,
            private router      : Router,
            private route       : ActivatedRoute,
        ) {
            super();
        }

    public async ngOnInit(): Promise<void> {
        this.createForm();
        this.watchRoute();
    }



    private watchRoute() {
        this.orden_id = this.route.snapshot.params.orden;
        
        this.route.params.subscribe(async (params) => {
            if (params.clave) {
                this.clave = params.clave;
                this.grupo = await this.apiService.getData(`/mercado/panel/${this.clave}`).toPromise();
                this.moneda_posicion = this.grupo.moneda;
                this.listaEmpresas = this.grupo.empresas;
                this.listaPosiciones = this.grupo.posiciones;
                this.listaEmpresas.length > 1 ? this.autocompletarPosicionForm = false : this.autocompletarPosicionForm = true;
                
                if (this.grupo != []) {
                    this.completarFormConPosicion();
                }

                if (this.autocompletarPosicionForm) {
                    this.form.get('posicion_id').setValue(this.listaEmpresas[0].posicion_id);
                }
            }

        });

    }

    private createForm() {
        this.form = this.fb.group({
            volumen                        : new FormControl({ value: '',    disabled: false  }),
            posicion_id                    : new FormControl({ value: '',    disabled: false  }),
            precio_cierre_slip             : new FormControl({ value: '',    disabled: false  }),
            producto_posicion              : new FormControl({ value: '',    disabled: false  }),
            destino_posicion               : new FormControl({ value: '',    disabled: false  }),
            entrega_posicion               : new FormControl({ value: '',    disabled: false  }),
            precio_posicion                : new FormControl({ value: '',    disabled: false  }),
            forma_pago_posicion            : new FormControl({ value: '',    disabled: false  }),
            calidad_posicion               : new FormControl({ value: '',    disabled: false  }),
            posicion_excepcional_posicion  : new FormControl({ value: '',    disabled: false  }),
            posicion_trabajar_posicion     : new FormControl({ value: '',    disabled: false  }),
            volumen_limitado_posicion      : new FormControl({ value: '',    disabled: false  }),
            calidad_observaciones_posicion : new FormControl({ value: '',    disabled: false  }),
            observaciones_posicion         : new FormControl({ value: '',    disabled: false  }),
        });

        this.form.get('posicion_id').valueChanges.subscribe(async (value) => {
            if (value) {
                this.grupo = await this.apiService.getData(`/mercado/posiciones/${value}`).toPromise();
                this.completarFormConPosicion();
            }
        });
    }

    private async completarFormConPosicion(){
        this.form.get('producto_posicion').setValue(this.grupo.producto.nombre);
        this.form.get('destino_posicion').setValue(this.grupo.puerto ? this.grupo.puerto.nombre : this.grupo.establecimiento.nombre);
        this.form.get('entrega_posicion').setValue(this.grupo.entrega);
        this.form.get('precio_posicion').setValue(this.grupo.precio ? this.grupo.precio + ' ' + this.grupo.moneda : 'A fijar');
        this.form.get('precio_cierre_slip').setValue(this.grupo.precio ? this.grupo.precio : '');
        this.form.get('forma_pago_posicion').setValue(this.grupo.condicion_pago?.descripcion);
        this.form.get('calidad_posicion').setValue(this.grupo.calidad.nombre);
        this.form.get('posicion_excepcional_posicion').setValue(this.grupo.posicion_excepcional == true ? 'Si' : 'No');
        this.form.get('posicion_trabajar_posicion').setValue(this.grupo.a_trabajar == true ? 'Si' : 'No');
        this.form.get('volumen_limitado_posicion').setValue(this.grupo.volumen_limitado == true ? 'Si' : 'No');
        this.form.get('calidad_observaciones_posicion').setValue(this.grupo.calidad_observaciones);
        this.form.get('observaciones_posicion').setValue(this.grupo.observaciones);
    }

    public infoEmpresaPosicion(posicion: any) {
        var precio = posicion.precio ? posicion.precio + ' ' + this.moneda_posicion : 'A fijar';
        return (posicion.id + " - " + posicion.empresa.razon_social + ' - ' + precio);
    }


    onOrdenFormChange(value) {
        this.form.get('volumen').setValue(value.volumen);
    }

    public guardar() {
        this.enviarDatos().subscribe((data: any) => {
        this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl(`/app/mercado/panel`);
            });
        });
    }
}
