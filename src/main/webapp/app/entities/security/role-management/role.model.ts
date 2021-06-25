export interface IRol {
  id?: number;
  nombre?: string;
  rolPermiso?: any[];
  permisos?: number[];
  permisosNombre?: string[];
  esAdmin?: number;
}

export class Rol implements IRol {
  constructor(
    public id?: number,
    public nombre?: string,
    public rolPermiso?: any[],
    public permisos?: number[],
    public permisosNombre?: string[],
    public esAdmin?: number
  ) {}
}

/** TREE ELEMENTS  */
export interface IPermission {
  id: number;
  nombre: string;
  level: number;
  idGrupo: number;
  isSelected: boolean;
  nombreExtendido: string;
  children: IPermission[] | null;
}

export class Permission implements IPermission {
  constructor(
    public id: number,
    public nombre: string,
    public level: number,
    public idGrupo: number,
    public isSelected: boolean,
    public nombreExtendido: string,
    public children: IPermission[] | null
  ) {}
}

/**MANAGER TREE */
export interface ITodoItemFlatNode {
  id: number;
  item: string;
  level: number;
  isSelected: boolean;
  expandable: boolean;
}

export class TodoItemFlatNode implements ITodoItemFlatNode {
  constructor(public id: number, public item: string, public level: number, public isSelected: boolean, public expandable: boolean) {}
}
