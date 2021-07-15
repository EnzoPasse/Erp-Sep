import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { BalanceAjustmentRoute } from './route/balance-ajustment.route';
import { StepperAjustmentComponent } from './stepper/stepper-ajustment.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(BalanceAjustmentRoute)],
  declarations: [StepperAjustmentComponent],
})
export class BalanceAjustmentModule {}
