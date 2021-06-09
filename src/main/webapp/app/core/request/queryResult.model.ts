export interface IQueryResultsModel {
  items?: any[];
  totalCount?: number;
  errorMessage?: string;
}

export class QueryResultsModel {
  // fields
  public items: any[];
  public totalCount: number;
  public errorMessage: string;

  constructor(_items: any[] = [], _totalCount: number = 0, _errorMessage: string = '') {
    this.items = _items;
    this.totalCount = _totalCount;
    this.errorMessage = _errorMessage;
  }
}

/* export type PaginationEndPoints<T> = (req: IQueryParamsModel) => Observable<IQueryResultsModel<T>>;
 */
