import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VoucherAdaper } from 'app/core/voucher/voucher-adapter.service';
import { IComprobante } from 'app/core/voucher/voucher.model';
import { Documento, IDocumento, IMovimientoCajaBanco, MovimientoCajaBanco } from 'app/entities/master-crud';
import { BehaviorSubject } from 'rxjs';
import { DataFormStep1 } from '../stepper/step1-tipo-orden/step1-tipo-orden.component';
import { DataFormStep2 } from '../stepper/step2-medio-pago/step2-medio-pago.component';

@Injectable({
  providedIn: 'root',
})
export class PayVoucherStateService {
  _comprobante = new BehaviorSubject<IComprobante>(this.voucherAdapterService.adapter({})); // new Comprobante()
  _movimientoCajaBanco = new BehaviorSubject<IMovimientoCajaBanco[]>([]);
  _documento = new BehaviorSubject<IDocumento>(new Documento());
  _tipoOrden = new BehaviorSubject<DataFormStep1>({});

  comprobante$ = this._comprobante.asObservable();
  tipoOrden$ = this._tipoOrden.asObservable();
  movimientoCajaBanco$ = this._movimientoCajaBanco.asObservable();

  constructor(private http: HttpClient, private voucherAdapterService: VoucherAdaper) {}

  set comprobante(val: IComprobante) {
    this._comprobante.next(val);
  }
  get comprobante(): IComprobante {
    return this._comprobante.getValue()!;
  }
  set movimientoCajaBanco(val: IMovimientoCajaBanco[]) {
    this._movimientoCajaBanco.next(val);
  }
  get movimientoCajaBanco(): IMovimientoCajaBanco[] {
    return this._movimientoCajaBanco.getValue()!;
  }
  set documento(val: IDocumento) {
    this._documento.next(val);
  }
  get documento(): IDocumento {
    return this._documento.getValue()!;
  }
  set tipoOrden(val: DataFormStep1) {
    this._tipoOrden.next(val);
  }
  get tipoOrden(): DataFormStep1 {
    return this._tipoOrden.getValue();
  }

  crearComprobante(val: DataFormStep1): void {
    const { datos } = val.datos; // solo necesito los datos de la estructura que viene como parametro
    this.tipoOrden = { ...this.tipoOrden, ...val };
    this.comprobante = { ...this.comprobante, ...datos }; // piso la info del comprobante en una nueva copia, state-magement.

    // eslint-disable-next-line no-console
    // console.log(this.voucherAdapterService.adaptToSubmit(this.comprobante));
  }

  newComprobante(): void {
    this.comprobante = this.voucherAdapterService.adapter({}); // new Comprobante();
    if (this.movimientoCajaBanco.length) {
      this.comprobante.movimientoCajaBanco = this.movimientoCajaBanco;
    } else {
      this.newMovimientoCajaBanco();
    }
  }

  crearMovimientoCajaBanco(val: DataFormStep2): void {
    this.comprobante.fechaContableString = val.datos.fechaContableString;
    this.comprobante.periodo = val.datos.periodo;
    switch (val.medioPago?.id) {
      case 2:
        break;

      case 3:
        break;

      default: {
        this.movimientoCajaBanco = [...this.addMovimientoCajaBanco(val)];
        break;
      }
    }

    this.comprobante = { ...this.comprobante, movimientoCajaBanco: this.movimientoCajaBanco };

    // eslint-disable-next-line no-console
    console.log(this.comprobante);
  }

  addMovimientoCajaBanco(val: DataFormStep2): IMovimientoCajaBanco[] {
    const { datos } = val; // destructuring object

    const mCB = new MovimientoCajaBanco();
    mCB.cajaCuentaBanco = datos.cajaCuentaBanco;
    mCB.receptor = datos.receptor;
    mCB.importe = val.importe;
    mCB.medioPago = val.medioPago;
    return [mCB];
  }

  newMovimientoCajaBanco(): void {
    this.movimientoCajaBanco = [];
  }
}

/* {
  "periodo":"08/2021",
  "fechaContableString":"19/08/2021",
  "percepcionGanancia":0,
  "percepcionIVA":0,
  "percepcionIngBruto":0,
  "retencionGanancia":0,
  "retencionIVA":0,
  "retencionIngBruto":0,
  "saldo":0,
  "aImputar":0,
  "imputado":0,
  "totalComprobante":2000,
  "dtoRgoOtros":0,
  "establecimiento":null,
  "estadoComprobante":null,
  "comprobanteRef":[{"id":22,"periodo":"04/2021","fechaComprobanteString":"21/07/2021","fechaContableString":"21/07/2021","fechaVtoString":"21/07/2021","nroCAI":"","nroCierre":0,"nroCompGanancia":"","nroCompIngBruto":"","nroComprobante":"00000-00000001","nroLote":"","percepcionGanancia":0,"percepcionIVA":0,"percepcionIngBruto":0,"retencionGanancia":0,"retencionIVA":0,"retencionIngBruto":0,"saldo":2000,"aImputar":0,"imputado":6000,"totalComprobante":8000,"dtoRgoOtros":0,"grupoRef":"","observaciones":null,"establecimiento":{"id":0,"idSede":0,"nombre":"SIN ASIGNAR","personaJuridica":null,"activo":0,"rowNumber":0,"recordCount":0,"usuario":null},"estadoComprobante":{"id":2,"tipoComprobante":null,"nombre":"PAGADO PARCIAL"},"comprobanteRef":null,"condicionIVA":{"id":0,"nombre":"SIN ASIGNAR","porcentajeIVA":0,"default":0,"activo":0},"condicionPago":{"id":2,"nombre":"CUENTA CORRIENTE","confirmaPago":0,"default":0,"activo":0},"tipoComprobante":{"id":16,"nombre":"NOTA DEBITO INTERNA","letra":null,"idTipoCbteFe":0,"ci":0,"activo":0,"rowNumber":0,"recordCount":0,"mensaje":null},"ente":{"id":1524,"persona":null,"personaJuridica":{"id":111,"formaJuridica":{"id":0,"nombre":null,"abreviatura":null,"activo":false},"cuit":"30517059095","razonSocial":"MONROE AMERICANA S.A.","nombreFantasia":"MONROE AMERICANA S.A.","nroIngBruto":null,"nroMunicipal":null,"fechaIniActividad":"0001-01-01T00:00:00Z","fechaFinActividad":"0001-01-01T00:00:00Z","activo":0},"rubro":{"id":13,"nombre":"FARMACIAS","activo":0,"permisos":null,"rowNumber":0,"recordCount":0,"mensaje":null},"condicionIVA":{"id":0,"nombre":"SIN ASIGNAR","porcentajeIVA":0,"default":0,"activo":0},"nombreDocumento":"MONROE AMERICANA S.A."},"movimientoCajaBanco":null,"item":null}],
  "condicionIVA":null,
  "condicionPago":null,
  "tipoComprobante":null,
  "ente":{"id":1524,"persona":null,"personaJuridica":{"id":111,"formaJuridica":{"id":0,"nombre":null,"abreviatura":null,"activo":false},"cuit":"30517059095","razonSocial":"MONROE AMERICANA S.A.","nombreFantasia":"MONROE AMERICANA S.A.","nroIngBruto":null,"nroMunicipal":null,"fechaIniActividad":"0001-01-01T00:00:00Z","fechaFinActividad":"0001-01-01T00:00:00Z","activo":0},"rubro":{"id":13,"nombre":"FARMACIAS","activo":0,"permisos":null,"rowNumber":0,"recordCount":0,"mensaje":null},"condicionIVA":{"id":0,"nombre":"SIN ASIGNAR","porcentajeIVA":0,"default":0,"activo":0},"nombreDocumento":"MONROE AMERICANA S.A."},
  "movimientoCajaBanco":[{"cajaCuentaBanco":{"id":4,"tipoCajaCuentaBanco":{"id":3,"nombre":"CAJA"},"moneda":{"id":1,"codigoMoneda":null,"nombre":"PESO","nombrePlural":null,"idTipoMonedaFE":null,"activo":0},"banco":{"id":0,"nombre":"SIN ASIGNAR"},"establecimiento":{"id":0,"idSede":0,"nombre":"SIN ASIGNAR","personaJuridica":null,"activo":0,"rowNumber":0,"recordCount":0,"usuario":null},"cuentaContable":111010010,"fechaApertura":"0001-01-01T00:00:00Z","codigo":null,"nombre":"HACIENDA OPERATIVA","cbu":null,"alias":null,"bloqueo":0,"tipoCierre":0,"activo":1,"rowNumber":4,"recordCount":62},"importe":2000,"medioPago":{"id":1,"nombre":"EFECTIVO","activo":1},"receptor":"ASDFAd"}],
  "item":[],
  "montoSeleccionado":2000
} */
