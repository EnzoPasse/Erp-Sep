import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';

import { MaterialModule } from './material.module';
import { MenuItems } from './menu-items/menu-items';
import { AccordionDirective } from './accordion/accordion.directive';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { SpinnerComponent } from './spinner.component';
import { ErrorStateMatcher } from '@angular/material/core';
import { TouchedErrorStateMatcher } from 'app/core/util/toucheErrorState';
import { DeleteEntityDialogComponent } from './deletion/delete-entity-dialog/delete-entity-dialog.component';
import { PrintEntityDialogComponent } from './deletion/print-entity-dialog/print-entity-dialog.component';

@NgModule({
  imports: [SharedLibsModule, MaterialModule],
  declarations: [
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,

    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SpinnerComponent,
    DeleteEntityDialogComponent,
    PrintEntityDialogComponent,
  ],
  exports: [
    SharedLibsModule,
    MaterialModule,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,

    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    SpinnerComponent,
    DeleteEntityDialogComponent,
    PrintEntityDialogComponent,
  ],
  providers: [MenuItems, { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }],
})
export class SharedModule {}
