import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'app/core/util/alert.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { CustomValidators } from 'app/core/util/validators';
import { IEnte } from 'app/entities/master-crud';
import { EnteService } from 'app/entities/master-crud/ente/ente.service';
import { IUsuario } from 'app/entities/security';
import * as dayjs from 'dayjs';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ComprobanteService } from '../service/voucher.service';
import { Comprobante, IComprobante, IItem, ITipoComprobante } from '../voucher.model';

@Component({
  selector: 'jhi-voucher-update',
  templateUrl: './voucher-update.component.html',
  styleUrls: ['./voucher-update.component.scss'],
})
export class VoucherUpdateComponent implements OnInit, OnDestroy, AfterViewInit {
  now = dayjs().format('DD/MM/YYYY');
  itemArray = [] as any;
  allConceptos: IItem[] = [];
  comprobanteRes!: IComprobante;
  allTipoComprobantes: ITipoComprobante[] = [];
  resultEnte: IEnte[] = [];
  loadingAutocomplete = false;
  titleForm = '';
  data: any;
  isSaving = false;
  subscriptions: Subscription[] = [];

  editForm = this.fb.group({
    id: [],
    fechaContable: ['08/07/2021', [Validators.required, CustomValidators.isValidDate]],
    ente: ['', [Validators.required, CustomValidators.RequireMatch]],
    tipoComprobante: ['', [Validators.required]],
    nroComprobante: ['', Validators.required],
    fechaComprobante: ['', [Validators.required, CustomValidators.isValidDate]],
    periodo: ['', [Validators.required]],
    fechaVto: ['', [Validators.required]],
    observaciones: [''],
    totalComprobante: [{ value: '', disabled: true }],
    items: this.fb.array([]),
  });

  constructor(
    private comprobanteService: ComprobanteService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private enteService: EnteService,
    private cdk: ChangeDetectorRef,
    protected eventManager: EventManager
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.comprobanteService.getAllTiposComprobante().subscribe({ next: res => (this.allTipoComprobantes = res) }));

    const routeSubscription = this.route.data.subscribe((data: any) => {
      this.comprobanteRes = data['comprobante'];
      this.data = data;
      this.titleForm = data.pageTitle;
      let titlemas = '';
      if (data.comprobante!.id !== undefined) {
        titlemas = data.comprobante.id as string;
      }
      this.updateForm(data['comprobante']);
      this.titleForm = this.titleForm + titlemas;
    });
    this.subscriptions.push(routeSubscription);

    // eslint-disable-next-line no-console
    console.log(this.comprobanteRes);
  }

  ngAfterViewInit(): void {
    this.ente.valueChanges
      .pipe(
        map(value => (typeof value === 'string' ? this.noWhiteSpace(value) : (value as string))),
        filter(query => query.length >= 2),
        debounceTime(150), //que se emita solo una vez cada 500ms
        distinctUntilChanged(),
        tap(() => (this.loadingAutocomplete = true)),
        switchMap(value => this.enteService.findAutocompleteEnte(value).pipe(finalize(() => (this.loadingAutocomplete = false))))
      )
      .subscribe((res: any) => {
        this.resultEnte = res;
        this.cdk.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  cargarDatosItem(): void {
    if (this.itemArray.length === 0) {
      this.agregarItem();
      return;
    }

    const itemFG = this.itemArray.map((value: any) => this.fb.group(value));
    const itemFromArray = this.fb.array(itemFG);
    this.editForm.setControl('items', itemFromArray);

    this.enteSelected(this.ente.value);
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

  enteSelected(ente: IEnte | undefined): void {
    if (ente) {
      this.comprobanteService.getItemsEnte(ente.id!).subscribe(res => {
        this.allConceptos = res;
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  limpiar(): void {
    this.updateForm(new Comprobante());
    this.itemArray = [];
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
    this.editForm.markAsPristine();
    this.isSaving = false;
  }

  save(salir: boolean): void {
    if (this.editForm.invalid) {
      this.marcarCampos(this.editForm);
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo no va bien, por favor verifica los campos', type: 'warning' })
      );
      return;
    }

    this.isSaving = true;
    const comprobante = this.createComprobante();

    if (comprobante.id !== undefined) {
      this.subscribeToSaveResponse(this.comprobanteService.update(comprobante));
    } else {
      this.subscribeToSaveResponse(this.comprobanteService.create(comprobante));
    }
    if (salir) {
      this.previousState();
    }
    this.limpiar();
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

  get id(): AbstractControl {
    return this.editForm.get('id') as AbstractControl;
  }

  get items(): FormArray {
    return this.editForm.get('items') as FormArray;
  }

  get ente(): AbstractControl {
    return this.editForm.get('ente') as AbstractControl;
  }

  mensajeErrorEnte(): string {
    return this.ente.hasError('required') ? 'El Ente es requerido' : this.ente.hasError('incorrect') ? 'Seleccione un Ente válido' : '';
  }

  get tipoComprobante(): AbstractControl {
    return this.editForm.get('tipoComprobante') as AbstractControl;
  }

  mensajeErrorTipoComprobante(): string {
    return this.tipoComprobante.hasError('required') ? 'El Comprobante es requerido' : '';
  }

  get fechaComprobante(): AbstractControl {
    return this.editForm.get('fechaComprobante') as AbstractControl;
  }

  mensajeErrorFechaComprobante(): string {
    return this.fechaComprobante.hasError('required')
      ? 'La Fecha es requerida'
      : this.fechaComprobante.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }

  get nroComprobante(): AbstractControl {
    return this.editForm.get('nroComprobante') as AbstractControl;
  }

  mensajeErrorNroComprobante(): string {
    return this.nroComprobante.hasError('required') ? 'El Nro debe ser (00000-00000000)' : '';
  }

  get periodo(): AbstractControl {
    return this.editForm.get('periodo') as AbstractControl;
  }

  mensajeErrorFechaPeriodo(): string {
    return this.periodo.hasError('required') ? 'El Periodo es requerido (mm/yyyy)' : '';
  }

  get fechaContable(): AbstractControl {
    return this.editForm.get('fechaContable') as AbstractControl;
  }

  mensajeErrorFechaContable(): string {
    return this.fechaContable.hasError('required')
      ? 'La Fecha es requerida'
      : this.fechaContable.hasError('isValidDate')
      ? 'Ingrese una fecha Valida dd/mm/yyyy'
      : '';
  }

  mensajeErrorImporte(indice: number): string {
    return this.items.controls[indice].get('importe')!.hasError('required')
      ? 'El importe es requerido'
      : this.items.controls[indice].get('importe')!.hasError('excedido')
      ? 'Supero el limite'
      : '';
  }

  displayFn(ente?: IEnte): string | undefined {
    if (ente !== undefined) {
      return ente.persona ? ente.persona.apellido : ente.personaJuridica ? ente.personaJuridica.nombreFantasia : undefined;
    }
    return undefined;
  }

  get fechaVto(): AbstractControl {
    return this.editForm.get('fechaVto') as AbstractControl;
  }

  get totalComprobante(): AbstractControl {
    return this.editForm.get('totalComprobante') as AbstractControl;
  }
  get observaciones(): AbstractControl {
    return this.editForm.get('observaciones') as AbstractControl;
  }

  /* 
    trackRolOrderById(index: number, item: IRol): number {
      return item.id!;
    } */

  protected subscribeToSaveResponse(result: Observable<IUsuario>): void {
    result.subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  private marcarCampos(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.marcarCampos(control);
      }
    });
  }

  private updateForm(comprobante: IComprobante): void {
    this.editForm.patchValue({
      id: comprobante.id,
      fechaContable: comprobante.fechaContable ?? this.now,
      ente: comprobante.ente,
      tipoComprobante: comprobante.tipoComprobante,
      nroComprobante: comprobante.nroComprobante,
      fechaComprobante: comprobante.fechaComprobante,
      periodo: comprobante.periodo,
      fechaVto: comprobante.fechaVto,
      observaciones: comprobante.observaciones,
      totalComprobante: comprobante.totalComprobante,
    });
    this.itemArray = comprobante.item ? comprobante.item : [];
    this.cargarDatosItem();
    this.enteSelected(comprobante.ente);
    this.cdk.markForCheck();
  }

  private createComprobante(): IComprobante {
    return {
      ...new Comprobante(),
      id: this.id.value,
      periodo: this.periodo.value,
      fechaComprobante: this.fechaComprobante.value,
      fechaContable: this.fechaContable.value,
      fechaVto: this.fechaVto.value,
      nroCAI: this.comprobanteRes.nroCAI,
      nroCierre: this.comprobanteRes.nroCierre,
      nroCompGanancia: this.comprobanteRes.nroCompGanancia,
      nroCompIngBruto: this.comprobanteRes.nroCompIngBruto,
      nroComprobante: this.nroComprobante.value,
      nroLote: this.comprobanteRes.nroLote,
      percepcionGanancia: this.comprobanteRes.percepcionGanancia,
      percepcionIVA: this.comprobanteRes.percepcionIVA,
      percepcionIngBruto: this.comprobanteRes.percepcionIngBruto,
      retencionGanancia: this.comprobanteRes.retencionGanancia,
      retencionIVA: this.comprobanteRes.retencionIVA,
      retencionIngBruto: this.comprobanteRes.retencionIngBruto,
      saldo: this.comprobanteRes.saldo,
      aImputar: this.comprobanteRes.aImputar,
      imputado: this.comprobanteRes.imputado,
      totalComprobante: this.totalComprobante.value,
      dtoRgoOtros: this.comprobanteRes.dtoRgoOtros,
      grupoRef: this.comprobanteRes.grupoRef,
      observaciones: this.observaciones.value,
      establecimiento: { ...this.comprobanteRes.establecimiento },
      estadoComprobante: { ...this.comprobanteRes.estadoComprobante },
      comprobanteRef: [...this.comprobanteRes.comprobanteRef!],
      condicionIVA: { ...this.comprobanteRes.condicionIVA },
      condicionPago: { ...this.comprobanteRes.condicionPago },
      tipoComprobante: { ...this.tipoComprobante.value },
      ente: { ...this.ente.value },
      movimientoCajaBanco: [...this.comprobanteRes.movimientoCajaBanco!],
      item: this.items.value,
    };
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
  }

  private onSaveError(): void {
    this.isSaving = false;
    this.eventManager.broadcast(
      new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo salio mal!', type: 'danger' })
    );
  }

  private noWhiteSpace(value: string): string {
    return value.trimLeft();
  }
}
