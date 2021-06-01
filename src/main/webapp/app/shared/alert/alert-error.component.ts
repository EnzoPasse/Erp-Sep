import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AlertError } from './alert-error.model';
import { Alert, AlertService, AlertType } from 'app/core/util/alert.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';

@Component({
  selector: 'jhi-alert-error',
  templateUrl: './alert-error.component.html',
})
export class AlertErrorComponent implements OnDestroy {
  alerts: Alert[] = [];
  errorListener: Subscription;
  httpErrorListener: Subscription;

  constructor(private alertService: AlertService, private eventManager: EventManager) {
    this.errorListener = eventManager.subscribe('erpSepApp.error', (response: EventWithContent<unknown> | string) => {
      const errorResponse = (response as EventWithContent<AlertError>).content;
      this.addErrorAlert(errorResponse.message);
    });

    this.httpErrorListener = eventManager.subscribe('erpSepApp.httpError', (response: EventWithContent<unknown> | string) => {
      const httpErrorResponse = (response as EventWithContent<HttpErrorResponse>).content;
      switch (httpErrorResponse.status) {
        // connection refused, server not reachable
        case 0:
          this.addErrorAlert('Servidor inactivo');
          break;

        case 400: {
          const arr = httpErrorResponse.headers.keys();
          let errorHeader: string | null = null;
          for (const entry of arr) {
            if (entry.toLowerCase().endsWith('messageerp')) {
              errorHeader = httpErrorResponse.headers.get(entry);
            }
          }
          if (errorHeader) {
            this.addErrorAlert(errorHeader);
          } /* else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
            const fieldErrors = httpErrorResponse.error.fieldErrors;
            for (const fieldError of fieldErrors) {
              if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                fieldError.message = 'Size';
              }
              // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
              const convertedField: string = fieldError.field.replace(/\[\d*\]/g, '[]');
              const fieldName: string = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
              this.addErrorAlert(`Error on field "${fieldName}"`);
              
            } 
          }  else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
            this.addErrorAlert(httpErrorResponse.error.detail ?? httpErrorResponse.error.message);
          }*/ else {
            this.addErrorAlert(httpErrorResponse.message ? httpErrorResponse.message : httpErrorResponse.error.message, 'warning');
          }
          break;
        }

        case 404:
          this.addErrorAlert('Recurso no encontrado.', 'warning');
          break;

        default: {
          const arr = httpErrorResponse.headers.keys();
          let errorHeader: string | null = null;
          for (const entry of arr) {
            if (entry.toLowerCase().endsWith('messageerp')) {
              errorHeader = httpErrorResponse.headers.get(entry);
            }
          }
          if (errorHeader) {
            this.addErrorAlert(errorHeader);
          }
        }

        /* if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
          this.addErrorAlert(httpErrorResponse.error.detail ?? httpErrorResponse.error.message);
        } else {
          this.addErrorAlert(httpErrorResponse.error);
        } */
      }
    });
  }

  /* setClasses(alert: Alert): { [key: string]: boolean } {
    const classes = { 'jhi-toast': Boolean(alert.toast) };
    if (alert.position) {
      return { ...classes, [alert.position]: true };
    }
    return classes;
  } */

  setClasses(alert: Alert): { [key: string]: boolean } {
    const classes = { alert: true };

    switch (alert.type) {
      case 'warning':
        return { ...classes, ['bg-warning']: true };

      case 'info':
        return { ...classes, ['bg-info']: true };

      case 'success':
        return { ...classes, ['bg-success']: true };

      default:
        return { ...classes, ['bg-danger']: true };
    }
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.errorListener);
    this.eventManager.destroy(this.httpErrorListener);
  }

  close(alert: Alert): void {
    alert.close?.(this.alerts);
  }

  private addErrorAlert(message?: string, type?: AlertType): void {
    this.alertService.addAlert({ type, message }, this.alerts);
    // this.alertService.addAlert({ type, message, timeout: 0 }, this.alerts);
  }
}
