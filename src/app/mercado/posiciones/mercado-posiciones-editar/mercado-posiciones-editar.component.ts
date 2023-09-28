import * as moment from 'moment';
import { Component, OnInit            } from '@angular/core';
import { FormControl                  } from '@angular/forms';
import { ActivatedRoute, Router       } from '@angular/router';
import { FormBaseComponent            } from 'src/app/shared/form-base.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Location                     } from '@angular/common';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector    :   'app-mercado-posiciones-editar',
    templateUrl :   './mercado-posiciones-editar.component.html',
    styleUrls   : [ './mercado-posiciones-editar.component.scss' ]
})

export class MercadoPosicionesEditarComponent extends FormBaseLocalizacionComponent implements OnInit {

    public  title                    : string  = 'Agregar Posición';
    public  productos                : any[]   = [];
    public  condiciones_pago$        : Observable<any[]>;
    public  empresas                 : any[]   = [];
    public  empresa_id               : number;
    public  puertos                  : any[]   = [];
    public  cosechas                 : any[]   = null;
    public  consulta                 : boolean = false;
    public  desdePanel               : boolean = false;
    private producto_id_to           : any;
    private empresa_id_to            : any;
    public minDate                   : any = moment().format();
    public isLoading                 : boolean = false;


    public constructor(
        private router    : Router,
        private route     : ActivatedRoute,
        private _location : Location
    ) {
        super();
    }

    public ngOnInit(): void {
        this.createForm();
        this.loadRelatedData();
        this.watchRoute();
    }

    public async loadRelatedData() {
        this.buscarProductos();
        this.buscarEmpresas();
        this.cosechas         = await this.apiService.getAllData('/mercado/cosechas', {ordenes: {descripcion:'DESC'}, filtros: {habilitado: 1}}).toPromise();
        this.condiciones_pago$ = this.apiService.getAllData('/mercado/condiciones-pago').pipe(
            map(condiciones => condiciones.filter(condicion => condicion.habilitado))
        ); 
        this.fetchPuertos();
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                if (params.accion === "consulta") {
                    this.title = 'Consultar posición';
                    this.consulta = true;
                } else {
                    this.title = 'Copiar posición';
                    this.consulta = false;
                }

                this.obtenerYCompletar(this.id, {with_relation : 'cosecha'});
            }
            if (params.agregarPosicion) {
                this.desdePanel = true;
                this.consulta = false;
            }
        });
    }

    private createForm() {
        this.form = this.fb.group({
            id                    : new FormControl({ value: '', disabled: true  }),
            producto_id           : new FormControl({ value: '', disabled: false }),
            producto_nombre       : new FormControl({ value: '', disabled: false }),
            cosecha_id            : new FormControl({ value: '', disabled: false }),
            moneda                : new FormControl({ value: '', disabled: false }),
            precio                : new FormControl({ value: '', disabled: false }),
            condicion_pago_id     : new FormControl({ value: '', disabled: false }),
            empresa_id            : new FormControl({ value: '', disabled: false }),
            empresa_razon_social  : new FormControl({ value: '', disabled: false }),
            puerto_id             : new FormControl({ value: '', disabled: false }),
            observaciones         : new FormControl({ value: '', disabled: false }),
            volumen               : new FormControl({ value: '', disabled: false }),
        });

        this.form.get('empresa_id').valueChanges.subscribe((value) => {
            this.empresa_id = value;
        });
        
    }

    protected get dataUrl(): string {
        return '/mercado/posiciones';
    }

    protected completarCampos(data: any) {
        super.completarCampos(data);
        var cosechaDeshabilitada = data.cosecha.habilitado ? false : true;
        if (this.consulta && cosechaDeshabilitada) {
            this.cosechas.unshift(data.cosecha);
            this.form.get('cosecha_id').setValue(this.cosechas[0].id);
        }
        if (!this.consulta && cosechaDeshabilitada) {
            this.form.get('cosecha_id').setValue(null);
        } else {
            this.form.get('cosecha_id').setValue(data.cosecha.id);
        }
        this.form.patchValue({ 'producto_nombre'      : data.producto.nombre                      });
        this.form.patchValue({ 'empresa_razon_social' : data.empresa.razon_social                 });

        if (data.puerto_id !== null) {
            this.form.patchValue({ 'puerto_id': data.puerto_id });

        } /*else {
            this.direccionCompleta = this.obtenerUbicacion(data)
        }*/

    }

    public async guardar() {
        this.isLoading = true;
        this.id = null; //Con esto hago que se copie la posicion en vez de sobreescribirla

        // Obtener el valor del campo de entrada y reemplazar comas por puntos.
        const volumen = this.form.get('volumen').value.replace(',', '.');

        // Asignar el valor transformado de vuelta al campo de entrada.
        this.form.get('volumen').setValue(volumen);
        
        this.enviarDatos().subscribe((data: any) => {
            this.isLoading = false;
            this.messages.show('Datos guardados correctamente').subscribe(() => {

            this._location.back();
            this.router.navigateByUrl(this.desdePanel ? '/app/mercado/panel' : '/app/mercado/posiciones');
            });
        });
        this.isLoading = false;
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
                nombre:'ASC'
            }
        }).subscribe(data => {
            this.productos = data;
        });
    }

    public buscarEmpresas(busqueda?: any) {
        let filtros: any = {};
        filtros.perfil = "COMPRADOR";
        if (busqueda) {
            filtros.busqueda = busqueda;
        }
        this.apiService.getData('/clientes/empresas', {
            filtros: filtros,
            ordenes: {
                razon_social:'ASC'
            }
        }).subscribe(data => {
            this.empresas = data;
        });
    }

    public producto_id_keyup(ev: any) {
        if (this.producto_id_to) {
            clearTimeout(this.producto_id_to);
        }
        this.producto_id_to = setTimeout(() => {
            this.buscarProductos( ev.target.value);
        }, 400);
    }

    public producto_id_selected(ev: MatAutocompleteSelectedEvent) {
        let id = ev.option._getHostElement().getAttribute('data-id');
        this.form.patchValue({producto_id: id});
    }

    /*public autocompletarEstablecimientoUbicacion(direccion){
        this.direccionCompleta = direccion;
    }*/

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
        this.form.patchValue({empresa_id: id});
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

    public obtenerUbicacion(posicion): string {
        const localidad = posicion.localidad_destino ? posicion.localidad_destino + ', ' : '';
        const departamento = posicion.departamento_destino ? posicion.departamento_destino + ', ': '';
        const provincia = posicion.provincia_destino ? posicion.provincia_destino: '';

        return localidad + departamento + provincia;
    }

}
