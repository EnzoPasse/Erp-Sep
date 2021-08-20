import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ComprobanteService } from 'app/core/voucher/voucher.service';
import { Observable, of } from 'rxjs';
import { VoucherAdaper } from '../../../../core/voucher/voucher-adapter.service';
import { IComprobante } from '../../../../core/voucher/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class VoucherManagementResolve implements Resolve<IComprobante> {
  constructor(private service: ComprobanteService, private voucheAdapterService: VoucherAdaper) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComprobante> {
    const id = +route.params['id'];
    if (id) {
      return this.service.find(id);
    }
    return of(this.voucheAdapterService.adapter({})); // new Comprobante()
  }
}
