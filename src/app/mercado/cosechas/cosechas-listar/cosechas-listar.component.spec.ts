import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosechasListarComponent } from './cosechas-listar.component';

describe('CosechasListarComponent', () => {
  let component: CosechasListarComponent;
  let fixture: ComponentFixture<CosechasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosechasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosechasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
