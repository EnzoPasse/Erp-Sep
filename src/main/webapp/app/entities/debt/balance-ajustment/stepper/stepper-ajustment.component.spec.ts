import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperAjustmentComponent } from './stepper-ajustment.component';

describe('StepperAjustmentComponent', () => {
  let component: StepperAjustmentComponent;
  let fixture: ComponentFixture<StepperAjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperAjustmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperAjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
