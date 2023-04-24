import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoOrdenesFormComponent } from './mercado-ordenes-form.component';

describe('MercadoOrdenesFormComponent', () => {
  let component: MercadoOrdenesFormComponent;
  let fixture: ComponentFixture<MercadoOrdenesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoOrdenesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoOrdenesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
