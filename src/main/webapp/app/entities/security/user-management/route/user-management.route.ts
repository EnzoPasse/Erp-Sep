import { Routes } from '@angular/router';

import { UserManagementComponent } from '../list/user-management.component';
import { UserManagementUpdateComponent } from '../update/user-management-update.component';
import { UserManagementResolve } from './user-management.routing-resolve.service';

export const userManagementRoute: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    data: { pageTitle: 'Usuarios' },
  },
  {
    path: 'nuevoUsuario',
    component: UserManagementUpdateComponent,
    data: { pageTitle: 'Nuevo Usuario' },
    resolve: {
      user: UserManagementResolve,
    },
  },
  {
    path: ':id/editarUsuario',
    component: UserManagementUpdateComponent,
    data: { pageTitle: 'Editar Usuario' },
    resolve: {
      user: UserManagementResolve,
    },
  },
];
