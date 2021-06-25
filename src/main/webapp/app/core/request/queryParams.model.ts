export interface IQueryParamsModel {
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  pageSize: number;
}

export class QueryParamsModel implements IQueryParamsModel {
  filter: any;
  sortOrder: string; // asc || desc
  sortField: string;
  pageNumber: number;
  pageSize: number;

  // constructor overrides
  constructor(_filter: any, _sortOrder: string = 'asc', _sortField: string = '', _pageNumber: number = 1, _pageSize: number = 10) {
    this.filter = _filter;
    this.sortOrder = _sortOrder;
    this.sortField = _sortField;
    this.pageNumber = _pageNumber;
    this.pageSize = _pageSize;
  }
}
