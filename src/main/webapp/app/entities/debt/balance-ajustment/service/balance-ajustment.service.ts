import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IQueryParamsModel } from 'app/core/request/queryParams.model';
import { IQueryResultsModel } from 'app/core/request/queryResult.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VoucherAdaper } from '../../../../core/voucher/voucher-adapter.service';
import { IComprobante } from '../../../../core/voucher/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class BalanceAjustmentService {
  public deudaUrl = this.applicationConfigService.getEndpointFor('/deuda');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private voucherAdapter: VoucherAdaper
  ) {}

  query(queryParams: IQueryParamsModel, type: number): Observable<IQueryResultsModel<IComprobante>> {
    const url = `${this.deudaUrl}/get?operacion=${type}`;
    return this.http.post<IQueryResultsModel<IComprobante>>(url, queryParams).pipe(
      map((response: IQueryResultsModel<IComprobante>) => {
        const vouchers: IComprobante[] = response.items.map(item => this.voucherAdapter.adapter(item));
        return { ...response, items: vouchers } as IQueryResultsModel<IComprobante>;
      })
    );
  }
}
