import { async, TestBed } from '@angular/core/testing';
import { CondicionesPagoListarComponent } from './condiciones-pago-listar.component';
describe('CondicionesPagoListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CondicionesPagoListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CondicionesPagoListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=condiciones-pago-listar.component.spec.js.map