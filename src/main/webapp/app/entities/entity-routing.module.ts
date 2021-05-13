import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { errorRoute } from 'app/layouts/error/error.route';
import { MainComponent } from 'app/layouts/main/main.component';

const ERROR_ROUTES = [...errorRoute];

const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [],
    children: [
      {
        path: 'admin',
        data: {
          // authorities: [Authority.ADMIN],
          title: 'Admin',
          urls: [{ title: 'admin', url: '/admin1' }, { title: 'ADMIN' }],
        },
        loadChildren: () => import('../admin/admin-routing.module').then(m => m.AdminRoutingModule),
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
      },

      ...ERROR_ROUTES,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LAYOUT_ROUTES)],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
