import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEncabezadoComponent } from './listado-encabezado.component';

describe('ListadoEncabezadoComponent', () => {
  let component: ListadoEncabezadoComponent;
  let fixture: ComponentFixture<ListadoEncabezadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEncabezadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
