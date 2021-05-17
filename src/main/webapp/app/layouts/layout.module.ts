import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AppBreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageRibbonComponent } from './profiles/page-ribbon.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { EntityRoutingModule } from 'app/entities/entity-routing.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
};

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    EntityRoutingModule, // se llama al modulo de las rutas de las entidades aqui
    PerfectScrollbarModule,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    FooterComponent,
    SidebarComponent,
    AppBreadcrumbComponent,
  ],
  exports: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, SidebarComponent, AppBreadcrumbComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class LayoutModule {}
