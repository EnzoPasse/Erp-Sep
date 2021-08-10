export interface IMoneda {
  id: number;
  nombre: string;
}

export class Moneda implements Moneda {
  constructor(public id: number, public nombre: string) {}
}
