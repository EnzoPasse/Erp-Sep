import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(claveNueva: string, claveActual: string): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('cambiarClave'), { claveNueva, claveActual });
  }
}
