import { Routes } from '@angular/router';

import { UserManagementComponent } from '../list/user-management.component';
import { UserManagementDetailComponent } from '../detail/user-management-detail.component';
import { UserManagementUpdateComponent } from '../update/user-management-update.component';
import { UserManagementResolve } from './user-management.routing-resolve.service';

export const userManagementRoute: Routes = [
  {
    path: 'usuarios',
    component: UserManagementComponent,
    data: {
      defaultSort: 'id,asc',
    },
  },
  {
    path: ':login/view',
    component: UserManagementDetailComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
  {
    path: 'new',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
  {
    path: ':login/edit',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolve,
    },
  },
];
