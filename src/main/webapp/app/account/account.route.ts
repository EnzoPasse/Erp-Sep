import { Routes } from '@angular/router';

import { settingsRoute } from './settings/settings.route';

/* const ACCOUNT_ROUTES = [activateRoute, passwordRoute, passwordResetFinishRoute, passwordResetInitRoute, registerRoute, settingsRoute]; */
const ACCOUNT_ROUTES = [settingsRoute];

export const accountState: Routes = [
  {
    path: '',
    children: ACCOUNT_ROUTES,
  },
];
