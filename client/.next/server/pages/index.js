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
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// export async function getServerSideProps() {\n//   const res = await axios.get('/api/users/currentuser');\n//   return res.data;\n// }\nconst LandingPage = ({ currentUser  })=>{\n    console.log(currentUser);\n    axios__WEBPACK_IMPORTED_MODULE_1___default().get('/api/users/currentuser').catch((err)=>{\n        console.log(err.message);\n    });\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n        children: \"Landing Page\"\n    }, void 0, false, {\n        fileName: \"/home/vladncode/ticketing-microservices/client/pages/index.js\",\n        lineNumber: 15,\n        columnNumber: 10\n    }, undefined));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBeUI7QUFFekIsRUFBK0M7QUFDL0MsRUFBMkQ7QUFFM0QsRUFBcUI7QUFDckIsRUFBSTtBQUVKLEtBQUssQ0FBQ0MsV0FBVyxJQUFJLENBQUMsQ0FBQ0MsV0FBVyxFQUFDLENBQUMsR0FBSyxDQUFDO0lBQ3hDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsV0FBVztJQUN2QkYsZ0RBQVMsQ0FBQyxDQUF3Qix5QkFBRU0sS0FBSyxFQUFDQyxHQUFHLEdBQUksQ0FBQztRQUNoREosT0FBTyxDQUFDQyxHQUFHLENBQUNHLEdBQUcsQ0FBQ0MsT0FBTztJQUN6QixDQUFDO0lBRUQsTUFBTSw2RUFBRUMsQ0FBRTtrQkFBQyxDQUFZOzs7Ozs7QUFDekIsQ0FBQztBQUVELGlFQUFlUixXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbi8vIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXJ2ZXJTaWRlUHJvcHMoKSB7XG4vLyAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS91c2Vycy9jdXJyZW50dXNlcicpO1xuXG4vLyAgIHJldHVybiByZXMuZGF0YTtcbi8vIH1cblxuY29uc3QgTGFuZGluZ1BhZ2UgPSAoeyBjdXJyZW50VXNlciB9KSA9PiB7XG4gIGNvbnNvbGUubG9nKGN1cnJlbnRVc2VyKTtcbiAgYXhpb3MuZ2V0KCcvYXBpL3VzZXJzL2N1cnJlbnR1c2VyJykuY2F0Y2goZXJyID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gIH0pO1xuXG4gIHJldHVybiA8aDE+TGFuZGluZyBQYWdlPC9oMT47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMYW5kaW5nUGFnZTtcbiJdLCJuYW1lcyI6WyJheGlvcyIsIkxhbmRpbmdQYWdlIiwiY3VycmVudFVzZXIiLCJjb25zb2xlIiwibG9nIiwiZ2V0IiwiY2F0Y2giLCJlcnIiLCJtZXNzYWdlIiwiaDEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();