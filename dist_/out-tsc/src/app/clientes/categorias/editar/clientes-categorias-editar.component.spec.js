import { async, TestBed } from '@angular/core/testing';
import { ClientesCategoriasEditarComponent } from './clientes-categorias-editar.component';
describe('ClientesCategoriasEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesCategoriasEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesCategoriasEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-categorias-editar.component.spec.js.map