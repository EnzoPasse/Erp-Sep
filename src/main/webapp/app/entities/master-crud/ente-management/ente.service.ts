import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IEnte } from './ente.model';

@Injectable({
  providedIn: 'root',
})
export class EnteService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('/ente');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  findAutocompleteEnte(texto: string): Observable<IEnte[]> {
    const url = `${this.resourceUrl}/Get/?nombre=${texto}`;
    return this.http.get<IEnte[]>(url);
  }
}
