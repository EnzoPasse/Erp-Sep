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

export class Account {
  constructor(
    public id: number,
    public activo: number,
    public idPeriodoContable: number,
    public nombre: string,
    public nombreCompreto: string,
    public permisosNombre: string[],
    public imagenUrl: string,
    public token: string
  ) {}
}
