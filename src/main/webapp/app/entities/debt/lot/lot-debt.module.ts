import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { lotDebRoute } from './route/lot-debt.route';
import { LotDebtComponent } from './lot-debt/lot-debt.component';

@NgModule({
  declarations: [LotDebtComponent],
  imports: [SharedModule, RouterModule.forChild(lotDebRoute)],
})
export class LotDebtModule {}
