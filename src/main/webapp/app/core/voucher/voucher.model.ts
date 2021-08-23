import { ICondicionIVA, ICondicionPago, IEnte, IEstablecimiento, IMovimientoCajaBanco } from 'app/entities/master-crud';

export interface IEstadoComprobante {
  id?: number;
  nombre?: string;
  tipoComprobante?: ITipoComprobante;
}

export class EstadoComprobante implements IEstadoComprobante {
  constructor(public id?: number, public nombre?: string, public tipoComprobante?: ITipoComprobante) {}
}

export interface ITipoComprobante {
  id?: number;
  ci?: number;
  idTipoCbteFe?: number;
  nombre?: string;
}

export class TipoComprobante implements ITipoComprobante {
  constructor(public id?: number, public ci?: number, public idTipoCbteFe?: number, public nombre?: string) {}
}
export interface IItem {
  id?: number;
  idGrupo?: number;
  fecha?: string;
  nombre?: string;
  importe?: number;
}

export class Item implements IItem {
  constructor(public id?: number, public idGrupo?: number, public fecha?: string, public nombre?: string, public importe?: number) {}
}

export interface IComprobante {
  id?: number;
  periodo?: string;
  fechaComprobanteString?: string;
  fechaContableString?: string;
  fechaVtoString?: string;
  nroCAI?: string;
  nroCierre?: number;
  nroCompGanancia?: string;
  nroCompIngBruto?: string;
  nroComprobante?: string;
  nroLote?: string;
  percepcionGanancia?: number;
  percepcionIVA?: number;
  percepcionIngBruto?: number;
  retencionGanancia?: number;
  retencionIVA?: number;
  retencionIngBruto?: number;
  saldo?: number;
  aImputar?: number;
  imputado?: number;
  totalComprobante?: number;

  dtoRgoOtros?: number;
  grupoRef?: string;
  observaciones?: string | null;
  establecimiento?: IEstablecimiento;
  estadoComprobante?: IEstadoComprobante;
  comprobanteRef?: IComprobante[];
  condicionIVA?: ICondicionIVA;
  condicionPago?: ICondicionPago;
  tipoComprobante?: ITipoComprobante;
  ente?: IEnte;
  movimientoCajaBanco?: IMovimientoCajaBanco[];
  item?: IItem[];
}

export class Comprobante implements IComprobante {
  constructor(
    public id?: number,
    public periodo?: string,
    public fechaComprobanteString?: string,
    public fechaContableString?: string,
    public fechaVtoString?: string,
    public nroCAI?: string,
    public nroCierre?: number,
    public nroCompGanancia?: string,
    public nroCompIngBruto?: string,
    public nroComprobante?: string,
    public nroLote?: string,

    public percepcionGanancia?: number,
    public percepcionIVA?: number,
    public percepcionIngBruto?: number,
    public retencionGanancia?: number,
    public retencionIVA?: number,
    public retencionIngBruto?: number,
    public saldo?: number,
    public aImputar?: number,
    public imputado?: number,
    public totalComprobante?: number,
    public dtoRgoOtros?: number,

    public grupoRef?: string,
    public observaciones?: string,
    public establecimiento?: IEstablecimiento,
    public estadoComprobante?: IEstadoComprobante,
    public comprobanteRef?: IComprobante[],
    public condicionIVA?: ICondicionIVA,
    public condicionPago?: ICondicionPago,
    public tipoComprobante?: ITipoComprobante,
    public ente?: IEnte,
    public movimientoCajaBanco?: IMovimientoCajaBanco[],
    public item?: IItem[]
  ) {}
}
