import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IComprobante } from '../../voucher/voucher.model';
import { ILoteDto } from '../lot-debt.model';

@Injectable({
  providedIn: 'root',
})
export class LotDebtService {
  public deudaUrl = this.applicationConfigService.getEndpointFor('/deuda');
  public comprobanteUrl = this.applicationConfigService.getEndpointFor('/comprobante');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  /* ********LOTES*********************/
  subirArchivoDeuda(archivo: File, fechaContable: string, fechaVencimiento: string): Observable<HttpEvent<{}>> {
    const urlG = `${this.deudaUrl}/createCpteDeudaLote/?fechaContable=${fechaContable}&fechaVencimiento=${fechaVencimiento}`;

    const formData = new FormData();
    formData.append('archivo', archivo);

    // para escuchar el evento
    const req = new HttpRequest('POST', urlG, formData, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  getAllLotesPendientes(): Observable<ILoteDto[]> {
    const urlG = `${this.comprobanteUrl}/getCpteLote`;
    return this.http.get<ILoteDto[]>(urlG);
  }

  getDetalleLote(loteNro: string): Observable<IComprobante[]> {
    const urlG = `${this.comprobanteUrl}/getCpteLoteDetalle?nroLote=${loteNro}`;
    return this.http.get<IComprobante[]>(urlG);
  }

  deleteLote(loteNro: string): Observable<{}> {
    const urlG = `${this.deudaUrl}/delete/?id=${loteNro}`;
    return this.http.delete(urlG);
  }
}
