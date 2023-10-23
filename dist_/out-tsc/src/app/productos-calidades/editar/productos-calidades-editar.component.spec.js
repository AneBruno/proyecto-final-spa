import { async, TestBed } from '@angular/core/testing';
import { ProductosCalidadesEditarComponent } from './productos-calidades-editar.component';
describe('ProductosCalidadesEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductosCalidadesEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ProductosCalidadesEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=productos-calidades-editar.component.spec.js.map