import { async, TestBed } from '@angular/core/testing';
import { MercadoPosicionesEditarComponent } from './mercado-posiciones-editar.component';
describe('MercadoPosicionesEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MercadoPosicionesEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MercadoPosicionesEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mercado-posiciones-editar.component.spec.js.map