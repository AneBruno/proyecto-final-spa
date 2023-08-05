import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormBaseLocalizacionComponent } from "src/app/shared/form-base-localizacion.component";



@Component({
  selector: 'app-mercado-ordenes-form',
  templateUrl: './mercado-ordenes-form.component.html',
  styleUrls: ['./mercado-ordenes-form.component.scss']
})
export class MercadoOrdenesFormComponent extends FormBaseLocalizacionComponent implements OnInit {
    @Input() id: number;
    @Input() accion: string;
    @Input() mostrarBotones: boolean = true;

    @Output() datosGuardados = new EventEmitter<any>();
    @Output() formChange = new EventEmitter<any>();


    public productos: any[] = [];
    public condiciones_pago$ : Observable<any[]>;
    public empresas: any[] = [];
    public puertos: any[] = [];
    public posicion: any;
    public consulta: boolean = false;
    public empresa_id: number;
    public campoVendedorModificado: boolean = false;
    private empresa_id_to: any;
    private producto_id_to: any;
    public minDate: any = moment().format();
    public direccionCompletaDestino: string;


    public constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watchInputs();
        this.createForm();
        this.loadRelatedData();
    }

    public loadRelatedData() {
        this.buscarProductos();
        this.buscarEmpresas();
        this.condiciones_pago$ = this.apiService.getAllData('/mercado/condiciones-pago').pipe(
            map(condiciones => condiciones.filter(condicion => condicion.habilitado))
        );

        this.fetchPuertos();

        if (this.consulta) {
            this.form.disable();
        }
    }

    private async watchInputs() {
        if (this.accion === 'consulta') {
            this.consulta = true;
            this.loadData();
        }
        else if (this.accion === 'copiar') {
            this.loadData();
        }
        else if (this.accion === 'agregar' && this.id) {
            this.posicion = await this.apiService.getData(`/mercado/posiciones/${this.id}`).toPromise();
            this.completarFormConPosicion();
        }
    }

    private loadData() {
        if (this.id) {
            this.obtenerYCompletar(this.id, { with_relation: 'estado,empresa,producto,usuarioCarga' });
            //saqué calidad, de las llaves
        }
    }

    private completarFormConPosicion() {
        this.form.get('producto_id').setValue(this.posicion.producto_id);
        this.form.get('producto_nombre').setValue(this.posicion.producto.nombre);
        this.form.get('puerto_id').setValue(this.posicion.puerto_id);
        this.form.get('moneda').setValue(this.posicion.moneda);
        this.form.get('precio').setValue(this.posicion.precio);
        this.form.get('condicion_pago_id').setValue(this.posicion.condicion_pago_id);
    }

    private createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            producto_id: new FormControl({ value: '', disabled: false }),
            producto_nombre: new FormControl({ value: '', disabled: false }),
            empresa_id: new FormControl({ value: '', disabled: false }),
            puerto_id: new FormControl({ value: '', disabled: false }),
            volumen: new FormControl({ value: '', disabled: false }),
            moneda: new FormControl({ value: '', disabled: false }),
            precio: new FormControl({ value: '', disabled: false }),
            condicion_pago_id: new FormControl({ value: '', disabled: false }),
            estado_id: new FormControl({ value: '', disabled: false }),
            comercial: new FormControl({ value: '', disabled: false }),
            observaciones: new FormControl({ value: '', disabled: false }),
            empresa_razon_social: new FormControl({ value: '', disabled: false }),
            direccionCompletaDestino: new FormControl({ value: '', disabled: false })
        });

        this.form.get('empresa_id').valueChanges.subscribe((value) => {
            this.empresa_id = value;
        });

        this.form.valueChanges.subscribe(value => {
            this.formChange.emit(value);
        });
    }

    protected get dataUrl(): string {
        return '/mercado/ordenes';
    }

    protected completarCampos(data: any) {
        super.completarCampos(data);
        this.form.patchValue({ 'empresa_razon_social': data.empresa.razon_social });

        if (/*data.estado_id == 4 ||*/ data.estado_id == 5 || data.estado_id == 3) {
            this.form.patchValue({ 'estado_id': "" });
        } else {
            this.form.patchValue({ 'estado_id': data.estado_id });
        }
        this.form.patchValue({ 'producto_nombre': data.producto.nombre });
        this.form.patchValue({ 'comercial': (data.usuario_carga.nombreCompleto) });

        //Lógica para completar campos de destino:
        if (data.puerto_id !== null) {
            this.form.patchValue({ 'puerto_id': data.puerto_id });

        } else {
            this.direccionCompletaDestino = data.localidad_destino + ', ' + data.departamento_destino + ', ' + data.provincia_destino;
        }
    }

    protected getFormData(): any {
        let formData = super.getFormData();
        return formData;
    }

    public guardar() {
        if (this.accion === 'copiar' || this.accion === 'agregar') {
            this.id = null;
        }

        this.enviarDatos().subscribe((data: any) => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.datosGuardados.emit();
            });
        });
    }

    public empresa_id_keyup(ev: any) {
        if (this.empresa_id_to) {
            clearTimeout(this.empresa_id_to);
        }
        this.empresa_id_to = setTimeout(() => {
            this.buscarEmpresas(ev.target.value);
        }, 400);
    }

    public empresa_id_selected(ev: MatAutocompleteSelectedEvent) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({ empresa_id: id });
    }

    public buscarEmpresas(busqueda?: any) {
        let filtros: any = {};
        filtros.perfil = "VENDEDOR";
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/clientes/empresas', {
            filtros: filtros,
            ordenes: {
                razon_social: 'ASC'
            }
        }).subscribe(data => {
            this.empresas = data;
        });
    }

    public producto_id_selected(ev: MatAutocompleteSelectedEvent) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({ producto_id: id });
    }

    public producto_id_keyup(ev: any) {
        if (this.producto_id_to) {
            clearTimeout(this.producto_id_to);
        }
        this.producto_id_to = setTimeout(() => {
            this.buscarProductos(ev.target.value);
        }, 400);
    }

   
    public buscarProductos(busqueda?: any) {
        let filtros: any = {};
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/productos', {
            limit: 20,
            filtros: filtros,
            ordenes: {
                uso_frecuente: 'DESC',
                nombre: 'ASC'
            }
        }).subscribe(data => {
            this.productos = data;
        });
    }

    private fetchPuertos() {
        let filtros: any = {};
        if (this.consulta) {
            filtros.estado = 'todos';
        }
        this.apiService.getData('/puertos', {
            limit: 0,
            filtros: filtros
        }).subscribe(data => {
            this.puertos = data;
        });

    }

}
