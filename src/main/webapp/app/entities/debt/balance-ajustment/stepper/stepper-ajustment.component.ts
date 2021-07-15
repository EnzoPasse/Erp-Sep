import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'jhi-stepper-ajustment',
  templateUrl: './stepper-ajustment.component.html',
  styleUrls: ['./stepper-ajustment.component.scss'],
})
export class StepperAjustmentComponent implements OnInit {
  titleForm = '';
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.titleForm = data.pageTitle;
    });
  }
}
