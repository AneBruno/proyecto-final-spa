import { async, TestBed } from '@angular/core/testing';
import { ClientesArchivosEditarComponent } from './clientes-archivos-editar.component';
describe('ClientesArchivosEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesArchivosEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesArchivosEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-archivos-editar.component.spec.js.map