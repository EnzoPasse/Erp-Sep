import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoxTypes } from 'app/config/boxType';
import { CustomValidators } from 'app/core/util/validators';
import { CajaCuentaBanco } from 'app/entities/master-crud';
import { MovimientoCajaBancoService } from 'app/entities/master-crud/bank-cash-movement-management/movimientoCajaBanco.service';
import * as dayjs from 'dayjs';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jhi-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss'],
})
export class ChequeComponent implements OnInit, OnDestroy {
  chequeForm = this.fb.group({
    fechaContableString: [dayjs().format('DD/MM/YYYY'), [Validators.required, CustomValidators.isValidDate]],
    periodo: ['', Validators.required],
    cajaCuentaBanco: ['', Validators.required],
    receptor: ['', Validators.required],
  });

  subscriptions: Subscription[] = [];
  allCajasBanco: CajaCuentaBanco[] = [];
  destroy$ = new Subject<void>();
  banco = '';

  constructor(private cajaBancoService: MovimientoCajaBancoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cajaBancoService
        .getCajas(BoxTypes.CAJA_BANCO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => (this.allCajasBanco = res))
    );
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
    return this.chequeForm.get('cajaCuentaBanco')!.hasError('required') ? 'La Caja debe ser seleccionada' : '';
  }
}
