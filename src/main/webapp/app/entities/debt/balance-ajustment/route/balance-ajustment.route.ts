import { Routes } from '@angular/router';
import { OperationType } from 'app/config/operationTypes.constants';
import { StepperAjustmentComponent } from '../stepper/stepper-ajustment.component';

export const BalanceAjustmentRoute: Routes = [
  {
    path: '',
    component: StepperAjustmentComponent,
    data: {
      pageTitle: 'Ajuste de Saldos',
      queryOperation: OperationType.GET_ENTE_NOTA_CREDITO,
    },
  },
];
