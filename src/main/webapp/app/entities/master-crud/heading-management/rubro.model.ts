export interface IRubro {
  id?: number;
  nombre?: string;
}

export class Rubro implements IRubro {
  constructor(public id?: number, public nombre?: string) {}
}
