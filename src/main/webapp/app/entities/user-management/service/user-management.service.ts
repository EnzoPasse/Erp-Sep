import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

import { IUsuario } from '../user-management.model';
import { IQueryParamsModel } from 'app/core/request/queryParams.model';
import { IQueryResultsModel } from 'app/core/request/queryResult.model';
import { map } from 'rxjs/operators';
import { UserAdaper } from './user-management.adapter.service';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('/usuario');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService, private userAdapter: UserAdaper) {}

  create(user: IUsuario): Observable<IUsuario> {
    const url = `${this.resourceUrl}/create`;
    return this.http.post<IUsuario>(url, user);
  }

  update(user: IUsuario): Observable<IUsuario> {
    const url = `${this.resourceUrl}/edit`;
    return this.http.put<IUsuario>(url, user);
  }

  find(id: string): Observable<IUsuario> {
    const url = `${this.resourceUrl}/get/${id}`;
    return this.http.get<IUsuario>(url).pipe(map(user => this.userAdapter.adapter(user)));
  }

  /* query(req?: Pagination): Observable<HttpResponse<IUsuario[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
 */

  query(queryParams: IQueryParamsModel): Observable<IQueryResultsModel<IUsuario>> {
    /*   const numeroPagina = queryParams.pageNumber + 1;
    const parametros = {
        QueryParamsModel: { ...queryParams, pageNumber: numeroPagina }
    } */
    /*
    Adaptamos las respuesta del queryResult.items a que sean Usuaios y no any
    */
    const url = `${this.resourceUrl}/get`;
    return this.http.post<IQueryResultsModel<IUsuario>>(url, queryParams).pipe(
      map((response: IQueryResultsModel<IUsuario>) => {
        const users: IUsuario[] = response.items.map(item => this.userAdapter.adapter(item));
        return { ...response, items: users } as IQueryResultsModel<IUsuario>;
      })
    );
  }

  delete(id: string): Observable<{}> {
    const url = `${this.resourceUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  getUserLogin(): Observable<IUsuario> {
    return this.http.get<IUsuario>(this.applicationConfigService.getEndpointFor('login/get'));
  }
}
