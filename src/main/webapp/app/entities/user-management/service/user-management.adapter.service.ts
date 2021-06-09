import { Injectable } from '@angular/core';
import { Adater } from 'app/core/util/adapter';
import { IUsuario, Usuario } from '../user-management.model';

@Injectable({
  providedIn: 'root',
})
export class UserAdaper implements Adater<IUsuario> {
  adapter(item: any): IUsuario {
    return new Usuario(
      item.id,
      item.nombre,
      item.nombreCompleto,
      item.clave,
      item.correo,
      item.cuil,
      item.token,
      item.imagenUrl || '',
      item.rol ? item.rol : null,
      item.establecimiento ? item.establecimiento : null,
      item.grupoTrabajo ? item.grupoTrabajo : null
    );
  }
}
