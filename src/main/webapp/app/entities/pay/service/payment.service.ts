import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IComprobante } from 'app/core/voucher/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public pagoUrl = this.applicationConfigService.getEndpointFor('pago');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(voucher: IComprobante, operation: number): Observable<IComprobante> {
    const url = `${this.pagoUrl}/create?operacion=${operation}`;
    return this.http.post<IComprobante>(url, voucher);
  }

  update(voucher: IComprobante, operation: number): Observable<IComprobante> {
    const url = `${this.pagoUrl}/edit?operacion=${operation}`;
    return this.http.put<IComprobante>(url, voucher);
  }

  /*  delete(id: number): Observable<{}> {
    const url = `${this.pagoUrl}/deleteCpte/${id}`;
    return this.http.delete(url);
  } */

  delete(comprobanteId: number, documentosIds: number[] = []): Observable<{}> {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const url = `${this.pagoUrl}/deleteCpte/?id=${comprobanteId}&strDocumento=${documentosIds}`;
    return this.http.delete(url);
  }
}
