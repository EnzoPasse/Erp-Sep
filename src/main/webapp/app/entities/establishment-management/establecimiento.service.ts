import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IEstablecimiento } from './establecimiento.model';

@Injectable({
  providedIn: 'root',
})
export class EstablecimientoService {
  private resurceUrl = this.applicationConfigService.getEndpointFor('/establecimiento');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAll(): Observable<IEstablecimiento[]> {
    const url = `${this.resurceUrl}/get`;
    return this.http.get<IEstablecimiento[]>(url);
  }
}
