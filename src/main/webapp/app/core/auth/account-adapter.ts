import { Injectable } from '@angular/core';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountAdaper implements Adater<Account> {
  adapter(item: any): Account {
    return new Account(
      item.id,
      item.activo,
      item.idPeriodoContable,
      item.nombre,
      item.nombreCompleto,
      item.rol.permisosNombre,
      item.imagenUrl || '',
      item.token
    );
  }
}

export interface Adater<T> {
  adapter(item: any): T;
}
