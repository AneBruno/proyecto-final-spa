import { async, TestBed } from '@angular/core/testing';
import { ListadoFiltradoComponent } from './listado-filtrado.component';
describe('ListadoFiltradoComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListadoFiltradoComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoFiltradoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listado-filtrado.component.spec.js.map