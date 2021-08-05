import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationTemplate, TypeTemplate } from 'app/config/template.constats';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { CustomValidators } from 'app/core/util/validators';
import { ComprobanteService } from 'app/entities/debt/voucher/service/voucher.service';
import { IComprobante, IItem, ITipoComprobante } from 'app/entities/debt/voucher/voucher.model';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'jhi-directo',
  templateUrl: './directo.component.html',
  styleUrls: ['./directo.component.scss'],
})
export class DirectoComponent implements OnInit, OnDestroy {
  now = dayjs().format('DD/MM/YYYY');
  nroPattern = `[0-9]{5}-[0-9]{8}`;
  allConceptos: IItem[] = [];
  comprobanteRes!: IComprobante;
  allTipoComprobantes: ITipoComprobante[] = [];
  subscriptions: Subscription[] = [];

  directoForm = this.fb.group({
    tipoComprobante: ['', [Validators.required]],
    nroComprobante: ['', [Validators.required, Validators.pattern(this.nroPattern)]],
    fechaComprobante: ['', [Validators.required, CustomValidators.isValidDate]],
    totalComprobante: [{ value: '', disabled: true }],
    items: this.fb.array([]),
  });

  @Output() totalInfo: EventEmitter<number | null> = new EventEmitter<number | null>();
  @Output() formInfo: EventEmitter<FormGroup | null> = new EventEmitter<FormGroup | null>();

  constructor(private fb: FormBuilder, private comprobanteService: ComprobanteService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.comprobanteService.getAllTiposComprobante(StateVoucherType.DEUDA).subscribe({ next: res => (this.allTipoComprobantes = res) })
    );
    this.subscriptions.push(
      this.comprobanteService
        .getItemsEnte(0, OperationTemplate.DEBE, TypeTemplate.CONCEPTOS_PAGOS)
        .subscribe({ next: res => (this.allConceptos = res) })
    );

    const itemValueChanges = this.items.valueChanges.subscribe(item => this.actualizarTotalComprobante(item));
    this.subscriptions.push(itemValueChanges);

    const formValid = this.directoForm.statusChanges.pipe(debounceTime(250)).subscribe((res: any) => {
      if (res === 'VALID') {
        this.totalInfo.emit(this.totalComprobante.value);
        this.formInfo.emit(this.directoForm.getRawValue());
      } else {
        this.totalInfo.emit(null);
        this.formInfo.emit(null);
      }
    });
    this.subscriptions.push(formValid);

    this.fechaComprobante.patchValue(this.now);
    this.agregarItem();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  crearItem(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      importe: ['', [Validators.required, CustomValidators.maxNumber]],
    });
  }

  agregarItem(): void {
    this.items.push(this.crearItem());
  }

  borrarItem(i: number): void {
    this.items.removeAt(i);
  }

  actualizarTotalComprobante(item: any): void {
    let totalSum = 0;
    for (const i in item) {
      if (item) {
        totalSum += item[i].importe;
        this.directoForm.controls['totalComprobante'].patchValue(totalSum);
      }
    }
  }

  rellenarCeros(event: HTMLInputElement): void {
    const valor = event.value.includes('-');
    if (!valor) {
      while (5 - event.value.length !== 0) {
        event.value = '0' + event.value;
      }
      this.nroComprobante.patchValue(event.value + '-');
    } else {
      const partes = event.value.split('-');
      while (8 - partes[1].length !== 0) {
        partes[1] = '0' + partes[1].valueOf();
        this.nroComprobante.patchValue(partes[0] + '-' + partes[1]);
      }
    }
  }

  comparar(o1: any, o2: any): boolean {
    return o1?.name === o2?.name && o1?.id === o2?.id;
  }

  get items(): FormArray {
    return this.directoForm.get('items') as FormArray;
  }

  get tipoComprobante(): AbstractControl {
    return this.directoForm.get('tipoComprobante') as AbstractControl;
  }
  get totalComprobante(): AbstractControl {
    return this.directoForm.get('totalComprobante') as AbstractControl;
  }

  get fechaComprobante(): AbstractControl {
    return this.directoForm.get('fechaComprobante') as AbstractControl;
  }

  get nroComprobante(): AbstractControl {
    return this.directoForm.get('nroComprobante') as AbstractControl;
  }

  mensajeErrorTipoComprobante(): string {
    return this.tipoComprobante.hasError('required') ? 'El Comprobante es requerido' : '';
  }

  mensajeErrorFechaComprobante(): string {
    return this.fechaComprobante.hasError('required')
      ? 'La Fecha es requerida'
      : this.fechaComprobante.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }

  mensajeErrorNroComprobante(): string {
    return this.nroComprobante.hasError('required')
      ? 'El Nro de Comprobante es requerido'
      : this.nroComprobante.hasError('pattern')
      ? 'El Nro debe ser (00000-00000000)'
      : '';
  }

  mensajeErrorImporte(indice: number): string {
    return this.items.controls[indice].get('importe')!.hasError('required')
      ? 'El importe es requerido'
      : this.items.controls[indice].get('importe')!.hasError('excedido')
      ? 'Supero el limite'
      : '';
  }
}
