import { Injectable } from '@angular/core';
import { Adater } from 'app/core/util/adapter';
import { Rol, IRol } from '../role.model';

@Injectable({
  providedIn: 'root',
})
export class RolAdaper implements Adater<IRol> {
  adapter(item: any): IRol {
    return new Rol(item.id, item.nombre, item.permisos, item.rolPermiso, item.permisosNombre, item.esAdmin);
  }
}
