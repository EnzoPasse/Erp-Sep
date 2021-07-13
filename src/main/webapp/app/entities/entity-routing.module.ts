import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: 'cuenta',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin-routing.module').then(m => m.AdminRoutingModule),
      },
      {
        path: 'seguridad',
        loadChildren: () => import('./security/security-routing.module').then(m => m.SecurityRoutingModule),
      },
      {
        path: 'deuda',
        loadChildren: () => import('./debt/debt-routing.module').then(m => m.VoucherRoutingModule),
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
