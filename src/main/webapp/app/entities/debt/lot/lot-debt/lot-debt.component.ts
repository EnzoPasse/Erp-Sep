import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'app/core/util/alert.service';
import { DialogService } from 'app/core/util/dialog.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { FileUploadModel } from '../lot-debt.model';
import { LotDebtService } from '../service/lot-debt-service.service';

@Component({
  selector: 'jhi-lot-debt',
  templateUrl: './lot-debt.component.html',
  styleUrls: ['./lot-debt.component.scss'],
})
export class LotDebtComponent implements OnInit, OnDestroy {
  /** Link text */
  @Input() text = 'Subir Archivo';
  /* Name used in form which will be sent in HTTP request. */
  // @Input() param = 'file';
  /* Target URL for file uploading. */
  // @Input() target = 'https://file.io';
  /* File extension that accepted, same as 'accept' of <input type="file" />. 
      By the default, it's set to 'image/*'. */
  // @Input() accept = 'image/*';
  /* Allow you to add handler after its completion. Bubble up response text from remote. */
  // @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];
  susbscriptions: Subscription[] = [];

  now = dayjs(new Date()).format('DD/MM/YYYY');
  mensajeError = '';
  panelOpenState = false;
  allLotes = [];
  titleForm = '';
  loteForm = this.fb.group({
    fechaContable: ['', Validators.required],
    fechaVencimiento: ['', Validators.required],
  });

  constructor(
    private loteService: LotDebtService,
    private cdr: ChangeDetectorRef,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    protected eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.susbscriptions.push(
      this.route.data.subscribe((data: any) => {
        this.titleForm = data.pageTitle;
      })
    );
    this.fechaContable.patchValue(this.now);
    this.loadLoteList();
  }

  ngOnDestroy(): void {
    this.susbscriptions.forEach(subs => subs.unsubscribe());
  }

  loadLoteList(): void {
    this.susbscriptions.push(
      this.loteService.getAllLotesPendientes().subscribe(res => {
        this.allLotes = res;
        this.cdr.markForCheck();
      })
    );
  }

  onClick(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files!.length; index++) {
        const file = fileUpload.files![index];
        this.files.push({
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true,
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel): void {
    // file.sub.unsubscribe();
    this.removeFileFromArray(file);
    this.loadLoteList();
  }

  retryFile(file: FileUploadModel): void {
    this.uploadFile(file);
    file.canRetry = false;
  }

  uploadFile(file: any): void {
    if (file === null) {
      return;
    }

    file.inProgress = true;

    this.loteService
      .subirArchivoDeuda(
        file.data,
        dayjs(this.fechaContable.value).format('DD/MM/YYYY'),
        dayjs(this.fechaVencimiento.value).format('DD/MM/YYYY')
      )
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            file.progress = Math.round((event.loaded * 100) / event.total!); // Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            // const response: any = event.body;

            this.eventManager.broadcast(
              new EventWithContent<Alert>('erpSepApp.error', { message: 'Archivo procesado Completamente!', type: 'success' })
            );
            this.removeFileFromArray(file);
            this.loadLoteList();
          }
          this.cdr.markForCheck();
        },
        () => {
          file.progress = 100;
          file.inProgress = false;
          file.canRetry = true;
          // this.mensajeError = `${file.data.name}` + ' ' + error.error.message;
          this.cdr.markForCheck();
        }
      );
  }

  deleteLote(_item: any): void {
    const _title = 'Borrar Lote de Deuda';
    const _description = 'Esta seguro de borrar el Lote permanentemente?';
    const _waitDesciption = 'Borrando Lote...';

    const dialogRef = this.dialogService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (!res) {
        return;
      }
      if (_item.nroLote) {
        this.susbscriptions.push(
          this.loteService.deleteLote(_item.nroLote).subscribe({
            next: () => {
              this.loadLoteList();
            },
          })
        );
      }
    });
  }

  get fechaContable(): AbstractControl {
    return this.loteForm.get('fechaContable') as AbstractControl;
  }

  get fechaVencimiento(): AbstractControl {
    return this.loteForm.get('fechaVencimiento') as AbstractControl;
  }

  private uploadFiles(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel): void {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}
