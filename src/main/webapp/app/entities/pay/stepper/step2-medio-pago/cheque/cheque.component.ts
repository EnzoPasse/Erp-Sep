import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoxTypes } from 'app/config/boxType';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { EventManager, EventWithContent } from 'app/core/event-management/event-manager.service';
import { Alert } from 'app/core/util/alert.service';
import { CustomValidators } from 'app/core/util/validators';
import { WcfService } from 'app/core/wfc/wfc.service';
import { CajaCuentaBanco, ISubTipo } from 'app/entities/master-crud';
import { MovimientoCajaBancoService } from 'app/entities/master-crud/bank-cash-movement-management/movimientoCajaBanco.service';
import { DocumentoService } from 'app/entities/master-crud/document-management/documento.service';
import * as dayjs from 'dayjs';
import { Subject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss'],
})
export class ChequeComponent implements OnInit, OnChanges, OnDestroy {
  cheque = 2;
  prefijoCheque = 8;
  lastChequeEmited!: string;
  isEqual = true;
  chequeForm = new FormGroup({
    movimientoCajaBanco: new FormGroup({
      cajaCuentaBanco: new FormControl('', Validators.required),
    }),
    fechaEmision: new FormControl(dayjs().format('DD/MM/YYYY'), [Validators.required, CustomValidators.isValidDate]),
    subTipo: new FormControl('', Validators.required),
    dirigido: new FormControl('', Validators.required),
    nroCheque: new FormControl('', Validators.required),
    impresora: new FormControl('', Validators.required),
    cantidadDocs: new FormControl('', Validators.required),
    documento: new FormArray([], Validators.required),
  });

  subscriptions: Subscription[] = [];
  allCajasBanco: CajaCuentaBanco[] = [];
  allSubtipo: ISubTipo[] = [];
  allImpresoras: string[] = [];
  destroy$ = new Subject<void>();
  banco = '';
  _totalPagar!: number;

  @Input()
  set totalPagar(val: number) {
    this._totalPagar = val;
  }

  get totalPagar(): number {
    return this._totalPagar;
  }

  @Output() formInfo: EventEmitter<FormGroup | null> = new EventEmitter();

  constructor(
    private cajaBancoService: MovimientoCajaBancoService,
    private fb: FormBuilder,
    private documentoService: DocumentoService,
    private wfcService: WcfService,
    protected eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cajaBancoService
        .getCajas(BoxTypes.CAJA_BANCO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => (this.allCajasBanco = res))
    );

    this.subscriptions.push(
      this.documentoService
        .getAllSubtipoDocumentosBancarios(StateVoucherType.ORDEN_PAGO, this.cheque)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.allSubtipo = res;
        })
    );

    this.chequeForm.statusChanges.pipe(debounceTime(250)).subscribe(res => {
      if (res === 'VALID') {
        this.formInfo.emit(this.chequeForm.getRawValue());
      } else {
        this.formInfo.emit(null);
      }
    });

    this.wfcService.getTerminalService();

    this.wfcService.getPrinterService().subscribe(
      res => {
        // eslint-disable-next-line no-console
        console.log(res);
        this.allImpresoras = res['Impresoras'];
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error);
        this.eventManager.broadcast(
          new EventWithContent<Alert>('erpSepApp.error', {
            message:
              'El servicio de Windows de Impresion Automatica de Cheques WFC esta APAGADO!, NO se puedran imprimir los Cheques, Comuniquese con Soporte Tecnico',
            type: 'danger',
          })
        );
      }
    );
  }

  ngOnChanges(): void {
    /* *****USING COMBINELATEST***** */
    const cajaSubscription = this.chequeForm.get('movimientoCajaBanco.cajaCuentaBanco')!.valueChanges.pipe(takeUntil(this.destroy$));
    const valueTipo = this.chequeForm.get('subTipo')!.valueChanges.pipe(takeUntil(this.destroy$));

    const mergeSubscriptions = combineLatest([cajaSubscription, valueTipo])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([caja, subtipo]) => {
        if (caja && subtipo) {
          this.documentoService
            .getLastCheque(subtipo.id, caja.id)
            .pipe(
              tap(lastCheque => {
                this.lastChequeEmited = lastCheque;
                this.generateLast(lastCheque);
                this.eliminarDocumentos();
              })
            )
            .subscribe();
        }
      });
    this.subscriptions.push(mergeSubscriptions);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }

  crearDocumento(): FormGroup {
    return this.fb.group({
      nroDocumento: [{ value: '', disabled: true }],
      fechaEmisionString: [{ value: this.chequeForm.get('fechaEmision')?.value, disabled: true }],
      fechaPreVencString: [{ value: this.chequeForm.get('fechaEmision')?.value, disabled: true }],
      importe: ['', Validators.required],
      subTipo: [],
    });
  }

  agregarDocumento(): void {
    this.documento.push(this.crearDocumento());
  }

  eliminarDocumentos(): void {
    if (this.documento.length) {
      for (let i = this.documento.length; i >= 0; i--) {
        this.borrarItem(i);
      }
    }
  }

  borrarItem(i: number): void {
    this.documento.removeAt(i);
  }

  generarCheques(): void {
    const cantidad = this.chequeForm.get('cantidadDocs')!.value;
    const importeCheque = this.totalPagar / this.chequeForm.controls['cantidadDocs'].value;

    for (let i = 0; i < cantidad; i++) {
      this.agregarDocumento();
      const control = this.documento.at(i) as FormGroup;
      control.get('nroDocumento')!.setValue(this.generaNroCheque(i));
      control.get('importe')!.setValue(importeCheque);
      control.get('subTipo')?.setValue(this.subTipo.value);

      if (this.subTipo.value.id === 2) {
        let controlanterior;
        if (i > 0) {
          controlanterior = this.documento.at(i - 1) as FormGroup;
          control.get('fechaPreVencString')!.setValue(this.calcularFechaPresentacion(controlanterior.get('fechaPreVencString')!.value));
        } else {
          controlanterior = this.documento.at(i) as FormGroup;
          control.get('fechaPreVencString')!.setValue(this.calcularFechaPresentacion(controlanterior.get('fechaEmisionString')!.value));
        }
      }
    }
  }

  generaNroCheque(index: number): string {
    const nroSecuencia = parseInt(this.chequeForm.get('nroCheque')!.value, 10);
    let nroChequeGenerado = (nroSecuencia + index).toString();
    while (nroChequeGenerado.length < this.prefijoCheque) {
      nroChequeGenerado = '0' + nroChequeGenerado;
    }
    return nroChequeGenerado;
  }

  calcularFechaPresentacion(fecha: string): string {
    return dayjs(fecha, 'DD/MM/YYYY')
      .add(dayjs.duration({ months: 1 }))
      .format('DD/MM/YYYY');
  }

  isValidoSumaCheques(): boolean {
    let sum = 0;
    if (this.documento.length) {
      for (let i = 0; this.documento.length > i; i++) {
        sum += this.documento.controls[i].get('importe')!.value;
      }
      if (sum === this.totalPagar) {
        // this.noIgualError = null;
      } else {
        // this.noIgualError = 'La sumatoria de los Cheques NO coincide con el monto a Imputar.'
        return false;
      }
      return true;
    }
    return false;
  }

  isEqualToLast(): void {
    if (+this.chequeForm.get('nroCheque')?.value !== +this.lastChequeEmited) {
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', {
          message: 'El NRO de cheque ingresado no coincide con la chequera de la cuenta.',
          type: 'warning',
        })
      );
      this.isEqual = false;
    }
    this.isEqual = true;
  }

  generateLast(val: string): void {
    while (val.length < 8) {
      val = '0' + val;
    }
    this.chequeForm.get('nroCheque')!.setValue(val);
    this.isEqualToLast();
  }

  cambiarCaja(event: any): void {
    if (event.banco) {
      this.banco = event.banco.nombre;
    }
  }

  get documento(): FormArray {
    return this.chequeForm.get('documento') as FormArray;
  }

  get subTipo(): AbstractControl {
    return this.chequeForm.get('subTipo') as AbstractControl;
  }

  mensajeErrorCajaCuentaBanco(): string {
    return this.chequeForm.get('movimientoCajaBanco.cajaCuentaBanco')!.hasError('required') ? 'La Caja debe ser seleccionada' : '';
  }
  mensajeErrorTipoDocumento(): string {
    return this.chequeForm.get('subTipo')!.hasError('required') ? 'El Tipo de Cheque debe ser seleccionada' : '';
  }
  mensajeErrorFechaEmision(): string {
    return this.chequeForm.get('fechaEmision')!.hasError('required')
      ? 'La Fecha es requerida'
      : this.chequeForm.get('fechaEmision')!.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }
  mensajeErrorDirigido(): string {
    return this.chequeForm.get('dirigido')!.hasError('required') ? 'El Cheque debe estar dirigido a una persona' : '';
  }
  mensajeErrorNroCheque(): string {
    return this.chequeForm.get('nroCheque')!.hasError('required') ? 'El Nro es requerido' : '';
  }

  mensajeErrorCantidadDoc(): string {
    return this.chequeForm.get('cantidadDocs')!.hasError('required') ? 'El campo es requerido' : '';
  }

  mensajeErrorImpresora(): string {
    return this.chequeForm.get('impresora')!.hasError('required') ? 'El campo es requerido' : '';
  }
}
