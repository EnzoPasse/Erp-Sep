import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IMedioPago } from './medio-pago.model';

@Injectable({
  providedIn: 'root',
})
export class MedioPagoService {
  private resurceUrl = this.applicationConfigService.getEndpointFor('/medioPago');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAll(): Observable<IMedioPago[]> {
    const url = `${this.resurceUrl}/get`;
    return this.http.get<IMedioPago[]>(url);
  }
}
