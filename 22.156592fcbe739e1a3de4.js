(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{eE65:function(t,e,r){"use strict";r.r(e),r.d(e,"UserManagementModule",function(){return It});var n=r("tyNb"),o=r("hbEq"),i=r("M9IT"),c=r("Dfyc"),a=r("0EQZ"),s=r("F9KZ"),b=r("LRne"),l=r("nYR2");class u extends s.a{constructor(t){super(),this.userService=t}loadUsuarios(t){this.loadingSubject.next(!0),this.isPreloadTextViewed$=Object(b.a)(!0),this.userService.query(t).pipe(Object(l.a)(()=>{this.isPreloadTextViewed$=Object(b.a)(!1),this.loadingSubject.next(!1)})).subscribe({next:t=>{this.paginatorTotalSubject.next(t.totalCount),this.entitySubject.next(t.items)}})}}var m=r("VRyK"),d=r("xgIS"),P=r("vkgz"),h=r("Kj3r"),p=r("/uUt"),f=r("fXoL"),v=r("Nq7y"),g=r("DeO8"),U=r("XiUz"),C=r("Wp6s"),V=r("3AuD"),y=r("kmnG"),j=r("qFsG"),S=r("Qu3c"),w=r("+0xr"),x=r("Dh3D"),E=r("ofXK"),F=r("bTqV"),T=r("NFeN"),k=r("Xa2L");const N=["sort1"],A=["searchInput"],I=function(){return["nuevoUsuario"]};function L(t,e){1&t&&(f.Vb(0,"button",31),f.Pc(1,"\n              Nuevo Usuario\n            "),f.Ub()),2&t&&f.sc("routerLink",f.wc(1,I))}function O(t,e){1&t&&(f.Vb(0,"mat-header-cell"),f.Pc(1,"ID"),f.Ub())}function D(t,e){if(1&t&&(f.Vb(0,"mat-cell"),f.Pc(1,"\n                "),f.Vb(2,"span",32),f.Pc(3,"ID:"),f.Ub(),f.Pc(4),f.Ub()),2&t){const t=e.$implicit;f.Cb(4),f.Rc("\n                ",t.id,"\n              ")}}function R(t,e){1&t&&(f.Vb(0,"mat-header-cell",33),f.Pc(1,"Nombre Usuario"),f.Ub())}function q(t,e){if(1&t&&(f.Vb(0,"mat-cell",34),f.Pc(1,"\n                "),f.Vb(2,"span",32),f.Pc(3,"Usuario:"),f.Ub(),f.Pc(4),f.Pc(5,"\n              "),f.Ub()),2&t){const t=e.$implicit;f.Cb(4),f.Rc("\n                ",t.nombre,"\n                ")}}function H(t,e){1&t&&(f.Vb(0,"mat-header-cell"),f.Pc(1,"CUIL"),f.Ub())}function Q(t,e){if(1&t&&(f.Vb(0,"mat-cell"),f.Pc(1,"\n                "),f.Vb(2,"span",32),f.Pc(3,"CUIL:"),f.Ub(),f.Pc(4),f.Ub()),2&t){const t=e.$implicit;f.Cb(4),f.Rc("\n                ",t.cuil?t.cuil:"-","\n              ")}}function $(t,e){1&t&&(f.Vb(0,"mat-header-cell"),f.Pc(1,"Nombre Completo"),f.Ub())}function B(t,e){if(1&t&&(f.Vb(0,"mat-cell"),f.Pc(1,"\n                "),f.Vb(2,"span",32),f.Pc(3,"Nombre:"),f.Ub(),f.Pc(4),f.Ub()),2&t){const t=e.$implicit;f.Cb(4),f.Rc("\n                ",t.nombreCompleto,"\n              ")}}function G(t,e){1&t&&(f.Vb(0,"mat-header-cell"),f.Pc(1,"Rol"),f.Ub())}function z(t,e){if(1&t&&(f.Vb(0,"mat-cell"),f.Pc(1,"\n                "),f.Vb(2,"span",32),f.Pc(3,"Rol:"),f.Ub(),f.Pc(4),f.Ub()),2&t){const t=e.$implicit;f.Cb(4),f.Rc("\n                ",t.rol.nombre,"\n              ")}}function M(t,e){1&t&&(f.Vb(0,"mat-header-cell"),f.Pc(1,"Acciones"),f.Ub())}const K=function(t){return[t,"editarUsuario"]};function J(t,e){if(1&t&&(f.Vb(0,"button",39),f.Pc(1,"\n                      "),f.Vb(2,"mat-icon",40),f.Pc(3,"create"),f.Ub(),f.Pc(4,"\n                    "),f.Ub()),2&t){const t=f.kc().$implicit;f.sc("routerLink",f.xc(1,K,t.id))}}function X(t,e){if(1&t){const t=f.Wb();f.Vb(0,"button",41),f.gc("click",function(){f.Ec(t);const e=f.kc().$implicit;return f.kc().deleteUser(e)}),f.Pc(1,"\n                      "),f.Vb(2,"mat-icon",40),f.Pc(3," delete"),f.Ub(),f.Pc(4,"\n                    "),f.Ub()}}function W(t,e){1&t&&(f.Vb(0,"mat-cell",35),f.Pc(1,"\n                "),f.Pc(2,"\n\n                "),f.Vb(3,"div",36),f.Pc(4,"\n                  "),f.Vb(5,"div"),f.Pc(6,"\n                    "),f.Nc(7,J,5,3,"button",37),f.Pc(8,"\n                  "),f.Ub(),f.Pc(9,"\n                  \xa0\n                  "),f.Vb(10,"div"),f.Pc(11,"\n                    "),f.Nc(12,X,5,0,"button",38),f.Pc(13,"\n                  "),f.Ub(),f.Pc(14,"\n                "),f.Ub(),f.Pc(15,"\n              "),f.Ub()),2&t&&(f.Cb(7),f.sc("jhiHasAnyAuthority","Accion Editar Usuario"),f.Cb(5),f.sc("jhiHasAnyAuthority","Accion Eliminar Usuario"))}function Z(t,e){1&t&&f.Qb(0,"mat-header-row")}function _(t,e){1&t&&f.Qb(0,"mat-row")}function Y(t,e){1&t&&(f.Vb(0,"div"),f.Pc(1,"No se encontraron registros"),f.Ub())}function tt(t,e){1&t&&(f.Vb(0,"div"),f.Pc(1,"Cargando..."),f.Ub())}function et(t,e){1&t&&f.Qb(0,"mat-spinner",42),2&t&&f.sc("diameter",20)}const rt=function(){return[3,5,10]};let nt=(()=>{class t{constructor(t,e){this.usuarioService=t,this.dialog=e,this.flag=!0,this.displayedColumns=["id","nombre","nombreCompleto","cuil","_roles","actions"],this.filtroEstado="",this.filtroFechaDesde="",this.filtroFechaHasta="",this.selection=new a.c(!0,[]),this.subscriptions=[]}ngOnInit(){var t;const e=null===(t=this.sort)||void 0===t?void 0:t.sortChange.subscribe(()=>this.paginator.pageIndex=0);e&&this.subscriptions.push(e);const r=Object(m.a)(this.sort.sortChange,this.paginator.page).pipe(Object(P.a)(()=>this.loadUserList())).subscribe();this.subscriptions.push(r);const n=Object(d.a)(this.searchInput.nativeElement,"keyup").pipe(Object(h.a)(150),Object(p.a)(),Object(P.a)(()=>{this.paginator.pageIndex=0,this.loadUserList()})).subscribe();this.subscriptions.push(n),this.dataSource=new u(this.usuarioService),this.loadUserList()}ngOnDestroy(){this.subscriptions.forEach(t=>t.unsubscribe())}loadUserList(){this.selection.clear();const t=new c.a(this.filterConfiguration(),this.sort.direction,this.sort.active,this.paginator.pageIndex+1,this.paginator.pageSize);this.dataSource.loadUsuarios(t),this.selection.clear()}filterConfiguration(){const t={},e=this.searchInput.nativeElement.value;return t.nombreCompleto=e,t.nombre=e,t.cuil=e,t}deleteUser(t){const e=this.dialog.deleteElement("Borrar Usuario","Esta seguro de borrar al Usuario permanentemente?","Borrando Usuario...");this.subscriptions.push(e.afterClosed().subscribe(e=>{e&&t.id&&this.subscriptions.push(this.usuarioService.delete(t.id).subscribe({next:()=>{this.loadUserList()}}))}))}}return t.\u0275fac=function(e){return new(e||t)(f.Pb(v.a),f.Pb(g.a))},t.\u0275cmp=f.Jb({type:t,selectors:[["jhi-user-mgmt"]],viewQuery:function(t,e){if(1&t&&(f.Uc(i.a,3),f.Uc(N,3),f.Uc(A,3)),2&t){let t;f.Bc(t=f.hc())&&(e.paginator=t.first),f.Bc(t=f.hc())&&(e.sort=t.first),f.Bc(t=f.hc())&&(e.searchInput=t.first)}},decls:122,vars:18,consts:[["fxLayout","row wrap"],["fxFlex","100"],["fxLayoutAlign","space-between start"],["fxLayout","column","fxLayout.gt-xs","row"],["mat-raised-button","","color","primary","matTooltip","Crear un nuevo usuario",3,"routerLink",4,"jhiHasAnyAuthority"],["fxLayout","row wrap",1,"align-items-center"],["fxFlex.gt-sm","33","flFlex.gt-md","66","fxFlex","100"],["matInput","","type","input","id","searchInput","autocomplete","off","placeholder","Filtrar","matTooltip","Busca por todos los campos"],["searchInput",""],["align","start"],[1,"responsive-table","m-t-15","mat-elevation-z2"],["matSort","","matSortActive","id","matSortDirection","asc","matSortDisableClear","",1,"table-items-list",3,"dataSource"],["table","","sort1","matSort"],["matColumnDef","id"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","nombre"],["mat-sort-header","",4,"matHeaderCellDef"],["class","font-medium",4,"matCellDef"],["matColumnDef","cuil"],["matColumnDef","nombreCompleto"],["matColumnDef","_roles"],["matColumnDef","actions"],["class","action-link",4,"matCellDef"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],[1,"font-medium","text-center","p-30"],[4,"ngIf"],["fxLayoutAlign","end center"],[3,"diameter",4,"ngIf"],[3,"pageSize","pageSizeOptions","length","showFirstLastButtons"],["mat-raised-button","","color","primary","matTooltip","Crear un nuevo usuario",3,"routerLink"],[1,"header-label"],["mat-sort-header",""],[1,"font-medium"],[1,"action-link"],["fxLayoutAlign","start space-around"],["mat-icon-button","","color","primary","matTooltip","Editar usario",3,"routerLink",4,"jhiHasAnyAuthority"],["mat-icon-button","","color","warn","matTooltip","Borrar usuario","type","button",3,"click",4,"jhiHasAnyAuthority"],["mat-icon-button","","color","primary","matTooltip","Editar usario",3,"routerLink"],[1,"icon-08x"],["mat-icon-button","","color","warn","matTooltip","Borrar usuario","type","button",3,"click"],[3,"diameter"]],template:function(t,e){1&t&&(f.Pc(0,"\n\n"),f.Vb(1,"div",0),f.Pc(2,"\n  "),f.Vb(3,"div",1),f.Pc(4,"\n    "),f.Vb(5,"mat-card"),f.Pc(6,"\n      "),f.Vb(7,"mat-card-header",2),f.Pc(8,"\n        "),f.Vb(9,"mat-card-title"),f.Pc(10," Lista de Usuarios "),f.Ub(),f.Pc(11,"\n        "),f.Vb(12,"div",3),f.Pc(13,"\n          "),f.Vb(14,"div"),f.Pc(15,"\n            "),f.Pc(16,"\n            "),f.Nc(17,L,2,2,"button",4),f.Pc(18,"\n          "),f.Ub(),f.Pc(19,"\n          "),f.Pc(20,"\n        "),f.Ub(),f.Pc(21,"\n      "),f.Ub(),f.Pc(22,"\n      "),f.Qb(23,"hr"),f.Pc(24,"\n      "),f.Vb(25,"mat-card-content"),f.Pc(26,"\n        "),f.Vb(27,"div",5),f.Pc(28,"\n          "),f.Vb(29,"div",6),f.Pc(30,"\n            "),f.Vb(31,"mat-form-field"),f.Pc(32,"\n              "),f.Qb(33,"input",7,8),f.Pc(35,"\n              "),f.Pc(36,"\n              "),f.Vb(37,"mat-hint",9),f.Pc(38,"Buscar por Usuario | Nombre Completo | CUIL"),f.Ub(),f.Pc(39,"\n            "),f.Ub(),f.Pc(40,"\n            "),f.Pc(41,"\n          "),f.Ub(),f.Pc(42,"\n        "),f.Ub(),f.Pc(43,"\n\n        "),f.Vb(44,"div",10),f.Pc(45,"\n          "),f.Vb(46,"mat-table",11,12),f.Pc(49,"\n            "),f.Tb(50,13),f.Pc(51,"\n              "),f.Nc(52,O,2,0,"mat-header-cell",14),f.Pc(53,"\n              "),f.Nc(54,D,5,1,"mat-cell",15),f.Pc(55,"\n            "),f.Sb(),f.Pc(56,"\n\n            "),f.Tb(57,16),f.Pc(58,"\n              "),f.Nc(59,R,2,0,"mat-header-cell",17),f.Pc(60,"\n              "),f.Nc(61,q,6,1,"mat-cell",18),f.Pc(62,"\n            "),f.Sb(),f.Pc(63,"\n\n            "),f.Tb(64,19),f.Pc(65,"\n              "),f.Nc(66,H,2,0,"mat-header-cell",14),f.Pc(67,"\n              "),f.Nc(68,Q,5,1,"mat-cell",15),f.Pc(69,"\n            "),f.Sb(),f.Pc(70,"\n\n            "),f.Tb(71,20),f.Pc(72,"\n              "),f.Nc(73,$,2,0,"mat-header-cell",14),f.Pc(74,"\n              "),f.Nc(75,B,5,1,"mat-cell",15),f.Pc(76,"\n            "),f.Sb(),f.Pc(77,"\n\n            "),f.Pc(78,"\n\n            "),f.Tb(79,21),f.Pc(80,"\n              "),f.Nc(81,G,2,0,"mat-header-cell",14),f.Pc(82,"\n              "),f.Nc(83,z,5,1,"mat-cell",15),f.Pc(84,"\n            "),f.Sb(),f.Pc(85,"\n\n            "),f.Tb(86,22),f.Pc(87,"\n              "),f.Nc(88,M,2,0,"mat-header-cell",14),f.Pc(89,"\n              "),f.Nc(90,W,16,2,"mat-cell",23),f.Pc(91,"\n            "),f.Sb(),f.Pc(92,"\n\n            "),f.Nc(93,Z,1,0,"mat-header-row",24),f.Pc(94,"\n            "),f.Nc(95,_,1,0,"mat-row",25),f.Pc(96,"\n          "),f.Ub(),f.Pc(97,"\n        "),f.Ub(),f.Pc(98,"\n\n        "),f.Pc(99,"\n\n        "),f.Vb(100,"div",26),f.Pc(101,"\n          "),f.Nc(102,Y,2,0,"div",27),f.Pc(103,"\n          "),f.Nc(104,tt,2,0,"div",27),f.lc(105,"async"),f.Pc(106,"\n        "),f.Ub(),f.Pc(107,"\n\n        "),f.Vb(108,"div",28),f.Pc(109,"\n          "),f.Nc(110,et,1,1,"mat-spinner",29),f.lc(111,"async"),f.Pc(112,"\n          "),f.Vb(113,"mat-paginator",30),f.lc(114,"async"),f.Pc(115,"\n          "),f.Ub(),f.Pc(116,"\n        "),f.Ub(),f.Pc(117,"\n      "),f.Ub(),f.Pc(118,"\n    "),f.Ub(),f.Pc(119,"\n  "),f.Ub(),f.Pc(120,"\n"),f.Ub(),f.Pc(121,"\n")),2&t&&(f.Cb(17),f.sc("jhiHasAnyAuthority","Accion Crear Usuario"),f.Cb(29),f.sc("dataSource",e.dataSource),f.Cb(47),f.sc("matHeaderRowDef",e.displayedColumns),f.Cb(2),f.sc("matRowDefColumns",e.displayedColumns),f.Cb(7),f.sc("ngIf",!e.dataSource.hasItems),f.Cb(2),f.sc("ngIf",f.mc(105,11,e.dataSource.isPreloadTextViewed$)),f.Cb(6),f.sc("ngIf",f.mc(111,13,e.dataSource.loading$)),f.Cb(3),f.sc("pageSize",10)("pageSizeOptions",f.wc(17,rt))("length",f.mc(114,15,e.dataSource.paginatorTotal$))("showFirstLastButtons",!0))},directives:[U.d,U.a,C.a,C.e,U.c,C.g,V.a,C.c,y.c,j.b,S.a,y.f,w.j,x.a,w.c,w.e,w.b,w.g,w.i,E.q,i.a,F.a,n.g,w.d,w.a,x.b,T.a,w.f,w.h,k.b],pipes:[E.b],encapsulation:2}),t})();var ot=r("3Pt+"),it=r("AuD0"),ct=r("bzzm"),at=r("TeOp"),st=r("HzuZ"),bt=r("A34J"),lt=r("AOSR"),ut=r("VKys"),mt=r("znSr"),dt=r("STbY"),Pt=r("Owrn"),ht=r("d3UM"),pt=r("FKr1");function ft(t,e){if(1&t){const t=f.Wb();f.Vb(0,"button",18),f.gc("click",function(){return f.Ec(t),f.kc().save(!0)}),f.Pc(1,"\n          Guardar\n        "),f.Ub()}if(2&t){const t=f.kc();f.sc("disabled",t.isSaving)}}function vt(t,e){if(1&t&&(f.Vb(0,"button",19),f.Pc(1,"\n          "),f.Vb(2,"mat-icon"),f.Pc(3,"more_vert"),f.Ub(),f.Pc(4,"\n        "),f.Ub()),2&t){f.kc();const t=f.Cc(26);f.sc("matMenuTriggerFor",t)}}function gt(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorNombre(),"\n              ")}}function Ut(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorNombreCompleto(),"\n              ")}}function Ct(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorCorreo(),"\n              ")}}function Vt(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorCuil(),"\n              ")}}function yt(t,e){if(1&t&&(f.Vb(0,"mat-option",20),f.Pc(1),f.Ub()),2&t){const t=e.$implicit;f.sc("value",t.id),f.Cb(1),f.Qc(t.nombre)}}function jt(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorEstablecimiento(),"\n              ")}}function St(t,e){if(1&t&&(f.Vb(0,"mat-option",20),f.Pc(1),f.Ub()),2&t){const t=e.$implicit;f.sc("value",t.id),f.Cb(1),f.Qc(t.nombre)}}function wt(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorGrupoTrabajo(),"\n              ")}}function xt(t,e){if(1&t&&(f.Vb(0,"mat-option",20),f.Pc(1),f.Ub()),2&t){const t=e.$implicit;f.sc("value",t.id),f.Cb(1),f.Qc(t.nombre)}}function Et(t,e){if(1&t&&(f.Vb(0,"mat-error"),f.Pc(1),f.Ub()),2&t){const t=f.kc();f.Cb(1),f.Rc("\n                ",t.mensajeErrorGrupoTrabajo(),"\n              ")}}const Ft=function(){return["Accion Editar Usuario","Accion Editar Usuario"]},Tt=function(){return["Accion Crear Usuario","Accion Editar Usuario"]};let kt=(()=>{class t{constructor(t,e,r,n,o,i,c,a){this.userService=t,this.route=e,this.fb=r,this.rolService=n,this.establecimientoService=o,this.grupoService=i,this.cdk=c,this.eventManager=a,this.titleForm="",this.establecimientos=[],this.grupoTrabajos=[],this.roles=[],this.isSaving=!1,this.subscriptions=[],this.alerts=[],this.editForm=this.fb.group({id:[],nombre:["",[ot.v.maxLength(50),ot.v.required]],nombreCompleto:["",[ot.v.maxLength(50),ot.v.required]],correo:["",[ot.v.minLength(5),ot.v.email,ot.v.required]],cuil:["",[ot.v.maxLength(13),ot.v.required]],establecimiento:["",[ot.v.required]],grupoTrabajo:["",[ot.v.required]],rol:["",[ot.v.required]]})}ngOnInit(){this.subscriptions.push(this.route.data.subscribe(({user:t})=>{this.createTitle(t),null!=t.id&&this.updateForm(t)})),this.subscriptions.push(this.establecimientoService.getAll().subscribe({next:t=>this.establecimientos=t})),this.subscriptions.push(this.grupoService.getAll().subscribe({next:t=>this.grupoTrabajos=t})),this.subscriptions.push(this.rolService.getAll().subscribe({next:t=>this.roles=t}))}ngOnDestroy(){this.subscriptions.forEach(t=>t.unsubscribe())}previousState(){window.history.back()}limpiar(){this.updateForm(new it.a),this.editForm.markAsUntouched(),this.editForm.updateValueAndValidity(),this.editForm.markAsPristine(),this.isSaving=!1}save(t){if(this.editForm.invalid)return this.marcarCampos(this.editForm),void this.eventManager.broadcast(new bt.b("erpSepApp.error",{message:"Algo no va bien, por favor verifica los campos",type:"warning"}));this.isSaving=!0;const e=this.createUser();this.subscribeToSaveResponse(void 0!==e.id?this.userService.update(e):this.userService.create(e)),t&&this.previousState(),this.limpiar()}get id(){return this.editForm.get("id")}get nombre(){return this.editForm.get("nombre")}get nombreCompleto(){return this.editForm.get(["nombreCompleto"])}get correo(){return this.editForm.get(["correo"])}get cuil(){return this.editForm.get(["cuil"])}get establecimiento(){return this.editForm.get(["establecimiento"])}get grupoTrabajo(){return this.editForm.get(["grupoTrabajo"])}get rol(){return this.editForm.get(["rol"])}mensajeErrorNombre(){return this.nombre.hasError("required")?"El nombre de usuario es requerido":this.nombre.hasError("maxlength")?"Demasiado largo ":""}mensajeErrorNombreCompleto(){var t,e;return(null===(t=this.editForm.get(["nombreCompleto"]))||void 0===t?void 0:t.hasError("required"))?"El nombre Completo es requerido":(null===(e=this.editForm.get(["nombreCompleto"]))||void 0===e?void 0:e.hasError("maxlength"))?"Demasiado largo ":""}mensajeErrorCorreo(){var t,e;return(null===(t=this.editForm.get(["correo"]))||void 0===t?void 0:t.hasError("required"))?"El correo es requerido":(null===(e=this.editForm.get(["correo"]))||void 0===e?void 0:e.hasError("email"))?"correo invalido":""}mensajeErrorCuil(){var t,e;return(null===(t=this.editForm.get(["cuil"]))||void 0===t?void 0:t.hasError("required"))?"El cuil es requerido":(null===(e=this.editForm.get(["cuil"]))||void 0===e?void 0:e.hasError("maxlength"))?"Demasiados caracteres":""}mensajeErrorEstablecimiento(){var t;return(null===(t=this.editForm.get(["establecimiento"]))||void 0===t?void 0:t.hasError("required"))?"El establecimiento es requerido":""}mensajeErrorGrupoTrabajo(){var t;return(null===(t=this.editForm.get(["grupoTrabajo"]))||void 0===t?void 0:t.hasError("required"))?"El grupo de trabajo es requerido":""}mensajeErrorRol(){var t;return(null===(t=this.editForm.get(["rol"]))||void 0===t?void 0:t.hasError("required"))?"El Rol de Usuario es requerido":""}trackRolOrderById(t,e){return e.id}subscribeToSaveResponse(t){const e=t.subscribe({next:()=>this.onSaveSuccess(),error:()=>this.onSaveError()});this.subscriptions.push(e)}marcarCampos(t){Object.values(t.controls).forEach(t=>{t.markAsTouched(),t.controls&&this.marcarCampos(t)})}updateForm(t){var e,r,n;this.editForm.patchValue({id:t.id,nombre:t.nombre,nombreCompleto:t.nombreCompleto,correo:t.correo,cuil:t.cuil,establecimiento:null===(e=t.establecimiento)||void 0===e?void 0:e.id,grupoTrabajo:null===(r=t.grupoTrabajo)||void 0===r?void 0:r.id,rol:null===(n=t.rol)||void 0===n?void 0:n.id}),this.cdk.markForCheck()}createUser(){var t;return Object.assign(Object.assign({},new it.a),{id:null!==(t=this.id.value)&&void 0!==t?t:void 0,nombre:this.nombre.value,nombreCompleto:this.nombreCompleto.value,correo:this.correo.value,cuil:this.cuil.value,establecimiento:Object.assign(Object.assign({},new ct.a),{id:this.establecimiento.value}),grupoTrabajo:Object.assign(Object.assign({},new at.a),{id:this.grupoTrabajo.value}),rol:Object.assign(Object.assign({},new st.a),{id:this.rol.value})})}onSaveSuccess(){this.isSaving=!1}onSaveError(){this.isSaving=!1}createTitle(t){var e;this.titleForm=t.id?`Editar Usuario ${null!==(e=t.nombre)&&void 0!==e?e:""}`:"Crear Usuario"}}return t.\u0275fac=function(e){return new(e||t)(f.Pb(v.a),f.Pb(n.a),f.Pb(ot.e),f.Pb(st.b),f.Pb(lt.a),f.Pb(ut.a),f.Pb(f.h),f.Pb(bt.a))},t.\u0275cmp=f.Jb({type:t,selectors:[["jhi-user-mgmt-update"]],decls:180,vars:24,consts:[["fxLayoutAlign","space-between start"],["fxLayout","column","fxLayout.gt-xs","row"],["fxHide","","fxShow.gt-sm","","mat-raised-button","","color","primary","matTooltip","Guardar los cambios",3,"disabled","click",4,"jhiHasAnyAuthority"],["fxHide","","fxShow.gt-sm","","mat-raised-button","","color","warn","matTooltip","Volver",3,"click"],["mat-icon-button","","color","primary",3,"matMenuTriggerFor",4,"jhiHasAnyAuthority"],["menu","matMenu"],["mat-menu-item","","color","primary",3,"click"],["fxHide.gt-sm","","mat-menu-item","","color","primary",3,"click"],[3,"formGroup"],["fxLayout","row wrap",1,"align-items-center","m-b-30"],["fxFlex","100","fxFlex.gt-md","50"],[1,"m-r-15","m-l-15"],["type","text","matInput","",3,"formControl"],[4,"ngIf"],[3,"formControl"],[3,"value",4,"ngFor","ngForOf"],[1,"label-light-warning"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"],["fxHide","","fxShow.gt-sm","","mat-raised-button","","color","primary","matTooltip","Guardar los cambios",3,"disabled","click"],["mat-icon-button","","color","primary",3,"matMenuTriggerFor"],[3,"value"]],template:function(t,e){1&t&&(f.Pc(0,"\n\n"),f.Vb(1,"mat-card"),f.Pc(2,"\n  "),f.Vb(3,"mat-card-header",0),f.Pc(4,"\n    "),f.Vb(5,"mat-card-title"),f.Pc(6),f.Ub(),f.Pc(7,"\n    "),f.Vb(8,"div",1),f.Pc(9,"\n      "),f.Vb(10,"div"),f.Pc(11,"\n        "),f.Nc(12,ft,2,1,"button",2),f.Pc(13,"\n      "),f.Ub(),f.Pc(14,"\n      \xa0\n      "),f.Vb(15,"div"),f.Pc(16,"\n        "),f.Vb(17,"button",3),f.gc("click",function(){return e.previousState()}),f.Pc(18,"Cancelar"),f.Ub(),f.Pc(19,"\n      "),f.Ub(),f.Pc(20,"\n      "),f.Vb(21,"div"),f.Pc(22,"\n        "),f.Nc(23,vt,5,1,"button",4),f.Pc(24,"\n        "),f.Vb(25,"mat-menu",null,5),f.Pc(27,"\n          "),f.Vb(28,"button",6),f.gc("click",function(){return e.save(!0)}),f.Pc(29,"Guardar y Salir"),f.Ub(),f.Pc(30,"\n          "),f.Vb(31,"button",6),f.gc("click",function(){return e.save(!1)}),f.Pc(32,"Guardar y Continuar"),f.Ub(),f.Pc(33,"\n          "),f.Vb(34,"button",6),f.gc("click",function(){return e.limpiar()}),f.Pc(35,"Limpiar Formulario"),f.Ub(),f.Pc(36,"\n          "),f.Vb(37,"button",7),f.gc("click",function(){return e.previousState()}),f.Pc(38,"Salir"),f.Ub(),f.Pc(39,"\n        "),f.Ub(),f.Pc(40,"\n      "),f.Ub(),f.Pc(41,"\n    "),f.Ub(),f.Pc(42,"\n  "),f.Ub(),f.Pc(43,"\n  "),f.Qb(44,"hr"),f.Pc(45,"\n  "),f.Vb(46,"mat-card-content"),f.Pc(47,"\n    "),f.Qb(48,"jhi-alert-error"),f.Pc(49,"\n\n    "),f.Vb(50,"form",8),f.Pc(51,"\n      "),f.Pc(52,"\n      "),f.Vb(53,"div",9),f.Pc(54,"\n        "),f.Vb(55,"div",10),f.Pc(56,"\n          "),f.Vb(57,"div",11),f.Pc(58,"\n            "),f.Vb(59,"mat-form-field"),f.Pc(60,"\n              "),f.Vb(61,"mat-label"),f.Pc(62,"Usuario"),f.Ub(),f.Pc(63,"\n              "),f.Qb(64,"input",12),f.Pc(65,"\n              "),f.Nc(66,gt,2,1,"mat-error",13),f.Pc(67,"\n            "),f.Ub(),f.Pc(68,"\n          "),f.Ub(),f.Pc(69,"\n        "),f.Ub(),f.Pc(70,"\n\n        "),f.Vb(71,"div",10),f.Pc(72,"\n          "),f.Vb(73,"div",11),f.Pc(74,"\n            "),f.Vb(75,"mat-form-field"),f.Pc(76,"\n              "),f.Vb(77,"mat-label"),f.Pc(78,"Nombre Completo"),f.Ub(),f.Pc(79,"\n              "),f.Qb(80,"input",12),f.Pc(81,"\n              "),f.Nc(82,Ut,2,1,"mat-error",13),f.Pc(83,"\n            "),f.Ub(),f.Pc(84,"\n          "),f.Ub(),f.Pc(85,"\n        "),f.Ub(),f.Pc(86,"\n\n        "),f.Vb(87,"div",10),f.Pc(88,"\n          "),f.Vb(89,"div",11),f.Pc(90,"\n            "),f.Vb(91,"mat-form-field"),f.Pc(92,"\n              "),f.Vb(93,"mat-label"),f.Pc(94,"E-mail"),f.Ub(),f.Pc(95,"\n              "),f.Qb(96,"input",12),f.Pc(97,"\n              "),f.Nc(98,Ct,2,1,"mat-error",13),f.Pc(99,"\n            "),f.Ub(),f.Pc(100,"\n          "),f.Ub(),f.Pc(101,"\n        "),f.Ub(),f.Pc(102,"\n\n        "),f.Vb(103,"div",10),f.Pc(104,"\n          "),f.Vb(105,"div",11),f.Pc(106,"\n            "),f.Vb(107,"mat-form-field"),f.Pc(108,"\n              "),f.Vb(109,"mat-label"),f.Pc(110,"Cuil"),f.Ub(),f.Pc(111,"\n              "),f.Qb(112,"input",12),f.Pc(113,"\n              "),f.Nc(114,Vt,2,1,"mat-error",13),f.Pc(115,"\n            "),f.Ub(),f.Pc(116,"\n          "),f.Ub(),f.Pc(117,"\n        "),f.Ub(),f.Pc(118,"\n\n        "),f.Vb(119,"div",10),f.Pc(120,"\n          "),f.Vb(121,"div",11),f.Pc(122,"\n            "),f.Vb(123,"mat-form-field"),f.Pc(124,"\n              "),f.Vb(125,"mat-label"),f.Pc(126,"Establecimiento"),f.Ub(),f.Pc(127,"\n              "),f.Vb(128,"mat-select",14),f.Pc(129,"\n                "),f.Nc(130,yt,2,2,"mat-option",15),f.Pc(131,"\n              "),f.Ub(),f.Pc(132,"\n              "),f.Nc(133,jt,2,1,"mat-error",13),f.Pc(134,"\n            "),f.Ub(),f.Pc(135,"\n          "),f.Ub(),f.Pc(136,"\n        "),f.Ub(),f.Pc(137,"\n\n        "),f.Vb(138,"div",10),f.Pc(139,"\n          "),f.Vb(140,"div",11),f.Pc(141,"\n            "),f.Vb(142,"mat-form-field"),f.Pc(143,"\n              "),f.Vb(144,"mat-label"),f.Pc(145,"Grupo de Trabajo"),f.Ub(),f.Pc(146,"\n              "),f.Vb(147,"mat-select",14),f.Pc(148,"\n                "),f.Nc(149,St,2,2,"mat-option",15),f.Pc(150,"\n              "),f.Ub(),f.Pc(151,"\n              "),f.Nc(152,wt,2,1,"mat-error",13),f.Pc(153,"\n            "),f.Ub(),f.Pc(154,"\n          "),f.Ub(),f.Pc(155,"\n        "),f.Ub(),f.Pc(156,"\n\n        "),f.Vb(157,"div",10),f.Pc(158,"\n          "),f.Vb(159,"div",11),f.Pc(160,"\n            "),f.Vb(161,"mat-form-field"),f.Pc(162,"\n              "),f.Vb(163,"mat-label",16),f.Pc(164,"Rol Asignado"),f.Ub(),f.Pc(165,"\n              "),f.Vb(166,"mat-select",14),f.Pc(167,"\n                "),f.Nc(168,xt,2,2,"mat-option",17),f.Pc(169,"\n              "),f.Ub(),f.Pc(170,"\n              "),f.Nc(171,Et,2,1,"mat-error",13),f.Pc(172,"\n            "),f.Ub(),f.Pc(173,"\n          "),f.Ub(),f.Pc(174,"\n        "),f.Ub(),f.Pc(175,"\n      "),f.Ub(),f.Pc(176,"\n    "),f.Ub(),f.Pc(177,"\n  "),f.Ub(),f.Pc(178,"\n"),f.Ub(),f.Pc(179,"\n")),2&t&&(f.Cb(6),f.Qc(e.titleForm),f.Cb(6),f.sc("jhiHasAnyAuthority",f.wc(22,Ft)),f.Cb(11),f.sc("jhiHasAnyAuthority",f.wc(23,Tt)),f.Cb(27),f.sc("formGroup",e.editForm),f.Cb(14),f.sc("formControl",e.nombre),f.Cb(2),f.sc("ngIf",e.nombre.invalid),f.Cb(14),f.sc("formControl",e.nombreCompleto),f.Cb(2),f.sc("ngIf",null==e.nombreCompleto?null:e.nombreCompleto.invalid),f.Cb(14),f.sc("formControl",e.correo),f.Cb(2),f.sc("ngIf",null==e.correo?null:e.correo.invalid),f.Cb(14),f.sc("formControl",e.cuil),f.Cb(2),f.sc("ngIf",null==e.cuil?null:e.cuil.invalid),f.Cb(14),f.sc("formControl",e.establecimiento),f.Cb(2),f.sc("ngForOf",e.establecimientos),f.Cb(3),f.sc("ngIf",null==e.establecimiento?null:e.establecimiento.invalid),f.Cb(14),f.sc("formControl",e.grupoTrabajo),f.Cb(2),f.sc("ngForOf",e.grupoTrabajos),f.Cb(3),f.sc("ngIf",null==e.grupoTrabajo?null:e.grupoTrabajo.invalid),f.Cb(14),f.sc("formControl",e.rol),f.Cb(2),f.sc("ngForOf",e.roles)("ngForTrackBy",e.trackRolOrderById),f.Cb(3),f.sc("ngIf",null==e.grupoTrabajo?null:e.grupoTrabajo.invalid))},directives:[C.a,C.e,U.c,C.g,U.d,V.a,F.a,mt.b,S.a,dt.a,dt.b,C.c,Pt.a,ot.w,ot.o,ot.h,U.a,y.c,y.g,j.b,ot.c,ot.n,ot.f,E.q,ht.a,E.p,dt.d,T.a,y.b,pt.n],encapsulation:2}),t})(),Nt=(()=>{class t{constructor(t){this.service=t}resolve(t){const e=+t.params.id;return e?this.service.find(e):Object(b.a)(new it.a)}}return t.\u0275fac=function(e){return new(e||t)(f.cc(v.a))},t.\u0275prov=f.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const At=[{path:"",component:nt,data:{pageTitle:"Usuarios"}},{path:"nuevoUsuario",component:kt,data:{pageTitle:"Nuevo Usuario"},resolve:{user:Nt}},{path:":id/editarUsuario",component:kt,data:{pageTitle:"Editar Usuario"},resolve:{user:Nt}}];let It=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=f.Nb({type:t}),t.\u0275inj=f.Mb({imports:[[o.a,n.i.forChild(At)]]}),t})()}}]);