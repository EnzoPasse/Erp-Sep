import { IBanco } from '../bank-management/banco.model';

export interface IDocumento {
  id: number;
  tipoDocumentoBancario: ITipoDocumentoBancario;
  estadoDocumento: IEstadoDocumento;
  nombre: string;
  fechaEmisionString: string;
  fechaPreVencString: string;
  nroDocumento: string;
  importe: number;
  banco: IBanco;
}

export class Documento implements IDocumento {
  constructor(
    public id: number,
    public tipoDocumentoBancario: ITipoDocumentoBancario,
    public estadoDocumento: IEstadoDocumento,
    public nombre: string,
    public fechaEmisionString: string,
    public fechaPreVencString: string,
    public nroDocumento: string,
    public importe: number,
    public banco: IBanco
  ) {}
}

export interface ITipoDocumentoBancario {
  id: number; // 2
  nombre: string; // cheque
  subTipo: SubTipo[]; // [{ id: 1 nombre: cheque directo }, {id: 2 nombre: cheque diferido}, etc ]
}

export class TipoDocumentoBancario implements ITipoDocumentoBancario {
  constructor(public id: number, public nombre: string, public subTipo: SubTipo[]) {}
}

export interface ISubTipo {
  id: number;
  nombre: string;
}

export class SubTipo implements ISubTipo {
  constructor(public id: number, public nombre: string) {}
}

export interface IEstadoDocumento {
  id: number;
  nombre: string;
}

export class EstadoDocumento implements IEstadoDocumento {
  constructor(public id: number, public nombre: string) {}
}
