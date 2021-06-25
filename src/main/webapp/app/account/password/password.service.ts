import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Account } from 'app/core/auth/account.model';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('/usuario/editClave');
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(user: Account): Observable<{}> {
    return this.http.put(this.resourceUrl, user);
  }
}
