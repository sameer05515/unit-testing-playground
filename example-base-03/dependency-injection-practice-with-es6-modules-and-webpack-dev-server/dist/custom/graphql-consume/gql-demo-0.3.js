/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils/global/globalHelperUtility.js":
/*!****************************************************!*\
  !*** ./src/js/utils/global/globalHelperUtility.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   idUtility: () => (/* binding */ idUtility),
/* harmony export */   styleUtility: () => (/* binding */ styleUtility)
/* harmony export */ });
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var globalHelperUtility = function () {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var generateRandomString = function generateRandomString() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        length: 10,
        prefix: ""
      },
      length = _ref.length,
      prefix = _ref.prefix;
    var result = prefix ? "".concat(prefix.toUpperCase(), "_") : "";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  var converHtmlElementToJson = function converHtmlElementToJson(element) {
    var json = {
      tagName: (element === null || element === void 0 ? void 0 : element.tagName) || "",
      attributes: {},
      innerText: (element === null || element === void 0 ? void 0 : element.innerText) || "",
      styles: {}
    };
    if (!element) {
      return json;
    }
    var _iterator = _createForOfIteratorHelper(element.attributes),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var attr = _step.value;
        json.attributes[attr.name] = attr.value;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(element.style),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var style = _step2.value;
        json.styles[style] = element.style[style];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return json;
  };
  return {
    generateRandomString: generateRandomString,
    converHtmlElementToJson: converHtmlElementToJson
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globalHelperUtility);

/**
 * Utility for generating IDs.
 * @module idUtility
 */
var idUtility = function () {
  var generateString = globalHelperUtility.generateRandomString;

  /**
   * Generates a random ID string with a specified length and prefix.
   * @param {Object} options - Options for generating the string.
   * @param {number} options.length - Length of the random string.
   * @param {string} options.prefix - Prefix for the random string.
   * @returns {string} The generated random string.
   */
  var generateId = function generateId(options) {
    return generateString(options);
  };
  return {
    generateId: generateId
  };
}();

/**
 * Utility for applying styles to elements.
 * @module styleUtility
 */
var styleUtility = function () {
  /**
   * Applies styles to a given element.
   * @param {HTMLElement} element - The element to style.
   * @param {Object} styles - An object containing the styles to apply.
   */
  var applyStyles = function applyStyles(element, styles) {
    if (!element || !styles) {
      return;
    }
    for (var property in styles) {
      if (styles.hasOwnProperty(property)) {
        element.style[property] = styles[property];
      }
    }
  };

  /**
   * Returns default styles for a given element type.
   * @param {string} elementType - The type of the element.
   * @returns {Object} The default styles for the element type.
   */
  var getDefaultStyle = function getDefaultStyle(elementType) {
    var defaultStyles = {
      div: {
        border: '1px solid #000',
        padding: '10px',
        margin: '5px'
      },
      input: {
        padding: '5px',
        margin: '5px'
      },
      button: {
        padding: '10px 20px',
        margin: '5px',
        cursor: 'pointer'
      },
      span: {
        margin: '5px'
      },
      select: {
        padding: '5px',
        margin: '5px'
      },
      h1: {
        fontSize: '24px',
        margin: '10px 0'
      },
      h2: {
        fontSize: '20px',
        margin: '10px 0'
      },
      h3: {
        fontSize: '16px',
        margin: '10px 0'
      },
      p: {
        margin: '10px 0'
      },
      ul: {
        margin: '10px 0',
        padding: '0',
        listStyleType: 'none'
      },
      li: {
        margin: '5px 0'
      },
      img: {
        maxWidth: '100%',
        height: 'auto'
      },
      a: {
        color: '#007BFF',
        textDecoration: 'none',
        cursor: 'pointer'
      },
      header: {
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e5e5e5'
      },
      footer: {
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e5e5e5'
      },
      section: {
        padding: '10px',
        margin: '10px 0'
      },
      article: {
        padding: '10px',
        margin: '10px 0'
      }
    };
    return defaultStyles[elementType.toLowerCase()] || {};
  };
  return {
    applyStyles: applyStyles,
    getDefaultStyle: getDefaultStyle
  };
}();

/***/ }),

/***/ "./src/modules/common/ElementCreatorUtil.js":
/*!**************************************************!*\
  !*** ./src/modules/common/ElementCreatorUtil.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: () => (/* binding */ applyStyles),
/* harmony export */   createButton: () => (/* binding */ createButton),
/* harmony export */   createDiv: () => (/* binding */ createDiv),
/* harmony export */   createInput: () => (/* binding */ createInput),
/* harmony export */   createLabel: () => (/* binding */ createLabel),
/* harmony export */   createSelect: () => (/* binding */ createSelect),
/* harmony export */   removeStyles: () => (/* binding */ removeStyles),
/* harmony export */   resetStyles: () => (/* binding */ resetStyles)
/* harmony export */ });
// ElementCreatorUtil.js

var applyStyles = function applyStyles(element, styles) {
  for (var property in styles) {
    element.style[property] = styles[property];
  }
};
var removeStyles = function removeStyles(element, styles) {
  for (var property in styles) {
    element.style[property] = '';
  }
};
var resetStyles = function resetStyles(element) {
  element.style.cssText = '';
};
var createElement = function createElement(tag) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var innerHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var styles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var events = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var element = document.createElement(tag);
  Object.keys(attributes).forEach(function (attr) {
    return element.setAttribute(attr, attributes[attr]);
  });
  applyStyles(element, styles);
  element.innerHTML = innerHTML;

  // Attach event listeners
  Object.keys(events).forEach(function (event) {
    element.addEventListener(event, events[event]);
  });
  return element;
};
var createButton = function createButton() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // common validation method applied for any element type
  // validation required for element type: button
  var button = createElement('button', attributes, innerHTML, styles, events);
  return button;
};
var createDiv = function createDiv() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // common validation method applied for any element type
  // validation required for element type: div
  var button = createElement('div', attributes, innerHTML, styles, events);
  return button;
};
var createSelect = function createSelect() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var events = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var optionStyles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var select = createElement('select', attributes, '', styles, events);
  options.forEach(function (optionData) {
    var option = document.createElement('option');
    option.value = optionData.value;
    option.innerText = optionData.label;
    applyStyles(option, optionStyles); // Apply styles to each option
    select.appendChild(option);
  });
  return select;
};
var createInput = function createInput() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return createElement('input', attributes, innerHTML, styles, events);
};
var createLabel = function createLabel() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var label = createElement('label', attributes, innerHTML, styles, events);
  return label;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./src/scripts/custom/graphql-consume/gql-demo-0.3.js ***!
  \************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../modules/common/ElementCreatorUtil */ "./src/modules/common/ElementCreatorUtil.js");
/* harmony import */ var _js_utils_global_globalHelperUtility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/utils/global/globalHelperUtility */ "./src/js/utils/global/globalHelperUtility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



// GraphQL Fetch Function
var fetchGraphQL = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
    var variables,
      response,
      responseBody,
      errorMessage,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.next = 3;
          return fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          });
        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();
        case 6:
          responseBody = _context.sent;
          if (!(!response.ok || responseBody.errors)) {
            _context.next = 10;
            break;
          }
          errorMessage = responseBody.errors ? responseBody.errors.map(function (error) {
            return error.message;
          }).join(", ") : response.statusText;
          throw new Error("GraphQL error: ".concat(errorMessage));
        case 10:
          return _context.abrupt("return", responseBody.data);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function fetchGraphQL(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Example usage
var query = "\n    query GetResume($uniqueId: String!) {\n        getResume(uniqueId: $uniqueId) {\n            uniqueId\n            introduction\n            processedDetails {\n                metadata\n                textType\n            }\n            companies {\n                name\n                processedDetails {\n                    metadata\n                    textType\n                }\n                projects {\n                    name\n                    processedDetails {\n                        metadata\n                        textType\n                    }\n                    uniqueId\n                }\n                uniqueId\n            }\n            educations {\n                uniqueId\n                name\n                processedDetails {\n                    metadata\n                    textType\n                }\n            }\n        }\n    }\n";
var variables = {
  uniqueId: "0f20819b-c89e-4bdc-8613-5a9a99445533"
};

/// helper utility
var getNewId = function getNewId() {
  return _js_utils_global_globalHelperUtility__WEBPACK_IMPORTED_MODULE_1__.idUtility.generateId({
    length: 20,
    prefix: ""
  });
};
var wrapInStrongEl = function wrapInStrongEl(text) {
  return "<strong>".concat(text, "</strong>");
};
var wrapInItalicEl = function wrapInItalicEl(text) {
  return "<i>".concat(text, "</i>");
};
var createStyledAnchor = function createStyledAnchor(href, text) {
  var anchor = document.createElement('a');
  anchor.href = href;
  anchor.innerText = text;

  // Applying styles using JSON format
  var styles = {
    'text-decoration': 'none',
    'color': 'black',
    'cursor': 'pointer'
  };
  for (var style in styles) {
    anchor.style[style] = styles[style];
  }
  return anchor;
};

// "General Info Div"
var getGeneralInfoDiv = function getGeneralInfoDiv(resumedata) {
  var _resumedata$getResume = resumedata.getResume.processedDetails.metadata,
    _resumedata$getResume2 = _resumedata$getResume.personalDetails,
    employeeName = _resumedata$getResume2.name,
    employeeContactNumbers = _resumedata$getResume2.contactNumbers,
    employeeEmails = _resumedata$getResume2.emails,
    lastDesignation = _resumedata$getResume.lastDesignation,
    totalExperience = _resumedata$getResume.totalExperience;
  var generalInfo = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "", {
    display: "flex",
    justifyContent: "space-between",
    //padding: '10px',
    border: "1px solid #ccc",
    marginTop: "10px",
    borderRadius: "8px",
    gap: "250px" // Add gap between divs
  });

  // Create the first child div with text "div1"
  var nameAndLastDesignationDivEl = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "name and last designation", {
    flex: "1",
    padding: "10px",
    // border: '1px solid #ccc',
    borderRadius: "8px"
  });
  nameAndLastDesignationDivEl.innerHTML = "\n        <h2>".concat(employeeName, "</h2>\n        <p>").concat(lastDesignation.toUpperCase(), "</p>        \n    ");

  // Create the second child div with text "div2"
  var phoneEmailAndTotalExperienceDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "phone, email, total experience", {
    flex: "1",
    padding: "10px",
    // border: '1px solid #ccc',
    borderRadius: "8px"
  });
  phoneEmailAndTotalExperienceDiv.innerHTML = "\n    <p>".concat(wrapInStrongEl("Phone:"), " ").concat(wrapInItalicEl(employeeContactNumbers.map(function (contact) {
    return "<span>".concat(contact, "</span>");
  }).join(", ")), "</p>\n\n    <p>").concat(wrapInStrongEl("Email:"), " ").concat(wrapInItalicEl(employeeEmails.map(function (contact) {
    return "<span>".concat(contact, "</span>");
  }).join(", ")), "</p>\n\n    <p>").concat(wrapInStrongEl("Total Experience:"), " ").concat(wrapInItalicEl(totalExperience), "</p>\n    ");

  // Append the child divs to the generalInfo div
  generalInfo.appendChild(nameAndLastDesignationDivEl);
  generalInfo.appendChild(phoneEmailAndTotalExperienceDiv);
  return generalInfo;
};

// =================== "Main Info Div" =====================

// const getKeySkillsDiv=(employeeKeySkills)=>{
//     const employeeKeySkillsDiv= createDiv({id: getNewId()}, '', {}, {});

//     const innerDiv= createDiv({id: getNewId()});
//     innerDiv.style.cssText=`
//     .bulleted-list {
//         list-style-type: disc;
//         padding-left: 20px; /* Adjust based on your bullet position preference */
//     }

//     .bulleted-list > div {
//         position: relative;
//         margin-left: 20px; /* Adjust based on your bullet position preference */
//     }

//     .bulleted-list > div::before {
//         content: "•"; /* Bullet character */
//         position: absolute;
//         left: -20px; /* Adjust based on your bullet position preference */
//     }
//     `

//     employeeKeySkillsDiv.innerHTML=`
//     ${wrapInStrongEl('Key skills')}    
//     `;

//     innerDiv.innerHTML=`
//     <div class="bulleted-list">
//         ${employeeKeySkills.map(
//             ({stream, duration}) => `<div>${wrapInStrongEl(stream)} for ${duration}</div>`
//         ).join('')}
//     </div>
//     `

//     employeeKeySkillsDiv.appendChild(innerDiv);

//     return employeeKeySkillsDiv;
// }

var getKeySkillsDiv = function getKeySkillsDiv(employeeKeySkills) {
  var employeeKeySkillsDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, '', {}, {});
  var innerDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  });

  // Inline CSS should only include style rules, not CSS selectors
  innerDiv.style.cssText = "\n        list-style-type: disc;\n        padding-left: 20px; /* Adjust based on your bullet position preference */\n    ";
  employeeKeySkillsDiv.innerHTML = "\n    ".concat(wrapInStrongEl('Key skills'), "\n    ");
  innerDiv.innerHTML = "\n    <div class=\"bulleted-list\">\n        ".concat(employeeKeySkills.map(function (_ref2) {
    var stream = _ref2.stream,
      duration = _ref2.duration;
    return "<div>".concat(wrapInStrongEl(stream), " for ").concat(duration, "</div>");
  }).join(''), "\n    </div>\n    ");
  employeeKeySkillsDiv.appendChild(innerDiv);
  return employeeKeySkillsDiv;
};
var getCertificationsDiv = function getCertificationsDiv(employeeCertifications) {
  var employeeCertificationsDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, '', {
    marginTop: '10px'
  }, {});
  var innerDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  });
  // Inline CSS should only include style rules, not CSS selectors
  innerDiv.style.cssText = "\n        list-style-type: disc;\n        padding-left: 20px; /* Adjust based on your bullet position preference */\n    ";
  employeeCertificationsDiv.innerHTML = "\n    ".concat(wrapInStrongEl('Certifications:'), "\n    ");
  innerDiv.innerHTML = "\n    <div class=\"bulleted-list\">\n        ".concat(employeeCertifications.map(function (_ref3) {
    var name = _ref3.name,
      provider = _ref3.provider,
      url = _ref3.url;
    return "<div>\n                <a style=\"text-decoration: none; color: black; cursor: pointer;\" href=\"".concat(url, "\">\n                    ").concat(wrapInStrongEl(name), " by ").concat(wrapInItalicEl(provider), "\n                </a>            \n            </div>");
  }).join(''), "\n    </div>\n    ");
  employeeCertificationsDiv.appendChild(innerDiv);
  return employeeCertificationsDiv;
};
var getLanguagesDiv = function getLanguagesDiv(employeeLanguages) {
  var employeeLanguagesDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, '', {
    marginTop: '10px'
  }, {});
  var innerDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  });
  // Inline CSS should only include style rules, not CSS selectors
  innerDiv.style.cssText = "\n        list-style-type: disc;\n        padding-left: 20px; /* Adjust based on your bullet position preference */\n    ";
  employeeLanguagesDiv.innerHTML = "\n    ".concat(wrapInStrongEl('Languages:'), "\n    ");
  innerDiv.innerHTML = "\n    <div class=\"bulleted-list\">\n        ".concat(employeeLanguages.map(function (language) {
    return "<div>\n                ".concat(language, "                            \n            </div>");
  }).join(''), "\n    </div>\n    ");
  employeeLanguagesDiv.appendChild(innerDiv);
  return employeeLanguagesDiv;
};
var getHobbiesDiv = function getHobbiesDiv(employeeHobbies) {
  var employeeHobbiesDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, '', {
    marginTop: '10px'
  }, {});
  var innerDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  });
  // Inline CSS should only include style rules, not CSS selectors
  innerDiv.style.cssText = "\n        list-style-type: disc;\n        padding-left: 20px; /* Adjust based on your bullet position preference */\n    ";
  employeeHobbiesDiv.innerHTML = "\n    ".concat(wrapInStrongEl('Hobbies:'), "\n    ");
  innerDiv.innerHTML = "\n    <div class=\"bulleted-list\">\n        ".concat(employeeHobbies.map(function (hobby) {
    return "<div>\n                ".concat(hobby, "                            \n            </div>");
  }).join(''), "\n    </div>\n    ");
  employeeHobbiesDiv.appendChild(innerDiv);
  return employeeHobbiesDiv;
};
var getMainInfoDiv = function getMainInfoDiv(resumedata) {
  var _resumedata$getResume3 = resumedata.getResume.processedDetails.metadata,
    employeeKeySkills = _resumedata$getResume3.expertises,
    employeeCertifications = _resumedata$getResume3.certifications,
    employeeLanguages = _resumedata$getResume3.languagesKnown,
    employeeHobbies = _resumedata$getResume3.hobbies;
  var mainInfoDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "", {
    display: "flex",
    justifyContent: "space-between",
    //padding: '10px',
    border: "1px solid #ccc",
    marginTop: "10px",
    borderRadius: "8px",
    gap: "50px" // Add gap between divs
  });

  // Create the first child div with text "div1"
  var keySkillsCertificationsLanguagesAndHobbiesDivEl = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "Key Skills, Certifications, Languages and Hobbies, vertically", {
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px"
  });
  keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getKeySkillsDiv(employeeKeySkills));
  keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getCertificationsDiv(employeeCertifications));
  keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getLanguagesDiv(employeeLanguages));
  keySkillsCertificationsLanguagesAndHobbiesDivEl.appendChild(getHobbiesDiv(employeeHobbies));

  // Create the second child div with text "div2"
  var profileSummayWorkExperienceEducationAndProjectsDivEl = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "Profile Summay, Work Experience, Education, Projects", {
    flex: "3",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px"
  });

  // Append the child divs to the generalInfo div
  mainInfoDiv.appendChild(keySkillsCertificationsLanguagesAndHobbiesDivEl);
  mainInfoDiv.appendChild(profileSummayWorkExperienceEducationAndProjectsDivEl);
  return mainInfoDiv;
};

// - create main container div
// - create 2 divs, horizontally. one conaintaining name and last designation. other conataining phone, email, total experience.
// - create 2 divs horizontally.
// -- 1st div contains divs for Key Skills, Certifications, Languages and Hobbies, vertically
// -- 2nd div contains divs for Profile Summay, Work Experience, Education, Projects
var renderResume = function renderResume(resumeData) {
  // Adding styles via a class instead of inline styles
  var style = document.createElement('style');
  style.textContent = "\n        .bulleted-list {\n            list-style-type: disc;\n            padding-left: 20px; /* Adjust based on your bullet position preference */\n        }\n\n        .bulleted-list > div {\n            position: relative;\n            padding-top: 10px;\n            margin-left: 10px; /* Adjust based on your bullet position preference */\n        }\n\n        .bulleted-list > div::before {\n            content: \"\u2022\"; /* Bullet character */\n            position: absolute;\n            left: -10px; /* Adjust based on your bullet position preference */\n        }\n    ";
  document.head.appendChild(style);
  var container = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({
    id: getNewId()
  }, "Container Div", {
    border: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px"
  });
  container.appendChild(
  // getGeneralInfoDiv(resumeData.getResume.processedDetails.metadata);
  getGeneralInfoDiv(resumeData));
  container.appendChild(getMainInfoDiv(resumeData));
  document.body.appendChild(container);
};

// Fetch Data Function
var fetchData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var data;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return fetchGraphQL(query, variables);
        case 3:
          data = _context2.sent;
          console.log("GraphQL data:", data);
          // preEl.innerHTML = JSON.stringify(data, null, 2);
          // preEl.style.display = 'none';
          // togglePreBtn.innerText = 'Show';
          renderResume(data);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error("GraphQL error:", _context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function fetchData() {
    return _ref4.apply(this, arguments);
  };
}();
fetchData();
/******/ })()
;
//# sourceMappingURL=gql-demo-0.3.js.map