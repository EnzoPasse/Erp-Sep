import { Route } from '@angular/router';

import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
  path: 'configuracion',
  component: SettingsComponent,
  data: {
    pageTitle: 'Settings',
  },
};
