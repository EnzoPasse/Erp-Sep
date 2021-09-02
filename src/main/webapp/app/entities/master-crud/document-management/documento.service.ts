import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateVoucherType } from 'app/config/voucherType.constant';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { PrintCheques } from 'app/core/wfc/wfc.service';
import { Observable } from 'rxjs';
import { ISubTipo } from './documento.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  constructor(private http: HttpClient, private aplicationConfig: ApplicationConfigService) {}

  getAllSubtipoDocumentosBancarios(voucherType: StateVoucherType, tipo: number): Observable<ISubTipo[]> {
    const url = this.aplicationConfig.getEndpointFor(`subtipo/get?idMFA=${voucherType}&id=${tipo}`);
    return this.http.get<ISubTipo[]>(url);
  }

  getLastCheque(subtipoId: number, cajaId: number): Observable<string> {
    const url = this.aplicationConfig.getEndpointFor(`documento/getUltimoNroCheque/?idSubtipo=${subtipoId}&idCajaCtaBanco=${cajaId}`);
    return this.http.get<string>(url);
  }

  getChequesParaImprimir(idOrdenPago: number, terminal: string): Observable<PrintCheques[]> {
    const url = this.aplicationConfig.getEndpointFor(`documento/getCheque/?idOrdenPago=${idOrdenPago}&terminal=${terminal}`);
    return this.http.get<PrintCheques[]>(url);
  }
}
