import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmhomeComponent } from './emhome.component';

describe('EmhomeComponent', () => {
  let component: EmhomeComponent;
  let fixture: ComponentFixture<EmhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
