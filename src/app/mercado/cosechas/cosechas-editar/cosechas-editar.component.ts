import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/shared/form-base.component';

@Component({
  selector: 'app-cosechas-editar',
  templateUrl: './cosechas-editar.component.html',
  styleUrls: ['./cosechas-editar.component.scss']
})
export class CosechasEditarComponent extends FormBaseComponent implements OnInit {

    public id      : number;
    public title   : string = 'Agregar Cosecha';

    constructor(
        private route    : ActivatedRoute,
        private router   : Router,
    ) {
        super();
    }

    ngOnInit(): void {
        this.createForm();
        this.watchRoute();
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Cosecha';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }

    private createForm() {
        this.form = this.fb.group({
            id               : new FormControl({ value: '', disabled: true  }),
            descripcion      : new FormControl({ value: '', disabled: false }, Validators.required)
        });
    }

    protected get dataUrl() {
        return '/mercado/cosechas';
    }

    protected completarCampos(data: any) {
        super.completarCampos(data);
    }

    public onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/mercado/cosechas');
            });
        });
    }

}
