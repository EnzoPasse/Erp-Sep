import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-print-entity-dialog',
  templateUrl: './print-entity-dialog.component.html',
  styleUrls: ['./print-entity-dialog.component.scss'],
})
export class PrintEntityDialogComponent {
  /**
   * Component constructor
   *
   * @param dialogRef: MatDialogRef<FetchEntityDialogComponent>,
   * @param url: url of resurces
   */
  constructor(public dialogRef: MatDialogRef<PrintEntityDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}

  /**
   * Close dialog with false result
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
