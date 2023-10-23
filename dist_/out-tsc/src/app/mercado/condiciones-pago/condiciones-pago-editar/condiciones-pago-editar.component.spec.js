import { async, TestBed } from '@angular/core/testing';
import { CondicionesPagoEditarComponent } from './condiciones-pago-editar.component';
describe('CondicionesPagoEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CondicionesPagoEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CondicionesPagoEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=condiciones-pago-editar.component.spec.js.map