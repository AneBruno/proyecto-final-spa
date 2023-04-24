import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertosListadoComponent } from './puertos-listado.component';

describe('PuertosListadoComponent', () => {
  let component: PuertosListadoComponent;
  let fixture: ComponentFixture<PuertosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuertosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuertosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
