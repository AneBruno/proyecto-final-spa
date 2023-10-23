import { async, TestBed } from '@angular/core/testing';
import { ServerAutocompleteComponent } from './server-autocomplete.component';
describe('ServerAutocompleteComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServerAutocompleteComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ServerAutocompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=server-autocomplete.component.spec.js.map