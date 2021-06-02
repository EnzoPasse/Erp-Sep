import { Injectable } from '@angular/core';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountAdaper implements Adater<Account> {
  adapter(item: any): Account {
    return new Account(
      item.id,
      item.nombre,
      item.nombreCompleto,
      item.clave,
      item.establecimiento ? item.establecimiento.nombre : '',
      item.rol ? item.rol.nombre : '',
      item.grupoTrabajo ? item.grupoTrabajo.nombre : '',
      item.correo,
      item.token,
      item.idPeriodoContable,
      item.cuil,
      item.rol.permisosNombre,
      item.imagenUrl || ''
    );
  }
}

export interface Adater<T> {
  adapter(item: any): T;
}
