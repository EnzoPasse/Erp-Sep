import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-delete-entity-dialog',
  templateUrl: './delete-entity-dialog.component.html',
})
export class DeleteEntityDialogComponent implements OnInit {
  // Public properties
  viewLoading = false;
  displayedColumns = ['select', 'Cheque', 'Nro', 'Nombre', 'F.Emision', 'F.Presentacion', 'Importe'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  constructor(public dialogRef: MatDialogRef<DeleteEntityDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new MatTableDataSource([{}]);
  }

  ngOnInit(): void {
    this.dataSource.data = this.data.documents ? this.data.documents : [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    /* Server loading imitation. Remove this */
    this.viewLoading = true;
    setTimeout(() => {
      this.dialogRef.close(this.selection.selected); // Keep only this row
      this.viewLoading = false;
    }, 1500);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.documents.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.selection.selected.length === this.data.documents.length) {
      this.selection.clear();
    } else {
      this.data.documents.forEach((row: any) => this.selection.select(row));
    }
  }
}
