import { Component           } from '@angular/core';
import { _isNumberValue      } from '@angular/cdk/coercion';
import { FormControl         } from '@angular/forms';
import { OnInit              } from '@angular/core';
import { ViewChild           } from '@angular/core';
import { Router              } from '@angular/router';
import { ActivatedRoute      } from '@angular/router';
import { ExtranetAuthService } from '../../extranet.auth.service';
import { FormBaseComponent   } from 'src/app/shared/form-base.component';
import { MessagesService     } from 'src/app/shared/services/messages.service';
import { TableComponent      } from 'src/app/shared/table/table.component';
import { SnackBarService     } from 'src/app/shared/services/snack-bar.service';
import { Utils               } from 'src/app/shared/utils';

type FormaCobro = 'Cheque'|'e-Check'|'Transferencia';

class FormaPago {

    constructor(
        public forma_pago? : FormaCobro,
        public monto        : string = '',
        public cbu          : string = '',
        public fecha        : string = '',

    ){

    }
}

@Component({
    selector    : 'app-solicitud-cobro-editar',
    templateUrl : './solicitud-cobro-editar.component.html',
    styleUrls   : ['./solicitud-cobro-editar.component.scss']
})
export class SolicitudCobroEditarComponent extends FormBaseComponent implements OnInit {

    constructor(
        private authService     : ExtranetAuthService,
        private messageService  : MessagesService,
        private route           : ActivatedRoute,
        private router          : Router,
        public  sanckBarService : SnackBarService,
        public  utils           : Utils,
    ) 
    {
        super();
    }

    public dataUrl         : string = '/extranet/solicitudes-cobro';
    public empresas        : any;
    public usuario         : any;
    public formas_pago     : Array<any> = [];
    public cbus            : any;
    public montoTotal      : number = 0;
    public restante        : number = 0;
    public fechaActual     : Date = new Date();
    public title           : string = 'Nueva solicitud';
    public modoConsulta    : boolean = false;
    public estadoSolicitud : any;
    public modoGestion     : boolean = false;
    public enviando        : boolean = false;
    public montoAprobado   : any;
    public modoCorreccionMontos : boolean = false;

    @ViewChild('detalles', {static: true})
    public detalles : TableComponent<any>;

    ngOnInit(): void {
        let loginData = this.authService.getLoginData();
        this.empresas = loginData.accounts;
        this.usuario  = loginData.Usuario;
        this.createForm();
        this.watchRoute();
        this.setFields();
    }

    private async watchRoute()  {
        this.route.params.subscribe(async (params)=>{
            if(params.id){
                this.id = params.id;
                this.form.get('cuit').disable();
                this.form.get('observaciones').disable();
                this.title = 'Consulta Solicitud';
                this.modoConsulta = true;
                let token = this.authService.getToken();
                this.apiService.getData(`/extranet/solicitudes-cobro/${params.id}`,{token : token}).subscribe((data)=>{
                    this.completarCampos(data);
                    this.form.get('fecha_solicitud').setValue(this.formatFecha(data.created_at));
                    this.formas_pago = data.formas_pago;
                    this.formas_pago.forEach((element)=>{
                        let fechaSplit = element.fecha.split('-');
                        element["fecha_string"] = fechaSplit[2] + '-' + fechaSplit[1] + '-' + fechaSplit[0];
                        let fecha : Date = new Date(element.fecha);
                        fecha.setDate(fecha.getDate()+1);
                        element.fecha=fecha;
                        if(element.cbu.length > 0){
                            element.cbu = element.cbu + ' - ' + element.cuenta.DescripcionBanco
                        }
                        element.monto = element.monto.replace('.',',');
                     //   element.monto = this.utils.formatNumeroConDecimales(element.monto);
                    });
                    this.form.get('estado').setValue(data.estado_solicitud.descripcion);
                    this.form.get('porcentaje_interes').setValue(data.porcentaje_interes.replace('.',',') + '%');
                    this.form.get('monto_aprobado').setValue(this.utils.formatNumeroConDecimales(data.monto_aprobado));
                    this.montoAprobado = data.monto_aprobado;
                    this.calcularMontoTotal();
                    this.route.url.subscribe((url)=>{
                        url.forEach(element => {
                            if(element.path === "gestionar"){
                                this.modoGestion = true;
                                this.title = 'Gestionar Solicitud';
                            }
                        });
                    })
                    if(data.estado_solicitud.descripcion === "Corrección de montos"){
                        this.setTableCorreccionMontos();
                        this.modoCorreccionMontos = true;
                    } else {
                        this.setTable();
                    }
                });
            }
        });
    }

    private checkHorario() : void {
        this.apiService.getData('/extranet/solicitudes-cobro/*/horarioLimiteSolicitudDisponibleDelDia').subscribe((data)=>{
            let date = new Date();
            let horaActual = date.getHours();
            let minutosActual = date.getMinutes();
            let arrayHoraMensaje = data.hora.split(':');
            let horaMensaje = Number(arrayHoraMensaje[0]);
            let minutosMensaje = Number(arrayHoraMensaje[1]);
            if(horaActual < horaMensaje){
                return;
            }
            if(horaActual === horaMensaje && minutosActual < minutosMensaje){
                return;
            }
            this.messageService.show(`Le recordamos que las solicitudes ingresadas después de las ${data.hora} horas se procesarán durante el día de mañana.`,'center');
        });
    }

    public clickNewCbu() : void {
        this.confirmService.ask('Desea abandonar la carga de la solicitud?').subscribe( (option) => {
            this.router.navigateByUrl('/app/extranet/solicitudes-cbu/agregar');
        });
    }

    private setTableCorreccionMontos(){
        this.detalles.addColumn('forma_pago','Forma de cobro','250px');
        this.detalles.addColumn('fecha_string','Fecha','250px');
        this.detalles.addColumn('cbu','CBU','');
        this.detalles.addColumn('monto','Monto','150px')
            .setAsNumberInput()
            .setErrorMessage((x : any) => {
                if(x === '' || x === undefined || x === null){
                    return 'Obligatorio';
                }
                return '';
            })
            .setChangeInputFn(async (row : any) => {
                await this.apiService.post(`/extranet/solicitudes-cobro/formas-pago/${row.id}/actualizar-monto`, {
                    monto: row.monto.replace(/\./g, '').replace(',','.'),
                    token: this.authService.getToken()
                }).toPromise();
                this.calcularMontoTotal();
            })
            .setTextAlign('right')
            .setRequired();

    }

    private setTable() :void {
        let opcionesFormaPago = [{value:'Cheque',text:'Cheque'}, {value:'E-cheq',text:'e-Cheq'}, {value:'Transferencia',text:'Transferencia'}];

        /*
            Nota Agus al 30/11/22: el código que sigue no lo modifico pero sospecho que no está bien
            porque siempre el if entra en true ya que this.modoConsulta es true siempre, entonces
            al presionar Gestionar en realidad entra en modo consulta y no puede editar los campos de la tabla.
            Para mi caso de uso (#9740), necesito solamente poder editar el campo monto por lo que realizo
            una función aparte setTableCorreccionMontos().
        */

        if(this.modoConsulta){
            this.detalles.addColumn('forma_pago','Forma de cobro','100px').setAsSelect(opcionesFormaPago).setDisabledFn(()=>true);
            this.detalles.addColumn('fecha','Fecha','100px').setAsDatePicker().setDisabledFn(()=>true);
            this.detalles.addColumn('cbu','CBU','').setAsInput().setDisabledFn(()=> true);
            this.detalles.addColumn('monto','Monto','150px').setAsNumberInput().setDisabledFn(()=> true);
        }
        else{
            this.detalles.addColumn('forma_pago','Forma de cobro','100px')
                .setAsSelect(opcionesFormaPago)
                .setErrorMessage((x : any) => {
                    if(x === '' || x === undefined || x === null){
                        return 'Obligatorio';
                    }
                    return '';
                })
                .setChangeSelect((row : any)=> {
                    if(!row.fecha){
                        row.fecha = this.fechaActual;
                    }
                })
                .setRequired();
            this.detalles.addColumn('fecha','Fecha','100px').setAsDatePicker(this.fechaActual)
                .setErrorMessage((x : any) => {
                    if(x === '' || x === undefined || x === null){
                        return 'Obligatorio';
                    }
                    return '';
                })
                .setRequired();
            this.detalles.addColumn('cbu','CBU','').setAsSelect().setDisabledFn((row : any)=>{
                return row.forma_pago !== 'Transferencia';
            })
                .setErrorMessage((x : any) => {
                    if(x === '' || x === undefined || x === null){
                        return 'Obligatorio';
                    }
                    return '';
                })
                .setRequired();
            this.detalles.addColumn('monto','Monto','150px').setAsNumberInput().setChangeInputFn(()=>{
                this.calcularMontoTotal();
            }).setRequired().setErrorMessage((x: any) => {
                return Number(x) > 0 ? '' : 'Obligatorio';  
            });
            this.detalles.addColumn('eliminar','','20px').setAsButton('delete').onClick((row) => {
                this.borrarFila(row);
            });
        }
        
    }

    private calcularMontoTotal() : void {
        let monto = 0;

        if(this.modoConsulta){
            let formas_pago = this.form.get('formas_pago').value;
            formas_pago.forEach(element => {
                monto = monto + Number(String(element.monto).replace(/\./g, '').replace(',','.'));
            });
            this.montoTotal = monto;
            return;
        }

        this.formas_pago.forEach((element)=>{
            monto = monto +  Number(String(element.monto).replace(/\./g, '').replace(',','.'));
        })
        this.montoTotal = monto;
        this.setMontoRestante();
    }

    public changeEmpresa() : void {
        this.empresas.filter((i)=> i.CUIT === this.form.get('cuit').value).map((element)=>{
            let cbus : Array<any> = element.Cuentas.map((i)=> {
                return {
                    value:i.Cbu,
                    text :i.Cbu + ' - ' + i.DescripcionBanco
                }
            });
            this.detalles.getColumn('cbu').setOptions(cbus);
        });
        this.setMontoRestante();
    }

    private createForm() : void {
        this.form = this.fb.group({
            cuit                : new FormControl({ value: '', disabled: false            }),
            tipo                : new FormControl({ value: '', disabled: false            }),
            fecha_solicitud     : new FormControl({ value: '', disabled: true             }),
            nombre_usuario      : new FormControl({ value: '', disabled: true             }),
            observaciones       : new FormControl({ value: '', disabled: this.modoConsulta}),            
            formas_pago         : new FormControl({ value: [], disabled: false            }),
            token               : new FormControl({ value: '', disabled: false            }),            
            estado              : new FormControl({ value: '', disabled: true             }),
            monto_aprobado      : new FormControl({ value: '', disabled: true             }),
            porcentaje_interes  : new FormControl({ value: '', disabled: true             }),

        });
    }

    private setFields() : void {
        let fechaActual = new Date();
        this.form.get('fecha_solicitud').setValue(fechaActual.toLocaleDateString());
        if (!this.id) {
            if(this.empresas.length === 1){
                this.form.get('cuit').setValue(this.empresas[0].CUIT);
                this.changeEmpresa();
            }
            this.form.get('nombre_usuario').setValue(this.usuario.Descripcion);
        }
        this.agregarFila();
    }

    public agregarFila() : void {
        this.formas_pago = this.formas_pago.concat([new FormaPago()]);
    }

    public borrarFila(fila: FormaPago): void {
        this.formas_pago = this.formas_pago.filter(r => r !== fila);
        this.calcularMontoTotal();
    }

    public changeTipoRetiro() : void {
        if(!this.modoConsulta && (this.form.get('tipo').value !== 'Anticipo')){
            this.checkHorario();
        }
        this.setMontoRestante();
    }

    private setMontoRestante() : void {
        if(this.form.get('cuit').value !== '' && this.form.get('tipo').value !== ''){
            let tipo = this.form.get('tipo').value;
            if(tipo === 'Disponible'){
                this.restante = this.obtenerSaldoDisponibleEmpresa() - this.montoTotal;
            }
            if(tipo === 'Cobranza del día'){
                this.restante = this.obtenerSaldoDelDiaEmpresa() - this.montoTotal;
            }
        }
        else{
            this.restante = 0;
        }
    } 

    public formatMonto(number : any) : string {
        number = Number(number);
        number.toFixed(2);
        if(!_isNumberValue(number)){
            return '0';
        }
        if(number>0){
            return '0';
        }
        else{
            return (number *-1).toFixed(2).toString()
        }
    }

    public formatFecha(fecha : string){
        fecha = fecha.split('T')[0];
        fecha = fecha.replace(/-/g, "/");
        let arrayFecha = fecha.split('/');
        arrayFecha.reverse();
        fecha = arrayFecha[0] + '/' + arrayFecha[1] + "/" + arrayFecha[2];
        return fecha;
    }

    public cancelarRetiro() {
        
        this.confirmService.askfForYesNo('Está seguro que desea cancelar la solicitud de cobro?').subscribe(()=>{
            try {
                this.apiService.post(`/extranet/solicitudes-cobro/${this.id}:cancelar`,{token : this.authService.getToken()}).subscribe(()=>{
                    this.router.navigateByUrl(`/app/extranet/solicitudes-cobro/listar`);
                });
            } 
            catch (error) {
                this.sanckBarService.show(error);
            }
        });
    }

    public obtenerSaldoDisponibleEmpresa(): number {
        let saldo = 0;
        this.empresas.filter((i)=> i.CUIT === this.form.get('cuit').value).map((element)=>{
            saldo = element.Saldos.Disponibles * (-1);
        });
        return saldo;
    }

    public obtenerSaldoDelDiaEmpresa(): number {
        let saldo = 0;
        this.empresas.filter((i)=> i.CUIT === this.form.get('cuit').value).map((element)=>{
            if(!element.Saldos['del Día']){
                saldo = 0;
                return;
            }
            saldo = (element.Saldos['del Día'] * (-1))*95/100;
        });
        return saldo;
    }
    
    public async submit() : Promise<void> {

        let formasPago = this.formas_pago.map((element)=>{
            let cbu   = element.cbu.length > 0 ? element.cbu : '';
            let monto = String(element.monto).replace(/\./g,'').replace(',','.');
            let fecha = null;
            try {
                fecha = new Date(element.fecha).toISOString().split('T')[0];
            } catch (e) {
            }

            return {
                forma_pago: element.forma_pago,
                fecha     : fecha,
                cbu       : cbu,
                monto     : Number(monto),
            };
        });

        this.form.get('formas_pago').setValue(formasPago);
        
        this.form.get('token').setValue(this.authService.getToken());
        if (!this.form.valid){
            this.sanckBarService.show('Verifique los datos ingresados');
            return;
        }

        if (this.form.get('tipo').value === 'Disponible') {
            if(this.montoTotal > this.obtenerSaldoDisponibleEmpresa()){
                this.sanckBarService.show('El monto total excede el saldo disponible.');
                return;
            }
        }

        if (this.form.get('tipo').value === 'Cobranza del día'){
            if(this.montoTotal > this.obtenerSaldoDelDiaEmpresa()){
                this.sanckBarService.show('El monto total excede el saldo del día.');
                return;
            }
        }
   
        this.confirmService.ask(`¿Está seguro que desea confirmar la solicitud de retiro por $${this.utils.formatNumeroConDecimales(this.montoTotal.toString())}?`).subscribe(async ()=>{
            try {
                this.enviando = true;
                await this.enviarDatos().toPromise();
                this.sanckBarService.show('Solicitud registrada con éxito');
                this.router.navigateByUrl('/app/extranet/solicitudes-cobro/listar');
            } finally {
                this.enviando = false;
            }
        });
    }

    public async confirmarRetiro(){
        this.calcularMontoTotal();
        if(this.montoTotal != Number(this.montoAprobado)){
            this.sanckBarService.show("El monto total no coincide con el monto aprobado");
            return;
        }

        await this.apiService.post(`/extranet/solicitudes-cobro/${this.id}/actualizar-estado-aprobado-solicitante`, {
            token: this.authService.getToken()
        }).toPromise();
        
        this.sanckBarService.show("Datos guardados con éxito");
        this.router.navigateByUrl('/app/extranet/solicitudes-cobro/listar');
    }

}
