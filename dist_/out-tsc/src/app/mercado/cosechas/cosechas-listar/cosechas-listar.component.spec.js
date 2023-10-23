import { async, TestBed } from '@angular/core/testing';
import { CosechasListarComponent } from './cosechas-listar.component';
describe('CosechasListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CosechasListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CosechasListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=cosechas-listar.component.spec.js.map