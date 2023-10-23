import { async, TestBed } from '@angular/core/testing';
import { TiposProductosListarComponent } from './tipos-productos-listar.component';
describe('TiposProductosListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TiposProductosListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TiposProductosListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tipos-productos-listar.component.spec.js.map