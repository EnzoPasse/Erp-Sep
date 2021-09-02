import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VoucherAdaper } from 'app/core/voucher/voucher-adapter.service';
import { IComprobante } from 'app/core/voucher/voucher.model';
import {
  Documento,
  IDocumento,
  IMovimientoCajaBanco,
  ITipoDocumentoBancario,
  MovimientoCajaBanco,
  TipoDocumentoBancario,
} from 'app/entities/master-crud';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';
import { DataFormStep1 } from '../stepper/step1-tipo-orden/step1-tipo-orden.component';

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
  }

  resetComprobante(): void {
    this.comprobante = this.voucherAdapterService.adapter({}); // new Comprobante();
    if (this.movimientoCajaBanco.length) {
      this.comprobante.movimientoCajaBanco = this.movimientoCajaBanco;
    } else {
      this.resetMovimientoCajaBanco();
    }
  }

  crearMovimientoCajaBanco(val: any): void {
    // eslint-disable-next-line no-console
    console.log(val);

    this.comprobante.fechaContableString = dayjs().format('DD/MM/YYYY'); // por si no viene la fechaContable, es igual a hoy
    switch (val.medioPagoSelected?.id) {
      case 2: {
        let movimiento: IMovimientoCajaBanco;
        for (let i = 0; val.documento.length > i; i++) {
          const importeNew = val.documento[i].importe;
          movimiento = this.addMovimientoCajaBanco(val.movimientoCajaBanco, importeNew);
          movimiento.documento = this.addDocumento(val.documento[i], val.movimientoCajaBanco.importe);
          this.movimientoCajaBanco.push(movimiento);
        }

        break;
      }

      case 3: {
        const movimiento = this.addMovimientoCajaBanco(val.movimientoCajaBanco, val.movimientoCajaBanco.importe);
        movimiento.documento = this.addDocumento(val.documento, val.movimientoCajaBanco.importe);
        this.movimientoCajaBanco = [...[movimiento]]; // no hacer un push, sino voy a crear un movimiento con cada entrada.

        break;
      }
      default: {
        this.comprobante = { ...this.comprobante, ...val.comprobante };
        this.movimientoCajaBanco = [...[this.addMovimientoCajaBanco(val.movimientoCajaBanco, val.movimientoCajaBanco.importe)]];

        break;
      }
    }

    this.comprobante = { ...this.comprobante, movimientoCajaBanco: this.movimientoCajaBanco };

    // eslint-disable-next-line no-console
    console.log(this.comprobante);
  }

  addMovimientoCajaBanco(datos: any, importe: number): IMovimientoCajaBanco {
    const mCB = new MovimientoCajaBanco();
    mCB.cajaCuentaBanco = datos.cajaCuentaBanco;
    mCB.medioPago = datos.medioPago;
    mCB.receptor = datos.receptor;
    mCB.importe = importe;

    return mCB;
  }

  resetMovimientoCajaBanco(): void {
    this.movimientoCajaBanco = [];
  }

  addDocumento(datos: any, importe?: number): IDocumento {
    const doc = new Documento();
    doc.tipoDocumentoBancario = this.addTipoDocumento(datos.subTipo);
    doc.nroDocumento = datos.nroDocumento;
    doc.importe = datos.importe ?? importe;
    doc.fechaEmisionString = datos.fechaEmisionString;
    doc.fechaPreVencString = datos.fechaPreVencString;
    return doc;
  }

  private addTipoDocumento(datos: any): ITipoDocumentoBancario {
    let tipo = new TipoDocumentoBancario();
    const ti: ITipoDocumentoBancario = {
      id: datos.idTipoDocumento,
      subTipo: [datos],
    };
    tipo = { ...tipo, ...ti };
    return tipo;
  }
}
