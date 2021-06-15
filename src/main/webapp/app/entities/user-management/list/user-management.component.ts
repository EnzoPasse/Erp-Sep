import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { UsuarioDataSource } from '../user-datasource';
import { IUsuario } from '../user-management.model';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { UserManagementService } from '../service/user-management.service';
import { UserAdaper } from '../service/user-management.adapter.service';

/* export class UserManagementComponent implements OnInit {

  currentAccount: Account | null = null;
  users: Usuario[] | null = null;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;

  constructor(
    private userService: UserManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
  }

  setActive(user: Usuario, isActivated: boolean): void {
    this.userService.update({ ...user }).subscribe();// => this.loadAll());
  }

  trackIdentity(index: number, item: Usuario): number {
    return item.id!;
  }

  deleteUser(user: Usuario): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
       this.loadAll();
      }
    });
  }

   loadAll(): void {
    this.isLoading = true;
    this.userService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<User[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        () => (this.isLoading = false)
      );
  } 

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
      },
    });
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === 'asc';
      this.loadAll();
    });
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(users: Usuario[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.users = users;
  }
}
 */

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent implements OnInit, OnDestroy {
  flag = true;
  dataSource!: UsuarioDataSource;

  displayedColumns = ['id', 'nombre', 'nombreCompleto', 'cuil', '_roles', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild('sort1', { static: true }) sort: MatSort | undefined;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;

  filtroEstado = '';
  filtroFechaDesde = '';
  filtroFechaHasta = '';
  // allEstadosComprobantes: EstadoComprobante[] = [];

  // lastQuery: QueryParamsModel;
  selection = new SelectionModel<IUsuario>(true, []);
  // deudasResult: Comprobante[] = [];

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private usuarioService: UserManagementService) {}

  ngOnInit(): void {
    //  this.transeferenciaService.getAllEstadosComprobante().subscribe(res => this.allEstadosComprobantes = res);

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
      .pipe(tap(() => this.loadUserList()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

    const searchSubscription = fromEvent(this.searchInput!.nativeElement, 'keyup')
      .pipe(
        debounceTime(150), // que se emita solo una vez cada 150ms
        distinctUntilChanged(), // eliminamos duplicados
        tap(() => {
          this.paginator!.pageIndex = 0;
          this.loadUserList();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    this.dataSource = new UsuarioDataSource(this.usuarioService);
    this.loadUserList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  loadUserList(): void {
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort!.direction,
      this.sort!.active,
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );

    this.dataSource.loadUsuarios(queryParams);
    this.selection.clear();
  }

  /** FILTRATION */
  filterConfiguration(): any {
    const filter: any = {};
    const searchText: string = this.searchInput!.nativeElement.value;
    filter.nombreCompleto = searchText;
    filter.nombre = searchText;
    filter.cuil = searchText;

    return filter as {};
  }

  /*  deleteComprobante(_item: Comprobante) {
     const _title: string = 'Borrar Deposito';
     const _description: string = 'Esta seguro de borrar el Deposito permanentemente?';
     const _waitDesciption: string = 'Borrando Deposito...';
 
     const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
     dialogRef.afterClosed().pipe(
       map(res => res ? true : false),  // mapeo el objeto por que puede venir un undefined y explota todo
       switchMap((dato: any) => {
 
         if (dato) {
           return this.depositoService.deleteComprobante(_item.id)
         } else
           return of(null); // siempre se espera que devuelva algo(observable o promise) el switchmap
       })
     ).subscribe(res => {
       if (res) {
         const _deleteMessage = `El Deposito ha sido borrado`;
         this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 5000, true);
         setTimeout(() => {
           this.loadDepositoList();
         }, 500);
       }
     });
 
   } */

  /* 
    getItemCssClassByStatus(status: string = 'PENDIENTE'): string {
      switch (status) {
        case 'EMITIDO':
          return 'success';
        case 'COINCILIADO':
          return 'metal';
      }
      return '';
    }
  
    cambiarFechaDesde(fechaSelected) {
      this.filtroFechaDesde = fechaSelected;
      if (this.filtroFechaHasta) {
        this.loadDepositoList();
      }
    }
  
    cambiarFechaHasta(fechaSelected) {
      this.filtroFechaHasta = fechaSelected;
      if (this.filtroFechaDesde) {
        this.loadDepositoList();
      }
    }
    cambiarEstado(estado) {
      this.filtroEstado = estado;
      this.loadDepositoList();
    } */

  /* imprimirOrden(idOrdenPago: number) {
    const url = `${API_CONFIG}Administracion/imprimirDeposito/?idDeposito=${idOrdenPago}&codigoReporte=${REPORTE_ORDEN_DEPOSITO}`;
    this.layoutUtilsService.printElements(url);
  } */
}
