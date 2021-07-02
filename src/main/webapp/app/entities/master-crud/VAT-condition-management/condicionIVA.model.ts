export interface ICondicionIVA {
  id?: number;
  nombre?: string;
  porcentajeIVA?: number;
}

export class CondicionIVA implements ICondicionIVA {
  constructor(public id?: number, public nombre?: string, public porcentajeIVA?: number) {}
}
