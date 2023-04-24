import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesPagoEditarComponent } from './condiciones-pago-editar.component';

describe('CondicionesPagoEditarComponent', () => {
  let component: CondicionesPagoEditarComponent;
  let fixture: ComponentFixture<CondicionesPagoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesPagoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesPagoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
