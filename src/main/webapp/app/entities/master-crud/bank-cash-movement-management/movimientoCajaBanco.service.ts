import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { ICajaCuentaBanco } from './movimientoCajaBanco.model';

@Injectable({
  providedIn: 'root',
})
export class MovimientoCajaBancoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('/CajaCuentaBanco');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getCajas(type: number): Observable<ICajaCuentaBanco[]> {
    const url = `${this.resourceUrl}/GetPorIdTipo/${type}`;
    return this.http.get<ICajaCuentaBanco[]>(url);
  }
}
