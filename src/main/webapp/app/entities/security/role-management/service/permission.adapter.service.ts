import { Injectable } from '@angular/core';
import { Adater } from 'app/core/util/adapter';
import { IPermission, Permission } from '../role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionAdapter implements Adater<IPermission> {
  adapter(item: any): IPermission {
    return new Permission(item.id, item.nombre, item.level, item.idGrupo, item.isSelected, item.nombreExtendido, item.children);
  }
}
