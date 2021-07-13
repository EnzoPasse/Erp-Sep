export interface ICondicionPago {
  id?: number;
  nombre?: string;
  confirmaPago?: number;
}

export class CondicionPago implements ICondicionPago {
  constructor(public id?: number, public nombre?: string, public confirmaPago?: number) {}
}
