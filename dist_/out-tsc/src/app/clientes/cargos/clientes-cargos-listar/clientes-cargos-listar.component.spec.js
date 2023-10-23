import { async, TestBed } from '@angular/core/testing';
import { ClientesCargosListarComponent } from './clientes-cargos-listar.component';
describe('ClientesCargosListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesCargosListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesCargosListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-cargos-listar.component.spec.js.map