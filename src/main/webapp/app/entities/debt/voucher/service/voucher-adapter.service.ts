import { Injectable } from '@angular/core';
import { Adater } from 'app/core/util/adapter';
import { Comprobante, IComprobante } from '../voucher.model';

@Injectable({
  providedIn: 'root',
})
export class VoucherAdaper implements Adater<IComprobante> {
  adapter(item: any): IComprobante {
    return new Comprobante(
      item.id ? item.id : undefined,
      item.periodo,
      item.fechaComprobanteString,
      item.fechaContableString,
      item.fechaVtoString,
      item.nroCAI,
      item.nroCierre,
      item.nroCompGanancia,
      item.nroCompIngBruto,
      item.nroComprobante,
      item.nroLote,
      item.percepcionGanancia ? item.percepcionGanancia : 0,
      item.percepcionIVA ? item.percepcionIVA : 0,
      item.percepcionIngBruto ? item.percepcionIngBruto : 0,
      item.retencionGanancia ? item.retencionGanancia : 0,
      item.retencionIVA ? item.retencionIVA : 0,
      item.retencionIngBruto ? item.retencionIngBruto : 0,
      item.saldo ? item.saldo : 0,
      item.aImputar ? item.aImputar : 0,
      item.imputado ? item.imputado : 0,
      item.totalComprobante ? item.totalComprobante : 0,
      item.dtoRgoOtros ? item.dtoRgoOtros : 0,
      item.grupoRef,
      item.observaciones,
      item.establecimiento ? item.establecimiento : null,
      item.estadoComprobante ? item.estadoComprobante : null,
      item.comprobanteRef ? item.comprobanteRef : [],
      item.condicionIVA ? item.condicionIVA : null,
      item.condicionPago ? item.condicionPago : null,
      item.tipoComprobante ? item.tipoComprobante : null,
      item.ente ? item.ente : null,
      item.movimientoCajaBanco ? item.movimientoCajaBanco : [],
      item.item ? item.item : []
    );
  }
}
