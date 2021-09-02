import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { OperationType } from 'app/config/operationTypes.constants';
import { PaymentsType } from 'app/config/payment-type';
import { EventManager, EventWithContent } from 'app/core/event-management/event-manager.service';
import { Alert } from 'app/core/util/alert.service';
import { IComprobante } from 'app/core/voucher/voucher.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Step1TipoOrdenComponent } from './step1-tipo-orden/step1-tipo-orden.component';
import { PayVoucherStateService } from '../service/payVoucherState.service';
import { PaymentService } from '../service/payment.service';
import { PrintCheques, WcfService } from 'app/core/wfc/wfc.service';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ReportTypes } from 'app/config/reportType';
import { DialogService } from 'app/core/util/dialog.service';
import { DocumentoService } from 'app/entities/master-crud/document-management/documento.service';

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
  terminal = '';
  impresora = '';

  constructor(
    private route: ActivatedRoute,
    private payService: PayVoucherStateService,
    private paymentService: PaymentService,
    private wfc: WcfService,
    private applicationConfigService: ApplicationConfigService,
    private dialog: DialogService,
    private documentoService: DocumentoService,
    protected eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.titleForm = data.pageTitle;
        this.urlData = data;
      })
    );

    this.wfc.getTerminalService().subscribe(
      res => {
        this.terminal = res['Nombre'];
      },
      () => {
        this.eventManager.broadcast(
          new EventWithContent<Alert>('erpSepApp.error', {
            message:
              'El servicio de Windows de Impresion Automatica de Chueques WFC está APAGADO!, NO se puedran imprimir los Cheques, Comuniquese con Soporte Tecnico',
            type: 'danger',
          })
        );
      }
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

  managerImpresora(event: any): void {
    this.impresora = event;
  }
  protected subscribeToSaveResponse(result: Observable<IComprobante>): void {
    const saveSubscription = result.subscribe({
      next: res => this.onSaveSuccess(res),
      error: () => this.onSaveError(),
    });
    this.subscriptions.push(saveSubscription);
    this.step1Ordertype.limpiarOptions();
  }

  private onSaveSuccess(res: any): void {
    this.isSaving = false;
    this.imprimirOrden(res['id']);
    this.stepper.reset();
  }

  private onSaveError(): void {
    this.isSaving = false;
    this.eventManager.broadcast(
      new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo salio mal!', type: 'danger' })
    );
  }

  private imprimirOrden(idOrdenPago: number): void {
    const url = this.applicationConfigService.getEndpointFor(
      `print/print/?id=${idOrdenPago}&codigoReporte=${ReportTypes.RPT_ORDEN_PAGO}&lote=false`
    );
    this.dialog.printElements(url);

    if (this.impresora !== 'NOIMPRIMIR' && this.terminal !== '') {
      this.documentoService
        .getChequesParaImprimir(idOrdenPago, this.terminal)
        .pipe(switchMap((raw: PrintCheques[]) => this.wfc.imprimirCheques(raw, this.impresora)))
        .subscribe();
    }
  }
}
