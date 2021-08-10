import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { Alert } from 'app/core/util/alert.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { ComprobanteService } from 'app/entities/debt/voucher/service/voucher.service';
import { ComprobanteDataSource } from 'app/entities/debt/voucher/voucher.datasource';
import { IComprobante } from 'app/entities/debt/voucher/voucher.model';
import { merge, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-descontar-deuda',
  templateUrl: './descontar-deuda.component.html',
  styleUrls: ['./descontar-deuda.component.scss'],
})
export class DescontarDeudaComponent implements OnInit, OnDestroy {
  creditoAcum!: number;
  totalDeudaAcum!: number;
  selection = new SelectionModel<IComprobante>(true, [], true);
  dataSource: ComprobanteDataSource = new ComprobanteDataSource(this.comprobanteService);
  displayedColumns = ['Select', 'Cbte', 'Nro', 'F.Emision', 'F.Vencimiento', 'Periodo', 'Total', 'Imputado', 'Imputar', 'Saldo', 'Estado'];
  subscriptions: Subscription[] = [];
  dataUrl: any;
  itemsDeudaOriginales: IComprobante[] = [];
  creditoResult: IComprobante[] = [];
  descontarForm = this.fb.group({
    deudas: ['', Validators.required],
  });

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | undefined;
  @ViewChild('sort1', { static: true }) sort!: MatSort | undefined;

  _comprobanteIn!: IComprobante;
  get comprobanteIn(): IComprobante {
    return this._comprobanteIn;
  }

  // tslint:disable-next-line:no-input-rename
  @Input()
  set comprobanteIn(value: IComprobante) {
    this._comprobanteIn = value;
    this.creditoAcum = 0;
    this.selection.clear();
    this.loadDeudaEnteList();
  }

  @Output() deudaSeleccionInfo: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private comprobanteService: ComprobanteService,
    private fb: FormBuilder,
    protected eventManager: EventManager
  ) {}

  ngOnInit(): void {
    const subscriptionsDeudas = this.selection.changed.subscribe(res => {
      if (res.removed.length > 0) {
        this.calculoXBorrarItems(res.removed[0]);
      }
      if (res.added.length > 0 && this.creditoAcum > 0) {
        this.calculoxRegistro(res.added[0]);
      }

      this.conservarCambios();

      if (!(this.creditoAcum > 0)) {
        this.eventManager.broadcast(
          new EventWithContent<Alert>('erpSepApp.error', {
            message: 'Ya consumio el Total de la Nota de Credito!, Puede cambiar su seleccion si lo desea.',
            type: 'warning',
          })
        );
      }
    });

    this.subscriptions.push(subscriptionsDeudas);

    const sortSubscription = this.sort?.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));
    if (sortSubscription) {
      this.subscriptions.push(sortSubscription);
    }

    const paginatorSubscriptions = merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(tap(() => this.loadDeudaEnteList()))
      .subscribe();

    this.subscriptions.push(paginatorSubscriptions);
    this.subscriptions.push(this.route.data.subscribe((data: any) => (this.dataUrl = data as {})));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  loadDeudaEnteList(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this.comprobanteIn) {
      return;
    }

    this.dataSource.entitySubject.next([]); // elimino los datos de la tabla que hayan quedado.
    this.creditoAcum = this.comprobanteIn.saldo!;
    this.selection.clear();
    this.descontarForm.get('deudas')?.reset();

    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort!.direction,
      this.sort!.active,
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );

    this.dataSource.loadComprobantes(queryParams, this.dataUrl.queryOperationStep2);
    this.subscriptions.push(this.dataSource.entitySubject.subscribe(res => (this.creditoResult = res)));
    // this.selection.clear();
  }

  filterConfiguration(): any {
    const filter: any = {};
    filter.id = this.comprobanteIn.ente!.id ? this.comprobanteIn.ente!.id : 0;
    return filter as {};
  }

  calculoxRegistro(registroDeuda: IComprobante): void {
    let imputado: number;
    this.totalDeudaAcum += registroDeuda.saldo!;
    this.creditoAcum -= registroDeuda.saldo!;
    switch (this.creditoAcum >= 0) {
      case true:
        imputado = registroDeuda.saldo!;
        break;
      case false:
        imputado = registroDeuda.saldo! - this.creditoAcum * -1;
        this.creditoAcum = 0;
        break;
    }
    // registroDeuda.imputado += imputado
    registroDeuda.saldo! -= imputado;
    registroDeuda.aImputar = imputado;
  }

  calculoXBorrarItems(registroDeuda: IComprobante): void {
    this.totalDeudaAcum -= registroDeuda.aImputar!;
    this.creditoAcum += registroDeuda.aImputar!;
    registroDeuda.saldo! += registroDeuda.aImputar!;
    registroDeuda.aImputar = 0;
  }

  conservarCambios(): void {
    const deudasFiltradas = this.creditoResult.filter(filtro => filtro.aImputar! > 0);

    /*  let sumaDescuentoCredito = 0;
     deudasFiltradas.forEach( item => {
       sumaDescuentoCredito += item.aImputar! 
     }) */

    /*  const info  = {    
       credito : {...this.comprobanteIn, saldo: this.creditoAcum, comprobanteRef: deudasFiltradas},
       deudas : deudasFiltradas
    } */

    const info = { ...this.comprobanteIn, saldo: this.creditoAcum, comprobanteRef: deudasFiltradas };

    if (deudasFiltradas.length > 0) {
      this.descontarForm.get('deudas')?.patchValue(info);
    } else {
      this.descontarForm.get('deudas')?.patchValue('');
    }

    this.deudaSeleccionInfo.emit(info);
  }
}
