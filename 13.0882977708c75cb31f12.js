(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"9T42":function(n,e,c){"use strict";c.r(e),c.d(e,"LogsModule",function(){return m});var t=c("tyNb"),i=c("hbEq");class r{constructor(n,e){this.name=n,this.level=e}}var o=c("fXoL"),s=c("tk/3"),l=c("PxL+");let a=(()=>{class n{constructor(n,e){this.http=n,this.applicationConfigService=e}changeLevel(n,e){return this.http.post(this.applicationConfigService.getEndpointFor("management/loggers/"+n),{configuredLevel:e})}findAll(){return this.http.get(this.applicationConfigService.getEndpointFor("management/loggers"))}}return n.\u0275fac=function(e){return new(e||n)(o.cc(s.b),o.cc(l.a))},n.\u0275prov=o.Lb({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var g=c("ofXK"),b=c("3Pt+"),d=c("ON7I"),h=c("WUPo"),p=c("6NWb"),f=c("znSr");function u(n,e){if(1&n){const n=o.Wb();o.Vb(0,"tr"),o.Nc(1,"\n      "),o.Vb(2,"td"),o.Nc(3,"\n        "),o.Vb(4,"small"),o.Nc(5),o.lc(6,"slice"),o.Ub(),o.Nc(7,"\n      "),o.Ub(),o.Nc(8,"\n      "),o.Vb(9,"td"),o.Nc(10,"\n        "),o.Vb(11,"button",10),o.gc("click",function(){o.Dc(n);const c=e.$implicit;return o.kc(2).changeLevel(c.name,"TRACE")}),o.Nc(12,"\n          TRACE\n        "),o.Ub(),o.Nc(13,"\n\n        "),o.Vb(14,"button",10),o.gc("click",function(){o.Dc(n);const c=e.$implicit;return o.kc(2).changeLevel(c.name,"DEBUG")}),o.Nc(15,"\n          DEBUG\n        "),o.Ub(),o.Nc(16,"\n\n        "),o.Vb(17,"button",10),o.gc("click",function(){o.Dc(n);const c=e.$implicit;return o.kc(2).changeLevel(c.name,"INFO")}),o.Nc(18,"\n          INFO\n        "),o.Ub(),o.Nc(19,"\n\n        "),o.Vb(20,"button",10),o.gc("click",function(){o.Dc(n);const c=e.$implicit;return o.kc(2).changeLevel(c.name,"WARN")}),o.Nc(21,"\n          WARN\n        "),o.Ub(),o.Nc(22,"\n\n        "),o.Vb(23,"button",10),o.gc("click",function(){o.Dc(n);const c=e.$implicit;return o.kc(2).changeLevel(c.name,"ERROR")}),o.Nc(24,"\n          ERROR\n        "),o.Ub(),o.Nc(25,"\n\n        "),o.Vb(26,"button",10),o.gc("click",function(){o.Dc(n);const c=e.$implicit;return o.kc(2).changeLevel(c.name,"OFF")}),o.Nc(27,"\n          OFF\n        "),o.Ub(),o.Nc(28,"\n      "),o.Ub(),o.Nc(29,"\n    "),o.Ub()}if(2&n){const n=e.$implicit;o.Cb(5),o.Oc(o.oc(6,7,n.name,0,140)),o.Cb(6),o.rc("ngClass","TRACE"===n.level?"btn-primary":"btn-light"),o.Cb(3),o.rc("ngClass","DEBUG"===n.level?"btn-success":"btn-light"),o.Cb(3),o.rc("ngClass","INFO"===n.level?"btn-info":"btn-light"),o.Cb(3),o.rc("ngClass","WARN"===n.level?"btn-warning":"btn-light"),o.Cb(3),o.rc("ngClass","ERROR"===n.level?"btn-danger":"btn-light"),o.Cb(3),o.rc("ngClass","OFF"===n.level?"btn-secondary":"btn-light")}}function N(n,e){if(1&n){const n=o.Wb();o.Vb(0,"div",1),o.Nc(1,"\n  "),o.Vb(2,"h2",2),o.Nc(3,"Logs"),o.Ub(),o.Nc(4,"\n\n  "),o.Vb(5,"p"),o.Nc(6),o.Ub(),o.Nc(7,"\n\n  "),o.Vb(8,"span"),o.Nc(9,"Filter"),o.Ub(),o.Nc(10,"\n  "),o.Vb(11,"input",3),o.gc("ngModelChange",function(e){return o.Dc(n),o.kc().filter=e})("ngModelChange",function(){return o.Dc(n),o.kc().filterAndSort()}),o.Ub(),o.Nc(12,"\n\n  "),o.Vb(13,"table",4),o.Nc(14,"\n    "),o.Vb(15,"thead"),o.Nc(16,"\n      "),o.Vb(17,"tr",5),o.gc("predicateChange",function(e){return o.Dc(n),o.kc().orderProp=e})("ascendingChange",function(e){return o.Dc(n),o.kc().ascending=e}),o.Nc(18,"\n        "),o.Vb(19,"th",6),o.Vb(20,"span"),o.Nc(21,"Name"),o.Ub(),o.Nc(22," "),o.Qb(23,"fa-icon",7),o.Ub(),o.Nc(24,"\n        "),o.Vb(25,"th",8),o.Vb(26,"span"),o.Nc(27,"Level"),o.Ub(),o.Nc(28," "),o.Qb(29,"fa-icon",7),o.Ub(),o.Nc(30,"\n      "),o.Ub(),o.Nc(31,"\n    "),o.Ub(),o.Nc(32,"\n\n    "),o.Lc(33,u,30,11,"tr",9),o.Nc(34,"\n  "),o.Ub(),o.Nc(35,"\n"),o.Ub()}if(2&n){const n=o.kc();o.Cb(6),o.Pc("There are ",n.loggers.length," loggers."),o.Cb(5),o.rc("ngModel",n.filter),o.Cb(6),o.rc("predicate",n.orderProp)("ascending",n.ascending)("callback",n.filterAndSort.bind(n)),o.Cb(16),o.rc("ngForOf",n.filteredAndOrderedLoggers)}}const v={path:"",component:(()=>{class n{constructor(n){this.logsService=n,this.filter="",this.orderProp="name",this.ascending=!0}ngOnInit(){this.findAndExtractLoggers()}changeLevel(n,e){this.logsService.changeLevel(n,e).subscribe(()=>this.findAndExtractLoggers())}filterAndSort(){this.filteredAndOrderedLoggers=this.loggers.filter(n=>!this.filter||n.name.toLowerCase().includes(this.filter.toLowerCase())).sort((n,e)=>n[this.orderProp]<e[this.orderProp]?this.ascending?-1:1:n[this.orderProp]>e[this.orderProp]?this.ascending?1:-1:"level"===this.orderProp?n.name<e.name?-1:1:0)}findAndExtractLoggers(){this.logsService.findAll().subscribe(n=>{this.loggers=Object.entries(n.loggers).map(([n,e])=>new r(n,e.effectiveLevel)),this.filterAndSort()})}}return n.\u0275fac=function(e){return new(e||n)(o.Pb(a))},n.\u0275cmp=o.Jb({type:n,selectors:[["jhi-logs"]],decls:2,vars:1,consts:[["class","table-responsive",4,"ngIf"],[1,"table-responsive"],["id","logs-page-heading","data-cy","logsPageHeading"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],["aria-describedby","logs-page-heading",1,"table","table-sm","table-striped","table-bordered"],["jhiSort","",3,"predicate","ascending","callback","predicateChange","ascendingChange"],["jhiSortBy","name","scope","col"],["icon","sort"],["jhiSortBy","level","scope","col"],[4,"ngFor","ngForOf"],[1,"btn","btn-sm",3,"ngClass","click"]],template:function(n,e){1&n&&(o.Lc(0,N,36,6,"div",0),o.Nc(1,"\n")),2&n&&o.rc("ngIf",e.loggers)},directives:[g.p,b.c,b.l,b.o,d.a,h.a,p.a,g.o,g.n,f.a],pipes:[g.y],encapsulation:2}),n})(),data:{pageTitle:"Logs"}};let m=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.Nb({type:n}),n.\u0275inj=o.Mb({imports:[[i.a,t.i.forChild([v])]]}),n})()}}]);