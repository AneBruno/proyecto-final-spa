import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticMapPlaceComponent } from './static-map-place.component';

describe('StaticMapPlaceComponent', () => {
  let component: StaticMapPlaceComponent;
  let fixture: ComponentFixture<StaticMapPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticMapPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticMapPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
