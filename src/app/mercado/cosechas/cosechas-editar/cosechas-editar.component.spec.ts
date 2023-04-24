import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosechasEditarComponent } from './cosechas-editar.component';

describe('CosechasEditarComponent', () => {
  let component: CosechasEditarComponent;
  let fixture: ComponentFixture<CosechasEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosechasEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosechasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
