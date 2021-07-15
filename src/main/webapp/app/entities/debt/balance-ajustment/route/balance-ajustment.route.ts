import { Routes } from '@angular/router';
import { StepperAjustmentComponent } from '../stepper/stepper-ajustment.component';

export const BalanceAjustmentRoute: Routes = [
  {
    path: '',
    component: StepperAjustmentComponent,
    data: { pageTitle: 'Ajuste de Saldos' },
  },
];
