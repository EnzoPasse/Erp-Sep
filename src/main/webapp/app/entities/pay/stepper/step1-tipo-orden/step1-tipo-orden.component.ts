import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentsType } from 'app/config/payment-type';
import { IComprobante } from 'app/entities/debt/voucher/voucher.model';

export interface DataForm {
  comprobanteRef: IComprobante[];
  totalComprobante: number;
}

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

  formEmited(event: any): void {
    // eslint-disable-next-line no-console
    console.log(event);
    this.tipoPagoForm.get('total')?.patchValue(event?.totalComprobante);
  }
}
