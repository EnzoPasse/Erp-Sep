export interface IMovimientoCajaBanco {
  id?: number;
  ci?: number;
  idTipoCbteFe?: number;
  nombre?: string;
}

export class MovimientoCajaBanco implements IMovimientoCajaBanco {
  constructor(public id?: number, public ci?: number, public idTipoCbteFe?: number, public nombre?: string) {}
}
