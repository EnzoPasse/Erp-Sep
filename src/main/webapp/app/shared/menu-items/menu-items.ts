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
    permission: '',
    children: [
      { state: '', name: 'Entes', type: 'link', permission: '' },
      { state: '', name: 'Conceptos', type: 'link', permission: '' },
      { state: '', name: 'Tipos Comprobantes', type: 'link', permission: '' },
      { state: '', name: 'Conceptos Bancarios', type: 'link', permission: '' },
    ],
  },
  {
    state: 'seguridad',
    name: 'Seguridad',
    type: 'sub',
    icon: 'security',
    permission: 'ModuloSeguridad',
    children: [
      { state: 'usuarios', name: 'Usuarios', type: 'link', permission: 'FormularioUsuarios' },
      { state: 'roles', name: 'Roles', type: 'link', permission: 'FormularioRoles' },
    ],
  },
  {
    state: 'deuda',
    name: 'Deudas',
    type: 'sub',
    icon: 'assignment',
    permission: 'ModuloDeudas',
    // badge: [{ type: 'warning', value: 'new' }],
    children: [
      { state: 'comprobantesDeuda', name: 'Deuda', type: 'link', permission: 'FormularioComprobantesporDeuda' },
      { state: 'lotesDeuda', name: 'Lote de Deuda', type: 'link', permission: 'FormularioComprobantesporImportaciondeDeuda' },
      { state: 'notaCredito', name: 'Nota Credito', type: 'link', permission: 'FormularioComprobantesporNotasdeCreditos' },
      { state: 'notaDebito', name: 'Nota Debito', type: 'link', permission: 'FormularioComprobantesporNotasdeDebitos' },
      { state: 'ajusteSaldo', name: 'Ajuste Saldo', type: 'link', permission: 'FormularioAjustesdeSaldo' },
    ],
  },
  {
    state: 'pago',
    name: 'Pagos',
    type: 'sub',
    icon: 'monetization_on',
    permission: 'ModuloPagos',
    // badge: [{ type: 'red', value: '17' }],
    children: [{ state: 'oredenesPago', name: 'Ordenes de Pago', type: 'link', permission: 'FormularioOrdenesdePago' }],
  },
  {
    state: 'administracion',
    name: 'Administracion',
    type: 'sub',
    icon: 'format_shapes',
    permission: 'ModuloAdministracion',
    children: [
      { state: 'anticipos', name: 'Anticipos', type: 'link', permission: '' },
      { state: 'transferencias', name: 'Transferencias', type: 'link', permission: 'FormularioTransferencias' },
      { state: 'depositos', name: 'Depositos', type: 'link', permission: 'FormularioDepositos' },
      { state: 'cierresCaja', name: 'Cierres de Caja', type: 'link', permission: 'FormularioCierresdeCaja' },
      { state: 'ingresos-egresos', name: 'Ingresos / Egresos', type: 'link', permission: '' },
    ],
  },

  {
    state: 'authentication',
    name: 'Authentication',
    type: 'sub',
    icon: 'perm_contact_calendar',
    children: [
      { state: 'login', name: 'Login', type: 'link' },
      { state: 'register', name: 'Register', type: 'link' },
      { state: 'forgot', name: 'Forgot', type: 'link' },
      { state: 'lockscreen', name: 'Lockscreen', type: 'link' },
      { state: '404', name: 'Error', type: 'link' },
    ],
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
