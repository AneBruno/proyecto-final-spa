import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinasListarComponent } from './oficinas-listar.component';

describe('OficinasListarComponent', () => {
  let component: OficinasListarComponent;
  let fixture: ComponentFixture<OficinasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficinasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
