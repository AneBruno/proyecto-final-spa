import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoOrdenesEditarComponent } from './mercado-ordenes-editar.component';

describe('MercadoOrdenesEditarComponent', () => {
  let component: MercadoOrdenesEditarComponent;
  let fixture: ComponentFixture<MercadoOrdenesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoOrdenesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoOrdenesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
