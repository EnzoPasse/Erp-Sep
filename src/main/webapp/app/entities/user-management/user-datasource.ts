import { BaseDataSource } from 'app/core/request/baseDataSource';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { QueryResultsModel } from 'app/core/request/queryResult.model';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UserManagementService } from './service/user-management.service';
import { IUsuario } from './user-management.model';

export class UsuarioDataSource extends BaseDataSource<IUsuario> {
  constructor(private userService: UserManagementService) {
    super();
  }

  loadUsuarios(query: QueryParamsModel): void {
    this.loadingSubject.next(true);
    this.isPreloadTextViewed$ = of(true);

    this.userService
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
          // eslint-disable-next-line no-console
          console.log(response);
          this.paginatorTotalSubject.next(response.totalCount ? response.totalCount : 0);
          this.entitySubject.next(response.items ? response.items : []);
        },
      });
  }
}

/* this.paginatorTotalSubject.next(response.totalCount);
this.entitySubject.next(response.items);
 */
