import { async, TestBed } from '@angular/core/testing';
import { ClientesCategoriasListarComponent } from './clientes-categorias-listar.component';
describe('ClientesCategoriasListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesCategoriasListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesCategoriasListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-categorias-listar.component.spec.js.map