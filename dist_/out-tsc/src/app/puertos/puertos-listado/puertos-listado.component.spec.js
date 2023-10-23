import { async, TestBed } from '@angular/core/testing';
import { PuertosListadoComponent } from './puertos-listado.component';
describe('PuertosListadoComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PuertosListadoComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PuertosListadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=puertos-listado.component.spec.js.map