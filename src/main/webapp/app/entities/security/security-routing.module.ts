import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuarios',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
      },
      {
        path: 'roles',
        loadChildren: () => import('./role-management/role.module').then(m => m.RoleManagementModule),
      },
    ]),
  ],
})
export class SecurityRoutingModule {}
