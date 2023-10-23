import { async, TestBed } from '@angular/core/testing';
import { ActualizarDatosPersonalesComponent } from './actualizar-datos-personales.component';
describe('ActualizarDatosPersonalesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActualizarDatosPersonalesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ActualizarDatosPersonalesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=actualizar-datos-personales.component.spec.js.map