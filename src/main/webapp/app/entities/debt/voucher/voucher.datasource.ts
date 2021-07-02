import { BaseDataSource } from 'app/core/request/baseDataSource';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ComprobanteService } from './service/voucher.service';
import { IComprobante } from './voucher.model';

export class ComprobanteDataSource extends BaseDataSource<IComprobante> {
  constructor(private comprobanteService: ComprobanteService) {
    super();
  }

  loadComprobantes(query: QueryParamsModel, type: number): void {
    this.loadingSubject.next(true);
    this.isPreloadTextViewed$ = of(true);

    this.comprobanteService
      .query(query, type)
      .pipe(
        // catchError(() => of([])),
        finalize(() => {
          this.isPreloadTextViewed$ = of(false);
          this.loadingSubject.next(false);
        })
      )
      .subscribe({
        next: response => {
          this.paginatorTotalSubject.next(response.totalCount);
          this.entitySubject.next(response.items);
        },
      });
  }
}
