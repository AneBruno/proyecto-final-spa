import { async, TestBed } from '@angular/core/testing';
import { ClientesContactosListarComponent } from './clientes-contactos-listar.component';
describe('ClientesContactosListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesContactosListarComponent]
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
//# sourceMappingURL=clientes-contactos-listar.component.spec.js.map