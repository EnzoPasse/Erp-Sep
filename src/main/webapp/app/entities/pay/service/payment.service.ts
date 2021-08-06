import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comprobante, IComprobante } from 'app/entities/debt/voucher/voucher.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  comprobante!: IComprobante;

  constructor(private http: HttpClient) {}

  crearComprobanteStep1(datos: any): void {
    this.comprobante = { ...new Comprobante(), ...datos };
    // eslint-disable-next-line no-console
    console.log(this.comprobante);
  }
}
