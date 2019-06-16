import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmnavbarComponent } from './emnavbar.component';

describe('EmnavbarComponent', () => {
  let component: EmnavbarComponent;
  let fixture: ComponentFixture<EmnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
