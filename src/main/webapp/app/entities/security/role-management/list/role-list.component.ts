import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { DialogService } from 'app/core/util/dialog.service';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { RolService } from '../..';
import { RolDataSource } from '../role.datasource';
import { IRol } from '../role.model';

@Component({
  selector: 'jhi-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit, OnDestroy {
  flag = true;
  dataSource!: RolDataSource;

  displayedColumns = ['id', 'nombre', 'esAdmin', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild('sort1', { static: true }) sort: MatSort | undefined;
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef | undefined;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private rolService: RolService, private dialog: DialogService) {}

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
      .pipe(tap(() => this.loadRolList()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

    const searchSubscription = fromEvent(this.searchInput!.nativeElement, 'keyup')
      .pipe(
        debounceTime(150), // que se emita solo una vez cada 150ms
        distinctUntilChanged(), // eliminamos duplicados
        tap(() => {
          this.paginator!.pageIndex = 0;
          this.loadRolList();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    this.dataSource = new RolDataSource(this.rolService);
    this.loadRolList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  loadRolList(): void {
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort!.direction,
      this.sort!.active,
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );

    this.dataSource.loadRoles(queryParams);
  }

  /** FILTRATION */
  filterConfiguration(): any {
    const filter: any = {};
    const searchText: string = this.searchInput!.nativeElement.value;
    filter.nombre = searchText;
    return filter as {};
  }

  deleteRol(_item: IRol): void {
    const _title = 'Borrar Rol';
    const _description = 'Esta seguro de borrar al Rol permanentemente?';
    const _waitDesciption = 'Borrando Rol...';

    const dialogRef = this.dialog.deleteElement(_title, _description, _waitDesciption);
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((res: any) => {
        if (!res) {
          return;
        }

        if (_item.id) {
          this.subscriptions.push(
            this.rolService.delete(_item.id).subscribe({
              next: () => {
                this.loadRolList();
              },
            })
          );
        }
      })
    );
  }

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
