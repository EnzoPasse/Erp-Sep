import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

import { IQueryParamsModel } from 'app/core/request/queryParams.model';
import { IQueryResultsModel } from 'app/core/request/queryResult.model';
import { map } from 'rxjs/operators';
import { VoucherAdaper } from './voucher-adapter.service';
import { IComprobante, IEstadoComprobante, IItem, ITipoComprobante } from '../voucher.model';
import { OperationType } from 'app/config/operationTypes.constants';

@Injectable({
  providedIn: 'root',
})
export class ComprobanteService {
  public OperationType = OperationType;
  public resourceUrl = this.applicationConfigService.getEndpointFor('/comprobante');
  public deudaUrl = this.applicationConfigService.getEndpointFor('/deuda');

  constructor(
    private http: HttpClient,
    private applicationConfigService: ApplicationConfigService,
    private voucherAdapter: VoucherAdaper
  ) {}

  create(voucher: IComprobante, operation: number): Observable<IComprobante> {
    const url = `${this.deudaUrl}/create?operacion=${operation}`;
    return this.http.post<IComprobante>(url, voucher);
  }

  update(voucher: IComprobante, operation: number): Observable<IComprobante> {
    const url = `${this.deudaUrl}/edit?operacion=${operation}`;
    return this.http.put<IComprobante>(url, voucher);
  }

  find(id: number): Observable<IComprobante> {
    const url = `${this.resourceUrl}/get/${id}`;
    return this.http.get<IComprobante>(url).pipe(map(voucher => this.voucherAdapter.adapter(voucher)));
  }

  query(queryParams: IQueryParamsModel, type: number): Observable<IQueryResultsModel<IComprobante>> {
    /*   const numeroPagina = queryParams.pageNumber + 1;
    const parametros = {
        QueryParamsModel: { ...queryParams, pageNumber: numeroPagina }
    } */
    /*
    Adaptamos las respuesta del queryResult.items a que sean Usuaios y no any
    */
    const url = `${this.resourceUrl}/get?operacion=${type}`;
    return this.http.post<IQueryResultsModel<IComprobante>>(url, queryParams).pipe(
      map((response: IQueryResultsModel<IComprobante>) => {
        const vouchers: IComprobante[] = response.items.map(item => this.voucherAdapter.adapter(item));
        return { ...response, items: vouchers } as IQueryResultsModel<IComprobante>;
      })
    );
  }

  delete(id: number): Observable<{}> {
    const url = `${this.deudaUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  /* ****ESTADOS****** */
  getAllEstados(type: number): Observable<IEstadoComprobante[]> {
    const url = this.applicationConfigService.getEndpointFor(`/estadoComprobante/get/${type}`);
    return this.http.get<IEstadoComprobante[]>(url);
  }

  /* *****TIPOS DE COMPROBANTES********/
  getAllTiposComprobante(type: number): Observable<ITipoComprobante[]> {
    const url = this.applicationConfigService.getEndpointFor(`/tipoComprobante/getPorIdMFA/${type}`);
    return this.http.get<ITipoComprobante[]>(url);
  }

  /* **********ITEMS ****** */
  getItemsEnte(idEnte: number, operation: string, template: number): Observable<IItem[]> {
    const url = this.applicationConfigService.getEndpointFor(`/item/get/?id=${idEnte}&dh=${operation}&idPlantillaTipo=${template}`);
    return this.http.get<IItem[]>(url);
    // `/item/get/?id=${idEnte}&dh=${OperationTemplate.DEBE}&idPlantillaTipo=${TypeTemplate.PLANTILLA_DEUDA}`
  }

  /* **********CSS ****** */
  getItemCssClassByStatus(status: string = 'PENDIENTE'): string {
    switch (status) {
      case 'PENDIENTE':
        return 'danger';
      case 'PAGADO':
        return 'success';
      case 'PAGADO PARCIAL':
        return 'warning';
      case 'ANULADO':
        return 'canceled';
      case 'IMPUTADO PARCIAL':
        return 'warning';
      case 'IMPUTADO':
        return 'success';
    }
    return '';
  }
}
