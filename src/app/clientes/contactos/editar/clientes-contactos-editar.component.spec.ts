import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesContactosEditarComponent } from './clientes-contactos-editar.component';

describe('ClientesContactosEditarComponent', () => {
  let component: ClientesContactosEditarComponent;
  let fixture: ComponentFixture<ClientesContactosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesContactosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesContactosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
