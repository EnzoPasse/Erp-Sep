import { IEstablecimiento, IGrupoTrabajo } from 'app/entities/master-crud';
import { IRol } from '..';

export interface IUsuario {
  id?: number;
  nombre?: string;
  nombreCompleto?: string;
  clave?: string;
  correo?: string;
  cuil?: string;
  token?: string;
  imgenUrl?: string;
  rol?: IRol;
  establecimiento?: IEstablecimiento;
  grupoTrabajo?: IGrupoTrabajo;
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
    public rol?: IRol,
    public establecimiento?: IEstablecimiento,
    public grupoTrabajo?: IGrupoTrabajo
  ) {}
}
