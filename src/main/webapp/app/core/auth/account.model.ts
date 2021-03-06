/* export class Account {
  constructor(
    public activated: boolean,
    public authorities: string[],
    public email: string,
    public firstName: string | null,
    public langKey: string,
    public lastName: string | null,
    public login: string,
    public imageUrl: string | null
  ) {}
} */

import { IPeriodoContable } from 'app/shared/modelTodelete/periodoContable';

export class Account {
  constructor(
    public id?: number,
    public nombre?: string,
    public nombreCompleto?: string,
    public clave?: string,
    public nuevaClave?: string,
    public establecimiento?: string,
    public rol?: string,
    public grupoTrabajo?: string,
    public correo?: string,
    public token?: string,
    public periodoContable?: IPeriodoContable,
    public cuil?: string,
    public permisosNombre?: string[],
    public imagenUrl?: string
  ) {}
}
