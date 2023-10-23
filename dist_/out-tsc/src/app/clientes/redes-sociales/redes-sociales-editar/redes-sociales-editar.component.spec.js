import { async, TestBed } from '@angular/core/testing';
import { RedesSocialesEditarComponent } from './redes-sociales-editar.component';
describe('RedesSocialesEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RedesSocialesEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RedesSocialesEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=redes-sociales-editar.component.spec.js.map