(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{BJRz:function(e,t,n){"use strict";n.r(t),n.d(t,"RoleManagementModule",function(){return ge});var i=n("tyNb"),c=n("hbEq"),o=n("M9IT"),r=n("Dfyc"),a=n("VRyK"),s=n("xgIS"),l=n("vkgz"),b=n("Kj3r"),d=n("/uUt"),u=n("F9KZ"),m=n("LRne"),h=n("nYR2");class p extends u.a{constructor(e){super(),this.rolService=e}loadRoles(e){this.loadingSubject.next(!0),this.isPreloadTextViewed$=Object(m.a)(!0),this.rolService.query(e).pipe(Object(h.a)(()=>{this.isPreloadTextViewed$=Object(m.a)(!1),this.loadingSubject.next(!1)})).subscribe({next:e=>{this.paginatorTotalSubject.next(e.totalCount),this.entitySubject.next(e.items)}})}}var P=n("fXoL"),g=n("HzuZ"),f=n("DeO8"),v=n("XiUz"),S=n("Wp6s"),x=n("3AuD"),C=n("Owrn"),V=n("kmnG"),U=n("qFsG"),y=n("+0xr"),w=n("Dh3D"),N=n("ofXK"),k=n("bTqV"),R=n("Qu3c"),T=n("NFeN"),A=n("Xa2L");const M=["sort1"],L=["searchInput"],j=function(){return["nuevoRol"]};function E(e,t){1&e&&(P.Vb(0,"button",29),P.Pc(1,"\n              Nuevo Rol\n            "),P.Ub()),2&e&&P.sc("routerLink",P.wc(1,j))}function D(e,t){1&e&&(P.Vb(0,"mat-header-cell"),P.Pc(1,"ID"),P.Ub())}function F(e,t){if(1&e&&(P.Vb(0,"mat-cell"),P.Pc(1,"\n                "),P.Vb(2,"span",30),P.Pc(3,"ID:"),P.Ub(),P.Pc(4),P.Ub()),2&e){const e=t.$implicit;P.Cb(4),P.Rc("\n                ",e.id,"")}}function I(e,t){1&e&&(P.Vb(0,"mat-header-cell",31),P.Pc(1,"Nombre Rol"),P.Ub())}function O(e,t){if(1&e&&(P.Vb(0,"mat-cell",32),P.Pc(1,"\n                "),P.Vb(2,"span",30),P.Pc(3,"Nombre:"),P.Ub(),P.Pc(4),P.Ub()),2&e){const e=t.$implicit;P.Cb(4),P.Rc("\n                ",e.nombre,"\n              ")}}function $(e,t){1&e&&(P.Vb(0,"mat-header-cell"),P.Pc(1,"Admin"),P.Ub())}function H(e,t){if(1&e&&(P.Vb(0,"mat-cell"),P.Pc(1,"\n                "),P.Vb(2,"span",30),P.Pc(3,"Admin:"),P.Ub(),P.Pc(4),P.Ub()),2&e){const e=t.$implicit;P.Cb(4),P.Rc("\n                ",e.esAdmin?"Admin":"-","")}}function Q(e,t){1&e&&(P.Vb(0,"mat-header-cell"),P.Pc(1,"Acciones"),P.Ub())}const z=function(e){return[e,"editarRol"]};function B(e,t){if(1&e&&(P.Vb(0,"button",38),P.Pc(1,"\n                      "),P.Vb(2,"mat-icon",37),P.Pc(3),P.Ub(),P.Pc(4,"\n                    "),P.Ub()),2&e){const e=P.kc().$implicit;P.sc("routerLink",P.xc(2,z,e.id)),P.Cb(3),P.Qc(1==e.id?"visibility":"create")}}function q(e,t){if(1&e){const e=P.Wb();P.Vb(0,"mat-cell",33),P.Pc(1,"\n                "),P.Pc(2,"\n\n                "),P.Vb(3,"div",34),P.Pc(4,"\n                  "),P.Vb(5,"div"),P.Pc(6,"\n                    "),P.Nc(7,B,5,4,"button",35),P.Pc(8,"\n                  "),P.Ub(),P.Pc(9,"\n                  \xa0\n                  "),P.Vb(10,"div"),P.Pc(11,"\n                    "),P.Vb(12,"button",36),P.gc("click",function(){P.Ec(e);const n=t.$implicit;return P.kc().deleteRol(n)}),P.Pc(13,"\n                      "),P.Vb(14,"mat-icon",37),P.Pc(15," delete"),P.Ub(),P.Pc(16,"\n                    "),P.Ub(),P.Pc(17,"\n                  "),P.Ub(),P.Pc(18,"\n                "),P.Ub(),P.Pc(19,"\n              "),P.Ub()}if(2&e){const e=t.$implicit;P.Cb(7),P.sc("jhiHasAnyAuthority","Accion Editar Rol"),P.Cb(5),P.sc("disabled",1==e.id)}}function G(e,t){1&e&&P.Qb(0,"mat-header-row")}function W(e,t){1&e&&P.Qb(0,"mat-row")}function J(e,t){1&e&&(P.Vb(0,"div"),P.Pc(1,"No se encontraron registros"),P.Ub())}function K(e,t){1&e&&(P.Vb(0,"div"),P.Pc(1,"Cargando..."),P.Ub())}function X(e,t){1&e&&P.Qb(0,"mat-spinner",39),2&e&&P.sc("diameter",20)}const Z=function(){return[3,5,10]};let Y=(()=>{class e{constructor(e,t){this.rolService=e,this.dialog=t,this.flag=!0,this.displayedColumns=["id","nombre","esAdmin","actions"],this.subscriptions=[]}ngOnInit(){var e;const t=null===(e=this.sort)||void 0===e?void 0:e.sortChange.subscribe(()=>this.paginator.pageIndex=0);t&&this.subscriptions.push(t);const n=Object(a.a)(this.sort.sortChange,this.paginator.page).pipe(Object(l.a)(()=>this.loadRolList())).subscribe();this.subscriptions.push(n);const i=Object(s.a)(this.searchInput.nativeElement,"keyup").pipe(Object(b.a)(150),Object(d.a)(),Object(l.a)(()=>{this.paginator.pageIndex=0,this.loadRolList()})).subscribe();this.subscriptions.push(i),this.dataSource=new p(this.rolService),this.loadRolList()}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}loadRolList(){const e=new r.a(this.filterConfiguration(),this.sort.direction,this.sort.active,this.paginator.pageIndex+1,this.paginator.pageSize);this.dataSource.loadRoles(e)}filterConfiguration(){const e={};return e.nombre=this.searchInput.nativeElement.value,e}deleteRol(e){const t=this.dialog.deleteElement("Borrar Rol","Esta seguro de borrar al Rol permanentemente?","Borrando Rol...");this.subscriptions.push(t.afterClosed().subscribe(t=>{t&&e.id&&this.subscriptions.push(this.rolService.delete(e.id).subscribe({next:()=>{this.loadRolList()}}))}))}}return e.\u0275fac=function(t){return new(t||e)(P.Pb(g.b),P.Pb(f.a))},e.\u0275cmp=P.Jb({type:e,selectors:[["jhi-role-list"]],viewQuery:function(e,t){if(1&e&&(P.Uc(o.a,3),P.Uc(M,3),P.Uc(L,3)),2&e){let e;P.Bc(e=P.hc())&&(t.paginator=e.first),P.Bc(e=P.hc())&&(t.sort=e.first),P.Bc(e=P.hc())&&(t.searchInput=e.first)}},decls:105,vars:18,consts:[["fxLayout","row wrap"],["fxFlex","100"],["fxLayoutAlign","space-between start"],["fxLayout","column","fxLayout.gt-xs","row"],["mat-raised-button","","color","primary","matTooltip","Crear un nuevo rol",3,"routerLink",4,"jhiHasAnyAuthority"],["fxLayout","row wrap",1,"align-items-center"],["fxFlex.gt-sm","33","flFlex.gt-md","66","fxFlex","100"],["matInput","","type","input","id","searchInput","autocomplete","off","placeholder","Filtrar"],["searchInput",""],["align","start"],[1,"responsive-table","m-t-15","mat-elevation-z2"],["matSort","","matSortActive","id","matSortDirection","asc","matSortDisableClear","",1,"table-items-list",3,"dataSource"],["table","","sort1","matSort"],["matColumnDef","id"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","nombre"],["mat-sort-header","",4,"matHeaderCellDef"],["class","font-medium",4,"matCellDef"],["matColumnDef","esAdmin"],["matColumnDef","actions"],["class","action-link",4,"matCellDef"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],[1,"font-medium","text-center","p-30"],[4,"ngIf"],["fxLayoutAlign","end center"],[3,"diameter",4,"ngIf"],[3,"pageSize","pageSizeOptions","length","showFirstLastButtons"],["mat-raised-button","","color","primary","matTooltip","Crear un nuevo rol",3,"routerLink"],[1,"header-label"],["mat-sort-header",""],[1,"font-medium"],[1,"action-link"],["fxLayoutAlign","start space-around"],["mat-icon-button","","color","primary","matTooltip","Editar Rol",3,"routerLink",4,"jhiHasAnyAuthority"],["mat-icon-button","","color","warn","matTooltip","Borrar rol","type","button",3,"disabled","click"],[1,"icon-08x"],["mat-icon-button","","color","primary","matTooltip","Editar Rol",3,"routerLink"],[3,"diameter"]],template:function(e,t){1&e&&(P.Vb(0,"div",0),P.Pc(1,"\n  "),P.Vb(2,"div",1),P.Pc(3,"\n    "),P.Vb(4,"mat-card"),P.Pc(5,"\n      "),P.Vb(6,"mat-card-header",2),P.Pc(7,"\n        "),P.Vb(8,"mat-card-title"),P.Pc(9," Lista de Roles "),P.Ub(),P.Pc(10,"\n        "),P.Vb(11,"div",3),P.Pc(12,"\n          "),P.Vb(13,"div"),P.Pc(14,"\n            "),P.Pc(15,"\n            "),P.Nc(16,E,2,2,"button",4),P.Pc(17,"\n          "),P.Ub(),P.Pc(18,"\n        "),P.Ub(),P.Pc(19,"\n      "),P.Ub(),P.Pc(20,"\n      "),P.Qb(21,"hr"),P.Pc(22,"\n      "),P.Qb(23,"jhi-alert-error"),P.Pc(24,"\n\n      "),P.Vb(25,"mat-card-content"),P.Pc(26,"\n        "),P.Vb(27,"div",5),P.Pc(28,"\n          "),P.Vb(29,"div",6),P.Pc(30,"\n            "),P.Vb(31,"mat-form-field"),P.Pc(32,"\n              "),P.Qb(33,"input",7,8),P.Pc(35,"\n\n              "),P.Vb(36,"mat-hint",9),P.Pc(37,"Buscar por Nombre "),P.Ub(),P.Pc(38,"\n            "),P.Ub(),P.Pc(39,"\n          "),P.Ub(),P.Pc(40,"\n        "),P.Ub(),P.Pc(41,"\n\n        "),P.Vb(42,"div",10),P.Pc(43,"\n          "),P.Vb(44,"mat-table",11,12),P.Pc(47,"\n            "),P.Tb(48,13),P.Pc(49,"\n              "),P.Nc(50,D,2,0,"mat-header-cell",14),P.Pc(51,"\n              "),P.Nc(52,F,5,1,"mat-cell",15),P.Pc(53,"\n            "),P.Sb(),P.Pc(54,"\n\n            "),P.Tb(55,16),P.Pc(56,"\n              "),P.Nc(57,I,2,0,"mat-header-cell",17),P.Pc(58,"\n              "),P.Nc(59,O,5,1,"mat-cell",18),P.Pc(60,"\n            "),P.Sb(),P.Pc(61,"\n\n            "),P.Tb(62,19),P.Pc(63,"\n              "),P.Nc(64,$,2,0,"mat-header-cell",14),P.Pc(65,"\n              "),P.Nc(66,H,5,1,"mat-cell",15),P.Pc(67,"\n            "),P.Sb(),P.Pc(68,"\n\n            "),P.Tb(69,20),P.Pc(70,"\n              "),P.Nc(71,Q,2,0,"mat-header-cell",14),P.Pc(72,"\n              "),P.Nc(73,q,20,2,"mat-cell",21),P.Pc(74,"\n            "),P.Sb(),P.Pc(75,"\n\n            "),P.Nc(76,G,1,0,"mat-header-row",22),P.Pc(77,"\n            "),P.Nc(78,W,1,0,"mat-row",23),P.Pc(79,"\n          "),P.Ub(),P.Pc(80,"\n        "),P.Ub(),P.Pc(81,"\n\n        "),P.Pc(82,"\n\n        "),P.Vb(83,"div",24),P.Pc(84,"\n          "),P.Nc(85,J,2,0,"div",25),P.Pc(86,"\n          "),P.Nc(87,K,2,0,"div",25),P.lc(88,"async"),P.Pc(89,"\n        "),P.Ub(),P.Pc(90,"\n\n        "),P.Vb(91,"div",26),P.Pc(92,"\n          "),P.Nc(93,X,1,1,"mat-spinner",27),P.lc(94,"async"),P.Pc(95,"\n          "),P.Vb(96,"mat-paginator",28),P.lc(97,"async"),P.Pc(98,"\n          "),P.Ub(),P.Pc(99,"\n        "),P.Ub(),P.Pc(100,"\n      "),P.Ub(),P.Pc(101,"\n    "),P.Ub(),P.Pc(102,"\n  "),P.Ub(),P.Pc(103,"\n"),P.Ub(),P.Pc(104,"\n")),2&e&&(P.Cb(16),P.sc("jhiHasAnyAuthority","Accion Crear Rol"),P.Cb(28),P.sc("dataSource",t.dataSource),P.Cb(32),P.sc("matHeaderRowDef",t.displayedColumns),P.Cb(2),P.sc("matRowDefColumns",t.displayedColumns),P.Cb(7),P.sc("ngIf",!t.dataSource.hasItems),P.Cb(2),P.sc("ngIf",P.mc(88,11,t.dataSource.isPreloadTextViewed$)),P.Cb(6),P.sc("ngIf",P.mc(94,13,t.dataSource.loading$)),P.Cb(3),P.sc("pageSize",10)("pageSizeOptions",P.wc(17,Z))("length",P.mc(97,15,t.dataSource.paginatorTotal$))("showFirstLastButtons",!0))},directives:[v.d,v.a,S.a,S.e,v.c,S.g,x.a,C.a,S.c,V.c,U.b,V.f,y.j,w.a,y.c,y.e,y.b,y.g,y.i,N.q,o.a,k.a,R.a,i.g,y.d,y.a,w.b,T.a,y.f,y.h,A.b],pipes:[N.b],styles:[""]}),e})();var _=n("0EQZ"),ee=n("FvrZ"),te=n("8yBR"),ne=n("A34J"),ie=n("SY1Q"),ce=n("8xAs"),oe=n("znSr"),re=n("STbY"),ae=n("3Pt+"),se=n("bSwM");function le(e,t){if(1&e){const e=P.Wb();P.Vb(0,"button",21),P.gc("click",function(){return P.Ec(e),P.kc().save(!0)}),P.Pc(1,"\n          Guardar\n        "),P.Ub()}if(2&e){const e=P.kc();P.sc("disabled",e.isSaving)}}function be(e,t){if(1&e&&(P.Vb(0,"button",22),P.Pc(1,"\n          "),P.Vb(2,"mat-icon"),P.Pc(3,"more_vert"),P.Ub(),P.Pc(4,"\n        "),P.Ub()),2&e){P.kc();const e=P.Cc(25);P.sc("matMenuTriggerFor",e)}}function de(e,t){if(1&e){const e=P.Wb();P.Vb(0,"mat-tree-node",23),P.Pc(1,"\n            "),P.Qb(2,"button",24),P.Pc(3,"\n            "),P.Vb(4,"mat-checkbox",25),P.gc("ngModelChange",function(e){return t.$implicit.isSelected=e})("change",function(){P.Ec(e);const n=t.$implicit;return P.kc().checklistSelection.toggle(n)}),P.Pc(5),P.Ub(),P.Pc(6,"\n          "),P.Ub()}if(2&e){const e=t.$implicit,n=P.kc();P.Cb(4),P.sc("ngModel",e.isSelected)("disabled",1==(null==n.rol?null:n.rol.id))("color","primary"),P.Cb(1),P.Rc("\n              ",e.item,"\n            ")}}function ue(e,t){if(1&e){const e=P.Wb();P.Vb(0,"mat-tree-node",26),P.Pc(1,"\n            "),P.Vb(2,"button",27),P.Pc(3,"\n              "),P.Vb(4,"mat-icon",28),P.Pc(5),P.Ub(),P.Pc(6,"\n            "),P.Ub(),P.Pc(7,"\n\n            "),P.Vb(8,"mat-checkbox",29),P.gc("ngModelChange",function(e){return t.$implicit.isSelected=e})("change",function(){P.Ec(e);const n=t.$implicit;return P.kc().selectionToggleExpand(n)}),P.Pc(9),P.Ub(),P.Pc(10,"\n          "),P.Ub()}if(2&e){const e=t.$implicit,n=P.kc();P.Cb(2),P.Db("aria-label","toggle "+e.filename),P.Cb(3),P.Rc("\n                ",n.treeControl.isExpanded(e)?"expand_more":"chevron_right","\n              "),P.Cb(3),P.sc("ngModel",e.isSelected)("disabled",1==(null==n.rol?null:n.rol.id))("color","primary"),P.Cb(1),P.Rc("\n              ",e.item,"\n            ")}}const me=function(){return["Accion Crear Rol","Accion Editar Rol"]};let he=(()=>{class e{constructor(e,t,n){this.rolService=e,this.route=t,this.eventManager=n,this.allPermissions=[],this.rolePermissions=[],this.titleForm="",this.isSaving=!1,this.subscriptions=[],this.flatNodeMap=new Map,this.nestedNodeMap=new Map,this.selectedParent=null,this.newItemName="",this.checklistSelection=new _.c(!0),this.getLevel=e=>e.level,this.isExpandable=e=>e.expandable,this.getChildren=e=>e.children,this.hasChild=(e,t)=>t.expandable,this.hasNoContent=(e,t)=>""===t.item,this.transformer=(e,t)=>{const n=this.nestedNodeMap.get(e);if((null==n?void 0:n.item)===e.nombreExtendido)return n;const i=new ie.c(e.id,e.nombreExtendido,t,e.isSelected,!!e.children);return this.flatNodeMap.set(i,e),this.nestedNodeMap.set(e,i),i},this.treeFlattener=new te.c(this.transformer,this.getLevel,this.isExpandable,this.getChildren),this.treeControl=new ee.j(this.getLevel,this.isExpandable),this.dataSource=new te.b(this.treeControl,this.treeFlattener)}expandTree(){this.treeControl.expandAll()}selectionToggleExpand(e){this.checklistSelection.toggle(e);const t=this.treeControl.getDescendants(e);this.checklistSelection.isSelected(e)?this.treeControl.expand(e):(this.checklistSelection.deselect(...t),this.treeControl.collapse(e))}ngOnInit(){this.subscriptions.push(this.route.data.subscribe(({rol:e})=>{this.createTitle(e),this.rol=e,this.loadPermissions()}))}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}previousState(){window.history.back()}limpiar(){this.rol=new ie.b,this.isSaving=!1,this.createTitle(this.rol),this.deselectAllNodes()}save(e){if(!this.rol.nombre)return void this.eventManager.broadcast(new ne.b("erpSepApp.error",{message:"Algo no va bien, por favor verifica los campos",type:"warning"}));this.isSaving=!0;const t=this.createRol();this.subscribeToSaveResponse(void 0!==t.id?this.rolService.update(t):this.rolService.create(t)),e&&this.previousState(),this.limpiar()}subscribeToSaveResponse(e){const t=e.subscribe({next:()=>this.onSaveSuccess(),error:()=>this.onSaveError()});this.subscriptions.push(t)}loadPermissions(){this.subscriptions.push(this.rolService.getAllPermissions().subscribe({next:e=>{e.length>0&&(this.dataSource.data=e,void 0!==this.rol.id&&(this.expandTree(),this.checkPermissions(e)))}}))}checkPermissions(e){e.forEach(e=>{this.rol.rolPermiso.some(t=>t===e.id)&&(this.nestedNodeMap.get(e).isSelected=!0,this.checklistSelection.toggle(this.nestedNodeMap.get(e))),e.children.forEach(e=>{this.rol.rolPermiso.some(t=>t===e.id)&&(this.nestedNodeMap.get(e).isSelected=!0,this.checklistSelection.toggle(this.nestedNodeMap.get(e))),this.removeNull(e.children).forEach(e=>{this.rol.rolPermiso.some(t=>t===e.id)&&(this.nestedNodeMap.get(e).isSelected=!0,this.checklistSelection.toggle(this.nestedNodeMap.get(e)))})})})}removeNull(e){return null!==e?e:[]}deselectAllNodes(){this.treeControl.dataNodes.forEach(e=>{this.checklistSelection.isSelected(e)&&(e.isSelected=!1),this.treeControl.collapseAll()})}preparePermissionIds(){const e=[];for(let t=0;this.checklistSelection.selected.length>t;t++)e.push(this.checklistSelection.selected[t].id);return e}createRol(){var e;return Object.assign(Object.assign({},new ie.b),{id:null!==(e=this.rol.id)&&void 0!==e?e:void 0,nombre:this.rol.nombre,rolPermiso:[],permisos:this.preparePermissionIds(),permisosNombre:[],esAdmin:+this.rol.esAdmin})}onSaveSuccess(){this.isSaving=!1}onSaveError(){this.isSaving=!1}createTitle(e){var t;this.titleForm=e.id?`Editar Rol ${null!==(t=e.nombre)&&void 0!==t?t:""}`:"Crear Rol"}}return e.\u0275fac=function(t){return new(t||e)(P.Pb(ce.a),P.Pb(i.a),P.Pb(ne.a))},e.\u0275cmp=P.Jb({type:e,selectors:[["jhi-role-update"]],decls:93,vars:13,consts:[["fxLayoutAlign","space-between start"],["fxLayout","column","fxLayout.gt-xs","row"],["fxHide","","fxShow.gt-sm","","mat-raised-button","","color","primary","matTooltip","Guardar los cambios",3,"disabled","click",4,"jhiHasAnyAuthority"],["fxHide","","fxShow.gt-sm","","mat-raised-button","","color","warn","matTooltip","Volver",3,"click"],["mat-icon-button","","color","primary",3,"matMenuTriggerFor",4,"jhiHasAnyAuthority"],["menu","matMenu"],["mat-menu-item","","color","primary",3,"click"],["fxHide.gt-sm","","mat-menu-item","","color","primary",3,"click"],["fxLayout","row wrap",1,"align-items-center","m-b-30"],["fxFlex","60","fxFlex.gt-md","50"],[1,"m-r-15"],[1,"mat-form-field-fluid"],["matInput","","type","input","id","rol","autocomplete","off","placeholder","Nombre del rol","name","rol","required","",3,"disabled","ngModel","ngModelChange"],["fxFlexOffset","10"],[3,"ngModel","labelPosition","disabled","ngModelChange"],["fxFlex","100","fxFlex.gt-md","60",1,"m-l-20"],["fxFlex",""],["fxFlex","100","fxFlex.gt-md","50",1,"m-l-40"],[3,"dataSource","treeControl"],["matTreeNodeToggle","","matTreeNodePadding","",4,"matTreeNodeDef"],["matTreeNodePadding","",4,"matTreeNodeDef","matTreeNodeDefWhen"],["fxHide","","fxShow.gt-sm","","mat-raised-button","","color","primary","matTooltip","Guardar los cambios",3,"disabled","click"],["mat-icon-button","","color","primary",3,"matMenuTriggerFor"],["matTreeNodeToggle","","matTreeNodePadding",""],["mat-icon-button","","disabled",""],[1,"checklist-leaf-node",3,"ngModel","disabled","color","ngModelChange","change"],["matTreeNodePadding",""],["mat-icon-button","","matTreeNodeToggle","","disabled",""],[1,"mat-icon-rtl-mirror"],[3,"ngModel","disabled","color","ngModelChange","change"]],template:function(e,t){1&e&&(P.Vb(0,"mat-card"),P.Pc(1,"\n  "),P.Vb(2,"mat-card-header",0),P.Pc(3,"\n    "),P.Vb(4,"mat-card-title"),P.Pc(5),P.Ub(),P.Pc(6,"\n    "),P.Vb(7,"div",1),P.Pc(8,"\n      "),P.Vb(9,"div"),P.Pc(10,"\n        "),P.Nc(11,le,2,1,"button",2),P.Pc(12,"\n      "),P.Ub(),P.Pc(13,"\n      \xa0\n      "),P.Vb(14,"div"),P.Pc(15,"\n        "),P.Vb(16,"button",3),P.gc("click",function(){return t.previousState()}),P.Pc(17,"Cancelar"),P.Ub(),P.Pc(18,"\n      "),P.Ub(),P.Pc(19,"\n      "),P.Vb(20,"div"),P.Pc(21,"\n        "),P.Nc(22,be,5,1,"button",4),P.Pc(23,"\n        "),P.Vb(24,"mat-menu",null,5),P.Pc(26,"\n          "),P.Vb(27,"button",6),P.gc("click",function(){return t.save(!0)}),P.Pc(28,"Guardar y Salir"),P.Ub(),P.Pc(29,"\n          "),P.Vb(30,"button",6),P.gc("click",function(){return t.save(!1)}),P.Pc(31,"Guardar y Continuar"),P.Ub(),P.Pc(32,"\n          "),P.Vb(33,"button",6),P.gc("click",function(){return t.limpiar()}),P.Pc(34,"Limpiar Formulario"),P.Ub(),P.Pc(35,"\n          "),P.Vb(36,"button",7),P.gc("click",function(){return t.previousState()}),P.Pc(37,"Salir"),P.Ub(),P.Pc(38,"\n        "),P.Ub(),P.Pc(39,"\n      "),P.Ub(),P.Pc(40,"\n    "),P.Ub(),P.Pc(41,"\n  "),P.Ub(),P.Pc(42,"\n  "),P.Qb(43,"hr"),P.Pc(44,"\n  "),P.Vb(45,"mat-card-content"),P.Pc(46,"\n    "),P.Qb(47,"jhi-alert-error"),P.Pc(48,"\n\n    "),P.Vb(49,"div",8),P.Pc(50,"\n      "),P.Vb(51,"div",9),P.Pc(52,"\n        "),P.Vb(53,"div",10),P.Pc(54,"\n          "),P.Vb(55,"mat-form-field",11),P.Pc(56,"\n            "),P.Vb(57,"input",12),P.gc("ngModelChange",function(e){return t.rol.nombre=e}),P.Ub(),P.Pc(58,"\n            "),P.Vb(59,"mat-error"),P.Pc(60," Rol es requerido "),P.Ub(),P.Pc(61,"\n          "),P.Ub(),P.Pc(62,"\n        "),P.Ub(),P.Pc(63,"\n      "),P.Ub(),P.Pc(64,"\n      "),P.Vb(65,"div",13),P.Pc(66,"\n        "),P.Vb(67,"mat-checkbox",14),P.gc("ngModelChange",function(e){return t.rol.esAdmin=e}),P.Pc(68," Admin "),P.Ub(),P.Pc(69,"\n      "),P.Ub(),P.Pc(70,"\n\n      "),P.Vb(71,"div",15),P.Pc(72,"\n        "),P.Vb(73,"h5",16),P.Pc(74,"\n          Permisos: \xa0\xa0\xa0\n          "),P.Vb(75,"small"),P.Pc(76,"Modulo / Formulario / Accion"),P.Ub(),P.Pc(77,"\n        "),P.Ub(),P.Pc(78,"\n      "),P.Ub(),P.Pc(79,"\n\n      "),P.Vb(80,"div",17),P.Pc(81,"\n        "),P.Vb(82,"mat-tree",18),P.Pc(83,"\n          "),P.Nc(84,de,7,4,"mat-tree-node",19),P.Pc(85,"\n\n          "),P.Nc(86,ue,11,6,"mat-tree-node",20),P.Pc(87,"\n        "),P.Ub(),P.Pc(88,"\n      "),P.Ub(),P.Pc(89,"\n    "),P.Ub(),P.Pc(90,"\n  "),P.Ub(),P.Pc(91,"\n"),P.Ub(),P.Pc(92,"\n")),2&e&&(P.Cb(5),P.Qc(t.titleForm),P.Cb(6),P.sc("jhiHasAnyAuthority",P.wc(11,me)),P.Cb(11),P.sc("jhiHasAnyAuthority",P.wc(12,me)),P.Cb(35),P.sc("disabled",1==(null==t.rol?null:t.rol.id))("ngModel",t.rol.nombre),P.Cb(10),P.sc("ngModel",t.rol.esAdmin)("labelPosition","before")("disabled",1==(null==t.rol?null:t.rol.id)),P.Cb(15),P.sc("dataSource",t.dataSource)("treeControl",t.treeControl),P.Cb(4),P.sc("matTreeNodeDefWhen",t.hasChild))},directives:[S.a,S.e,v.c,S.g,v.d,x.a,k.a,oe.b,R.a,re.a,re.b,S.c,C.a,v.a,V.c,U.b,ae.c,ae.x,ae.q,ae.t,V.b,v.b,se.a,te.a,te.f,re.d,T.a,te.e,te.h,te.g],styles:[""]}),e})(),pe=(()=>{class e{constructor(e){this.service=e}resolve(e){const t=+e.params.id;return t?this.service.find(t):Object(m.a)(new ie.b)}}return e.\u0275fac=function(t){return new(t||e)(P.cc(ce.a))},e.\u0275prov=P.Lb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();const Pe=[{path:"",component:Y,data:{pageTitle:"Roles"}},{path:"nuevoRol",component:he,data:{pageTitle:"Nuevo Rol"},resolve:{rol:pe}},{path:":id/editarRol",component:he,data:{pageTitle:"Editar Rol"},resolve:{rol:pe}}];let ge=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=P.Nb({type:e}),e.\u0275inj=P.Mb({imports:[[c.a,i.i.forChild(Pe)]]}),e})()}}]);