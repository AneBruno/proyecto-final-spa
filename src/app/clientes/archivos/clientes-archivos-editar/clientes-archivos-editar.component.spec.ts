import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesArchivosEditarComponent } from './clientes-archivos-editar.component';

describe('ClientesArchivosEditarComponent', () => {
  let component: ClientesArchivosEditarComponent;
  let fixture: ComponentFixture<ClientesArchivosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesArchivosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesArchivosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
