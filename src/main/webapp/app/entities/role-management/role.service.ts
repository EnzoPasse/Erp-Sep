import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Observable } from 'rxjs';
import { IRol } from './rol.model';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private resurceUrl = this.applicationConfigService.getEndpointFor('/rol');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  getAll(): Observable<IRol[]> {
    const url = `${this.resurceUrl}/get`;
    return this.http.get<IRol[]>(url);
  }
}
