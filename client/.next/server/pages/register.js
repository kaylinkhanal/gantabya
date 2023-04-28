"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/register";
exports.ids = ["pages/register"];
exports.modules = {

/***/ "./src/pages/register/index.js":
/*!*************************************!*\
  !*** ./src/pages/register/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ \"formik\");\n/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(formik__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yup */ \"yup\");\n/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yup__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst SignupSchema = yup__WEBPACK_IMPORTED_MODULE_3__.object().shape({\n    firstName: yup__WEBPACK_IMPORTED_MODULE_3__.string().min(2, \"Too Short!\").max(50, \"Too Long!\").required(\"Required\"),\n    lastName: yup__WEBPACK_IMPORTED_MODULE_3__.string().min(2, \"Too Short!\").max(50, \"Too Long!\").required(\"Required\"),\n    email: yup__WEBPACK_IMPORTED_MODULE_3__.string().email(\"Invalid email\").required(\"Required\")\n});\nconst Register = ()=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Signup\"\n            }, void 0, false, {\n                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                lineNumber: 19,\n                columnNumber: 6\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_2__.Formik, {\n                initialValues: {\n                    firstName: \"\",\n                    lastName: \"\",\n                    email: \"\"\n                },\n                validationSchema: SignupSchema,\n                onSubmit: (values)=>{\n                    // same shape as initial values\n                    console.log(values);\n                },\n                children: ({ errors , touched  })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_2__.Form, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {\n                                name: \"firstName\"\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 34,\n                                columnNumber: 12\n                            }, undefined),\n                            errors.firstName && touched.firstName ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: errors.firstName\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 36,\n                                columnNumber: 14\n                            }, undefined) : null,\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {\n                                name: \"lastName\"\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 38,\n                                columnNumber: 12\n                            }, undefined),\n                            errors.lastName && touched.lastName ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: errors.lastName\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 40,\n                                columnNumber: 14\n                            }, undefined) : null,\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_2__.Field, {\n                                name: \"email\",\n                                type: \"email\"\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 42,\n                                columnNumber: 12\n                            }, undefined),\n                            errors.email && touched.email ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                children: errors.email\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 43,\n                                columnNumber: 45\n                            }, undefined) : null,\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"submit\",\n                                children: \"Submit\"\n                            }, void 0, false, {\n                                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                                lineNumber: 44,\n                                columnNumber: 12\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                        lineNumber: 33,\n                        columnNumber: 10\n                    }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n                lineNumber: 20,\n                columnNumber: 6\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/spiralogics/gantabya/client/src/pages/register/index.js\",\n        lineNumber: 18,\n        columnNumber: 4\n    }, undefined);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Register);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvcmVnaXN0ZXIvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUNvQjtBQUNsQjtBQUUzQixNQUFNSyxlQUFlRCx1Q0FBVSxHQUFHRyxLQUFLLENBQUM7SUFDdENDLFdBQVdKLHVDQUFVLEdBQ2xCTSxHQUFHLENBQUMsR0FBRyxjQUNQQyxHQUFHLENBQUMsSUFBSSxhQUNSQyxRQUFRLENBQUM7SUFDWkMsVUFBVVQsdUNBQVUsR0FDakJNLEdBQUcsQ0FBQyxHQUFHLGNBQ1BDLEdBQUcsQ0FBQyxJQUFJLGFBQ1JDLFFBQVEsQ0FBQztJQUNaRSxPQUFPVix1Q0FBVSxHQUFHVSxLQUFLLENBQUMsaUJBQWlCRixRQUFRLENBQUM7QUFDdEQ7QUFFQSxNQUFNRyxXQUFXLGtCQUNmLDhEQUFDQzs7MEJBQ0MsOERBQUNDOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNoQiwwQ0FBTUE7Z0JBQ0xpQixlQUFlO29CQUNiVixXQUFXO29CQUNYSyxVQUFVO29CQUNWQyxPQUFPO2dCQUNUO2dCQUNBSyxrQkFBa0JkO2dCQUNsQmUsVUFBVUMsQ0FBQUEsU0FBVTtvQkFDbEIsK0JBQStCO29CQUMvQkMsUUFBUUMsR0FBRyxDQUFDRjtnQkFDZDswQkFFQyxDQUFDLEVBQUVHLE9BQU0sRUFBRUMsUUFBTyxFQUFFLGlCQUNuQiw4REFBQ3ZCLHdDQUFJQTs7MENBQ0gsOERBQUNDLHlDQUFLQTtnQ0FBQ3VCLE1BQUs7Ozs7Ozs0QkFDWEYsT0FBT2hCLFNBQVMsSUFBSWlCLFFBQVFqQixTQUFTLGlCQUNwQyw4REFBQ1E7MENBQUtRLE9BQU9oQixTQUFTOzs7Ozs0Q0FDcEIsSUFBSTswQ0FDUiw4REFBQ0wseUNBQUtBO2dDQUFDdUIsTUFBSzs7Ozs7OzRCQUNYRixPQUFPWCxRQUFRLElBQUlZLFFBQVFaLFFBQVEsaUJBQ2xDLDhEQUFDRzswQ0FBS1EsT0FBT1gsUUFBUTs7Ozs7NENBQ25CLElBQUk7MENBQ1IsOERBQUNWLHlDQUFLQTtnQ0FBQ3VCLE1BQUs7Z0NBQVFDLE1BQUs7Ozs7Ozs0QkFDeEJILE9BQU9WLEtBQUssSUFBSVcsUUFBUVgsS0FBSyxpQkFBRyw4REFBQ0U7MENBQUtRLE9BQU9WLEtBQUs7Ozs7OzRDQUFVLElBQUk7MENBQ2pFLDhEQUFDYztnQ0FBT0QsTUFBSzswQ0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPaEMsaUVBQWVaLFFBQVFBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9zcmMvcGFnZXMvcmVnaXN0ZXIvaW5kZXguanM/NzA2NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuIGltcG9ydCB7IEZvcm1paywgRm9ybSwgRmllbGQgfSBmcm9tICdmb3JtaWsnO1xuIGltcG9ydCAqIGFzIFl1cCBmcm9tICd5dXAnO1xuIFxuIGNvbnN0IFNpZ251cFNjaGVtYSA9IFl1cC5vYmplY3QoKS5zaGFwZSh7XG4gICBmaXJzdE5hbWU6IFl1cC5zdHJpbmcoKVxuICAgICAubWluKDIsICdUb28gU2hvcnQhJylcbiAgICAgLm1heCg1MCwgJ1RvbyBMb25nIScpXG4gICAgIC5yZXF1aXJlZCgnUmVxdWlyZWQnKSxcbiAgIGxhc3ROYW1lOiBZdXAuc3RyaW5nKClcbiAgICAgLm1pbigyLCAnVG9vIFNob3J0IScpXG4gICAgIC5tYXgoNTAsICdUb28gTG9uZyEnKVxuICAgICAucmVxdWlyZWQoJ1JlcXVpcmVkJyksXG4gICBlbWFpbDogWXVwLnN0cmluZygpLmVtYWlsKCdJbnZhbGlkIGVtYWlsJykucmVxdWlyZWQoJ1JlcXVpcmVkJyksXG4gfSk7XG4gXG4gY29uc3QgUmVnaXN0ZXIgPSAoKSA9PiAoXG4gICA8ZGl2PlxuICAgICA8aDE+U2lnbnVwPC9oMT5cbiAgICAgPEZvcm1pa1xuICAgICAgIGluaXRpYWxWYWx1ZXM9e3tcbiAgICAgICAgIGZpcnN0TmFtZTogJycsXG4gICAgICAgICBsYXN0TmFtZTogJycsXG4gICAgICAgICBlbWFpbDogJycsXG4gICAgICAgfX1cbiAgICAgICB2YWxpZGF0aW9uU2NoZW1hPXtTaWdudXBTY2hlbWF9XG4gICAgICAgb25TdWJtaXQ9e3ZhbHVlcyA9PiB7XG4gICAgICAgICAvLyBzYW1lIHNoYXBlIGFzIGluaXRpYWwgdmFsdWVzXG4gICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZXMpO1xuICAgICAgIH19XG4gICAgID5cbiAgICAgICB7KHsgZXJyb3JzLCB0b3VjaGVkIH0pID0+IChcbiAgICAgICAgIDxGb3JtPlxuICAgICAgICAgICA8RmllbGQgbmFtZT1cImZpcnN0TmFtZVwiIC8+XG4gICAgICAgICAgIHtlcnJvcnMuZmlyc3ROYW1lICYmIHRvdWNoZWQuZmlyc3ROYW1lID8gKFxuICAgICAgICAgICAgIDxkaXY+e2Vycm9ycy5maXJzdE5hbWV9PC9kaXY+XG4gICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICA8RmllbGQgbmFtZT1cImxhc3ROYW1lXCIgLz5cbiAgICAgICAgICAge2Vycm9ycy5sYXN0TmFtZSAmJiB0b3VjaGVkLmxhc3ROYW1lID8gKFxuICAgICAgICAgICAgIDxkaXY+e2Vycm9ycy5sYXN0TmFtZX08L2Rpdj5cbiAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgIDxGaWVsZCBuYW1lPVwiZW1haWxcIiB0eXBlPVwiZW1haWxcIiAvPlxuICAgICAgICAgICB7ZXJyb3JzLmVtYWlsICYmIHRvdWNoZWQuZW1haWwgPyA8ZGl2PntlcnJvcnMuZW1haWx9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICA8L0Zvcm0+XG4gICAgICAgKX1cbiAgICAgPC9Gb3JtaWs+XG4gICA8L2Rpdj5cbiApO1xuXG4gZXhwb3J0IGRlZmF1bHQgUmVnaXN0ZXIiXSwibmFtZXMiOlsiUmVhY3QiLCJGb3JtaWsiLCJGb3JtIiwiRmllbGQiLCJZdXAiLCJTaWdudXBTY2hlbWEiLCJvYmplY3QiLCJzaGFwZSIsImZpcnN0TmFtZSIsInN0cmluZyIsIm1pbiIsIm1heCIsInJlcXVpcmVkIiwibGFzdE5hbWUiLCJlbWFpbCIsIlJlZ2lzdGVyIiwiZGl2IiwiaDEiLCJpbml0aWFsVmFsdWVzIiwidmFsaWRhdGlvblNjaGVtYSIsIm9uU3VibWl0IiwidmFsdWVzIiwiY29uc29sZSIsImxvZyIsImVycm9ycyIsInRvdWNoZWQiLCJuYW1lIiwidHlwZSIsImJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/register/index.js\n");

/***/ }),

/***/ "formik":
/*!*************************!*\
  !*** external "formik" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("formik");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "yup":
/*!**********************!*\
  !*** external "yup" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("yup");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/register/index.js"));
module.exports = __webpack_exports__;

})();