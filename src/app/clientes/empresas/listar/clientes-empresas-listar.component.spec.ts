import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEmpresasListarComponent } from './clientes-empresas-listar.component';

describe('ClientesEmpresasListarComponent', () => {
  let component: ClientesEmpresasListarComponent;
  let fixture: ComponentFixture<ClientesEmpresasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesEmpresasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesEmpresasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
