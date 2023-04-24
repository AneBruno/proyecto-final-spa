import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesArchivosListarComponent } from './clientes-archivos-listar.component';

describe('ClientesArchivosListarComponent', () => {
  let component: ClientesArchivosListarComponent;
  let fixture: ComponentFixture<ClientesArchivosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesArchivosListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesArchivosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
