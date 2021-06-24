import { Routes } from '@angular/router';
import { RoleListComponent } from '../list/role-list.component';
import { RoleUpdateComponent } from '../update/role-update.component';
import { RolResolve } from './role.routing-resolve.service';

export const roleRoute: Routes = [
  {
    path: '',
    component: RoleListComponent,
    data: { pageTitle: 'Roles' },
  },
  {
    path: 'nuevoRol',
    component: RoleUpdateComponent,
    data: { pageTitle: 'Nuevo Rol' },
    resolve: {
      rol: RolResolve,
    },
  },
  {
    path: ':id/editarRol',
    component: RoleUpdateComponent,
    data: { pageTitle: 'Editar Rol' },
    resolve: {
      rol: RolResolve,
    },
  },
];
