(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"9T42":function(n,e,c){"use strict";c.r(e),c.d(e,"LogsModule",function(){return m});var t=c("tyNb"),i=c("hbEq");class r{constructor(n,e){this.name=n,this.level=e}}var s=c("fXoL"),o=c("tk/3"),l=c("PxL+");let a=(()=>{class n{constructor(n,e){this.http=n,this.applicationConfigService=e}changeLevel(n,e){return this.http.post(this.applicationConfigService.getEndpointFor("management/loggers/"+n),{configuredLevel:e})}findAll(){return this.http.get(this.applicationConfigService.getEndpointFor("management/loggers"))}}return n.\u0275fac=function(e){return new(e||n)(s.cc(o.b),s.cc(l.a))},n.\u0275prov=s.Lb({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var g=c("ofXK"),b=c("3Pt+"),d=c("ON7I"),h=c("WUPo"),p=c("6NWb"),f=c("znSr");function O(n,e){if(1&n){const n=s.Wb();s.Vb(0,"tr"),s.Oc(1,"\n      "),s.Vb(2,"td"),s.Oc(3,"\n        "),s.Vb(4,"small"),s.Oc(5),s.lc(6,"slice"),s.Ub(),s.Oc(7,"\n      "),s.Ub(),s.Oc(8,"\n      "),s.Vb(9,"td"),s.Oc(10,"\n        "),s.Vb(11,"button",10),s.gc("click",function(){s.Ec(n);const c=e.$implicit;return s.kc(2).changeLevel(c.name,"TRACE")}),s.Oc(12,"\n          TRACE\n        "),s.Ub(),s.Oc(13,"\n\n        "),s.Vb(14,"button",10),s.gc("click",function(){s.Ec(n);const c=e.$implicit;return s.kc(2).changeLevel(c.name,"DEBUG")}),s.Oc(15,"\n          DEBUG\n        "),s.Ub(),s.Oc(16,"\n\n        "),s.Vb(17,"button",10),s.gc("click",function(){s.Ec(n);const c=e.$implicit;return s.kc(2).changeLevel(c.name,"INFO")}),s.Oc(18,"\n          INFO\n        "),s.Ub(),s.Oc(19,"\n\n        "),s.Vb(20,"button",10),s.gc("click",function(){s.Ec(n);const c=e.$implicit;return s.kc(2).changeLevel(c.name,"WARN")}),s.Oc(21,"\n          WARN\n        "),s.Ub(),s.Oc(22,"\n\n        "),s.Vb(23,"button",10),s.gc("click",function(){s.Ec(n);const c=e.$implicit;return s.kc(2).changeLevel(c.name,"ERROR")}),s.Oc(24,"\n          ERROR\n        "),s.Ub(),s.Oc(25,"\n\n        "),s.Vb(26,"button",10),s.gc("click",function(){s.Ec(n);const c=e.$implicit;return s.kc(2).changeLevel(c.name,"OFF")}),s.Oc(27,"\n          OFF\n        "),s.Ub(),s.Oc(28,"\n      "),s.Ub(),s.Oc(29,"\n    "),s.Ub()}if(2&n){const n=e.$implicit;s.Cb(5),s.Pc(s.oc(6,7,n.name,0,140)),s.Cb(6),s.sc("ngClass","TRACE"===n.level?"btn-primary":"btn-light"),s.Cb(3),s.sc("ngClass","DEBUG"===n.level?"btn-success":"btn-light"),s.Cb(3),s.sc("ngClass","INFO"===n.level?"btn-info":"btn-light"),s.Cb(3),s.sc("ngClass","WARN"===n.level?"btn-warning":"btn-light"),s.Cb(3),s.sc("ngClass","ERROR"===n.level?"btn-danger":"btn-light"),s.Cb(3),s.sc("ngClass","OFF"===n.level?"btn-secondary":"btn-light")}}function u(n,e){if(1&n){const n=s.Wb();s.Vb(0,"div",1),s.Oc(1,"\n  "),s.Vb(2,"h2",2),s.Oc(3,"Logs"),s.Ub(),s.Oc(4,"\n\n  "),s.Vb(5,"p"),s.Oc(6),s.Ub(),s.Oc(7,"\n\n  "),s.Vb(8,"span"),s.Oc(9,"Filter"),s.Ub(),s.Oc(10,"\n  "),s.Vb(11,"input",3),s.gc("ngModelChange",function(e){return s.Ec(n),s.kc().filter=e})("ngModelChange",function(){return s.Ec(n),s.kc().filterAndSort()}),s.Ub(),s.Oc(12,"\n\n  "),s.Vb(13,"table",4),s.Oc(14,"\n    "),s.Vb(15,"thead"),s.Oc(16,"\n      "),s.Vb(17,"tr",5),s.gc("predicateChange",function(e){return s.Ec(n),s.kc().orderProp=e})("ascendingChange",function(e){return s.Ec(n),s.kc().ascending=e}),s.Oc(18,"\n        "),s.Vb(19,"th",6),s.Vb(20,"span"),s.Oc(21,"Name"),s.Ub(),s.Oc(22," "),s.Qb(23,"fa-icon",7),s.Ub(),s.Oc(24,"\n        "),s.Vb(25,"th",8),s.Vb(26,"span"),s.Oc(27,"Level"),s.Ub(),s.Oc(28," "),s.Qb(29,"fa-icon",7),s.Ub(),s.Oc(30,"\n      "),s.Ub(),s.Oc(31,"\n    "),s.Ub(),s.Oc(32,"\n\n    "),s.Mc(33,O,30,11,"tr",9),s.Oc(34,"\n  "),s.Ub(),s.Oc(35,"\n"),s.Ub()}if(2&n){const n=s.kc();s.Cb(6),s.Qc("There are ",n.loggers.length," loggers."),s.Cb(5),s.sc("ngModel",n.filter),s.Cb(6),s.sc("predicate",n.orderProp)("ascending",n.ascending)("callback",n.filterAndSort.bind(n)),s.Cb(16),s.sc("ngForOf",n.filteredAndOrderedLoggers)}}const v={path:"",component:(()=>{class n{constructor(n){this.logsService=n,this.filter="",this.orderProp="name",this.ascending=!0}ngOnInit(){this.findAndExtractLoggers()}changeLevel(n,e){this.logsService.changeLevel(n,e).subscribe(()=>this.findAndExtractLoggers())}filterAndSort(){this.filteredAndOrderedLoggers=this.loggers.filter(n=>!this.filter||n.name.toLowerCase().includes(this.filter.toLowerCase())).sort((n,e)=>n[this.orderProp]<e[this.orderProp]?this.ascending?-1:1:n[this.orderProp]>e[this.orderProp]?this.ascending?1:-1:"level"===this.orderProp?n.name<e.name?-1:1:0)}findAndExtractLoggers(){this.logsService.findAll().subscribe(n=>{this.loggers=Object.entries(n.loggers).map(([n,e])=>new r(n,e.effectiveLevel)),this.filterAndSort()})}}return n.\u0275fac=function(e){return new(e||n)(s.Pb(a))},n.\u0275cmp=s.Jb({type:n,selectors:[["jhi-logs"]],decls:2,vars:1,consts:[["class","table-responsive",4,"ngIf"],[1,"table-responsive"],["id","logs-page-heading","data-cy","logsPageHeading"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],["aria-describedby","logs-page-heading",1,"table","table-sm","table-striped","table-bordered"],["jhiSort","",3,"predicate","ascending","callback","predicateChange","ascendingChange"],["jhiSortBy","name","scope","col"],["icon","sort"],["jhiSortBy","level","scope","col"],[4,"ngFor","ngForOf"],[1,"btn","btn-sm",3,"ngClass","click"]],template:function(n,e){1&n&&(s.Mc(0,u,36,6,"div",0),s.Oc(1,"\n")),2&n&&s.sc("ngIf",e.loggers)},directives:[g.q,b.c,b.n,b.q,d.a,h.a,p.a,g.p,g.o,f.a],pipes:[g.z],encapsulation:2}),n})(),data:{pageTitle:"Logs"}};let m=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=s.Nb({type:n}),n.\u0275inj=s.Mb({imports:[[i.a,t.i.forChild([v])]]}),n})()}}]);