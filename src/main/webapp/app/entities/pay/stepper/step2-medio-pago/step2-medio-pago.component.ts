import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { MedioPago } from 'app/entities/master-crud/payment-method-management/medio-pago.model';
import { MedioPagoService } from 'app/entities/master-crud/payment-method-management/medio-pago.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-step2-medio-pago',
  templateUrl: './step2-medio-pago.component.html',
  styleUrls: ['./step2-medio-pago.component.scss'],
})
export class Step2MedioPagoComponent implements OnInit, OnDestroy {
  medioPagoForm = this.fb.group({
    medioPagoSelected: ['', Validators.required],
  });
  subscriptions: Subscription[] = [];
  allMediosPago!: MedioPago[];
  @Input() montoTotalPago!: number | null;

  constructor(private medioPagoService: MedioPagoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscriptions.push(this.medioPagoService.getAllPorIdMFA(StateVoucherType.ORDEN_PAGO).subscribe(res => (this.allMediosPago = res)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
