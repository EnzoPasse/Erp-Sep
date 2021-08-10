import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { IMedioPago } from 'app/entities/master-crud/payment-method-management/medio-pago.model';
import { MedioPagoService } from 'app/entities/master-crud/payment-method-management/medio-pago.service';
import { Subscription } from 'rxjs';
import { PaymentService } from '../../service/payment.service';

@Component({
  selector: 'jhi-step2-medio-pago',
  templateUrl: './step2-medio-pago.component.html',
  styleUrls: ['./step2-medio-pago.component.scss'],
})
export class Step2MedioPagoComponent implements OnInit, OnDestroy {
  medioPagoForm = this.fb.group({
    medioPagoSelected: ['', Validators.required],
    movimientoCajaBanco: ['', Validators.required],
  });
  subscriptions: Subscription[] = [];
  allMediosPago!: IMedioPago[];

  @Input() montoTotalPago!: number | null;

  constructor(private medioPagoService: MedioPagoService, private fb: FormBuilder, private payService: PaymentService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.medioPagoService.getAllPorIdMFA(StateVoucherType.ORDEN_PAGO).subscribe(res => (this.allMediosPago = res)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  movimientoCaja(event: FormGroup | null): void {
    this.movimientoCajaBanco.patchValue(event);
    if (event && this.montoTotalPago) {
      this.payService.crearMovimientoCajaBanco(event, this.medioPagoSelected.value, this.montoTotalPago);
    }
  }

  get medioPagoSelected(): AbstractControl {
    return this.medioPagoForm.get('medioPagoSelected') as AbstractControl;
  }

  get movimientoCajaBanco(): AbstractControl {
    return this.medioPagoForm.get('movimientoCajaBanco') as AbstractControl;
  }
}
