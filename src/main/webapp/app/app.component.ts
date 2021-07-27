import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/es';

@Component({
  selector: 'jhi-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private dateAdapter: DateAdapter<Dayjs>) {
    this.setLocale('es');
  }
  setLocale(locale: string): void {
    dayjs.locale(locale);
    this.dateAdapter.setLocale(locale);
  }
}
