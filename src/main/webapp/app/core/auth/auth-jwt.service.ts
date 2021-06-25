import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

// import { ApplicationConfigService } from '../config/application-config.service';
import { Login } from 'app/login/login.model';
import { SERVER_API_URL } from 'app/app.constants';
import { Account } from './account.model';
import { AccountAdaper } from './account-adapter';

const URL_LOGIN = `${SERVER_API_URL}/login`;

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    // private applicationConfigService: ApplicationConfigService,
    private accountAdapter: AccountAdaper
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.$localStorage.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.$sessionStorage.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<Account> {
    /*  return this.http
       .post<Account>(this.applicationConfigService.getEndpointFor('login/authenticate'), credentials)
       .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe))); */
    const url = `${URL_LOGIN}/authenticate`;

    return this.http.post<Account>(url, credentials).pipe(
      map(data => this.accountAdapter.adapter(data)),
      tap(response => this.authenticateSuccess(response, credentials.rememberMe))
    );
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: any, rememberMe: boolean): void {
    const jwt = response.token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
      this.$sessionStorage.clear('authenticationToken');
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
      this.$localStorage.clear('authenticationToken');
    }
  }
}
