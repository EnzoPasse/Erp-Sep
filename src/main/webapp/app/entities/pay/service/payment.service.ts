import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comprobante, IComprobante, IItem } from 'app/entities/debt/voucher/voucher.model';
import { Documento, IDocumento, IMovimientoCajaBanco, MovimientoCajaBanco } from 'app/entities/master-crud';
import { BehaviorSubject } from 'rxjs';
import { DataFormStep1 } from '../stepper/step1-tipo-orden/step1-tipo-orden.component';
import { DataFormStep2 } from '../stepper/step2-medio-pago/step2-medio-pago.component';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  _comprobante = new BehaviorSubject<IComprobante>(new Comprobante());
  _movimientoCajaBanco = new BehaviorSubject<IMovimientoCajaBanco[]>([]);
  _documento = new BehaviorSubject<IDocumento>(new Documento());
  _tipoOrden = new BehaviorSubject<DataFormStep1>({});

  comprobante$ = this._comprobante.asObservable();
  tipoOrden$ = this._tipoOrden.asObservable();

  constructor(private http: HttpClient) {}

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

    /* necesario para poder mapear el item a la forma {id, importe} 
    const newItem =  this.comprobante.item as any [];
    this.comprobante.item = newItem.map(it => ({id: it.id.id, importe: it.importe}))
  */

    // eslint-disable-next-line no-console
    console.log(this.comprobante);
  }

  newComprobante(): void {
    this.comprobante = new Comprobante();
    this.newMovimientoCajaBanco();
  }

  crearMovimientoCajaBanco(val: DataFormStep2): void {
    const { datos } = val;
    // eslint-disable-next-line no-console
    console.log(datos);
    const mCB = new MovimientoCajaBanco();

    this.comprobante.fechaContableString = datos.fechaContableString;
    this.comprobante.periodo = datos.periodo;

    /* movimientoCajaBanco */
    mCB.cajaCuentaBanco = datos.cajaCuentaBanco;
    mCB.receptor = datos.receptor;
    mCB.importe = val.importe;
    mCB.medioPago = val.medioPago;

    this.movimientoCajaBanco.push(mCB);

    this.comprobante = { ...this.comprobante, movimientoCajaBanco: this.movimientoCajaBanco };

    // eslint-disable-next-line no-console
    console.log(this.comprobante);

    // TODO: ver como resolver que no se agregen los movimientoCajasBancos cuando voy y vengo por el stepper
  }

  newMovimientoCajaBanco(): void {
    this.movimientoCajaBanco = [];
  }

  /*   crearMCB(document: any, importe: number, asignado: IEnte): IDocumento {
      const doc = new Documento();
  
  
      return doc
    } */
}
