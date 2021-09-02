import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoxTypes } from 'app/config/boxType';
import { CustomValidators } from 'app/core/util/validators';
import { ICajaCuentaBanco } from 'app/entities/master-crud';
import { MovimientoCajaBancoService } from 'app/entities/master-crud/bank-cash-movement-management/movimientoCajaBanco.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'jhi-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.scss'],
})
export class EfectivoComponent implements OnInit, OnDestroy {
  efectivoForm = new FormGroup({
    comprobante: new FormGroup({
      fechaContableString: new FormControl(dayjs().format('DD/MM/YYYY'), [Validators.required, CustomValidators.isValidDate]),
      periodo: new FormControl('', Validators.required),
    }),
    movimientoCajaBanco: new FormGroup({
      cajaCuentaBanco: new FormControl('', Validators.required),
      receptor: new FormControl('', Validators.required),
    }),
  });

  allCajasBanco: ICajaCuentaBanco[] = [];
  subscriptions: Subscription[] = [];
  banco = '';

  @Output() formInfo: EventEmitter<FormGroup | null> = new EventEmitter();

  constructor(private fb: FormBuilder, private cajaBancoService: MovimientoCajaBancoService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.cajaBancoService.getCajas(BoxTypes.CAJA_USUARIO).subscribe(res => (this.allCajasBanco = res)));

    this.efectivoForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
      if (res === 'VALID') {
        this.formInfo.emit(this.efectivoForm.getRawValue());
      } else {
        this.formInfo.emit(null);
      }
    });
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
    return this.efectivoForm.get('movimientoCajaBanco.cajaCuentaBanco')!.hasError('required') ? 'La Caja debe ser seleccionada' : '';
  }

  mensajeErrorReceptor(): string {
    return this.efectivoForm.get('movimientoCajaBanco.receptor')!.hasError('required') ? 'El Receptor del dinero es requerido' : '';
  }

  mensajeErrorFechaPeriodo(): string {
    return this.efectivoForm.get('comprobante.periodo')!.hasError('required') ? 'El Periodo es requerido (mm/yyyy)' : '';
  }

  mensajeErrorFechaContableString(): string {
    return this.efectivoForm.get('comprobante.fechaContableString')!.hasError('required')
      ? 'La Fecha es requerida'
      : this.efectivoForm.get('comprobante.fechaContableString')!.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }
}
