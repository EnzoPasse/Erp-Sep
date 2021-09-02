import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoxTypes } from 'app/config/boxType';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { CustomValidators } from 'app/core/util/validators';
import { CajaCuentaBanco, ISubTipo } from 'app/entities/master-crud';
import { MovimientoCajaBancoService } from 'app/entities/master-crud/bank-cash-movement-management/movimientoCajaBanco.service';
import { DocumentoService } from 'app/entities/master-crud/document-management/documento.service';
import * as dayjs from 'dayjs';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit, OnDestroy {
  tomorrow = dayjs()
    .add(dayjs.duration({ days: 1 }))
    .format('DD/MM/YYYY');
  transferencia = 3;

  transferenciaForm = this.fb.group({
    comprobante: [],
    movimientoCajaBanco: this.fb.group({
      cajaCuentaBanco: ['', Validators.required],
    }),
    documento: this.fb.group({
      fechaEmisionString: [dayjs().format('DD/MM/YYYY'), [Validators.required, CustomValidators.isValidDate]],
      fechaPreVencString: [this.tomorrow, [Validators.required, CustomValidators.isValidDate]],
      subTipo: ['', Validators.required],
    }),
  });

  subscriptions: Subscription[] = [];
  allCajasBanco: CajaCuentaBanco[] = [];
  allSubtipo: ISubTipo[] = [];
  destroy$ = new Subject<void>();
  banco = '';

  @Output() formInfo: EventEmitter<FormGroup | null> = new EventEmitter();

  constructor(private cajaBancoService: MovimientoCajaBancoService, private fb: FormBuilder, private documentoService: DocumentoService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cajaBancoService
        .getCajas(BoxTypes.CAJA_BANCO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => (this.allCajasBanco = res))
    );

    this.subscriptions.push(
      this.documentoService
        .getAllSubtipoDocumentosBancarios(StateVoucherType.ORDEN_PAGO, this.transferencia)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.allSubtipo = res;
        })
    );

    this.transferenciaForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
      if (res === 'VALID') {
        this.formInfo.emit(this.transferenciaForm.getRawValue());
      } else {
        this.formInfo.emit(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }

  cambiarCaja(event: any): void {
    if (event.banco) {
      this.banco = event.banco.nombre;
    }
  }

  mensajeErrorCajaCuentaBanco(): string {
    return this.transferenciaForm.get('cajaCuentaBanco')!.hasError('required') ? 'La Caja debe ser seleccionada' : '';
  }
  mensajeErrorTipoDocumento(): string {
    return this.transferenciaForm.get('subTipo')!.hasError('required') ? 'El Tipo de transferencia debe ser seleccionada' : '';
  }
  mensajeErrorFechaEmisionString(): string {
    return this.transferenciaForm.get('fechaEmisionString')!.hasError('required')
      ? 'La Fecha es requerida'
      : this.transferenciaForm.get('fechaEmisionString')!.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }
  mensajeErrorFechaPreVencString(): string {
    return this.transferenciaForm.get('fechaPreVencString')!.hasError('required')
      ? 'La Fecha es requerida'
      : this.transferenciaForm.get('fechaPreVencString')!.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }
}
