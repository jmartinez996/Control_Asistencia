import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AusenciaRetrasoComponent } from './ausencia-retraso.component';

describe('AusenciaRetrasoComponent', () => {
  let component: AusenciaRetrasoComponent;
  let fixture: ComponentFixture<AusenciaRetrasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AusenciaRetrasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AusenciaRetrasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
