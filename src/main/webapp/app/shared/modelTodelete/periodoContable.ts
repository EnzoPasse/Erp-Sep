export interface IPeriodoContable {
  id?: number;
  nombre?: number;
  fechaDesde?: string;
  fechaHasta?: string;
}

export class PeriodoContable implements PeriodoContable {
  constructor(public id?: number, public nombre?: number, public fechaDesde?: string, public fechaHsta?: string) {}
}
