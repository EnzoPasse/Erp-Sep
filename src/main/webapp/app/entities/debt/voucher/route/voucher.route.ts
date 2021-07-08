import { Routes } from '@angular/router';

import { VoucherListComponent } from '../list/voucher-list.component';
import { VoucherUpdateComponent } from '../update/voucher-update.component';
import { VoucherManagementResolve } from './voucher.routing-resolve.service';

export const voucherManagementRoute: Routes = [
  {
    path: '',
    component: VoucherListComponent,
    data: { pageTitle: 'Comprobante' },
  },
  {
    path: 'nuevoComprobante',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Nuevo Comprobante',
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },
  {
    path: ':id/editarComprobante',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Comprobante',
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },

  {
    path: 'nuevoNotaCredito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Nueva Nota Crédito',
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },

  {
    path: ':id/editarNotaCredito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Nota Crédito',
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },

  {
    path: 'nuevoNotaDebito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Nueva Nota Débito',
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },

  {
    path: ':id/editarComprobante',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Nota Débito',
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },
];
