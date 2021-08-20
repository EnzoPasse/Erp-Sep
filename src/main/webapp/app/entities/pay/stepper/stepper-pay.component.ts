import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { OperationType } from 'app/config/operationTypes.constants';
import { PaymentsType } from 'app/config/payment-type';
import { EventManager, EventWithContent } from 'app/core/event-management/event-manager.service';
import { Alert } from 'app/core/util/alert.service';
import { IComprobante } from 'app/core/voucher/voucher.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Step1TipoOrdenComponent } from './step1-tipo-orden/step1-tipo-orden.component';
import { PayVoucherStateService } from '../service/payVoucherState.service';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'jhi-stepper-pay',
  templateUrl: './stepper-pay.component.html',
  styleUrls: ['./stepper-pay.component.scss'],
})
export class StepperPayComponent implements OnInit, OnDestroy {
  titleForm = '';
  urlData: any;
  isSaving = false;
  saveVoucher!: IComprobante;
  destroy$ = new Subject<void>();
  subscriptions: Subscription[] = [];
  operation!: OperationType;

  @ViewChild(Step1TipoOrdenComponent) step1Ordertype!: Step1TipoOrdenComponent;

  @ViewChild('stepper', { static: false }) stepper!: MatStepper;

  constructor(
    private route: ActivatedRoute,
    private payService: PayVoucherStateService,
    private paymentService: PaymentService,
    protected eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.titleForm = data.pageTitle;
        this.urlData = data;
      })
    );

    this.subscriptions.push(this.payService.comprobante$.pipe(takeUntil(this.destroy$)).subscribe(res => (this.saveVoucher = res)));

    this.subscriptions.push(
      this.payService.tipoOrden$.pipe(takeUntil(this.destroy$)).subscribe(res => {
        switch (res.tipoPago) {
          case PaymentsType.DIRECTO:
            this.operation = OperationType.CREAR_PAGO_DIRECTO;
            break;

          case PaymentsType.CUENTA_CORRIENTE:
            this.operation = OperationType.CREAR_PAGO_CTA_CTE;
            break;

          case PaymentsType.LOTE:
            this.operation = OperationType.CREAR_PAGO_TRANSF_LOTE;
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(it => it.unsubscribe());
    this.destroy$.complete();
    this.destroy$.next();
  }

  save(): void {
    if (!(this.saveVoucher.comprobanteRef!.length > 0) && !(this.saveVoucher.item!.length > 0)) {
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo no va bien, por favor verifica los campos', type: 'warning' })
      );
      return;
    }

    this.isSaving = true;

    // tengo que arreglar la forma de como se ven los items, antes de guardarlo
    if (this.operation === OperationType.CREAR_PAGO_DIRECTO) {
      const newItem = this.saveVoucher.item as any[];
      this.saveVoucher.item = newItem.map(it => ({ id: it.id.id, importe: it.importe }));
    }

    this.subscribeToSaveResponse(this.paymentService.create(this.saveVoucher, this.operation));
  }

  protected subscribeToSaveResponse(result: Observable<IComprobante>): void {
    const saveSubscription = result.subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
    this.subscriptions.push(saveSubscription);
    this.step1Ordertype.limpiarOptions();
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.stepper.reset();
  }

  private onSaveError(): void {
    this.isSaving = false;
    this.eventManager.broadcast(
      new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo salio mal!', type: 'danger' })
    );
  }
}
