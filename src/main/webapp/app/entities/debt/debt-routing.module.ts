import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperationType } from 'app/config/operationTypes.constants';
import { StateVoucherType } from 'app/config/voucherType.constant';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'comprobante',
        loadChildren: () => import('./voucher/voucher.module').then(m => m.VoucherManagementModule),
        data: {
          queryOperation: OperationType.GET_DEUDA,
          stateType: StateVoucherType.DEUDA,
          urlEdit: 'nuevoComprobante',
          createPermission: 'Accion Crear Comprobante',
          editPermission: 'Accion Editar Comprobante',
          deletePermission: 'Accion Eliminar Comprobante',
        },
      },
      {
        path: 'notaCredito',
        loadChildren: () => import('./voucher/voucher.module').then(m => m.VoucherManagementModule),
        data: {
          queryOperation: OperationType.GET_NOTA_CREDITO,
          stateType: StateVoucherType.NOTA_CREDITO,
          urlEdit: 'nuevoNotaCredito',
          createPermission: 'Accion Crear Nota de Credito',
          editPermission: 'Accion Editar Nota de Credito',
          deletePermission: 'Accion Eliminar Nota de Credito',
        },
      },
      {
        path: 'notaDebito',
        loadChildren: () => import('./voucher/voucher.module').then(m => m.VoucherManagementModule),
        data: {
          queryOperation: OperationType.GET_NOTA_DEBITO,
          stateType: StateVoucherType.NOTA_DEBITO,
          urlEdit: 'nuevoNotaDebito',
          createPermission: 'Accion Crear Nota de Debito',
          editPermission: 'Accion Editar Nota de Debito',
          deletePermission: 'Accion Eliminar Nota de Debito',
        },
      },
    ]),
  ],
})
export class VoucherRoutingModule {}
