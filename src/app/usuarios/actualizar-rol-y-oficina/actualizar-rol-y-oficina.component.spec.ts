import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRolYOficinaComponent } from './actualizar-rol-y-oficina.component';

describe('ActualizarRolYOficinaComponent', () => {
  let component: ActualizarRolYOficinaComponent;
  let fixture: ComponentFixture<ActualizarRolYOficinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarRolYOficinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarRolYOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
