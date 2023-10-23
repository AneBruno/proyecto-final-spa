import { async, TestBed } from '@angular/core/testing';
import { ActualizarRolYOficinaComponent } from './actualizar-rol-y-oficina.component';
describe('ActualizarRolYOficinaComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActualizarRolYOficinaComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ActualizarRolYOficinaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=actualizar-rol-y-oficina.component.spec.js.map