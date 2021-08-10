export interface IBanco {
  id: number;
  nombre: string;
}

export class Banco implements IBanco {
  constructor(public id: number, public nombre: string) {}
}
