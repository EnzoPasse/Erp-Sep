export interface IFilterPrint {
  id?: number;
  lote?: boolean;
  codigoReporte?: string;
}

export class FilterPrint implements IFilterPrint {
  constructor(public id?: number | undefined, public lote?: boolean | undefined, public codigoReporte?: string) {}
}
