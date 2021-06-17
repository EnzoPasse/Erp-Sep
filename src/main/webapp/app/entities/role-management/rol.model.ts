export interface IRol {
  id?: number;
  nombre?: string;
  permisos?: number[];
  permisosNombre?: string[];
  esAdmin?: boolean;
}

export class Rol implements IRol {
  constructor(
    public id?: number,
    public nombre?: string,
    public permisos?: number[],
    public permisosNombre?: string[],
    public esAdmin?: boolean
  ) {}
}
