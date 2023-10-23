import { async, TestBed } from '@angular/core/testing';
import { TiposProductosEditarComponent } from './tipos-productos-editar.component';
describe('TiposProductosEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TiposProductosEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TiposProductosEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tipos-productos-editar.component.spec.js.map