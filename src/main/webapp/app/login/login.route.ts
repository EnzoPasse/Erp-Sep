import { Route } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login.component';

export const LOGIN_ROUTE: Route = {
  path: '',
  /* component: LoginComponent, */
  children: [
    {
      path: 'forgot',
      component: ForgotComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
  ],
};
