import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportTypes } from 'app/config/reportType';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { DialogService } from 'app/core/util/dialog.service';
import { ComprobanteDataSource } from 'app/core/voucher/voucher.datasource';
import { IComprobante, IEstadoComprobante } from 'app/core/voucher/voucher.model';
import { IMedioPago } from 'app/entities/master-crud/payment-method-management/medio-pago.model';
import { MedioPagoService } from 'app/entities/master-crud/payment-method-management/medio-pago.service';
import { fromEvent, merge, of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ComprobanteService } from 'app/core/voucher/voucher.service';
import { PaymentService } from '../service/payment.service';
import { IMovimientoCajaBanco } from 'app/entities/master-crud';
import { IFilterPrint } from 'app/entities/master-crud/print/print.model';

@Component({
  selector: 'jhi-list-pay',
  templateUrl: './list-pay.component.html',
  styleUrls: ['./list-pay.component.scss'],
})
export class ListPayComponent implements OnInit, OnDestroy {
  title = '';
  flag = true;
  dataSource!: ComprobanteDataSource;
  dataUrl: any;

  displayedColumns = ['Ente', 'Cbte', 'Nro', 'F.Emision', 'Periodo', 'Total', 'Estado', 'Acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild('sort1', { static: true }) sort: MatSort | undefined;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;

  filtroEstado = '';
  filtroFechaDesde = '';
  filtroFechaHasta = '';
  filtroMedio = '';
  allEstadosComprobantes: IEstadoComprobante[] = [];
  allMediosPago: IMedioPago[] = [];

  selection = new SelectionModel<IComprobante>(true, []);

  destroy$ = new Subject<void>();
  private subscriptions: Subscription[] = [];

  constructor(
    private comprobanteService: ComprobanteService,
    private paymentService: PaymentService,
    private medioService: MedioPagoService,
    private dialog: DialogService,
    private route: ActivatedRoute,
    private applicationConfigService: ApplicationConfigService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.dataUrl = data as {};
        this.title = data.pageTitle;
        this.comprobanteService
          .getAllEstados(data.stateType)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res: IEstadoComprobante[]) => (this.allEstadosComprobantes = res));
      })
    );

    this.subscriptions.push(
      this.medioService
        .getAll()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: IMedioPago[]) => (this.allMediosPago = data))
    );

    // Si el usuario cambia el ordenamiento, volver a la primera pagina
    const sortSubscription = this.sort?.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));
    if (sortSubscription) {
      this.subscriptions.push(sortSubscription);
    }

    /* La data debe ser cargada en dos casos
    - Cuando el evento paginacion ocurre => this.paginator.page
    - Cuando el evento de ordenamiento ocurre => this.sort.sortChange
    */
    const paginatorSubscriptions = merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loadComprobanteList())
      )
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

    const searchSubscription = fromEvent(this.searchInput!.nativeElement, 'keyup')
      .pipe(
        debounceTime(150), // que se emita solo una vez cada 150ms
        distinctUntilChanged(), // eliminamos duplicados
        tap(() => {
          this.paginator!.pageIndex = 0;
          this.loadComprobanteList();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    this.dataSource = new ComprobanteDataSource(this.comprobanteService);
    this.loadComprobanteList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadComprobanteList(): void {
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort!.direction,
      this.sort!.active,
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );

    this.dataSource.loadComprobantes(queryParams, this.dataUrl.queryOperation);
    this.selection.clear();
  }

  /** FILTRATION */
  filterConfiguration(): any {
    const filter: any = {};
    const searchText: string = this.searchInput!.nativeElement.value;
    filter.nombre = searchText;
    filter.fechaDesde = this.filtroFechaDesde;
    filter.fechaHasta = this.filtroFechaHasta;
    filter.idEstado = this.filtroEstado;
    filter.idMedioPago = this.filtroMedio;
    return filter as {};
  }

  deleteComprobante(_item: IComprobante): void {
    if (_item.movimientoCajaBanco!.length > 1) {
      this.deleteDocumento(_item);
      return;
    }

    const _title = 'Borrar Comprobante';
    const _description = 'Esta seguro de borrar el Comprobante permanentemente?';
    const _waitDesciption = 'Borrando Comprobante...';

    const dialogRef = this.dialog.deleteElement(_title, _description, _waitDesciption);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((res: any) => {
        if (!res) {
          return;
        }

        if (_item.id) {
          this.subscriptions.push(
            this.paymentService
              .delete(_item.id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: () => {
                  this.loadComprobanteList();
                },
              })
          );
        }
      })
    );
  }

  deleteDocumento(item: IComprobante): void {
    const _title = 'Eliminar Documentos de la Orden de Pago';
    const _description = 'Seleccione los Documentos que desea eliminar permanentemente?';
    const _waitDesciption = 'Eliminando Documentos...';

    const _documents = item.movimientoCajaBanco;

    const dialogRef = this.dialog.deleteElement(_title, _description, _waitDesciption, _documents);
    dialogRef
      .afterClosed()
      .pipe(
        map(res => (res ? res : [])),
        switchMap((movimientos: IMovimientoCajaBanco[]) => {
          if (movimientos.length > 0) {
            const idsDocumentos: number[] = [];
            movimientos.forEach(it => {
              const idDocum: any = it.documento?.id as number;
              idsDocumentos.push(idDocum);
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.paymentService.delete(item.id!, idsDocumentos);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return of(null);
          }
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.loadComprobanteList();
        }
      });
  }

  cambiarFechaDesde(fechaSelected: any): void {
    this.filtroFechaDesde = fechaSelected;
    if (this.filtroFechaHasta) {
      this.loadComprobanteList();
    }
  }

  cambiarFechaHasta(fechaSelected: any): void {
    this.filtroFechaHasta = fechaSelected;
    if (this.filtroFechaDesde) {
      this.loadComprobanteList();
    }
  }
  cambiarEstado(estado: any): void {
    this.filtroEstado = estado;
    this.loadComprobanteList();
  }

  cambiarMedio(medio = ''): void {
    this.filtroMedio = medio;
    this.loadComprobanteList();
  }

  disabledByStatus(value: IComprobante): boolean {
    if (value.estadoComprobante!.nombre === 'PAGADO' || value.estadoComprobante!.nombre === 'IMPUTADO') {
      return true;
    } else {
      return false;
    }
  }

  imprimirOrden(idOrdenPago: number): void {
    // const url = `${API_CONFIG}Administracion/imprimirDeposito/?idDeposito=${idOrdenPago}&codigoReporte=${ReportTypes.RPT_ORDEN_PAGO}`;
    /* const  filtros: IFilterPrint = {
    id: idOrdenPago,
    lote: false,
    codigoReporte: ReportTypes.RPT_ORDEN_PAGO
  } */

    const url = this.applicationConfigService.getEndpointFor(
      `print/print/?id=${idOrdenPago}&codigoReporte=${ReportTypes.RPT_ORDEN_PAGO}&lote=false`
    );
    this.dialog.printElements(url);
  }
}
