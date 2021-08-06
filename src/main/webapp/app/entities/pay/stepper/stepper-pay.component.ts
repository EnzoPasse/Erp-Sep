import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-stepper-pay',
  templateUrl: './stepper-pay.component.html',
  styleUrls: ['./stepper-pay.component.scss'],
})
export class StepperPayComponent implements OnInit {
  titleForm = '';
  urlData: any;
  isSaving = false;
  totalPago!: number | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.titleForm = data.pageTitle;
      this.urlData = data;
    });
  }

  totalPagoSelected(event: number | null): void {
    this.totalPago = event;
  }
}
