export interface IEstablecimiento {
  id?: number;
  idSede?: number;
  nombre?: string;
}

export class Establecimiento implements IEstablecimiento {
  constructor(public id?: number, public idSede?: number, public nombre?: string) {}
}
