import { BaseDataSource } from 'app/core/request/baseDataSource';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IRol, RolService } from '..';

export class RolDataSource extends BaseDataSource<IRol> {
  constructor(private rolService: RolService) {
    super();
  }

  loadRoles(query: QueryParamsModel): void {
    this.loadingSubject.next(true);
    this.isPreloadTextViewed$ = of(true);

    this.rolService
      .query(query)
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
