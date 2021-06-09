import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { Account } from 'app/core/auth/account.model';
import { AccountAdaper } from 'app/core/auth/account-adapter';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PasswordService {
  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private accountAdapter: AccountAdaper
  ) {}

  save(user: Account): Observable<{}> {
    return this.http.put(this.applicationConfigService.getEndpointFor('/usuario/editClave'), user);
  }
}
