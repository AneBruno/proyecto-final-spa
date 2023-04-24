import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPanelListarComponent } from './mercado-panel-listar.component';

describe('MercadoPanelListarComponent', () => {
  let component: MercadoPanelListarComponent;
  let fixture: ComponentFixture<MercadoPanelListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPanelListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPanelListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
