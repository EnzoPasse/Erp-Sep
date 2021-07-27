import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperPayComponent } from './stepper-pay.component';

describe('StepperComponent', () => {
  let component: StepperPayComponent;
  let fixture: ComponentFixture<StepperPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperPayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
