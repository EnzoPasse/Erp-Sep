import { Routes } from '@angular/router';
import { ListPayComponent } from '../list/list-pay.component';

export const PAY_ROUTE: Routes = [
  {
    path: 'ordenesPago',
    component: ListPayComponent,
    data: {},
  },
];
