(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-routing-module"],{

/***/ "HvhB":
/*!***********************************************************!*\
  !*** ./src/main/webapp/app/admin/admin-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */
class AdminRoutingModule {
}
AdminRoutingModule.ɵfac = function AdminRoutingModule_Factory(t) { return new (t || AdminRoutingModule)(); };
AdminRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AdminRoutingModule });
AdminRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild([
                {
                    path: 'user-management',
                    loadChildren: () => __webpack_require__.e(/*! import() | user-management-user-management-module */ "user-management-user-management-module").then(__webpack_require__.bind(null, /*! ./user-management/user-management.module */ "vvYM")).then(m => m.UserManagementModule),
                    data: {
                        pageTitle: 'Users',
                    },
                },
                {
                    path: 'docs',
                    loadChildren: () => __webpack_require__.e(/*! import() | docs-docs-module */ "docs-docs-module").then(__webpack_require__.bind(null, /*! ./docs/docs.module */ "421f")).then(m => m.DocsModule),
                },
                {
                    path: 'configuration',
                    loadChildren: () => __webpack_require__.e(/*! import() | configuration-configuration-module */ "configuration-configuration-module").then(__webpack_require__.bind(null, /*! ./configuration/configuration.module */ "VnRI")).then(m => m.ConfigurationModule),
                },
                {
                    path: 'health',
                    loadChildren: () => __webpack_require__.e(/*! import() | health-health-module */ "health-health-module").then(__webpack_require__.bind(null, /*! ./health/health.module */ "RKyK")).then(m => m.HealthModule),
                },
                {
                    path: 'logs',
                    loadChildren: () => __webpack_require__.e(/*! import() | logs-logs-module */ "logs-logs-module").then(__webpack_require__.bind(null, /*! ./logs/logs.module */ "9T42")).then(m => m.LogsModule),
                },
                {
                    path: 'metrics',
                    loadChildren: () => __webpack_require__.e(/*! import() | metrics-metrics-module */ "metrics-metrics-module").then(__webpack_require__.bind(null, /*! ./metrics/metrics.module */ "g3Mr")).then(m => m.MetricsModule),
                },
            ]),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AdminRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=admin-admin-routing-module.js.map