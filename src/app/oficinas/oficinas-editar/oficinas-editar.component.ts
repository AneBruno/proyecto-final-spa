import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit      } from '@angular/core';
import { FormControl            } from '@angular/forms';
import { Observable,            } from 'rxjs';
import { FormBaseComponent      } from 'src/app/shared/form-base.component';

@Component({
    selector: 'oficinas-editar',
    templateUrl: './oficinas-editar.component.html',
    styleUrls: ['./oficinas-editar.component.scss']
})
export class OficinasEditarComponent extends FormBaseComponent implements OnInit {

    public id        : number;
    public title     : string = 'Agregar oficina'
    public oficinas$ : Observable<any[]>
    public oficina   : any;

    public constructor(
        private route    : ActivatedRoute, 
        private router   : Router,
    ) {
        super();
    }

    public ngOnInit(): void {        
        this.oficinas$ = this.apiService.getData(this.getDataUrl(), {limit: 0});
        this.createForm();
        this.watchRoute();
    }

    protected get dataUrl(): string {
        return '/oficinas';
    }
    
    private watchRoute() {
        this.route.params.subscribe((params) => {
            if (params.id) {
                this.title = 'Editar oficina';
                this.obtenerYCompletar(params.id);
            }
        });
    }

    private createForm() {
        this.form = this.fb.group({
            id               : new FormControl({ value: '', disabled: true  }),
            nombre           : new FormControl({ value: '', disabled: false }),
            oficina_madre_id : new FormControl({ value: '', disabled: false }),
        });
    }

    public guardar() {
        this.enviarDatos().subscribe(() => {
            this.messages.show('Datos guardados correctamente').subscribe(() => {
                this.router.navigateByUrl('/app/oficinas');
            });
        });
    }

    public cancelar() {
        
    }

}
