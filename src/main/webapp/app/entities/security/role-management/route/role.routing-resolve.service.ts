import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IRol, Rol } from '../role.model';
import { RolService } from '../service/role.service';

@Injectable({
  providedIn: 'root',
})
export class RolResolve implements Resolve<IRol> {
  constructor(private service: RolService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRol> {
    const id = +route.params['id'];
    if (id) {
      return this.service.find(id);
    }
    return of(new Rol());
  }
}
