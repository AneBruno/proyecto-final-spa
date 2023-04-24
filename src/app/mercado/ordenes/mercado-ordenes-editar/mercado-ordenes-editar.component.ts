import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
import { FechaEntregaHelper } from '../../fecha-entrega.helper';

@Component({
    selector: 'app-mercado-ordenes-editar',
    templateUrl: './mercado-ordenes-editar.component.html',
    styleUrls: ['./mercado-ordenes-editar.component.scss']
})
export class MercadoOrdenesEditarComponent extends FormBaseLocalizacionComponent implements OnInit {

    public title     : string = 'Agregar Orden'
    public accion    : string = 'agregar';
    public id        : number;


    public constructor(
        private router      : Router,
        private route       : ActivatedRoute,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watchRoute();
    }

    protected get dataUrl(): string {
        return '/mercado/ordenes';
    }


    private watchRoute() {
        this.route.params.subscribe(async (params) => {
            if (params.accion) {
                this.accion = params.accion;
            }

            if (params.id) {
                this.id = params.id;
            }

            if (params.accion === 'consulta') {
                this.title = 'Consulta orden';
            }
            else if (params.accion === 'copiar') {
                this.title = 'Copiar orden';
            }
        });
    }

    public onDatosGuardados() {
        this.router.navigateByUrl('/app/mercado/ordenes');
    }
}
