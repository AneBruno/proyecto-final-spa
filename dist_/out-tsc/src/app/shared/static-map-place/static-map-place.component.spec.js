import { async, TestBed } from '@angular/core/testing';
import { StaticMapPlaceComponent } from './static-map-place.component';
describe('StaticMapPlaceComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StaticMapPlaceComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(StaticMapPlaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=static-map-place.component.spec.js.map