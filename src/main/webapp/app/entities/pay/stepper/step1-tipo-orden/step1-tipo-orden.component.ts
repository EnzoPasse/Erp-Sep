import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentsType } from 'app/config/payment-type';
import { IComprobante } from 'app/entities/debt/voucher/voucher.model';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PaymentService } from '../../service/payment.service';

export interface DataForm {
  comprobanteRef: IComprobante[];
  totalComprobante: number;
}

@Component({
  selector: 'jhi-step1-tipo-orden',
  templateUrl: './step1-tipo-orden.component.html',
  styleUrls: ['./step1-tipo-orden.component.scss'],
})
export class Step1TipoOrdenComponent implements OnInit {
  PaymentsType = PaymentsType;
  tipoPagoForm = this.fb.group({
    tipoPagoSelected: ['', Validators.required],
    total: ['', Validators.required],
  });

  subscription!: Subscription;
  @Output() totalPagoInfo: EventEmitter<number | null> = new EventEmitter();

  constructor(private fb: FormBuilder, private payService: PaymentService) {}

  ngOnInit(): void {
    this.subscription = this.tipoPagoForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
      if (res === 'VALID') {
        this.totalPagoInfo.emit(this.tipoPagoForm.get('total')?.value);
      } else {
        this.totalPagoInfo.emit(null);
      }
    });
  }

  changeTipoPago(): void {
    this.tipoPagoForm.get('total')?.patchValue(null);
  }

  formEmited(event: any): void {
    if (event) {
      this.tipoPagoForm.get('total')?.patchValue(event?.totalComprobante);
      this.payService.crearComprobanteStep1(event);
    } else {
      this.changeTipoPago();
    }
  }
}
