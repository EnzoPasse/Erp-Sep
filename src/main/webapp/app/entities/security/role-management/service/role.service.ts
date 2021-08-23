import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IQueryParamsModel } from 'app/core/request/queryParams.model';
import { IQueryResultsModel } from 'app/core/request/queryResult.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRol } from '../..';
import { IPermission } from '../role.model';
import { PermissionAdapter } from './permission.adapter.service';
import { RolAdaper } from './role.adapter.service';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  resourceUrl = this.applicationConfigService.getEndpointFor('rol');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private rolAdapter: RolAdaper,
    private permissionAdapter: PermissionAdapter
  ) {}

  create(rol: IRol): Observable<IRol> {
    const url = `${this.resourceUrl}/create`;
    return this.http.post<IRol>(url, rol);
  }

  update(rol: IRol): Observable<IRol> {
    const url = `${this.resourceUrl}/edit`;
    return this.http.put<IRol>(url, rol);
  }

  find(id: number): Observable<IRol> {
    const url = `${this.resourceUrl}/get/${id}`;
    return this.http.get<IRol>(url).pipe(map(user => this.rolAdapter.adapter(user)));
  }

  /* query(req?: Pagination): Observable<HttpResponse<IUsuario[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
 */

  query(queryParams: IQueryParamsModel): Observable<IQueryResultsModel<IRol>> {
    /*   const numeroPagina = queryParams.pageNumber + 1;
    const parametros = {
        QueryParamsModel: { ...queryParams, pageNumber: numeroPagina }
    } */
    /*
    Adaptamos las respuesta del queryResult.items a que sean Usuaios y no any
    */
    const url = `${this.resourceUrl}/get`;
    return this.http.post<IQueryResultsModel<IRol>>(url, queryParams).pipe(
      map((response: IQueryResultsModel<IRol>) => {
        const roles: IRol[] = response.items.map(item => this.rolAdapter.adapter(item));
        return { ...response, items: roles } as IQueryResultsModel<IRol>;
      })
    );
  }

  delete(id: number): Observable<{}> {
    const url = `${this.resourceUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  getAll(): Observable<IRol[]> {
    const url = `${this.resourceUrl}/get`;
    return this.http.get<IRol[]>(url).pipe(map(roles => roles.map(item => this.rolAdapter.adapter(item))));
  }

  getAllPermissions(): Observable<IPermission[]> {
    const url = `${this.resourceUrl}/getpermisos`;
    return this.http.get<IPermission[]>(url).pipe(map(permission => permission.map(item => this.permissionAdapter.adapter(item))));
  }
}
