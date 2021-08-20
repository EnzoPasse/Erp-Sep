import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ILoteDto } from 'app/entities/debt/lot/lot-debt.model';
import { LotDebtService } from 'app/entities/debt/lot/service/lot-debt-service.service';
import { IComprobante } from 'app/core/voucher/voucher.model';
import { Subscription } from 'rxjs';
import { DataFormStep1 } from '../step1-tipo-orden.component';
import { ComprobanteService } from 'app/core/voucher/voucher.service';

@Component({
  selector: 'jhi-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss'],
})
export class LoteComponent implements OnInit, OnDestroy {
  dataSource!: any;
  displayedColumns = ['Select', 'Ente', 'F.Vencimiento', 'Periodo', 'Total', 'Saldo', 'Estado'];
  subscriptions: Subscription[] = [];
  selection = new SelectionModel<IComprobante>(true, []);
  detalleResult: IComprobante[] = [];
  allLotes: ILoteDto[] = [];
  totalComprobante!: number;
  loading = false;

  @Output() formInfo: EventEmitter<DataFormStep1 | null> = new EventEmitter<DataFormStep1 | null>();

  constructor(private loteService: LotDebtService, private comprobanteService: ComprobanteService) {}

  ngOnInit(): void {
    this.loadLoteList();

    this.subscriptions.push(
      this.selection.changed.subscribe(() => {
        this.totalComprobante = 0;
        if (this.selection.selected.length > 0) {
          let sumaParcial = 0;
          this.selection.selected.forEach(it => {
            sumaParcial += it.saldo!;
            this.totalComprobante = sumaParcial;
          });

          const dataForm: DataFormStep1 = {
            datos: { comprobanteRef: this.selection.selected, totalComprobante: sumaParcial }, // este objeto inventado es necesario
            totalComprobante: sumaParcial,
          };
          this.formInfo.emit(dataForm);
        } else {
          this.formInfo.emit(null);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(un => un.unsubscribe());
  }

  loadLoteList(): void {
    this.loteService.getAllLotesPendientes().subscribe(res => {
      this.allLotes = res;
    });
  }

  loteChange(loteSelected: ILoteDto): void {
    this.loading = true;
    this.dataSource = null;
    this.loteService.getDetalleLote(loteSelected.nroLote!).subscribe(res => {
      this.detalleResult = res;
      this.dataSource = res;
      this.loading = false;
    });
    this.selection.clear();
  }

  // Check all rows are selected
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.detalleResult.length;
    return numSelected === numRows;
  }

  // toggle seleccion
  masterToggle(): void {
    if (this.selection.selected.length === this.detalleResult.length) {
      this.selection.clear();
    } else {
      this.detalleResult.forEach(row => this.selection.select(row));
    }
  }
}
