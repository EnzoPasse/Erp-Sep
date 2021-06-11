import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  /*   {
      state: '',
      name: 'Mantenimiento',
      type: 'saperator',
      icon: '',
    }, */
  {
    state: 'master',
    name: 'Maestro',
    type: 'sub',
    icon: 'settings',
    permission: 'Modulo Master',
    children: [
      { state: '', name: 'Entes', type: 'link', permission: 'Formulario Entes' },
      { state: '', name: 'Conceptos', type: 'link', permission: 'Formulario Conceptos' },
      { state: '', name: 'Tipos Comprobantes', type: 'link', permission: 'Formulario Tipo de Comprobantes' },
      { state: '', name: 'Conceptos Bancarios', type: 'link', permission: 'Formulario Conceptos Bancarios' },
    ],
  },
  {
    state: 'seguridad',
    name: 'Seguridad',
    type: 'sub',
    icon: 'security',
    permission: 'Modulo Seguridad',
    children: [
      { state: 'usuarios', name: 'Usuarios', type: 'link', permission: 'Formulario Usuarios' },
      { state: 'roles', name: 'Roles', type: 'link', permission: 'Formulario Roles' },
    ],
  },
  {
    state: 'deuda',
    name: 'Deudas',
    type: 'sub',
    icon: 'assignment',
    permission: 'Modulo Deudas',
    // badge: [{ type: 'warning', value: 'new' }],
    children: [
      { state: 'comprobantesDeuda', name: 'Deuda', type: 'link', permission: 'Formulario Comprobantes por Deuda' },
      { state: 'lotesDeuda', name: 'Lote de Deuda', type: 'link', permission: 'Formulario Comprobantes por Importacion de Deuda' },
      { state: 'notaCredito', name: 'Nota Credito', type: 'link', permission: 'Formulario Comprobantes por Notas de Creditos' },
      { state: 'notaDebito', name: 'Nota Debito', type: 'link', permission: 'Formulario Comprobantes por Notas de Debitos' },
      { state: 'ajusteSaldo', name: 'Ajuste Saldo', type: 'link', permission: 'Formulario Ajustes de Saldo' },
    ],
  },
  {
    state: 'pago',
    name: 'Pagos',
    type: 'sub',
    icon: 'monetization_on',
    permission: 'Modulo Pagos',
    // badge: [{ type: 'red', value: '17' }],
    children: [{ state: 'oredenesPago', name: 'Ordenes de Pago', type: 'link', permission: 'Formulario Ordenes de Pago' }],
  },
  {
    state: 'administracion',
    name: 'Administracion',
    type: 'sub',
    icon: 'format_shapes',
    permission: 'Modulo Administracion',
    children: [
      { state: 'anticipos', name: 'Anticipos', type: 'link', permission: 'Formulario Anticipos' },
      { state: 'transferencias', name: 'Transferencias', type: 'link', permission: 'Formulario Transferencias' },
      { state: 'depositos', name: 'Depositos', type: 'link', permission: 'Formulario Depositos' },
      { state: 'cierresCaja', name: 'Cierres de Caja', type: 'link', permission: 'Formulario Cierres de Caja' },
      { state: 'ingresos-egresos', name: 'Ingresos / Egresos', type: 'link', permission: '' },
    ],
  },

  {
    state: 'admin',
    name: 'Documentacion',
    type: 'sub',
    icon: 'description',
    permission: '',
    children: [{ state: 'docs', name: 'API-SWAGGER', type: 'link', permission: '' }],
  },

  /*  MULTINIVEL  
  {
    state: 'pages',
    name: 'Pages',
    type: 'sub',
    icon: 'content_copy',
    children: [
      { state: 'timeline', name: 'Timeline', type: 'link' },
      { state: 'invoice', name: 'Invoice', type: 'link' },
      { state: 'pricing', name: 'Pricing', type: 'link' },
      { state: 'helper', name: 'Helper Classes', type: 'link' },
      {
        state: 'icons',
        name: 'Icons',
        type: 'subchild',
        subchildren: [
          {
            state: 'material',
            name: 'Material Icons',
            type: 'link',
          },
        ],
      },
    ],
  }, */
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
