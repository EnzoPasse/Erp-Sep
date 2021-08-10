import { IRubro } from '../heading-management/rubro.model';
import { ICondicionIVA } from '../VAT-condition-management/condicionIVA.model';

export interface IEnte {
  id?: number;
  CUIT?: number;
  nombreDocumento?: string;
  condicionIVA?: ICondicionIVA;
  rubro?: IRubro;
  personaJuridica?: IPersonaJuridica;
  persona?: IPersona;
}

export class Ente implements IEnte {
  constructor(
    public id?: number,
    public CUIT?: number,
    public nombreDocumento?: string,
    public condicionIVA?: ICondicionIVA,
    public rubro?: IRubro,
    public personaJuridica?: IPersonaJuridica,
    public persona?: IPersona
  ) {}
}

export interface IPersona {
  id?: number;
  nombre1?: string;
  nombre2?: string;
  apellido?: string;
  cuil?: string;
  nroDocumento?: number;
  fechaNacimiento?: string;
  tipoDocumento?: ITipoDocumento;
  estadoCivil?: IEstadoCivil;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public nombre1?: string,
    public nombre2?: string,
    public apellido?: string,
    public cuil?: string,
    public nroDocumento?: number,
    public fechaNacimiento?: string,
    public tipoDocumento?: ITipoDocumento,
    public estadoCivil?: IEstadoCivil
  ) {}
}

export interface IPersonaJuridica {
  id?: number;
  cuit?: string;
  razonSocial?: string;
  nombreFantasia?: string;
  fechaIniActividad?: string;
  fechaFinActividad?: string;
  formaJuridica?: FormaJuridica;
  nroIngBruto?: string;
  nroMunicipal?: string;
}

export class PersonaJuridica implements IPersonaJuridica {
  constructor(
    public id?: number,
    public cuit?: string,
    public razonSocial?: string,
    public nombreFantasia?: string,
    public fechaIniActividad?: string,
    public fechaFinActividad?: string,
    public formaJuridica?: FormaJuridica,
    public nroIngBruto?: string,
    public nroMunicipal?: string
  ) {}
}

export interface ITipoDocumento {
  id?: number;
  nombre?: string;
}

export class TipoDocumento implements ITipoDocumento {
  constructor(public id?: number, public nombre?: string) {}
}

export interface IEstadoCivil {
  id?: number;
  nombre?: string;
}

export class EstadoCivil implements IEstadoCivil {
  constructor(public id?: number, public nombre?: string) {}
}

export interface IFormaJuridica {
  id?: number;
  nombre?: string;
  abreviatura?: string;
}

export class FormaJuridica implements IFormaJuridica {
  constructor(public id?: number, public nombre?: string, public abreviatura?: string) {}
}
