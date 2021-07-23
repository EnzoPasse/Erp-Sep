import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'app/core/util/alert.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComprobanteService } from '../../voucher/service/voucher.service';
import { IComprobante } from '../../voucher/voucher.model';
import { CreditoEnteComponent } from './step1-credits-entity/credito-ente.component';
import { DescontarDeudaComponent } from './step2-discount-debt/descontar-deuda.component';
import { ConfirmarAjusteComponent } from './step3-confirm/confirmar-ajuste.component';

@Component({
  selector: 'jhi-stepper-ajustment',
  templateUrl: './stepper-ajustment.component.html',
  styleUrls: ['./stepper-ajustment.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class StepperAjustmentComponent implements OnInit {
  titleForm = '';
  stepperOrientation: Observable<StepperOrientation>;
  creditVoucherSelected!: IComprobante;
  saveVoucher!: IComprobante;
  isSaving = false;
  urlData: any;
  step2!: FormGroup | null;

  @ViewChild(CreditoEnteComponent) step1Credit!: CreditoEnteComponent;
  @ViewChild(DescontarDeudaComponent) step2Disconunt!: DescontarDeudaComponent;
  @ViewChild(ConfirmarAjusteComponent) step3Confirm!: ConfirmarAjusteComponent;

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private comprobanteService: ComprobanteService,
    protected eventManager: EventManager
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.titleForm = data.pageTitle;
      this.urlData = data;
    });
  }

  save(): void {
    if (!(this.saveVoucher.comprobanteRef!.length > 0)) {
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo no va bien, por favor verifica los campos', type: 'warning' })
      );
      return;
    }

    this.isSaving = true;
    // const comprobante = this.createComprobante();
    this.subscribeToSaveResponse(this.comprobanteService.create(this.saveVoucher, this.urlData.createOperation));
  }

  creditSelection(event: IComprobante): void {
    this.creditVoucherSelected = event;
  }

  deudaSelection(event: IComprobante): void {
    // eslint-disable-next-line no-console
    console.log(event);
    this.saveVoucher = { ...event };
  }

  protected subscribeToSaveResponse(result: Observable<IComprobante>): void {
    result.subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
    this.step1Credit.limpiarOptions();
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
  }

  private onSaveError(): void {
    this.isSaving = false;
    this.eventManager.broadcast(
      new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo salio mal!', type: 'danger' })
    );
  }
}
