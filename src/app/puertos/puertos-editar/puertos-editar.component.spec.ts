import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuertosEditarComponent } from './puertos-editar.component';

describe('PuertosEditarComponent', () => {
  let component: PuertosEditarComponent;
  let fixture: ComponentFixture<PuertosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuertosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuertosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
