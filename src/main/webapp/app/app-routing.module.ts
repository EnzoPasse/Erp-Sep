import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { errorRoute } from './layouts/error/error.route';
// import { navbarRoute } from './layouts/navbar/navbar.route';
// import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { AuthGuard } from './core/auth/auth.guard';
// import { UserRouteAccessService } from './core/auth/user-route-access.service';
// import { Authority } from 'app/config/authority.constants';

// import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
// import { MainComponent } from './layouts/main/main.component';

/* const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

 @NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {// 
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {} */

const ROUTES = [
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layouts/layout.module').then(m => m.LayoutModule),
  },

  { path: '**', redirectTo: 'accessdenied', pathMatch: 'full' },
];

@NgModule({
  // imports: [RouterModule.forRoot(ROUTES, { enableTracing: DEBUG_INFO_ENABLED, relativeLinkResolution: 'legacy' })],
  imports: [RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
