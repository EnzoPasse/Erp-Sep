import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

import { IUsuario } from '../user-management.model';
import { QueryParamsModel } from 'app/core/request/queryParams.model';
import { IQueryResultsModel } from 'app/core/request/queryResult.model';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('/usuario/get');

  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(user: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.resourceUrl, user);
  }

  update(user: IUsuario): Observable<IUsuario> {
    return this.http.put<IUsuario>(this.resourceUrl, user);
  }

  find(login: string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.resourceUrl}/${login}`);
  }

  /* query(req?: Pagination): Observable<HttpResponse<IUsuario[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
 */

  query(queryParams: QueryParamsModel): Observable<IQueryResultsModel> {
    /*   const numeroPagina = queryParams.pageNumber + 1;
    const parametros = {
        QueryParamsModel: { ...queryParams, pageNumber: numeroPagina }
    } */
    return this.http.post<IQueryResultsModel>(this.resourceUrl, queryParams);
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(this.applicationConfigService.getEndpointFor('api/authorities'));
  }

  getUserLogin(): Observable<IUsuario> {
    return this.http.get<IUsuario>(this.applicationConfigService.getEndpointFor('login/get'));
  }
}
