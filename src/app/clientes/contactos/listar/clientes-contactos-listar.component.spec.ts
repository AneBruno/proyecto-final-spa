import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesContactosListarComponent } from './clientes-contactos-listar.component';

describe('ClientesContactosListarComponent', () => {
  let component: ClientesContactosListarComponent;
  let fixture: ComponentFixture<ClientesContactosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesContactosListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesContactosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
