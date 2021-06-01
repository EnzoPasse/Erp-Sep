import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { AlertService, Alert } from 'app/core/util/alert.service';

@Component({
  selector: 'jhi-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  alerts: Alert[] = [];

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<AlertComponent>) {}

  /*  setClasses(alert: Alert): { [key: string]: boolean } {
    const classes = { 'jhi-toast': true };
     const classes = { 'jhi-toast': Boolean(alert.toast) };
    if (alert.position) {
      return { ...classes, [alert.position]: true };
    }
    return classes;
  }
  
  close(alert: Alert): void {
    alert.close?.(this.alerts);
 }
  */
}
