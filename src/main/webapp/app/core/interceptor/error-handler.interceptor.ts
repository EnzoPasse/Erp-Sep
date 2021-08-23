import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventManager, EventWithContent } from '../event-management/event-manager.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private eventManager: EventManager) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (![403].includes(err.status) && err.message !== '') {
            // eslint-disable-next-line no-console
            console.log(err);

            this.eventManager.broadcast(new EventWithContent('erpSepApp.httpError', err));
          }
        },
      })
    );
  }
}
