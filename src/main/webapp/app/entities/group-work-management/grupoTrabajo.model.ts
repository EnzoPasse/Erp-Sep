export interface IGrupoTrabajo {
  id?: number;
  nombre?: string;
}

export class GrupoTrabajo implements IGrupoTrabajo {
  constructor(public id?: number, public nombre?: string) {}
}
