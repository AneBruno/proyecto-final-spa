import { async, TestBed } from '@angular/core/testing';
import { MercadoOrdenesListarComponent } from './mercado-ordenes-listar.component';
describe('MercadoOrdenesListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MercadoOrdenesListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MercadoOrdenesListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mercado-ordenes-listar.component.spec.js.map