import { Component, Input } from '@angular/core';
import { IComprobante } from 'app/core/voucher/voucher.model';

@Component({
  selector: 'jhi-confirmar-ajuste',
  templateUrl: './confirmar-ajuste.component.html',
  styleUrls: ['./confirmar-ajuste.component.scss'],
})
export class ConfirmarAjusteComponent {
  dataSource!: any;
  displayedColumns = ['Cbte', 'Nro', 'Total', 'Imputado', 'Imputar', 'Saldo'];

  _confirmVoucher!: IComprobante;

  @Input()
  set confirmVoucher(value: IComprobante) {
    this._confirmVoucher = { ...value };
    this.dataSource = this.confirmVoucher.comprobanteRef;
  }
  get confirmVoucher(): IComprobante {
    return this._confirmVoucher;
  }

  getImputado(): number {
    // calcula el total a imputar de los comprobantes de deudas.
    return (
      this.confirmVoucher.comprobanteRef?.reduce((sum, value) => (typeof value.aImputar === 'number' ? sum + value.aImputar : sum), 0) ?? 0
    );
  }

  getSaldoActual(): number {
    return this.confirmVoucher.totalComprobante! - this.confirmVoucher.imputado!;
  }
}
