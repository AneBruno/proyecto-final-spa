import { async, TestBed } from '@angular/core/testing';
import { ListadoEncabezadoComponent } from './listado-encabezado.component';
describe('ListadoEncabezadoComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListadoEncabezadoComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoEncabezadoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listado-encabezado.component.spec.js.map