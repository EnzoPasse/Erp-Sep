import { Component, OnInit } from '@angular/core';
import { PaymentsType } from 'app/config/payment-type';
import { IComprobante } from 'app/core/voucher/voucher.model';
import { Observable } from 'rxjs';
import { PayVoucherStateService } from '../../service/payVoucherState.service';
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

  dataSource!: any;
  displayedColumnsCuentaCorriente = ['Cbte', 'Nro', 'F.Emision', 'F.Vencimiento', 'Saldo'];
  displayedColumnsDirecto = ['Id', 'Item', 'Importe'];
  displayedColumnsLote = ['Ente', 'F.Vencimiento', 'Periodo', 'Saldo'];
  displayedColumnsDocumentos = ['Tipo', 'Nro', 'F.Emision', 'F.Vencimiento', 'Importe'];

  constructor(private payService: PayVoucherStateService) {}

  ngOnInit(): void {
    this.comprobante$ = this.payService.comprobante$;
    this.tipoOrden$ = this.payService.tipoOrden$;
  }
}
