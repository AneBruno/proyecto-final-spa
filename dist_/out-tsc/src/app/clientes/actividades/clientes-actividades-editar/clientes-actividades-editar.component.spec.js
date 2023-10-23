import { async, TestBed } from '@angular/core/testing';
import { ClientesActividadesEditarComponent } from './clientes-actividades-editar.component';
describe('ClientesActividadesEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesActividadesEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesActividadesEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-actividades-editar.component.spec.js.map