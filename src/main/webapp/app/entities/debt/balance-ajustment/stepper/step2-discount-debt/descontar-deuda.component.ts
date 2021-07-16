import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { IComprobante } from 'app/entities/debt/voucher/voucher.model';

@Component({
  selector: 'jhi-descontar-deuda',
  templateUrl: './descontar-deuda.component.html',
  styleUrls: ['./descontar-deuda.component.scss'],
})
export class DescontarDeudaComponent {
  creditoAcum = 0;
  selection = new SelectionModel<IComprobante>(true, []);

  _comprobanteIn!: IComprobante;
  get comprobanteIn(): IComprobante {
    return this._comprobanteIn;
  }

  // tslint:disable-next-line:no-input-rename
  @Input()
  set comprobanteIn(value: IComprobante) {
    this._comprobanteIn = value;
    this.creditoAcum = 0;
    this.selection.clear();
    // this.loadDeudaEnteList()
    // eslint-disable-next-line no-console
    console.log(this._comprobanteIn);
  }
}
