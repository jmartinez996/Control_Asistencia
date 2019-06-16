import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JfnavbarComponent } from './jfnavbar.component';

describe('JfnavbarComponent', () => {
  let component: JfnavbarComponent;
  let fixture: ComponentFixture<JfnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JfnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JfnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
