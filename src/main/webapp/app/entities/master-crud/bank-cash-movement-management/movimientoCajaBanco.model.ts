import { IUsuario } from 'app/entities/security';
import { IBanco } from '../bank-management/banco.model';
import { IMoneda } from '../currency-management/moneda.model';
import { IDocumento } from '../document-management/documento.model';
import { IMedioPago } from '../payment-method-management/medio-pago.model';

export interface IMovimientoCajaBanco {
  id?: number;
  idComprobante?: number;
  cajaCuentaBanco?: ICajaCuentaBanco;
  documento?: IDocumento;
  factor?: boolean;
  fechaString?: string;
  concepto?: string;
  importe?: number;
  medioPago?: IMedioPago;
  usuario?: IUsuario;
  receptor?: string;
}

export class MovimientoCajaBanco implements IMovimientoCajaBanco {
  constructor(
    public id?: number,
    public idComprobante?: number,
    public cajaCuentaBanco?: ICajaCuentaBanco,
    public documento?: IDocumento,
    public factor?: boolean,
    public fechaString?: string,
    public concepto?: string,
    public importe?: number,
    public medioPago?: IMedioPago,
    public usuario?: IUsuario,
    public receptor?: string
  ) {}
}

export interface ICajaCuentaBanco {
  id?: number;
  tipoCajaCuentaBanco?: ITipoCajaCuentaBanco;
  banco?: IBanco;
  moneda?: IMoneda;
  nombre?: string;
  cuentaContable?: number;
  fechaAperturaString?: string;
  observaciones?: string;
}

export class CajaCuentaBanco implements ICajaCuentaBanco {
  constructor(
    public id?: number,
    public tipoCajaCuentaBanco?: ITipoCajaCuentaBanco,
    public banco?: IBanco,
    public moneda?: IMoneda,
    public nombre?: string,
    public cuentaContable?: number,
    public fechaAperturaString?: string,
    public observaciones?: string
  ) {}
}

export interface ITipoCajaCuentaBanco {
  id: number;
  nombre: string;
}

export class TipoCajaCuentaBanco implements ITipoCajaCuentaBanco {
  constructor(public id: number, public nombre: string) {}
}
