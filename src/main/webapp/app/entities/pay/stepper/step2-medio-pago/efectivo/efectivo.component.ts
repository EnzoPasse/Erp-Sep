import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoxTypes } from 'app/config/boxType';
import { CustomValidators } from 'app/core/util/validators';
import { ICajaCuentaBanco, IMedioPago, MovimientoCajaBanco } from 'app/entities/master-crud';
import { MovimientoCajaBancoService } from 'app/entities/master-crud/bank-cash-movement-management/movimientoCajaBanco.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'jhi-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.scss'],
})
export class EfectivoComponent implements OnInit, OnChanges, OnDestroy {
  efectivoForm = this.fb.group({
    fechaContableString: [dayjs().format('DD/MM/YYYY'), [Validators.required, CustomValidators.isValidDate]],
    periodo: ['', Validators.required],
    cajaCuentaBanco: ['', Validators.required],
    receptor: ['', Validators.required],
  });

  allCajasBanco: ICajaCuentaBanco[] = [];
  subscriptions: Subscription[] = [];
  banco = '';

  @Input() medioPago!: IMedioPago;
  @Output() formInfo: EventEmitter<MovimientoCajaBanco | null> = new EventEmitter();

  constructor(private fb: FormBuilder, private CajaBancoService: MovimientoCajaBancoService) {}

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(this.medioPago);
    this.efectivoForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
      if (res === 'VALID') {
        this.formInfo.emit(this.efectivoForm.getRawValue());
      } else {
        this.formInfo.emit(null);
      }
    });
  }

  ngOnChanges(): void {
    if (this.medioPago.id === 1) {
      this.subscriptions.push(this.CajaBancoService.getCajas(BoxTypes.CAJA_USUARIO).subscribe(res => (this.allCajasBanco = res)));
    } else {
      this.subscriptions.push(this.CajaBancoService.getCajas(BoxTypes.CAJA_BANCO).subscribe(res => (this.allCajasBanco = res)));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  cambiarCaja(event: any): void {
    if (event.banco) {
      this.banco = event.banco.nombre;
    }
  }

  mensajeErrorCajaCuentaBanco(): string {
    return this.efectivoForm.get('cajaCuentaBanco')!.hasError('required') ? 'La Caja debe ser seleccionada' : '';
  }

  mensajeErrorFechaPeriodo(): string {
    return this.efectivoForm.get('periodo')!.hasError('required') ? 'El Periodo es requerido (mm/yyyy)' : '';
  }

  mensajeErrorFechaContableString(): string {
    return this.efectivoForm.get('fechaContableString')!.hasError('required')
      ? 'La Fecha es requerida'
      : this.efectivoForm.get('fechaContableString')!.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }
}
