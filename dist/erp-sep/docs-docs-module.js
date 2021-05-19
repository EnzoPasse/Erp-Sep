(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["docs-docs-module"],{

/***/ "2IuO":
/*!******************************************************!*\
  !*** ./src/main/webapp/app/admin/docs/docs.route.ts ***!
  \******************************************************/
/*! exports provided: docsRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "docsRoute", function() { return docsRoute; });
/* harmony import */ var _docs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./docs.component */ "xmHY");

const docsRoute = {
    path: '',
    component: _docs_component__WEBPACK_IMPORTED_MODULE_0__["DocsComponent"],
    data: {
        pageTitle: 'API',
    },
};


/***/ }),

/***/ "421f":
/*!*******************************************************!*\
  !*** ./src/main/webapp/app/admin/docs/docs.module.ts ***!
  \*******************************************************/
/*! exports provided: DocsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocsModule", function() { return DocsModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/shared/shared.module */ "hbEq");
/* harmony import */ var _docs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./docs.component */ "xmHY");
/* harmony import */ var _docs_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./docs.route */ "2IuO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






class DocsModule {
}
DocsModule.ɵfac = function DocsModule_Factory(t) { return new (t || DocsModule)(); };
DocsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: DocsModule });
DocsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild([_docs_route__WEBPACK_IMPORTED_MODULE_3__["docsRoute"]])]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](DocsModule, { declarations: [_docs_component__WEBPACK_IMPORTED_MODULE_2__["DocsComponent"]], imports: [app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xmHY":
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/admin/docs/docs.component.ts ***!
  \**********************************************************/
/*! exports provided: DocsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocsComponent", function() { return DocsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class DocsComponent {
}
DocsComponent.ɵfac = function DocsComponent_Factory(t) { return new (t || DocsComponent)(); };
DocsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DocsComponent, selectors: [["jhi-docs"]], decls: 2, vars: 0, consts: [["src", "swagger-ui/index.html", "width", "100%", "height", "900", "seamless", "", "target", "_top", "title", "Swagger UI", "data-cy", "swagger-frame", 1, "border-0"]], template: function DocsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "iframe", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "\n");
    } }, styles: ["iframe[_ngcontent-%COMP%] {\n  background: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXGRvY3MuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSxpQkFBQTtBQUZGIiwiZmlsZSI6ImRvY3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICd+Ym9vdHN0cmFwL3Njc3MvZnVuY3Rpb25zJztcclxuQGltcG9ydCAnfmJvb3RzdHJhcC9zY3NzL3ZhcmlhYmxlcyc7XHJcblxyXG5pZnJhbWUge1xyXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xyXG59XHJcbiJdfQ== */"] });


/***/ })

}]);
//# sourceMappingURL=docs-docs-module.js.map