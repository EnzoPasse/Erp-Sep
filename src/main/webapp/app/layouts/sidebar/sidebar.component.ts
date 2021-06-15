import { ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from 'app/shared/menu-items/menu-items';
import { AccordionLinkDirective } from 'app/shared/accordion/accordionlink.directive';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  status = true;
  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  setClickedRow(i: number, j: number): void {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent(): void {
    this.status = true;
  }
  scrollToTop(): void {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

  isActive(): boolean {
    return true;
  }
}
