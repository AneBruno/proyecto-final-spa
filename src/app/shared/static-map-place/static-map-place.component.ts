import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { v4 as uuidv4           } from 'uuid';

@Component({
  selector: 'app-static-map-place',
  templateUrl: './static-map-place.component.html',
  styleUrls: ['./static-map-place.component.scss']
})
export class StaticMapPlaceComponent implements OnInit {

    public timeout      : any;
    public resultados   : any[] = [];
    public sessionToken : string = '';

    @Input()
    public direccion? : string;

    @Input()
    public placeId? : string;

    @Input()
    public url? : string;

    @Input()
    public error : string = '';

    @Input()
    public titulo: string = 'Buscar ubicacion';

    @Input()
    public disabled?: boolean = false;


    @Output()
    public placeIdChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private client : ApiService
    ) { }

    ngOnInit(): void {
    }

    public onSearch(ev: any) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(async () => {


            let text = ev.srcElement.value;
            if (!text) {
                return;
            }

            let response = await this.client.getData('/google/places/buscar', {
                text: text,
                sessionToken: this.sessionToken,
            }).toPromise();
            this.resultados = response;
        }, 400);
    }

    public async onClickResultado(id: string) {
        let result = await this.client.getData('/google/places/obtenerDetalles/' + id, {
            sessionToken: this.sessionToken,
        }).toPromise();
        

        this.direccion = [result.direccion, result.localidad, result.departamento, result.provincia].join(', '),
        this.placeId   = id,
        this.placeIdChange.emit(id);

        this.url = 'data:image/png;base64,' + result.mapcontent;
        this.generateSessionToken();
    }

    private generateSessionToken() {
        this.sessionToken = uuidv4();
    }

}
