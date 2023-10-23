import { async, TestBed } from '@angular/core/testing';
import { MercadoPanelListarComponent } from './mercado-panel-listar.component';
describe('MercadoPanelListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MercadoPanelListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MercadoPanelListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mercado-panel-listar.component.spec.js.map