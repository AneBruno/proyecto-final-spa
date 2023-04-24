import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarSlipComponent } from './cerrar-slip.component';

describe('CerrarSlipComponent', () => {
  let component: CerrarSlipComponent;
  let fixture: ComponentFixture<CerrarSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
