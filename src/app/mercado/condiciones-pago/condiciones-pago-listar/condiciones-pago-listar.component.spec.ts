import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesPagoListarComponent } from './condiciones-pago-listar.component';

describe('CondicionesPagoListarComponent', () => {
  let component: CondicionesPagoListarComponent;
  let fixture: ComponentFixture<CondicionesPagoListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesPagoListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesPagoListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
