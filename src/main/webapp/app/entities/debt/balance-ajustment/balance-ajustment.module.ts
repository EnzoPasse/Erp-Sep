import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { BalanceAjustmentRoute } from './route/balance-ajustment.route';
import { StepperAjustmentComponent } from './stepper/stepper-ajustment.component';
import { CreditoEnteComponent } from './stepper/step1-credits-entity/credito-ente.component';
import { DescontarDeudaComponent } from './stepper/step2-discount-debt/descontar-deuda.component';
import { ConfirmarAjusteComponent } from './stepper/step3-confirm/confirmar-ajuste.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(BalanceAjustmentRoute)],
  declarations: [StepperAjustmentComponent, CreditoEnteComponent, DescontarDeudaComponent, ConfirmarAjusteComponent],
})
export class BalanceAjustmentModule {}
