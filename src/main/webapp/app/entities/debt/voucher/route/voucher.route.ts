import { Routes } from '@angular/router';
import { OperationType } from 'app/config/operationTypes.constants';
import { LotDebtComponent } from '../../lot/lot-debt/lot-debt.component';

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
      createOperation: OperationType.CREAR_DEUDA,
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
      editOperation: OperationType.EDITAR_DEUDA,
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
      createOperation: OperationType.CREAR_NOTA_CREDITO,
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
      editOperation: OperationType.EDITAR_NOTA_CREDITO,
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
      createOperation: OperationType.CREAR_NOTA_DEBITO,
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },

  {
    path: ':id/editarNotaDebito',
    component: VoucherUpdateComponent,
    data: {
      pageTitle: 'Editar Nota Débito',
      editOperation: OperationType.EDITAR_NOTA_DEBITO,
    },
    resolve: {
      comprobante: VoucherManagementResolve,
    },
  },
  {
    path: 'nuevoLoteDeuda',
    component: LotDebtComponent,
    data: {
      pageTitle: 'Lotes de Deudas',
    },
  },
];
