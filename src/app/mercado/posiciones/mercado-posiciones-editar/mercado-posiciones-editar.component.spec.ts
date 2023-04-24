import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPosicionesEditarComponent } from './mercado-posiciones-editar.component';

describe('MercadoPosicionesEditarComponent', () => {
  let component: MercadoPosicionesEditarComponent;
  let fixture: ComponentFixture<MercadoPosicionesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPosicionesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPosicionesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
