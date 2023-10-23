import { async, TestBed } from '@angular/core/testing';
import { ListadoFiltrosComponent } from './listado-filtros.component';
describe('ListadoFiltrosComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListadoFiltrosComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ListadoFiltrosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=listado-filtros.component.spec.js.map