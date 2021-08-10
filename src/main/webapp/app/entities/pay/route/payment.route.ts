import { Routes } from '@angular/router';
import { OperationType } from 'app/config/operationTypes.constants';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { ListPayComponent } from '../list/list-pay.component';
import { StepperPayComponent } from '../stepper/stepper-pay.component';

export const PAY_ROUTE: Routes = [
  {
    path: 'ordenesPago',
    component: ListPayComponent,
    data: {
      pageTitle: 'Ordenes de Pago',
      queryOperation: OperationType.GET_PAGO,
      stateType: StateVoucherType.ORDEN_PAGO,
      createPermission: [
        'Accion Crear Orden de Pago a Lote',
        'Accion Crear Orden de Pago a Cuenta Corriente',
        'Accion Crear Orden de Pago Directo',
      ],
      printPermission: 'Accion Reimprimir Orden de Pago',
      deletePermission: 'Accion Anular Orden de Pagoe',
    },
  },
  {
    path: 'generarOrdenPago',
    component: StepperPayComponent,
    data: {
      pageTitle: 'Nueva Orden de Pago',
    },
  },
];
