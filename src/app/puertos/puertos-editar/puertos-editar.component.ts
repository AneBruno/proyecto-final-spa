import { Component, OnInit      } from '@angular/core';
import { FormControl,           } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseLocalizacionComponent } from 'src/app/shared/form-base-localizacion.component';

@Component({
  selector    :  'app-puertos-editar',
  templateUrl :  './puertos-editar.component.html',
  styleUrls   : ['./puertos-editar.component.scss'],
})
export class PuertosEditarComponent extends FormBaseLocalizacionComponent implements OnInit {
    
    public id                : number;
    public title             : string = 'Agregar puerto';
    public sessionToken      : string = '';
    public timeout           : any;
    public resultados        : any[] = [];

    constructor(
        private route    : ActivatedRoute, 
        private router   : Router,
    ) {
        super();
    }

    protected get dataUrl(): string {
        return '/puertos';
    }

    async ngOnInit(): Promise<void> {
        this.createForm();
        this.watchRoute();
    }

    private createForm() {
        this.form = this.fb.group({
            id                    : new FormControl({ value: '', disabled: true  }),
            nombre                : new FormControl({ value: '', disabled: false }),
            terminal              : new FormControl({ value: '', disabled: false }),
            placeId               : new FormControl({ value: '', disabled: false }),
            descripcion_ubicacion : new FormControl({ value: '', disabled: false }),
        });
    }

    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar Puerto';
                this.id = params.id;
                this.obtenerYCompletar(params.id);
            }
        });
    }

    public onSubmit() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados').subscribe(() => {
                this.router.navigateByUrl('/app/puertos');
            });
        });
    }
}
