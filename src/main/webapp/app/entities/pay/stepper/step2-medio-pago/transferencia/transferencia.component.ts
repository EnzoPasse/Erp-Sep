import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoxTypes } from 'app/config/boxType';
import { CustomValidators } from 'app/core/util/validators';
import { CajaCuentaBanco, ISubTipo } from 'app/entities/master-crud';
import { MovimientoCajaBancoService } from 'app/entities/master-crud/bank-cash-movement-management/movimientoCajaBanco.service';
import { DocumentoService } from 'app/entities/master-crud/document-management/documento.service';
import * as dayjs from 'dayjs';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit, OnDestroy {
  transferenciaForm = this.fb.group({
    fechaContableString: [dayjs().format('DD/MM/YYYY'), [Validators.required, CustomValidators.isValidDate]],
    tipoDocumento: ['', Validators.required],
    cajaCuentaBanco: ['', Validators.required],
    receptor: ['', Validators.required],
  });

  subscriptions: Subscription[] = [];
  allCajasBanco: CajaCuentaBanco[] = [];
  allSubtipo: ISubTipo[] = [];
  destroy$ = new Subject<void>();
  banco = '';

  constructor(private cajaBancoService: MovimientoCajaBancoService, private fb: FormBuilder, private documentoService: DocumentoService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cajaBancoService
        .getCajas(BoxTypes.CAJA_BANCO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => (this.allCajasBanco = res))
    );

    this.documentoService
      .getAllSubtipoDocumentosBancarios(3)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        // eslint-disable-next-line no-console
        console.log(res);

        this.allSubtipo = res;
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
    return this.transferenciaForm.get('tipoDocumento')!.hasError('required') ? 'El Tipo de transferencia debe ser seleccionada' : '';
  }
  mensajeErrorFechaContableString(): string {
    return this.transferenciaForm.get('fechaContableString')!.hasError('required')
      ? 'La Fecha es requerida'
      : this.transferenciaForm.get('fechaContableString')!.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }
}
