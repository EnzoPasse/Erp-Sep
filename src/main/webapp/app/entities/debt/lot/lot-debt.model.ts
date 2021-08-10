import { Subscription } from 'rxjs';

export interface FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}

export interface ILoteDto {
  fechaVtoString?: string;
  nroLote?: string;
  lote?: ILote;
  nombreExtendido?: string;
}

export class LoteDto implements ILoteDto {
  constructor(public fechaVtoString?: string, public nroLote?: string, public lote?: ILote, public nombreExtendido?: string) {}
}

export interface ILote {
  id?: number;
  nombre?: string;
}

export class Lote implements ILote {
  constructor(public id?: number, public nombre?: string) {}
}
