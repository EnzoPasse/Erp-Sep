/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'jhi-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent {
  windowScrolled = true;

  constructor(@Inject(DOCUMENT) private document: Document, private scroll: ViewportScroller, private el: ElementRef) {}
  @HostListener('window:scroll', ['$event']) onWindowScroll(): void {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if ((this.windowScrolled && window.pageYOffset) || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    // eslint-disable-next-line no-console
    console.log(this.document.body);

    /*  this.document.body.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
   }); */

    // eslint-disable-next-line no-console
    console.log(window.pageYOffset);

    // eslint-disable-next-line no-console
    console.log(window.pageXOffset);
    /* window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
   */

    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}

// eslint-disable-next-line no-console
// console.log('entra');
