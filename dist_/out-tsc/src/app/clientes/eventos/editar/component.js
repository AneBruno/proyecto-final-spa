import { __awaiter, __decorate } from "tslib";
import * as moment from "moment";
import es from '@angular/common/locales/es';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { BuscarOrdenesComponent } from "../buscar-ordenes/buscar-ordenes.component";
import { FormBaseComponent } from 'src/app/shared/form-base.component';
import { OrdenHelper } from "src/app/mercado/orden.helper";
let ClientesEventosEditarComponent = class ClientesEventosEditarComponent extends FormBaseComponent {
    constructor(userService, router, route) {
        super();
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.title = '';
        this.tipos_evento = [];
        this.puedeEditar = true;
        this.modoConsulta = false;
    }
    ngOnInit() {
        this.obtenerFechas();
        registerLocaleData(es);
        this.createForm();
        this.loadData();
        this.route.params.subscribe((params) => __awaiter(this, void 0, void 0, function* () {
            if (params.id) {
                this.id = params.id;
                yield this.obtenerYCompletar(params.id, {
                    with_relation: 'ordenes.empresa,ordenes.producto',
                });
                if (params.accion && params.accion === 'consultar') {
                    this.title = 'Consultar evento';
                    this.puedeEditar = false;
                    this.modoConsulta = true;
                    this.deshabilitarFormulario();
                }
                else {
                    this.title = 'Editar evento';
                }
            }
            else {
                let currentUser = this.userService.getUser();
                this.form.patchValue({ responsables: [currentUser] });
                this.title = 'Agregar evento CRM';
            }
            this.form.get('fecha_vencimiento').valueChanges.subscribe(() => {
                this.recalcularFechasVencimiento();
            });
            this.form.get('tipo_evento_id').valueChanges.subscribe(() => {
                this.recalcularFechasVencimiento();
            });
        }));
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            titulo: new FormControl({ value: '', disabled: false }),
            tipo_evento_id: new FormControl({ value: '', disabled: false }),
            responsables: new FormControl({ value: [], disabled: false }),
            fecha_vencimiento: new FormControl({ value: '', disabled: false }),
            fecha_alerta_1: new FormControl({ value: '', disabled: false }),
            fecha_alerta_2: new FormControl({ value: '', disabled: false }),
            empresas: new FormControl({ value: [], disabled: false }),
            contactos: new FormControl({ value: [], disabled: false }),
            ordenes: new FormControl({ value: [], disabled: false }),
            archivos: new FormControl({ value: [], disabled: false }),
            descripcion: new FormControl({ value: '', disabled: false }),
            usuario_creador: new FormControl({ value: {}, disabled: false }),
            created_at: new FormControl({ value: '', disabled: false }),
            estado: new FormControl({ value: '', disabled: false }),
            resolucion: new FormControl({ value: '', disabled: false }),
        });
    }
    get dataUrl() {
        return '/clientes/eventos';
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tipos_evento = yield this.apiService.getData('/clientes/tipos-evento', {
                limit: 0,
                filtros: {
                    habilitado: 1,
                }
            }).toPromise();
        });
    }
    recalcularFechasVencimiento() {
        this.tipos_evento.filter((row) => {
            return row.id === this.form.get('tipo_evento_id').value;
        }).map((row) => {
            let fecha_vencimiento = this.getFormData().fecha_vencimiento;
            if (!fecha_vencimiento) {
                return;
            }
            this.form.patchValue({
                fecha_alerta_1: moment(fecha_vencimiento).subtract(row.cantidad_dias_alerta_1, 'days').format('YYYY-MM-DD') + 'T12:00:00.000Z',
                fecha_alerta_2: moment(fecha_vencimiento).subtract(row.cantidad_dias_alerta_2, 'days').format('YYYY-MM-DD') + 'T12:00:00.000Z',
            });
            let fecha_alerta_1 = this.getFormData().fecha_alerta_1;
            let fecha_alerta_2 = this.getFormData().fecha_alerta_2;
            if (fecha_alerta_1 <= this.todayDate) {
                this.form.patchValue({
                    fecha_alerta_1: this.todayDate + 'T12:00:00.000Z',
                });
            }
            if (fecha_alerta_2 <= this.todayDate) {
                this.form.patchValue({
                    fecha_alerta_2: this.todayDate + 'T12:00:00.000Z',
                });
            }
        });
    }
    actualizar() {
        return this.apiService.post(this.getDataUrl() + '/' + this.id + '/actualizar', this.getFormData());
    }
    obtenerDatos(id, params) {
        const _super = Object.create(null, {
            obtenerDatos: { get: () => super.obtenerDatos }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield _super.obtenerDatos.call(this, id, params);
            /**
             * tengo que sumarle un día, porque el datepicker me muestra siempre un día menos
             * cuando el campo ya tiene un valor.
             *
             * ya hemos probado de todo. Con distintos adapters.
             * Por falta de tiempo hacemos esto, habría que hacer un debug del date adapter
             * para ver qué está pasando realmente.
             **/
            data.fecha_vencimiento = moment(data.fecha_vencimiento).add(1, 'day').format('YYYY-MM-DD');
            return data;
        });
    }
    getFormData() {
        let data = super.getFormData();
        if (this.id) {
            /**
             * tengo que restarle un día, ver comentario anterior
             * Esto es un PARCHE.
             **/
            data.fecha_vencimiento = moment(data.fecha_vencimiento).subtract(1, 'day').format('YYYY-MM-DD');
        }
        else {
            data.fecha_vencimiento = moment(data.fecha_vencimiento).format('YYYY-MM-DD');
        }
        data.fecha_alerta_1 = data.fecha_alerta_1 === null ? null : moment(data.fecha_alerta_1).format('YYYY-MM-DD HH:mm:ss');
        data.fecha_alerta_2 = data.fecha_alerta_2 === null ? null : moment(data.fecha_alerta_2).format('YYYY-MM-DD HH:mm:ss');
        // Esto es para que no envíe las entidades completas,
        // El backend sólo necesita los ids.
        ['responsables', 'empresas', 'contactos', 'ordenes', 'archivos'].map((nodo) => {
            data[nodo] = data[nodo].map((row) => {
                if (nodo === 'archivos' && row instanceof File) {
                    return row;
                }
                return { id: row.id };
            });
        });
        data.usuario_creador = undefined;
        return data;
    }
    guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos Guardados!').subscribe(() => {
                this.router.navigateByUrl('/app/clientes/eventos');
            });
        });
    }
    usuariosLabelFn(row) {
        return `${row.nombre} ${row.apellido}`;
    }
    contactosLabelFn(row) {
        return `${row.nombre} (${row.empresa.razon_social})`;
    }
    ordenesLabelFn(row) {
        return (new OrdenHelper).obtenerAbreviacion(row);
    }
    archivosLabelFn(row) {
        if (row instanceof File) {
            return row.name;
        }
        return row.nombre;
    }
    archivosLinkFn(row) {
        return row.url;
    }
    getFechaCreacion() {
        return moment(this.form.get('created_at').value).format('DD/MM/YYYY');
    }
    abrirBuscadorOrdenes() {
        if (this.modoConsulta) {
            return;
        }
        let openDialog = this.matDialog.open(BuscarOrdenesComponent, {
            width: '1200px',
            height: '600px',
            panelClass: 'buscador',
            data: {
                excluirOrdenesId: this.form.get('ordenes').value.map(row => row.id),
                empresasId: this.form.get('empresas').value.map(row => row.id),
            },
        });
        openDialog.componentInstance.choosen.subscribe((data) => {
            let ordenes = this.form.get('ordenes').value;
            data.map((row) => {
                ordenes.push(row);
            });
            this.form.patchValue({ ordenes: ordenes });
            openDialog.close();
        });
    }
    onFileChange(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            let file = event.target.files[i];
            this.form.get('archivos').value.push(file);
        }
        return;
    }
    obtenerFechas() {
        this.todayDate = moment().add(0, "day").format("YYYY-MM-DD");
        //Esto se hace debido a que el date picker toma como min el dia anterior a la fecha actual
        this.tomorrowDate = moment().add(1, "day").format("YYYY-MM-DD");
    }
};
ClientesEventosEditarComponent = __decorate([
    Component({
        selector: 'app-clientes-eventos-editar',
        templateUrl: './template.html',
        styleUrls: ['./styles.scss'],
    })
], ClientesEventosEditarComponent);
export { ClientesEventosEditarComponent };
//# sourceMappingURL=component.js.map