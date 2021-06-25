// Angular
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityDialogComponent } from '../../shared/dialog/delete-entity-dialog/delete-entity-dialog.component';
import { PrintEntityDialogComponent } from '../../shared/dialog/print-entity-dialog/print-entity-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Showing Confirmation (Mat-Dialog) before Entity Removing
   *
   * @param title: stirng
   * @param description: stirng
   * @param waitDesciption: string
   */
  deleteElement(title: string = '', description: string = '', waitDesciption: string = '', documents?: any): any {
    if (documents) {
      return this.dialog.open(DeleteEntityDialogComponent, {
        data: { title, description, waitDesciption, documents },
        width: '1000px',
      });
    } else {
      return this.dialog.open(DeleteEntityDialogComponent, {
        data: { title, description, waitDesciption },
        width: '440px',
      });
    }
  }

  /**
   * Showing Print MatDialog
   * @params _url: any
   */

  printElements(_url: any): any {
    return this.dialog.open(PrintEntityDialogComponent, {
      data: _url,
      width: '70%',
      height: '90%',
    });
  }
}
