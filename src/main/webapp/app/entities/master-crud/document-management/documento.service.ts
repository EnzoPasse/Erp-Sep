import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { ISubTipo } from './documento.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private http: HttpClient, private aplicationConfig: ApplicationConfigService) {}

  getAllSubtipoDocumentosBancarios(tipo: number): Observable<ISubTipo[]> {
    const url = this.aplicationConfig.getEndpointFor(`subtipo/get/${tipo}`);
    return this.http.get<ISubTipo[]>(url);
  }
}
