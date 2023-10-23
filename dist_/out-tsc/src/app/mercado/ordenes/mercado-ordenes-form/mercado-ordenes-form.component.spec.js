import { async, TestBed } from '@angular/core/testing';
import { MercadoOrdenesFormComponent } from './mercado-ordenes-form.component';
describe('MercadoOrdenesFormComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MercadoOrdenesFormComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MercadoOrdenesFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mercado-ordenes-form.component.spec.js.map