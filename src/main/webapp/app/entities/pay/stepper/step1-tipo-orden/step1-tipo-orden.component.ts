import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PaymentsType } from 'app/config/payment-type';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PayVoucherStateService } from '../../service/payVoucherState.service';

export interface DataFormStep1 {
  datos?: any;
  totalComprobante?: number;
  tipoPago?: PaymentsType;
}

@Component({
  selector: 'jhi-step1-tipo-orden',
  templateUrl: './step1-tipo-orden.component.html',
  styleUrls: ['./step1-tipo-orden.component.scss'],
})
export class Step1TipoOrdenComponent implements OnInit {
  PaymentsType = PaymentsType;
  data: any;
  tipoPagoForm = this.fb.group({
    tipoPagoSelected: ['', Validators.required],
    total: ['', Validators.required],
  });

  subscription!: Subscription;
  @Output() tipoPagoInfo: EventEmitter<DataFormStep1 | null> = new EventEmitter();

  constructor(private fb: FormBuilder, private payService: PayVoucherStateService) {}

  ngOnInit(): void {
    this.subscription = this.tipoPagoForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
      if (res === 'VALID') {
        const dataForm: DataFormStep1 = {
          datos: this.data,
          totalComprobante: this.tipoPagoForm.get('total')?.value,
          tipoPago: this.tipoPagoForm.get('tipoPagoSelected')?.value,
        };

        this.tipoPagoInfo.emit(dataForm);
        this.payService.crearComprobante(dataForm);
      } else {
        this.tipoPagoInfo.emit(null);
      }
    });
  }

  changeTipoPago(): void {
    this.tipoPagoForm.get('total')?.patchValue(null);
    this.payService.newComprobante();
  }

  formValid(event: DataFormStep1 | null): void {
    if (event) {
      const { totalComprobante } = event;
      this.tipoPagoForm.get('total')?.patchValue(totalComprobante);
      this.data = event;
    } else {
      this.changeTipoPago();
    }
  }

  limpiarOptions(): void {
    this.tipoPagoForm.get('tipoPagoSelected')?.reset();
    // this.dataSource.entitySubject.next([]);
  }
}
