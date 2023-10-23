import { async, TestBed } from '@angular/core/testing';
import { UsuariosEditarComponent } from './usuarios-editar.component';
describe('UsuariosEditarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsuariosEditarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(UsuariosEditarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=usuarios-editar.component.spec.js.map