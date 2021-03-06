import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LoaderState {
  show: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  show(): void {
    this.loaderSubject.next(<LoaderState>{ show: true });
  }
  hide(): void {
    this.loaderSubject.next(<LoaderState>{ show: false });
  }
}
