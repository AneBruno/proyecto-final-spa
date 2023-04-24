import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDatosPersonalesComponent } from './actualizar-datos-personales.component';

describe('ActualizarDatosPersonalesComponent', () => {
  let component: ActualizarDatosPersonalesComponent;
  let fixture: ComponentFixture<ActualizarDatosPersonalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarDatosPersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
