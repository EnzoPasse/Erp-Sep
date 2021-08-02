import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { DialogService } from 'app/core/util/dialog.service';
import { ComprobanteService } from 'app/entities/debt/voucher/service/voucher.service';
import { ComprobanteDataSource } from 'app/entities/debt/voucher/voucher.datasource';
import { IComprobante, IEstadoComprobante } from 'app/entities/debt/voucher/voucher.model';
import { IMedioPago } from 'app/entities/master-crud/payment-method-management/medio-pago.model';
import { MedioPagoService } from 'app/entities/master-crud/payment-method-management/medio-pago.service';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

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

  private subscriptions: Subscription[] = [];

  constructor(
    private comprobanteService: ComprobanteService,
    private medioService: MedioPagoService,
    private dialog: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.subscribe((data: any) => {
        this.dataUrl = data as {};
        this.title = data.pageTitle;
        this.comprobanteService.getAllEstados(data.stateType).subscribe((res: IEstadoComprobante[]) => (this.allEstadosComprobantes = res));
      })
    );

    this.subscriptions.push(this.medioService.getAll().subscribe((data: IMedioPago[]) => (this.allMediosPago = data)));

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
      .pipe(tap(() => this.loadComprobanteList()))
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
            this.comprobanteService.delete(_item.id).subscribe({
              next: () => {
                this.loadComprobanteList();
              },
            })
          );
        }
      })
    );
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

  /*  imprimirOrden(idOrdenPago: number):void {
    const url = `${API_CONFIG}Administracion/imprimirDeposito/?idDeposito=${idOrdenPago}&codigoReporte=${ReportTypes.RPT_ORDEN_PAGO}`;
    this.layoutUtilsService.printElements(url);
  }  */
}
