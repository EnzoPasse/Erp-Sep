import { Component, OnInit } from '@angular/core';
import { PaymentsType } from 'app/config/payment-type';
import { IComprobante } from 'app/entities/debt/voucher/voucher.model';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { PaymentService } from '../../service/payment.service';
import { DataFormStep1 } from '../step1-tipo-orden/step1-tipo-orden.component';

@Component({
  selector: 'jhi-step3-confirmar-pago',
  templateUrl: './step3-confirmar-pago.component.html',
  styleUrls: ['./step3-confirmar-pago.component.scss'],
})
export class Step3ConfirmarPagoComponent implements OnInit {
  comprobante$!: Observable<IComprobante>;
  tipoOrden$!: Observable<DataFormStep1>;
  PaymentsType = PaymentsType;

  constructor(private payService: PaymentService) {}

  ngOnInit(): void {
    this.comprobante$ = this.payService.comprobante$;
    this.tipoOrden$ = this.payService.tipoOrden$;
  }
}
