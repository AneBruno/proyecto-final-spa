/*import { AgregarPagoSolicitudService } from '../../agregar-pago-solicitud.service';
import { Component                   } from '@angular/core';
import { _isNumberValue              } from '@angular/cdk/coercion';
import { FormControl                 } from '@angular/forms';
import { OnInit                      } from '@angular/core';
import { ViewChild                   } from '@angular/core';
import { Router                      } from '@angular/router';
import { ActivatedRoute              } from '@angular/router';
import { ExtranetAuthService         } from '../../extranet.auth.service';
import { FormBaseComponent           } from 'src/app/shared/form-base.component';
import { MessagesService             } from 'src/app/shared/services/messages.service';
import { TableComponent              } from 'src/app/shared/table/table.component';
import { SnackBarService             } from 'src/app/shared/services/snack-bar.service';
import { Utils                       } from 'src/app/shared/utils';

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
    selector    : 'app-solicitud-cobro-agregar',
    templateUrl : './solicitud-cobro-agregar.component.html',
    styleUrls   : ['./solicitud-cobro-agregar.component.scss']
})
export class SolicitudCobroAgregarComponent extends FormBaseComponent implements OnInit {

    constructor(
        private agregarPagoService : AgregarPagoSolicitudService,
        private authService        : ExtranetAuthService,
        private messageService     : MessagesService,
        private route              : ActivatedRoute,
        private router             : Router,
        public  sanckBarService    : SnackBarService,
        public  utils              : Utils,
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
    public formEnviado     : boolean = false;


    @ViewChild('detalles', {static: true})
    public detalles : TableComponent<any>;

    @ViewChild('table', {static: true})
    public table : TableComponent<any>;

    ngOnInit(): void {
        
        let loginData = this.authService.getLoginData();
        this.empresas = loginData.accounts;
        this.usuario  = loginData.Usuario;
        this.createForm();
        this.setNewTable();
        this.setFields();
        this.formas_pago = this.agregarPagoService.solicitud.formasPago;
        this.posicionarEnEnviarSolicitud();
        this.form.get('cuit').setValue(this.agregarPagoService.solicitud.cuit);
        this.form.get('tipo').setValue(this.agregarPagoService.solicitud.tipo);
        this.form.get('observaciones').setValue(this.agregarPagoService.solicitud.observacion)
        this.calcularMontoTotal();
        //detectar si se modificó algun dato para asignar valores

    }

    //Metodo que verifica si hay formas de pago para posicionar al usuario en el boton enviar.
    private posicionarEnEnviarSolicitud(){
        if(this.formas_pago.length != 0){
            window.scrollTo(0, 9999);
        }
    }

    private checkHorario() : void {
        this.apiService.getData('/extranet/solicitudes-cobro//horarioLimiteSolicitudDisponibleDelDia').subscribe((data)=>{
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
            this.messageService.show(`Le recordamos que las solicitudes ingresadas después de las ${data.hora} horas se procesarán durante el día de mañana`,'center');
        });
    }

    public clickNewCbu() : void {
        this.confirmService.ask('Desea abandonar la carga de la solicitud?').subscribe( (option) => {
            this.router.navigateByUrl('/app/extranet/solicitudes-cbu/agregar');
        });
    }

    private setNewTable() : void {
        this.table.addColumn('forma_pago', 'Forma de cobro', '260px', undefined, 'payments'    , '#85754E' ).setAsText();
        this.table.addColumn('fecha',      'Fecha',          '150px', undefined, 'event'       , '#6AAAE4' ).renderFn((row)=>{
            let fecha = row.fecha;
            return fecha.getDate() + '-' + fecha.getMonth() + '-' + fecha.getYear();
        });
        this.table.addColumn('cbu',        'CBU',            '', undefined, 'description' , '#00BBB4' ).renderFn((row)=>row.cbuYBanco);
        this.table.addColumn('monto',      'Monto',          '170px', undefined, 'attach_money', '#D79A2B' ).setAlign('right').renderFn((row)=>{
            return this.utils.fomatNumeroConOSinDecimales(row.monto);
        });
        
        if(!this.modoConsulta){
            this.table.addColumn('opciones', '', '32px').setAsMenu();

        }
        this.table.setFnMenuItems((row: any) => {
            this.table.clearMenuItems();
            this.table.addMenuItem('Eliminar', () => {
                this.borrarFila(row);
            });
        });
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
            this.agregarPagoService.solicitud.cbus = cbus;
        });
        this.agregarPagoService.solicitud.cuit = this.form.get('cuit').value;
        if(this.empresas.length > 1){
            this.formas_pago = this.agregarPagoService.eliminarTodasLasFormasDePago();
        }
        this.calcularMontoTotal();
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
            tasa_interes        : new FormControl({ value: '', disabled: true             }),

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
        this.formas_pago = this.agregarPagoService.eliminarFormaPago(fila);
        this.calcularMontoTotal();
    }

    public changeTipoRetiro() : void {
        if(!this.modoConsulta && (this.form.get('tipo').value !== 'Anticipo')){
            this.checkHorario();
        }

        this.agregarPagoService.solicitud.tipo = this.form.get('tipo').value;
        
        if(this.formas_pago.length > 0){
            this.calcularMontoTotal()
        } 
        else{
            this.setMontoRestante();
        }
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

    public changeObservacion() : void {
        this.agregarPagoService.solicitud.observacion = this.form.get('observaciones').value;
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

        if(formasPago.length < 1){
            this.sanckBarService.show('Ingrese al menos una forma de cobro.');
            return;
        }

        this.form.get('formas_pago').setValue(formasPago);
        
        this.form.get('token').setValue(this.authService.getToken());
        if (!this.form.valid){
            this.sanckBarService.show('Verifique los datos ingresados');
            return;
        }

        if(formasPago.length < 1){
            this.sanckBarService.show('Ingrese al menos una forma de cobro.');
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
                this.agregarPagoService.enviarDatos();
                this.sanckBarService.show('Solicitud registrada con éxito');
                this.router.navigateByUrl('/app/extranet/solicitudes-cobro/listar');
            } finally {
                this.enviando = false;
            }
        });
    }

}
*/