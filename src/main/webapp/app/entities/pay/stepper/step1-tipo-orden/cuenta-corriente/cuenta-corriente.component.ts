import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OperationType } from 'app/config/operationTypes.constants';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { Alert } from 'app/core/util/alert.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { CustomValidators } from 'app/core/util/validators';
import { ComprobanteService } from 'app/entities/debt/voucher/service/voucher.service';
import { ComprobanteDataSource } from 'app/entities/debt/voucher/voucher.datasource';
import { IComprobante } from 'app/entities/debt/voucher/voucher.model';
import { IEnte } from 'app/entities/master-crud';
import { EnteService } from 'app/entities/master-crud/ente/ente.service';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.scss'],
})
export class CuentaCorrienteComponent implements OnInit, AfterViewInit, OnDestroy {
  enteDeudaForm = this.fb.group({
    ente: ['', [Validators.required, CustomValidators.RequireMatch]],
    totalComprobante: [0, Validators.min(1)],
    montoSeleccionado: [{ value: 0, disabled: true }], //
    // diferencia: [''],
    comprobanteRef: this.fb.array([]),
  });

  enteSelected!: IEnte;
  dataSource!: ComprobanteDataSource;
  cuentaCorrienteResult: IComprobante[] = [];
  comprobantesRef: IComprobante[] = [];
  displayedColumns = ['Select', 'Cbte', 'Nro', 'F.Emision', 'F.Vencimiento', 'Periodo', 'Total', 'Saldo', 'Estado'];
  selection = new SelectionModel<IComprobante>(true, [], true);
  isSaving = false;
  resultEnte: IEnte[] = [];
  loadingAutocomplete = false;
  diferencia!: number;
  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild('sort1', { static: true }) sort: MatSort | undefined;

  @Output() totalInfo: EventEmitter<number | null> = new EventEmitter<number | null>();
  @Output() formInfo: EventEmitter<FormGroup | null> = new EventEmitter<FormGroup | null>();

  constructor(
    private fb: FormBuilder,
    private enteService: EnteService,
    private comprobanteService: ComprobanteService,
    private cdk: ChangeDetectorRef,
    private eventManager: EventManager
  ) {}

  ngOnInit(): void {
    /* this.subscriptions.push(this.route.data.subscribe((data: any) => (this.dataUrl = data as {}))); */

    const sortSubscription = this.sort?.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));
    if (sortSubscription) {
      this.subscriptions.push(sortSubscription);
    }

    const paginatorSubscriptions = merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(tap(() => this.loadCreditoEnteList()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

    this.subscriptions.push(
      this.selection.changed.subscribe(res => {
        this.diferencia = 0;

        if (res.removed.length > 0) {
          this.enteDeudaForm.controls['totalComprobante'].reset();
          res.removed.forEach(it => this.removeComprobanteRef(it));
        }

        if (res.added.length > 0) {
          this.addComprobanteRef(res.added[0]);
        }

        this.calcularImporte();
        this.cargarDatosItem();
      })
    );

    // me subscribo a los cambios de Total a Imputar
    this.subscriptions.push(
      this.totalComprobante.valueChanges
        .pipe(
          debounceTime(500),
          tap(() => this.calcularDiferencia())
        )
        .subscribe()
    );

    const formValid = this.enteDeudaForm.statusChanges.pipe(debounceTime(250)).subscribe((res: any) => {
      if (res === 'VALID') {
        this.totalInfo.emit(this.totalComprobante.value);
        this.formInfo.emit(this.enteDeudaForm.getRawValue());
      } else {
        this.totalInfo.emit(null);
        this.formInfo.emit(null);
      }
    });
    this.subscriptions.push(formValid);

    this.dataSource = new ComprobanteDataSource(this.comprobanteService);
  }

  ngAfterViewInit(): void {
    const enteValueChanges = this.ente.valueChanges
      .pipe(
        map(value => (typeof value === 'string' ? this.noWhiteSpace(value) : (value as string))),
        debounceTime(150), // que se emita solo una vez cada 500ms
        distinctUntilChanged(),
        filter(query => !!query && query.length > 2),
        tap(() => (this.loadingAutocomplete = true)),
        switchMap(value => this.enteService.findAutocompleteEnte(value).pipe(finalize(() => (this.loadingAutocomplete = false))))
      )
      .subscribe((res: any) => {
        this.resultEnte = res;
        this.cdk.markForCheck();
      });
    this.subscriptions.push(enteValueChanges);

    /*  const selectedOptionsChange = this.selectedOptions.valueChanges.subscribe((res: any) => {
       this.creditSeleccionInfo.emit(res ?? null);
     });
     this.subscriptions.push(selectedOptionsChange); */
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectedEnte(ente: IEnte | undefined): void {
    if (ente) {
      this.enteSelected = ente;
      this.loadCreditoEnteList();
      // this.paginator?.firstPage();
    }
  }

  loadCreditoEnteList(): void {
    this.limpiarOptions();

    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort!.direction,
      this.sort!.active,
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );

    this.dataSource.loadComprobantes(queryParams, OperationType.GET_ENTE_DEUDA);
    this.subscriptions.push(this.dataSource.entitySubject.subscribe(res => (this.cuentaCorrienteResult = res))); // this.selection.clear();
  }

  filterConfiguration(): any {
    const filtro: any = {};
    filtro.id = this.enteSelected.id ? this.enteSelected.id : 0;
    return filtro as {};
  }

  limpiarOptions(): void {
    this.enteDeudaForm.get('selectedOptions')?.reset();
    this.dataSource.entitySubject.next([]);
    this.selection.clear();
  }

  addComprobanteRef(item: IComprobante): void {
    this.comprobantesRef.push(item);
  }

  removeComprobanteRef(item: IComprobante): void {
    this.comprobantesRef.forEach((doc, index) => {
      if (doc === item) {
        this.comprobantesRef.splice(index, 1);
      }
    });
  }

  calcularImporte(): void {
    let sumaParcial = 0;
    this.comprobantesRef.forEach(it => {
      sumaParcial += it.saldo!;
    });
    this.enteDeudaForm.controls['montoSeleccionado'].setValue(sumaParcial);
    this.enteDeudaForm.controls['totalComprobante'].setValue(sumaParcial);
  }

  calcularDiferencia(): void {
    const imputar = this.enteDeudaForm.controls['totalComprobante'].value;
    const seleccionado = this.enteDeudaForm.controls['montoSeleccionado'].value;
    this.diferencia = seleccionado - imputar;
    // this.enteDeudaForm.controls['diferencia'].setValue(this.diferencia);

    if (this.diferencia < 0) {
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', {
          message: 'Ud. va a pagar un valor mayor al Total Seleccionado.',
          type: 'danger',
        })
      );
    }
    if (this.diferencia > 0) {
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', {
          message: `Existe una diferencia entre el Total Seleccionado y el Total a Pagar de $: ${this.diferencia}`,
          type: 'warning',
        })
      );
    }

    this.cdk.markForCheck();
  }

  cargarDatosItem(): void {
    const itemFG = this.selection.selected.map(value => this.fb.group(value));
    const itemFromArray = this.fb.array(itemFG);
    this.enteDeudaForm.setControl('comprobanteRef', itemFromArray);
  }

  // Check all rows are selected
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.cuentaCorrienteResult.length;
    return numSelected === numRows;
  }

  // toggle seleccion
  masterToggle(): void {
    if (this.selection.selected.length === this.cuentaCorrienteResult.length) {
      this.selection.clear();
    } else {
      this.cuentaCorrienteResult.forEach(row => this.selection.select(row));
    }
  }

  get ente(): AbstractControl {
    return this.enteDeudaForm.get('ente') as AbstractControl;
  }

  mensajeErrorEnte(): string {
    return this.ente.hasError('required') ? 'El Ente es requerido' : this.ente.hasError('incorrect') ? 'Seleccione un Ente válido' : '';
  }

  get totalComprobante(): AbstractControl {
    return this.enteDeudaForm.get('totalComprobante') as AbstractControl;
  }

  displayFn(ente: IEnte | undefined | null): string | undefined {
    if (ente !== undefined && ente !== null) {
      return ente.persona ? ente.persona.apellido : ente.personaJuridica ? ente.personaJuridica.nombreFantasia : undefined;
    }
    return undefined;
  }

  private noWhiteSpace(value: string): string {
    return value.trimLeft();
  }
}
