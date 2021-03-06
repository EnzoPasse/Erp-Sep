import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [],
  exports: [FormsModule, CommonModule, NgbModule, InfiniteScrollModule, FontAwesomeModule, ReactiveFormsModule, FlexLayoutModule],
})
export class SharedLibsModule {}
