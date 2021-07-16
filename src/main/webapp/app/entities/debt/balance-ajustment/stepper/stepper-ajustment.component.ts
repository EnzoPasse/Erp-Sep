import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  @ViewChild(CreditoEnteComponent) step1Credit!: CreditoEnteComponent;
  @ViewChild(DescontarDeudaComponent) step2Disconunt!: DescontarDeudaComponent;
  @ViewChild(ConfirmarAjusteComponent) step3Confirm!: ConfirmarAjusteComponent;

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.titleForm = data.pageTitle;
    });
  }

  save(): void {
    // eslint-disable-next-line no-console
    console.log('guardando el stepper');
  }

  get creditFormReady(): AbstractControl | null {
    /* eslint-disable */
    return this.step1Credit ? this.step1Credit.creditForm : ((null as unknown) as AbstractControl);
  }

  /*  get creditForm(): AbstractControl {
   return this.step2Disconunt ? this.step2Disconunt : null as unknown as AbstractControl;
 }
 
 get creditForm(): AbstractControl {
   return this.step1Credit ? this.step1Credit.creditForm : null as unknown as AbstractControl;
 } */

  creditSelection(event: IComprobante) {
    this.creditVoucherSelected = event;
  }
}
