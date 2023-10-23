import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listado-sin-filtros',
  templateUrl: './listado-sin-filtros.component.html',
  styleUrls: ['./listado-sin-filtros.component.scss']
})
export class ListadoSinFiltrosComponent {
  @Input() transparent: boolean = false;
}
