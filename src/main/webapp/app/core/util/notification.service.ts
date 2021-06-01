import { Injectable, SecurityContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertComponent } from 'app/shared/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private sanckBar: MatSnackBar, private sanitizer: DomSanitizer) {}

  showNotification(displayMessage: string): void {
    this.sanckBar.openFromComponent(AlertComponent, {
      data: {
        message: this.sanitizer.sanitize(SecurityContext.HTML, displayMessage) ?? '',
      },
      duration: 5000,
    });
  }
}
