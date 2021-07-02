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
      voucher: VoucherManagementResolve,
    },
  },
  {
    path: ':id/editarComprobante',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Comprobante',
    },
    resolve: {
      voucher: VoucherManagementResolve,
    },
  },

  {
    path: 'nuevoNotaCredito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Nueva Nota Crédito',
    },
    resolve: {
      voucher: VoucherManagementResolve,
    },
  },

  {
    path: ':id/editarNotaCredito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Nota Crédito',
    },
    resolve: {
      voucher: VoucherManagementResolve,
    },
  },

  {
    path: 'nuevoNotaDebito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Nueva Nota Débito',
    },
    resolve: {
      voucher: VoucherManagementResolve,
    },
  },

  {
    path: ':id/editarComprobante',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Nota Débito',
    },
    resolve: {
      voucher: VoucherManagementResolve,
    },
  },
];
