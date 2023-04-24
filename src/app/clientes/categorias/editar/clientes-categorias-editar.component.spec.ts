import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCategoriasEditarComponent } from './clientes-categorias-editar.component';

describe('ClientesCategoriasEditarComponent', () => {
  let component: ClientesCategoriasEditarComponent;
  let fixture: ComponentFixture<ClientesCategoriasEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesCategoriasEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesCategoriasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
