import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2MedioPagoComponent } from './step2-medio-pago.component';

describe('Step2MedioPagoComponent', () => {
  let component: Step2MedioPagoComponent;
  let fixture: ComponentFixture<Step2MedioPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step2MedioPagoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2MedioPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
