import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService, LoaderState } from 'app/core/util/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;

  private subscription: Subscription | undefined;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
