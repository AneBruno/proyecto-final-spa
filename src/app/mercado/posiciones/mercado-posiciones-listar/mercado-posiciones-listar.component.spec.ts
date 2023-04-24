import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPosicionesListarComponent } from './mercado-posiciones-listar.component';

describe('MercadoPosicionesListarComponent', () => {
  let component: MercadoPosicionesListarComponent;
  let fixture: ComponentFixture<MercadoPosicionesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPosicionesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPosicionesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
