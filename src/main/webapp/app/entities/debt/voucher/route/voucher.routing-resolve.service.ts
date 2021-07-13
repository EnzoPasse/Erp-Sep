import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ComprobanteService } from '../service/voucher.service';
import { Comprobante, IComprobante } from '../voucher.model';

@Injectable({
  providedIn: 'root',
})
export class VoucherManagementResolve implements Resolve<IComprobante> {
  constructor(private service: ComprobanteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComprobante> {
    const id = +route.params['id'];
    if (id) {
      return this.service.find(id);
    }
    return of(new Comprobante());
  }
}
