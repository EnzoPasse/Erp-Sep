import { Directive, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AccordionLinkDirective } from './accordionlink.directive';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[jhiAccordion]',
})
export class AccordionDirective implements AfterContentChecked {
  protected navlinks: Array<AccordionLinkDirective> = [];

  constructor(private router: Router) {
    setTimeout(() => this.checkOpenLinks());
  }

  closeOtherLinks(selectedLink: AccordionLinkDirective): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== selectedLink) {
        link.selected = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this.navlinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this.navlinks.indexOf(link);
    if (index !== -1) {
      this.navlinks.splice(index, 1);
    }
  }

  checkOpenLinks(): void {
    this.navlinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this.router.url;
        const currentUrl = routeUrl.split('/');
        if (currentUrl.indexOf(link.group) > 0) {
          link.selected = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }

  ngAfterContentChecked(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.checkOpenLinks());
  }
}