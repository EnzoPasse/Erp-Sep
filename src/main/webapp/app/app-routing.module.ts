import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

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
