import { async, TestBed } from '@angular/core/testing';
import { ClientesEmpresasListarComponent } from './clientes-empresas-listar.component';
describe('ClientesEmpresasListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesEmpresasListarComponent]
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
//# sourceMappingURL=clientes-empresas-listar.component.spec.js.map