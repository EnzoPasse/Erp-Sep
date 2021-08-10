import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3ConfirmarPagoComponent } from './step3-confirmar-pago.component';

describe('Step3ConfirmarPagoComponent', () => {
  let component: Step3ConfirmarPagoComponent;
  let fixture: ComponentFixture<Step3ConfirmarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Step3ConfirmarPagoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3ConfirmarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
