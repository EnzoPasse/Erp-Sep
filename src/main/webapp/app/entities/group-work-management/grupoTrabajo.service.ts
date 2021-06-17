import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IGrupoTrabajo } from './grupoTrabajo.model';

@Injectable({
  providedIn: 'root',
})
export class GrupoTrabajoService {
  private resurceUrl = this.applicationConfigService.getEndpointFor('/grupoTrabajo');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAll(): Observable<IGrupoTrabajo[]> {
    const url = `${this.resurceUrl}/get`;
    return this.http.get<IGrupoTrabajo[]>(url);
  }
}
