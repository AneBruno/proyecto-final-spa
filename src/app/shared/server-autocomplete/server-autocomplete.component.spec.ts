import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerAutocompleteComponent } from './server-autocomplete.component';

describe('ServerAutocompleteComponent', () => {
  let component: ServerAutocompleteComponent;
  let fixture: ComponentFixture<ServerAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
