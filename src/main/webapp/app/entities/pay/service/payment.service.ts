import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comprobante, IComprobante } from 'app/entities/debt/voucher/voucher.model';
import { IDocumento, IMedioPago, IMovimientoCajaBanco, MovimientoCajaBanco } from 'app/entities/master-crud';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly _compro: BehaviorSubject<IComprobante | null> = new BehaviorSubject<IComprobante | null>(null);
  private readonly _mCBanco: BehaviorSubject<IMovimientoCajaBanco[] | null> = new BehaviorSubject<IMovimientoCajaBanco[] | null>(null);
  private readonly _doc: BehaviorSubject<IDocumento | null> = new BehaviorSubject<IDocumento | null>(null);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  comprobante!: IComprobante;

  constructor(private http: HttpClient) {}

  /* 
    set comprobante (val: IComprobante):void{
      this._compro.next(val);
    }
  
    private addMovimientoCajabanco(val: IMovimientoCajaBanco):void{
      this.movimientoCajaBanco?.push(val)
    }
    
    get comprobante(): IComprobante | null {
      return this._compro.getValue();
    } 
    get movimientoCajaBanco(): IMovimientoCajaBanco[] | null {
      return this._mCBanco.getValue();
    }
  
    get documento(): IDocumento | null {
      return this._doc.getValue();
    } */

  crearComprobanteStep1(datos: any): void {
    const comprobante = { ...new Comprobante(), ...datos };
    // eslint-disable-next-line no-console
    console.log(comprobante);
  }

  crearMovimientoCajaBanco(datos: any, medioPago: IMedioPago, importe: number): void {
    (this.comprobante.fechaContableString = datos.fechaContableString), (this.comprobante.periodo = datos.periodo);

    const movimientoCajaBanco = new MovimientoCajaBanco();
    (movimientoCajaBanco.cajaCuentaBanco = datos.cajaCuentaBanco),
      (movimientoCajaBanco.receptor = datos.receptor),
      (movimientoCajaBanco.importe = importe),
      (movimientoCajaBanco.medioPago = medioPago);

    this.comprobante.movimientoCajaBanco.push(movimientoCajaBanco);

    // eslint-disable-next-line no-console
    console.log(this.comprobante);

    // TODO: ver como resolver que no se agregen los movimientoCajasBancos cuando voy y vengo por el stepper
  }
}
