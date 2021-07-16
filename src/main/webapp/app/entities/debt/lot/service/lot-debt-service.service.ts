import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';

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

  getAllLotesPendientes(): Observable<any> {
    const urlG = `${this.comprobanteUrl}/getCpteLote`;
    return this.http.get(urlG);
  }

  deleteLote(loteNro: string): Observable<{}> {
    const urlG = `${this.deudaUrl}/delete/?id=${loteNro}`;
    return this.http.delete(urlG);
  }
}
