import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFiltradoComponent } from './listado-filtrado.component';

describe('ListadoFiltradoComponent', () => {
  let component: ListadoFiltradoComponent;
  let fixture: ComponentFixture<ListadoFiltradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoFiltradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoFiltradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
