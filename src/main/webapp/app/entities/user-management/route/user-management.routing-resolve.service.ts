import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserManagementService } from '../service/user-management.service';
import { IUsuario, Usuario } from '../user-management.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementResolve implements Resolve<IUsuario> {
  constructor(private service: UserManagementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUsuario> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id);
    }
    return of(new Usuario());
  }
}
