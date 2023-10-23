import { async, TestBed } from '@angular/core/testing';
import { RedesSocialesListarComponent } from './redes-sociales-listar.component';
describe('RedesSocialesListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RedesSocialesListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RedesSocialesListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=redes-sociales-listar.component.spec.js.map