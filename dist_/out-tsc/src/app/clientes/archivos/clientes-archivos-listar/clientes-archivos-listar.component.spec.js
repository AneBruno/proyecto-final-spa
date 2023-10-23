import { async, TestBed } from '@angular/core/testing';
import { ClientesArchivosListarComponent } from './clientes-archivos-listar.component';
describe('ClientesArchivosListarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClientesArchivosListarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ClientesArchivosListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=clientes-archivos-listar.component.spec.js.map