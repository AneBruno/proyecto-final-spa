import { Component, OnInit, ViewChild } from '@angular/core';
import { ListadoDataSource } from 'src/app/shared/listado.datasource';
import { ApiService } from 'src/app/shared/services/api.service';
import { Utils } from 'src/app/shared/utils';
import * as moment             from 'moment';
import { ListadoComponent } from 'src/app/shared/listados/listado.component';
import { TableComponent } from 'src/app/shared/table/table.component';
import { UserService } from 'src/app/auth/shared/services/user.service';

@Component({
  selector: 'app-gestion-saldos-solicitudes-cobro-listar',
  templateUrl: './solicitudes-cobro-listar.component.html',
  styleUrls: ['./solicitudes-cobro-listar.component.scss'],
  providers: [
    ListadoDataSource
    ]
})
export class SolicitudCobroListarComponent extends ListadoComponent implements OnInit {

    public estadoSolicitudes : any;
    public filtros           : any = {
        cuit: []
    };

    public user                : any;
    public aprobacionDptoCreditos : boolean = false;
    public aprobacionDptoFinanzas : boolean = false;
    public aprobacionGerenciaComercial : boolean = false;
    public confirmacionPagos : boolean = false;
    public estadosPorDefecto : any;

    @ViewChild('tablaGestionSolicitudes', {static: true})
    public tablaSolicitudes : TableComponent<any>;

    constructor(
        public  dataSource  : ListadoDataSource<any>,
        private apiService  : ApiService,
        private utils       : Utils,
        private userService : UserService
    ) { 
        super();
    }

    ngOnInit(): void {
        this.dataSource.uri = '/gestion-de-saldos/solicitudes';
        this.dataSource.ordenes.created_at='DESC';
        this.dataSource.filtros = {
           estado_id: [], 
        };
        this.user = this.userService.getUser();
        this.obtenerEstadoSolicitudes();
        this.setTable();
        this.habilitarGestion();
    }

    setTable() {
        this.addColumn('fecha', 'Fecha', '150px').renderFn((row) =>{
            let fecha = new Date(row.created_at);
            let stringFecha = fecha.toLocaleDateString();
            for (let index = 0; index < 3; index++) {
                stringFecha = stringFecha.replace('/','-');    
            }
            return stringFecha;
        });

        this.addColumn('Saldo',        'Saldo',    '170px').renderFn(row => row.tipo);
        this.addColumn('razon_social', 'Razón social', '').renderFn(row => row.razon_social);
        this.addColumn('monto_total', 'Monto',    '250px').renderFn(row => this.formatMonto(this.obtenerMontoAMostrar(row)));
        this.addColumn('estado',      'Estado',   '100px').renderFn(row => row.estado.descripcion);
        this.addColumn('_acciones',   'Acciones',  '50px').setAsMenu().setAlign('center');
    }

    private obtenerMontoAMostrar(row : any): string {
        if(row.tipo === 'Anticipo'){
            if(row.monto_aprobado !== '0.00'){
                return row.monto_aprobado
            } 
        }
        return row.monto_total;
    }

    formatMonto(monto : string) : string {
        let arrayMonto = monto.split('.');
        let enteros    = arrayMonto[0];
        let decimales  = arrayMonto[1];
        enteros        = this.utils.formatNumero(enteros);
        return '$' + enteros + ',' + decimales;
    }

    public async obtenerEstadoSolicitudes(){
        this.estadoSolicitudes = await this.apiService.getData('/gestion-de-saldos/solicitudes-estados', {
            limit: 0,
        }).toPromise();
    }

    public habilitarGestion(){
        if(this.user.aprobacion_dpto_creditos === 1){
            this.aprobacionDptoCreditos = true;
            this.dataSource.filtros = {
                estado_id: [2], 
            };
        }
        if(this.user.aprobacion_dpto_finanzas === 1){
            this.aprobacionDptoFinanzas = true;
            this.dataSource.filtros = {
                estado_id: [3], 
            };
        }
        if(this.user.aprobacion_gerencia_comercial === 1){
            this.aprobacionGerenciaComercial = true;
            this.dataSource.filtros = {
                estado_id: [10], 
            };
        }
        if(this.user.confirmacion_pagos === 1){
            this.confirmacionPagos = true;
            this.dataSource.filtros = {
                estado_id: [1,4,6], 
            };
        }
    }

    public refreshList() {
        [
            'fecha_desde',
            'fecha_hasta',
        ].map((name) => {
            if (!this.filtros[name]) {
                this.dataSource.filtros[name] = null;
                return;
            }
            this.dataSource.filtros[name] = moment(this.filtros[name]).format('YYYY-MM-DD');
        });


        if(this.dataSource.filtros.estado_id.includes( '' )){
            delete this.dataSource.filtros["estado_id"];
        }

        this.dataSource.filtros.cuit = this.filtros.cuit.map((x:any) => x.cuit);

        if(this.dataSource.filtros.tipo !== undefined){
            if(this.dataSource.filtros.tipo.length === 0 || this.dataSource.filtros.tipo.includes( '' )){
                delete this.dataSource.filtros["tipo"];
            }
        }
        
        this.dataSource.pageIndex = 0;
        this.dataSource.refreshData();
    }

    public onClearFilters() : void {
        [
            'fecha_desde',
            'fecha_hasta',

        ].map((name: string) => {
            this.filtros[name] = null;
        });

        this.filtros.cuit = [];
    }

}
