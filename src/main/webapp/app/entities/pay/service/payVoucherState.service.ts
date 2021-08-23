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

  resetComprobante(): void {
    this.comprobante = this.voucherAdapterService.adapter({}); // new Comprobante();
    if (this.movimientoCajaBanco.length) {
      this.comprobante.movimientoCajaBanco = this.movimientoCajaBanco;
    } else {
      this.resetMovimientoCajaBanco();
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

  resetMovimientoCajaBanco(): void {
    this.movimientoCajaBanco = [];
  }
}
