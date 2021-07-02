import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { VoucherListComponent } from './list/voucher-list.component';
import { voucherManagementRoute } from './route/voucher.route';
import { VoucherUpdateComponent } from './update/voucher-update.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(voucherManagementRoute)],
  declarations: [VoucherListComponent, VoucherUpdateComponent],
  // entryComponents: [UserManagementDeleteDialogComponent],
})
export class VoucherManagementModule {}
