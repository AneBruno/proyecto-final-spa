import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOfertasComponent } from './gestion-ofertas.component';

describe('GestionOfertasComponent', () => {
  let component: GestionOfertasComponent;
  let fixture: ComponentFixture<GestionOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
