import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentsType } from 'app/config/payment-type';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { IMedioPago } from 'app/entities/master-crud/payment-method-management/medio-pago.model';
import { MedioPagoService } from 'app/entities/master-crud/payment-method-management/medio-pago.service';
import { Subject, Subscription } from 'rxjs';
import { concatMap, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { PaymentService } from '../../service/payment.service';
import { DataFormStep1 } from '../step1-tipo-orden/step1-tipo-orden.component';

export interface DataFormStep2 {
  datos?: any;
  medioPago?: IMedioPago;
  importe: number;
}

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
  allMediosPago!: IMedioPago[];

  // tipoOrden!: Observable<DataFormStep1>;
  tipoOrden!: DataFormStep1;

  data: any;
  private subscriptions: Subscription[] = [];
  private destroy$ = new Subject<void>();

  constructor(private medioPagoService: MedioPagoService, private fb: FormBuilder, private payService: PaymentService) {}

  ngOnInit(): void {
    /* esta subscription trae los datos del formulario tipo de orden y los medios de pagos dependiendo del tipo de pago seleccionado.  */
    this.subscriptions.push(
      this.payService.tipoOrden$
        .pipe(
          takeUntil(this.destroy$),
          tap(tipo => (this.tipoOrden = tipo)),
          concatMap(() => this.medioPagoService.getAllPorIdMFA(StateVoucherType.ORDEN_PAGO)),
          map(medios => {
            if (this.tipoOrden.tipoPago === PaymentsType.LOTE) {
              return medios.filter(it => it.id === 3); // id = 3 es transferencia
            }
            return medios;
          })
        )
        .subscribe(res => (this.allMediosPago = res))
    );

    this.subscriptions.push(
      this.medioPagoForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
        if (res === 'VALID') {
          const dataForm: DataFormStep2 = {
            datos: this.data,
            medioPago: this.medioPagoSelected.value,
            importe: this.tipoOrden.totalComprobante!,
          };
          // this.tipoPagoInfo.emit(dataForm);
          this.payService.crearMovimientoCajaBanco(dataForm);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeMedioPago(): void {
    this.medioPagoForm.get('movimientoCajaBanco')?.patchValue(null);
    this.payService.newMovimientoCajaBanco();
  }

  formValid(event: FormGroup | null): void {
    this.movimientoCajaBanco.patchValue(event);
    this.data = event;
    /* if (event && this.datosTipoPago) {
      // this.payService.crearMovimientoCajaBanco(event, this.medioPagoSelected.value, this.montoTotalPago);
    } */
  }

  get medioPagoSelected(): AbstractControl {
    return this.medioPagoForm.get('medioPagoSelected') as AbstractControl;
  }

  get movimientoCajaBanco(): AbstractControl {
    return this.medioPagoForm.get('movimientoCajaBanco') as AbstractControl;
  }
}
