import { Routes } from '@angular/router';
import { LotDebtComponent } from '../lot-debt/lot-debt.component';

export const lotDebRoute: Routes = [
  {
    path: '',
    component: LotDebtComponent,
    data: { pageTitle: 'Lotes de Deudas' },
  },
];
