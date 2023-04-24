import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoOrdenesListarComponent } from './mercado-ordenes-listar.component';

describe('MercadoOrdenesListarComponent', () => {
  let component: MercadoOrdenesListarComponent;
  let fixture: ComponentFixture<MercadoOrdenesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoOrdenesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoOrdenesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
