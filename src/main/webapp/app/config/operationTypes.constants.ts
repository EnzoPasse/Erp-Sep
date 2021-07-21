import { IComprobante } from 'app/entities/debt/voucher/voucher.model';

export enum OperationType {
  'CREAR_DEUDA' = 1,
  'CREAR_NOTA_CREDITO' = 2,
  'CREAR_NOTA_DEBITO' = 2,
  'CREAR_AJUSTE_SALDO' = 3,
  'CREAR_PAGO_DIRECTO' = 6,
  'CREAR_PAGO_CTA_CTE' = 7,
  'CREAR_PAGO_TRANSF_LOTE' = 15,
  'CREAR_DEPOSITO' = 16,
  'CREAR_TRANSFERENCIA' = 17,
  'CREAR_SALDO_CAJA' = 18,
  'CREAR_ANTICIPO' = 19,

  'GET_DEUDA' = 8,
  'GET_NOTA_DEBITO' = 9,
  'GET_NOTA_CREDITO' = 10,
  'GET_PAGO' = 13,
  'GET_ANTICIPO' = 14,

  'GET_ENTE_DEUDA' = 11,
  'GET_ENTE_NOTA_CREDITO' = 12,

  'EDITAR_DEUDA' = 4,
  'EDITAR_NOTA_CREDITO' = 5,
  'EDITAR_NOTA_DEBITO' = 5,
}

/* const compro: IComprobante =
{
  "aImputar": 0,
  "comprobanteRef": [{
    "aImputar": 1500,
    "comprobanteRef": [],
    "condicionIVA": {
      "activo": 0,
      "default": 0,
      "id": 0,
      "nombre": "SIN ASIGNAR",
      "porcentajeIVA": 0
    },
    "condicionPago": {
      "activo": 0,
      "confirmaPago": 0,
      "default": 0,
      "id": 2,
      "nombre": "CUENTA CORRIENTE",
    },
    "dtoRgoOtros": 0,
    "ente": {
      "condicionIVA": {
        "activo": 0,
        "default": 0,
        "id": 0,
        "nombre": "SIN ASIGNAR",
        "porcentajeIVA": 0,
      },
      "id": 629,
      "nombreDocumento": "DIEGO SEBASTIAN ZURITA",
      "persona": {
        "apellido": "ZURITA DIEGO SEBASTIAN",
        "cuil": null,
        "estadoCivil": {
          "activo": 0,
          "id": 0,
          "nombre": null,
        },
        "fechaNacimiento": "0001-01-01T00:00:00Z",
        "id": 1123,
        "nombre1": "",
        "nombre2": "",
        "nroDocumento": 0,
        "sexo": null,
        "tipoDocumento": {
          "activo": 0,
          "id": 0,
          "idTipoDocFE": 0,
          "nombre": null,
          "recordCount": 0,
          "rowNumber": 0,
        }
      }
      ,
      "personaJuridica": null,
      "rubro": {
        "activo": 0,
        "id": 5,
        "mensaje": null,
        "nombre": "INFORMATICA Y TELECOMUNICACIONES",
        "permisos": null,
        "recordCount": 0,
        "rowNumber": 0,
      }
    },
    "establecimiento": {
      "activo": 0,
      "id": 0,
      "idSede": 0,
      "nombre": "SIN ASIGNAR",
      "personaJuridica": null,
      "recordCount": 0,
      "rowNumber": 0,
      "usuario": null,
    },
    "estadoComprobante": {
      "id": 1,
      "nombre": "PENDIENTE",
      "tipoComprobante": null,
    },
    "fechaComprobanteString": "28/02/2021",
    "fechaContableString": "15/07/2021",
    "fechaVtoString": "28/03/2021",
    "grupoRef": "",
    "id": 9,
    "imputado": 0,
    "item": [],
    "movimientoCajaBanco": [],
    "nroCAI": "",
    "nroCierre": 0,
    "nroCompGanancia": "",
    "nroCompIngBruto": "",
    "nroComprobante": "00001-00000013",
    "nroLote": "",
    "observaciones": null,
    "percepcionGanancia": 0,
    "percepcionIVA": 0,
    "percepcionIngBruto": 0,
    "periodo": "03/2021",
    "retencionGanancia": 0,
    "retencionIVA": 0,
    "retencionIngBruto": 0,
    "saldo": 0,
    "tipoComprobante": {
      "id": 4,
      "nombre": "FACTURA-C",
      "letra": null,
      "idTipoCbteFe": 0,
      "ci": 0,
      "activo": 0,
      "rowNumber": 0,
      "mensaje": null,
      "recordCount": 0
    },
    "totalComprobante": 1500,
  }],
  "condicionIVA": {
    "activo": 0,
    "default": 0,
    "id": 0,
    "nombre": "SIN ASIGNAR"
    "porcentajeIVA": 0,
  },
  "condicionPago": {
    "activo": 0,
    "confirmaPago": 0,
    "default": 0,
    "id": 2,
    "nombre": "CUENTA CORRIENTE"
  },
  "dtoRgoOtros": 0,
  "ente": {
    "condicionIVA": {
      "activo": 0,
      "default": 0,
      "id": 0,
      "nombre": "SIN ASIGNAR",
      "porcentajeIVA": 0
    },
    "id": 629,
    "nombreDocumento": "DIEGO SEBASTIAN ZURITA",
    "persona": {
      "apellido": "ZURITA DIEGO SEBASTIAN",
      "cuil": null,
      "estadoCivil": {
        "activo": 0,
        "id": 0,
        "nombre": null
      },
      "fechaNacimiento": "0001-01-01T00:00:00Z",
      "id": 1123,
      "nombre1": "",
      "nombre2": "",
      "nroDocumento": 0,
      "sexo": null,
      "tipoDocumento": {
        "activo": 0,
        "id": 0,
        "idTipoDocFE": 0,
        "nombre": null,
        "recordCount": 0,
        "rowNumber": 0
      }
    },
    "personaJuridica": null,
    "rubro": {
      "activo": 0,
      "id": 5,
      "mensaje": null,
      "nombre": "INFORMATICA Y TELECOMUNICACIONES",
      "permisos": null,
      "recordCount": 0,
      "rowNumber": 0
    }
  },
  "establecimiento": {
    "activo": 0,
    "id": 0,
    "idSede": 0,
    "nombre": "SIN ASIGNAR",
    "personaJuridica": null,
    "recordCount": 0,
    "rowNumber": 0,
    "usuario": null
  },
  "estadoComprobante": {
    "id": 1,
    "nombre": "PENDIENTE",
    "tipoComprobante": null
  },
  "fechaComprobanteString": "20/07/2021",
  "fechaContableString": "20/07/2021",
  "fechaVtoString": "20/07/2022",
  "grupoRef": "",
  "id": 19,
  "imputado": 0,
  "item": [],
  "movimientoCajaBanco": [],
  "nroCAI": "",
  "nroCierre": 0,
  "nroCompGanancia": "",
  "nroCompIngBruto": "",
  "nroComprobante": "00001-00000002",
  "nroLote": "",
  "observaciones": null,
  "percepcionGanancia": 0,
  "percepcionIVA": 0,
  "percepcionIngBruto": 0,
  "periodo": "07/2021",
  "retencionGanancia": 0,
  "retencionIVA": 0,
  "retencionIngBruto": 0,
  "saldo": 18500,
  "tipoComprobante": {
    "activo": 0,
    "ci": 0,
    "id": 27,
    "idTipoCbteFe": 0,
    "letra": null,
    "mensaje": null,
    "nombre": "NOTA DE RECUPERO",
    "recordCount": 0,
    "rowNumber": 0
  },
  "totalComprobante": 35000
} */
