import { async, TestBed } from '@angular/core/testing';
import { ClientesContactosEditarComponent } from './clientes-contactos-editar.component';
describe('ClientesContactosEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesContactosEditarComponent]
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
//# sourceMappingURL=clientes-contactos-editar.component.spec.js.map