import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/es-AR';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgxWebstorageModule } from 'ngx-webstorage';
import * as dayjs from 'dayjs';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SERVER_API_URL } from './app.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';

import { AppComponent } from './app.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,

    // HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppRoutingModule,

    // EntityRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
    HttpClientModule,
    HttpClientJsonpModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    NgxMaskModule.forRoot(options),
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'ARS',
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },

    httpInterceptorProviders,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(applicationConfigService: ApplicationConfigService, iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale, 'es-AR');
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
