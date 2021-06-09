// Angular
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
// CRUD

import { skip, distinctUntilChanged } from 'rxjs/operators';

// Why not use MatTableDataSource?
/*  In this example, we will not be using the built-in MatTableDataSource because its designed for filtering,
	sorting and pagination of a client - side data array.
	Read the article: 'https://blog.angular-university.io/angular-material-data-table/'
**/
export class BaseDataSource<T> implements DataSource<T> {
  entitySubject = new BehaviorSubject<T[]>([]);
  hasItems = false; // Need to show message: 'No records found'

  // Loading | Progress bar
  loading$: Observable<boolean> = of(false);
  isPreloadTextViewed$: Observable<boolean> = of(true);

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject<number>(0);
  loadingSubject = new BehaviorSubject<boolean>(false);
  paginatorTotal$: Observable<number>;
  subscriptions: Subscription[] = [];

  constructor() {
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
    this.loading$ = this.loadingSubject.asObservable();

    // subscribe hasItems to (entitySubject.length==0)
    const hasItemsSubscription = this.paginatorTotal$.pipe(distinctUntilChanged(), skip(1)).subscribe(res => (this.hasItems = res > 0));
    this.subscriptions.push(hasItemsSubscription);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    // Connecting data source
    return this.entitySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    // Disonnecting data source
    this.entitySubject.complete();
    this.paginatorTotalSubject.complete();
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
