import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { CustomValidators } from 'app/core/util/validators';
import { ComprobanteService } from 'app/entities/debt/voucher/service/voucher.service';
import { ComprobanteDataSource } from 'app/entities/debt/voucher/voucher.datasource';
import { IEnte } from 'app/entities/master-crud';
import { EnteService } from 'app/entities/master-crud/ente/ente.service';
import { merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-credito-ente',
  templateUrl: './credito-ente.component.html',
  styleUrls: ['./credito-ente.component.scss'],
})
export class CreditoEnteComponent implements OnInit, AfterViewInit, OnDestroy {
  creditForm = this.fb.group({
    ente: ['', [Validators.required, CustomValidators.RequireMatch]],
    selectedOptions: ['', Validators.required],
  });

  enteSelected!: IEnte;
  dataSource!: ComprobanteDataSource;
  displayedColumns = ['select', 'Cbte', 'Nro', 'F.Emision', 'F.Vencimiento', 'Periodo', 'Total', 'Saldo', 'Estado'];

  isSaving = false;
  resultEnte: IEnte[] = [];
  loadingAutocomplete = false;
  subscriptions: Subscription[] = [];
  dataUrl: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild('sort1', { static: true }) sort: MatSort | undefined;

  @Output() creditSeleccionInfo: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private enteService: EnteService,
    private comprobanteService: ComprobanteService,
    private cdk: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe((data: any) => (this.dataUrl = data as {})));

    const sortSubscription = this.sort?.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));
    if (sortSubscription) {
      this.subscriptions.push(sortSubscription);
    }

    const paginatorSubscriptions = merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(tap(() => this.loadCreditoEnteList()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

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

    const selectedOptionsChange = this.selectedOptions.valueChanges.subscribe((res: any) => {
      this.creditSeleccionInfo.emit(res ?? null);
    });
    this.subscriptions.push(selectedOptionsChange);
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

    this.dataSource.loadComprobantes(queryParams, this.dataUrl.queryOperationStep1);
    // this.selection.clear();
  }

  filterConfiguration(): any {
    const filtro: any = {};
    filtro.id = this.enteSelected.id ? this.enteSelected.id : 0;
    return filtro as {};
  }

  limpiarOptions(): void {
    this.creditForm.get('selectedOptions')?.reset();
    this.dataSource.entitySubject.next([]);
  }

  get ente(): AbstractControl {
    return this.creditForm.get('ente') as AbstractControl;
  }

  mensajeErrorEnte(): string {
    return this.ente.hasError('required') ? 'El Ente es requerido' : this.ente.hasError('incorrect') ? 'Seleccione un Ente válido' : '';
  }

  get selectedOptions(): AbstractControl {
    return this.creditForm.get('selectedOptions') as AbstractControl;
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
