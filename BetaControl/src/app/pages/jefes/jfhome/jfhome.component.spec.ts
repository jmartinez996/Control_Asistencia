import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JfhomeComponent } from './jfhome.component';

describe('JfhomeComponent', () => {
  let component: JfhomeComponent;
  let fixture: ComponentFixture<JfhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JfhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JfhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
