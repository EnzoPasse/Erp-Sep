import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { PaymentsType } from 'app/config/payment-type';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { IMovimientoCajaBanco } from 'app/entities/master-crud';
import { IMedioPago } from 'app/entities/master-crud/payment-method-management/medio-pago.model';
import { MedioPagoService } from 'app/entities/master-crud/payment-method-management/medio-pago.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { concatMap, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { PayVoucherStateService } from '../../service/payVoucherState.service';
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
    comprobante: [],
    documento: [],
  });
  allMediosPago!: IMedioPago[];

  impresora!: string;
  tipoOrden!: DataFormStep1;
  mcb$!: Observable<IMovimientoCajaBanco[]>;

  data: any;

  @Output() impresoraInfo: EventEmitter<string> = new EventEmitter();

  private subscriptions: Subscription[] = [];
  private destroy$ = new Subject<void>();

  constructor(private medioPagoService: MedioPagoService, private fb: FormBuilder, private payService: PayVoucherStateService) {}

  ngOnInit(): void {
    /* esta subscription trae los datos del formulario tipo de orden y los medios de pagos dependiendo del tipo de pago seleccionado.  */
    this.subscriptions.push(
      this.payService.tipoOrden$
        .pipe(
          takeUntil(this.destroy$),
          tap(tipo => {
            (this.tipoOrden = tipo), this.medioPagoSelected.patchValue(null);
          }),
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
          this.payService.crearMovimientoCajaBanco(this.medioPagoForm.getRawValue());
          this.impresoraInfo.emit(this.impresora);
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
    this.movimientoCajaBanco.reset();
    this.payService.resetMovimientoCajaBanco();
  }

  formValid(event: any): void {
    // eslint-disable-next-line no-console
    console.log(event);

    if (event) {
      let movi = event.movimientoCajaBanco;
      const moviextras = {
        medioPago: this.medioPagoSelected.value,
        importe: this.tipoOrden.totalComprobante!,
      };
      movi = { ...movi, ...moviextras };

      this.movimientoCajaBanco.patchValue(movi);
      this.medioPagoForm.get('comprobante')?.patchValue(event.comprobante);
      this.medioPagoForm.get('documento')?.patchValue(event.documento);
      this.impresora = event.impresora;
    } else {
      this.changeMedioPago();
    }
  }

  get medioPagoSelected(): AbstractControl {
    return this.medioPagoForm.get('medioPagoSelected') as AbstractControl;
  }

  get movimientoCajaBanco(): AbstractControl {
    return this.medioPagoForm.get('movimientoCajaBanco') as AbstractControl;
  }
}
