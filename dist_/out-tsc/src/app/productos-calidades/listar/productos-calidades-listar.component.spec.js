import { async, TestBed } from '@angular/core/testing';
import { ProductosCalidadesListarComponent } from './productos-calidades-listar.component';
describe('ProductosCalidadesListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductosCalidadesListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ProductosCalidadesListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=productos-calidades-listar.component.spec.js.map