import { Component, OnInit } from '@angular/core';
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
  });

  constructor(private fb: FormBuilder) {}
}
