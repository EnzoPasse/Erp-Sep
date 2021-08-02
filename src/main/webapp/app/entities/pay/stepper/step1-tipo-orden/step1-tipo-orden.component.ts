import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentsType } from 'app/config/payment-type';

@Component({
  selector: 'jhi-step1-tipo-orden',
  templateUrl: './step1-tipo-orden.component.html',
  styleUrls: ['./step1-tipo-orden.component.scss'],
})
export class Step1TipoOrdenComponent {
  PaymentsType = PaymentsType;
  tipoPagoForm = this.fb.group({
    tipoPagoSelected: ['', Validators.required],
    total: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  changeTipoPago(): void {
    this.tipoPagoForm.get('total')?.patchValue(null);
  }

  totalChange(total: number): void {
    this.tipoPagoForm.get('total')?.patchValue(total);
  }
}
