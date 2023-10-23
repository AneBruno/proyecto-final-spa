import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';
let ClientesEmpresasEditarComponent = class ClientesEmpresasEditarComponent extends FormBaseLocalizacionComponent {
    constructor(router, route, userService) {
        super();
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.title = 'Agregar Empresa';
        this.usuarios = [];
        this.actividades = [];
        this.categorias = [];
        this.mostrarComisionComprador = false;
        this.mostrarComisionVendedor = false;
        this.cuitError = '';
        this.cuitValue = '';
    }
    ngOnInit() {
        this.watchRoute();
        this.loadActividades();
        this.loadUsuarios();
        this.createForm();
        let user = this.userService.getUser();
        if (!this.id) {
            this.form.patchValue({
                usuario_comercial_id: user.id,
            });
        }
        this.isNotAdministrador = !user.isAdministrador();
    }
    watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.id = params.id;
                this.loadData();
            }
        });
    }
    loadData() {
        if (this.id) {
            this.title = 'Editar Empresa';
            this.obtenerYCompletar(this.id);
        }
    }
    loadActividades() {
        this.apiService.getData('/clientes/actividades', { limit: 0 }).subscribe((data) => {
            this.actividades = data;
        });
    }
    loadCategorias(perfil = undefined) {
        this.apiService.getData('/clientes/categorias', {
            filtros: {
                perfil: perfil
            },
            limit: 0
        }).subscribe((data) => {
            this.categorias = data;
        });
    }
    loadUsuarios() {
        this.apiService.getData('/usuarios', {
            filtros: {
                rol_id: [2, 3, 4]
            },
            limit: 0
        }).subscribe((data) => {
            this.usuarios = data;
        });
    }
    createForm() {
        this.form = this.fb.group({
            id: new FormControl({ value: '', disabled: true }),
            cuit: new FormControl({ value: '', disabled: false }),
            razon_social: new FormControl({ value: '', disabled: false }),
            abreviacion: new FormControl({ value: '', disabled: false }),
            telefono: new FormControl({ value: '', disabled: false }),
            email: new FormControl({ value: '', disabled: false }),
            perfil: new FormControl({ value: '', disabled: false }),
            comision_comprador: new FormControl({ value: '', disabled: false }),
            comision_vendedor: new FormControl({ value: '', disabled: false }),
            categoria_crediticia: new FormControl({ value: '', disabled: false }),
            afinidad: new FormControl({ value: '', disabled: false }),
            usuario_comercial_id: new FormControl({ value: '', disabled: false }),
            placeId: new FormControl({ value: '', disabled: false }),
            actividades_id: new FormControl({ value: [], disabled: false }),
            categorias_id: new FormControl({ value: [], disabled: false }),
            descripcion_ubicacion: new FormControl({ value: '', disabled: false }),
        });
        this.form.get('perfil').valueChanges.subscribe((value) => {
            this.perfil = value;
            this.loadCategorias(value === 'COMPRADOR_VENDEDOR' ? undefined : value);
        });
    }
    get dataUrl() {
        return '/clientes/empresas';
    }
    completarCampos(data) {
        super.completarCampos(data);
        this.mostrarCamposComisiones(data.perfil);
    }
    guardar() {
        this.enviarDatos().subscribe((data) => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                if (this.id) {
                    this.router.navigateByUrl('/app/clientes/empresas');
                }
                else {
                    this.router.navigateByUrl('/app/clientes/empresas/' + data.id);
                }
            });
        });
    }
    mostrarCamposComisiones(valor) {
        this.mostrarComisionComprador = valor === 'COMPRADOR_VENDEDOR' || valor === 'COMPRADOR';
        this.mostrarComisionVendedor = valor === 'COMPRADOR_VENDEDOR' || valor === 'VENDEDOR';
    }
};
ClientesEmpresasEditarComponent = __decorate([
    Component({
        selector: 'clientes-empresas-editar',
        templateUrl: './clientes-empresas-editar.component.html',
        styleUrls: ['./clientes-empresas-editar.component.scss']
    })
], ClientesEmpresasEditarComponent);
export { ClientesEmpresasEditarComponent };
//# sourceMappingURL=clientes-empresas-editar.component.js.map