import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IComprobante } from 'app/core/voucher/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  public deudaUrl = this.applicationConfigService.getEndpointFor('deuda');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(voucher: IComprobante, operation: number): Observable<IComprobante> {
    const url = `${this.deudaUrl}/create?operacion=${operation}`;
    return this.http.post<IComprobante>(url, voucher);
  }

  update(voucher: IComprobante, operation: number): Observable<IComprobante> {
    const url = `${this.deudaUrl}/edit?operacion=${operation}`;
    return this.http.put<IComprobante>(url, voucher);
  }

  delete(id: number): Observable<{}> {
    const url = `${this.deudaUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}
