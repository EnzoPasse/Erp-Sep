/* export interface IUser {
  id?: number;
  login?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
} 

export class User implements IUser {
  constructor(
    public id?: number,
    public login?: string,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date
  ) {}
}
*/

import { Establecimiento } from 'app/entities/establishment-management/establecimiento.model';
import { GrupoTrabajo } from 'app/entities/group-work-management/grupoTrabajo.model';
import { Rol } from 'app/entities/role-management/rol.model';

export interface IUsuario {
  id?: number;
  nombre?: string;
  nombreCompleto?: string;
  clave?: string;
  correo?: string;
  cuil?: string;
  token?: string;
  imgenUrl?: string;
  rol?: Rol;
  establecimiento?: Establecimiento;
  grupoTrabajo?: GrupoTrabajo;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public nombre?: string,
    public nombreCompleto?: string,
    public clave?: string,
    public correo?: string,
    public cuil?: string,
    public token?: string,
    public imagenUrl?: string,
    public rol?: Rol,
    public establecimiento?: Establecimiento,
    public grupoTrabajo?: GrupoTrabajo
  ) {}
}
