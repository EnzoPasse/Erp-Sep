export interface IMedioPago {
  id?: number;
  nombre?: string;
}

export class MedioPago implements IMedioPago {
  constructor(public id?: number, public nombre?: string) {}
}
