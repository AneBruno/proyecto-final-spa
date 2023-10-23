import { async, TestBed } from '@angular/core/testing';
import { ClientesEmpresasEditarComponent } from './clientes-empresas-editar.component';
describe('ClientesEmpresasEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesEmpresasEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesEmpresasEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-empresas-editar.component.spec.js.map