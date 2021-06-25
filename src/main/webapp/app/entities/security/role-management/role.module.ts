import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { roleRoute } from './route/role.route';
import { RoleListComponent } from './list/role-list.component';
import { RoleUpdateComponent } from './update/role-update.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(roleRoute)],
  declarations: [RoleListComponent, RoleUpdateComponent],
})
export class RoleManagementModule {}
