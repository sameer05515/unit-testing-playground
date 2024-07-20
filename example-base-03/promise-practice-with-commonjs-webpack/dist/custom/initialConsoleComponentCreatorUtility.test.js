/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/v1/cssStylesUtility.js":
/*!********************************************!*\
  !*** ./src/modules/v1/cssStylesUtility.js ***!
  \********************************************/
/***/ ((module) => {

// cssStylesUtility.js
var cssStylesUtility = function () {
  var styles = {
    div: {
      fontSize: "12px",
      padding: "10px",
      width: "1000px",
      height: "1000px",
      border: "1px solid",
      borderLeft: "5px solid blue"
    },
    input: {
      backgroundColor: "yellow"
    },
    button: {
      backgroundColor: "green"
    },
    span: {
      backgroundColor: "pink"
    }
  };
  return {
    styles: styles
  };
}();
module.exports = cssStylesUtility;

/***/ }),

/***/ "./src/modules/v1/elementAdderUtility.js":
/*!***********************************************!*\
  !*** ./src/modules/v1/elementAdderUtility.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// elementAdderUtility.js
var globalHelperUtility = __webpack_require__(/*! ./globalHelperUtility */ "./src/modules/v1/globalHelperUtility.js");
var elementAdderUtility = function () {
  var generateString = globalHelperUtility.generateRandomString;
  var defaultStyles = {
    div: {
      width: "300px",
      height: "300px",
      border: "1px solid",
      borderLeft: "5px solid blue"
    },
    input: {
      width: "300px",
      height: "30px",
      border: "1px solid",
      padding: "5px"
    },
    button: {
      width: "100px",
      height: "40px",
      border: "1px solid",
      backgroundColor: "blue",
      color: "white",
      borderRadius: "5px"
    },
    span: {
      padding: "5px",
      fontSize: "16px",
      color: "black"
    }
  };
  var applyStyles = function applyStyles(element, styles) {
    if (!element || !styles) return;
    for (var property in styles) {
      if (styles.hasOwnProperty(property)) {
        element.style[property] = styles[property];
      }
    }
  };
  var addElementWithPromise = function addElementWithPromise() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        elementType: "",
        addToBody: false,
        parentElementId: "",
        style: {},
        innerText: "",
        onClick: function onClick() {},
        showInnerText: true
      },
      elementType = _ref.elementType,
      addToBody = _ref.addToBody,
      parentElementId = _ref.parentElementId,
      style = _ref.style,
      innerText = _ref.innerText,
      onClick = _ref.onClick,
      showInnerText = _ref.showInnerText;
    return new Promise(function (resolve, reject) {
      var parentElement = null;
      if (!elementType || !["div", "input", "button", "span"].includes(elementType.trim().toLowerCase())) {
        reject(new Error("Invalid elementType provided '".concat(elementType, "'")));
        return;
      } else if (addToBody && parentElementId && parentElementId.trim().length > 0) {
        reject(new Error("[Ambiguous situation]: Both addToBody : '".concat(addToBody, "' and parentElementId : '").concat(parentElementId, "' {A non-empty value} should not be provided.")));
        return;
      } else if (!addToBody && (!parentElementId || parentElementId.trim().length < 1)) {
        reject(new Error("Unable to create element with addToBody:'".concat(addToBody, "' and parentElementId : '").concat(parentElementId, "' {An invalid value} is provided simultaneously.")));
        return;
      } else if (!addToBody && parentElementId) {
        parentElement = document.getElementById(parentElementId);
        if (!parentElement) {
          reject(new Error("Parent Element with ID '".concat(parentElementId, "' does not exist.")));
          return;
        }
      }
      var htmlElementToBeCreated = null;
      var id = generateString({
        length: 20,
        prefix: elementType
      });
      switch (elementType.trim().toLowerCase()) {
        case "div":
        case "input":
        case "button":
        case "span":
          htmlElementToBeCreated = document.createElement(elementType);
          htmlElementToBeCreated.id = id;
          applyStyles(htmlElementToBeCreated, defaultStyles[elementType]);
          applyStyles(htmlElementToBeCreated, style);
          if (showInnerText) {
            htmlElementToBeCreated.innerText = innerText || id;
            if (elementType === "input") {
              htmlElementToBeCreated.placeholder = innerText || id;
            }
          }
          if (onClick && typeof onClick === "function") {
            htmlElementToBeCreated.addEventListener('click', onClick);
          }
          addToBody ? document.body.append(htmlElementToBeCreated) : parentElement.appendChild(htmlElementToBeCreated);
          resolve(htmlElementToBeCreated);
          break;
        default:
          htmlElementToBeCreated = null;
          break;
      }
      if (!htmlElementToBeCreated) {
        reject(new Error("Error occurred while creating element of type '".concat(elementType, "'")));
      }
    });
  };
  return {
    addElementWithPromise: addElementWithPromise
  };
}();
module.exports = elementAdderUtility;

/***/ }),

/***/ "./src/modules/v1/globalHelperUtility.js":
/*!***********************************************!*\
  !*** ./src/modules/v1/globalHelperUtility.js ***!
  \***********************************************/
/***/ ((module) => {

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// globalHelperUtility.js
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
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
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
    if (!element) return json;
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
module.exports = globalHelperUtility;

/***/ }),

/***/ "./src/modules/v1/initialConsoleComponentCreatorUtility.js":
/*!*****************************************************************!*\
  !*** ./src/modules/v1/initialConsoleComponentCreatorUtility.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// initialConsoleComponentCreatorUtility.js

// Import dependencies
var LOGGER = __webpack_require__(/*! ./loggerUtility */ "./src/modules/v1/loggerUtility.js"); // Adjust the path as needed
var _require = __webpack_require__(/*! ./cssStylesUtility */ "./src/modules/v1/cssStylesUtility.js"),
  cssStyles = _require.styles; // Adjust the path as needed
var _require2 = __webpack_require__(/*! ./elementAdderUtility */ "./src/modules/v1/elementAdderUtility.js"),
  addElementWithPromise = _require2.addElementWithPromise; // Adjust the path as needed

// Define initial components
var components = [{
  elementType: "div",
  addToBody: true,
  style: cssStyles.div,
  name: "Container div"
}, {
  elementType: "button",
  addToBody: true,
  style: cssStyles.div,
  // This seems incorrect, it should be cssStyles.button
  innerText: "Restart",
  onClick: function onClick() {},
  name: "Button to be added in container div"
}, {
  elementType: "div",
  addToBody: true,
  style: cssStyles.div,
  name: "Message logger div"
}];

// Main function to create initial components
function createInitialComponents() {
  return _createInitialComponents.apply(this, arguments);
} // Exporting the function
function _createInitialComponents() {
  _createInitialComponents = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var successCallback,
      failCallback,
      addButton,
      restartButtonOnClick,
      myContainerDivId,
      componentsCreatedSuccessfully,
      createdElement,
      newlyAddedDiv,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          successCallback = _args.length > 0 && _args[0] !== undefined ? _args[0] : function () {};
          failCallback = _args.length > 1 && _args[1] !== undefined ? _args[1] : function () {};
          addButton = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
          restartButtonOnClick = _args.length > 3 && _args[3] !== undefined ? _args[3] : function () {};
          myContainerDivId = null;
          componentsCreatedSuccessfully = false; // Adding restart button if required
          if (!addButton) {
            _context.next = 17;
            break;
          }
          _context.prev = 7;
          _context.next = 10;
          return addElementWithPromise({
            elementType: "button",
            addToBody: true,
            innerText: "Restart",
            onClick: restartButtonOnClick,
            showInnerText: true
          });
        case 10:
          createdElement = _context.sent;
          LOGGER.info("".concat(createdElement.tagName, " is created successfully with id: '").concat(createdElement.id, "'!"));
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](7);
          LOGGER.error("Error: ".concat(_context.t0.message));
        case 17:
          _context.prev = 17;
          _context.next = 20;
          return addElementWithPromise({
            elementType: "div",
            addToBody: true,
            style: cssStyles.div
          });
        case 20:
          newlyAddedDiv = _context.sent;
          LOGGER.success("[Success]: Created div: ".concat(newlyAddedDiv.id));
          myContainerDivId = newlyAddedDiv.id;
          LOGGER.registerLoggingConfig(newlyAddedDiv);
          componentsCreatedSuccessfully = true;
          _context.next = 31;
          break;
        case 27:
          _context.prev = 27;
          _context.t1 = _context["catch"](17);
          LOGGER.error("[Warning]: Error occurred: ".concat(_context.t1));
          LOGGER.error("[".concat(new Date(), "]: Stopping element creation due to error."));
        case 31:
          // Handling success or failure callbacks
          if (componentsCreatedSuccessfully) {
            LOGGER.info("All initial components created successfully!");
            successCallback(myContainerDivId);
          } else {
            LOGGER.error("Stopping as error occurred in initial components creation.");
            failCallback("Stopping as error occurred in initial components creation.");
          }
        case 32:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 14], [17, 27]]);
  }));
  return _createInitialComponents.apply(this, arguments);
}
module.exports = {
  createInitialComponents: createInitialComponents
};

/***/ }),

/***/ "./src/modules/v1/loggerUtility.js":
/*!*****************************************!*\
  !*** ./src/modules/v1/loggerUtility.js ***!
  \*****************************************/
/***/ ((module) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// loggerUtility.js

var registeredElement = null;
var validConfig = function validConfig() {
  if (registeredElement) {
    return true;
  } else {
    console.warn("No valid appender found. Logging utility is not initialized properly. Only console logs will be shown .");
    return false;
  }
};
var registerLoggingConfig = function registerLoggingConfig(element, elementId) {
  if (element) {
    registeredElement = element;
  } else if (elementId) {
    var el = document.getElementById(elementId);
    if (el) {
      registeredElement = el;
    }
  }
};

// === creating spans for appropriate log level ==============

var getStylesForType = function getStylesForType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'container';
  var baseStyle = {
    color: 'black',
    //padding: '5px',
    margin: '3px',
    borderRadius: '3px',
    whiteSpace: "pre-wrap",
    display: 'block'
  };
  switch (type) {
    case 'error':
    case 'trace':
    case 'debug':
      return _objectSpread(_objectSpread({}, baseStyle), {}, {
        color: 'red'
      });
    case 'warn':
      return _objectSpread(_objectSpread({}, baseStyle), {}, {
        color: 'black',
        backgroundColor: 'yellow'
      });
    case 'info':
      return _objectSpread(_objectSpread({}, baseStyle), {}, {
        color: 'blue'
      });
    case 'success':
      return _objectSpread(_objectSpread({}, baseStyle), {}, {
        color: 'green'
      });
    default:
      return _objectSpread({}, baseStyle);
  }
};
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
var createMessageSpan = function createMessageSpan() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var logMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var span = document.createElement('span');
  applyStyles(span, getStylesForType(type));
  // span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${text.timestamp}]: ${text.logMessage}`;
  // span.innerHTML = `<b>[${type.toUpperCase()}]: </b>[${new Date().toString()}]: <pre>${logMessage}</pre>`;
  span.innerHTML = "<b>[".concat(type.toUpperCase(), "]: </b>[").concat(new Date().toString(), "]: ").concat(logMessage);
  return span;
};

// ==== Appending to div
var appendInnerHtmlToElement = function appendInnerHtmlToElement(message) {
  var logLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "info";
  if (!validConfig()) {
    return;
  }
  // registeredElement.innerHTML += some;
  var messageSpan = createMessageSpan(logLevel, message);
  registeredElement.appendChild(messageSpan);
};
var resetInnerHtmlToElement = function resetInnerHtmlToElement() {
  if (!validConfig()) {
    return;
  }
  registeredElement.innerHTML = "<b>Logs to be displayed:-</b>";
};
var reset = function reset() {
  resetInnerHtmlToElement();
};
var logToConsole = function logToConsole(message) {
  var logLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  if (logLevel && message) {
    switch (logLevel) {
      case "info":
        console.info("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
      case "warn":
        console.warn("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
      case "success":
        console.info("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
      case "error":
        console.error("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
      case "debug":
        console.debug("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
      case "trace":
        console.trace("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
      default:
        console.warn("Invalid/Unknown Log Level: '".concat(logLevel, "'."));
        console.log("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
        break;
    }
  }
};
var log = function log() {
  var logLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "info";
  for (var _len = arguments.length, message = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    message[_key - 1] = arguments[_key];
  }
  if (!logLevel || !["info", "warn", "success", "error", "debug", "trace"].includes(logLevel.trim().toLowerCase())) {
    console.log("Invalid/Unknown Log Level: '".concat(logLevel, "'. Unable to log message."));
    return;
  } else if (!message) {
    console.log("Invalid Message: '".concat(message, "'. Unable to log message."));
    return;
  }
  logToConsole(message, logLevel);
  appendInnerHtmlToElement(message, logLevel);
};
var info = function info() {
  for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    message[_key2] = arguments[_key2];
  }
  return log("info", message);
};
var warning = function warning() {
  for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    message[_key3] = arguments[_key3];
  }
  return log("warn", message);
};
var success = function success() {
  for (var _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    message[_key4] = arguments[_key4];
  }
  return log("success", message);
};
var error = function error() {
  for (var _len5 = arguments.length, message = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    message[_key5] = arguments[_key5];
  }
  return log("error", message);
};
var trace = function trace() {
  for (var _len6 = arguments.length, message = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    message[_key6] = arguments[_key6];
  }
  return log("trace", message);
};
var debug = function debug() {
  for (var _len7 = arguments.length, message = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    message[_key7] = arguments[_key7];
  }
  return log("debug", message);
};
module.exports = {
  registerLoggingConfig: registerLoggingConfig,
  info: info,
  warning: warning,
  success: success,
  error: error,
  trace: trace,
  debug: debug,
  reset: reset
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
/*!**************************************************************************!*\
  !*** ./src/scripts/custom/initialConsoleComponentCreatorUtility.test.js ***!
  \**************************************************************************/
// main.js (or any other module where you want to use createInitialComponents)

// Require the module where createInitialComponents is defined
var _require = __webpack_require__(/*! ../../modules/v1/initialConsoleComponentCreatorUtility */ "./src/modules/v1/initialConsoleComponentCreatorUtility.js"),
  createInitialComponents = _require.createInitialComponents;
var LOGGER = __webpack_require__(/*! ../../modules/v1/loggerUtility */ "./src/modules/v1/loggerUtility.js");

// Define success and fail callbacks
var successCallback = function successCallback(containerId) {
  LOGGER.info("Initialization succeeded! Container div id: ".concat(containerId));
  // Additional logic after successful initialization
};
var failCallback = function failCallback(error) {
  LOGGER.error("Initialization failed: ".concat(error));
  // Additional error handling logic
};

// Define an optional restart button click handler
var restartButtonOnClick = function restartButtonOnClick() {
  LOGGER.info('Restart button clicked!');
  // Additional logic for restart button click
};

// Call createInitialComponents with necessary arguments
createInitialComponents(successCallback, failCallback, true, restartButtonOnClick);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tL2luaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHkudGVzdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGdCQUFnQixHQUFJLFlBQU07RUFDNUIsSUFBTUMsTUFBTSxHQUFHO0lBQ1hDLEdBQUcsRUFBRTtNQUNEQyxRQUFRLEVBQUUsTUFBTTtNQUNoQkMsT0FBTyxFQUFFLE1BQU07TUFDZkMsS0FBSyxFQUFFLFFBQVE7TUFDZkMsTUFBTSxFQUFFLFFBQVE7TUFDaEJDLE1BQU0sRUFBRSxXQUFXO01BQ25CQyxVQUFVLEVBQUU7SUFDaEIsQ0FBQztJQUNEQyxLQUFLLEVBQUU7TUFBRUMsZUFBZSxFQUFFO0lBQVMsQ0FBQztJQUNwQ0MsTUFBTSxFQUFFO01BQUVELGVBQWUsRUFBRTtJQUFRLENBQUM7SUFDcENFLElBQUksRUFBRTtNQUFFRixlQUFlLEVBQUU7SUFBTztFQUNwQyxDQUFDO0VBQ0QsT0FBTztJQUFFVCxNQUFNLEVBQU5BO0VBQU8sQ0FBQztBQUNyQixDQUFDLENBQUUsQ0FBQztBQUVKWSxNQUFNLENBQUNDLE9BQU8sR0FBR2QsZ0JBQWdCOzs7Ozs7Ozs7O0FDbEJqQztBQUNBLElBQU1lLG1CQUFtQixHQUFHQyxtQkFBTyxDQUFDLHNFQUF1QixDQUFDO0FBRTVELElBQU1DLG1CQUFtQixHQUFJLFlBQU07RUFDL0IsSUFBOEJDLGNBQWMsR0FBS0gsbUJBQW1CLENBQTVESSxvQkFBb0I7RUFFNUIsSUFBTUMsYUFBYSxHQUFHO0lBQ2xCbEIsR0FBRyxFQUFFO01BQ0RHLEtBQUssRUFBRSxPQUFPO01BQ2RDLE1BQU0sRUFBRSxPQUFPO01BQ2ZDLE1BQU0sRUFBRSxXQUFXO01BQ25CQyxVQUFVLEVBQUU7SUFDaEIsQ0FBQztJQUNEQyxLQUFLLEVBQUU7TUFDSEosS0FBSyxFQUFFLE9BQU87TUFDZEMsTUFBTSxFQUFFLE1BQU07TUFDZEMsTUFBTSxFQUFFLFdBQVc7TUFDbkJILE9BQU8sRUFBRTtJQUNiLENB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QjtBQUMvQixJQUFNTCxNQUFNLEdBQUduSyxtQkFBTyxDQUFDLHlFQUFnQyxDQUFDOztBQUV4RDtBQUNBLElBQU0ySyxlQUFlLEdBQUcsU0FBbEJBLGVBQWVBLENBQUkyRCxXQUFXLEVBQUs7RUFDckNuRSxNQUFNLENBQUNtQixJQUFJLGdEQUFBdkosTUFBQSxDQUFnRHVNLFdBQVcsQ0FBRSxDQUFDO0VBQ3pFO0FBQ0osQ0FBQztBQUVELElBQU0xRCxZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBSVksS0FBSyxFQUFLO0VBQzVCckIsTUFBTSxDQUFDcUIsS0FBSywyQkFBQXpKLE1BQUEsQ0FBMkJ5SixLQUFLLENBQUUsQ0FBQztFQUMvQztBQUNKLENBQUM7O0FBRUQ7QUFDQSxJQUFNVixvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQW9CQSxDQUFBLEVBQVM7RUFDL0JYLE1BQU0sQ0FBQ21CLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztFQUN0QztBQUNKLENBQUM7O0FBRUQ7QUFDQWQsdUJBQXVCLENBQUNHLGVBQWUsRUFBRUMsWUFBWSxFQUFFLElBQUksRUFBRUUsb0JBQW9CLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LW5vZGUtcHJvamVjdC8uL3NyYy9tb2R1bGVzL3YxL2Nzc1N0eWxlc1V0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0Ly4vc3JjL21vZHVsZXMvdjEvZWxlbWVudEFkZGVyVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly9teS1ub2RlLXByb2plY3QvLi9zcmMvbW9kdWxlcy92MS9nbG9iYWxIZWxwZXJVdGlsaXR5LmpzIiwid2VicGFjazovL215LW5vZGUtcHJvamVjdC8uL3NyYy9tb2R1bGVzL3YxL2luaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHkuanMiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0Ly4vc3JjL21vZHVsZXMvdjEvbG9nZ2VyVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly9teS1ub2RlLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvY3VzdG9tL2luaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHkudGVzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8vIGNzc1N0eWxlc1V0aWxpdHkuanNcclxuY29uc3QgY3NzU3R5bGVzVXRpbGl0eSA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgZGl2OiB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBcIjEycHhcIixcclxuICAgICAgICAgICAgcGFkZGluZzogXCIxMHB4XCIsXHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjEwMDBweFwiLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMTAwMHB4XCIsXHJcbiAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcclxuICAgICAgICAgICAgYm9yZGVyTGVmdDogXCI1cHggc29saWQgYmx1ZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXQ6IHsgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiIH0sXHJcbiAgICAgICAgYnV0dG9uOiB7IGJhY2tncm91bmRDb2xvcjogXCJncmVlblwiIH0sXHJcbiAgICAgICAgc3BhbjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwicGlua1wiIH0sXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgc3R5bGVzIH07XHJcbn0pKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNzc1N0eWxlc1V0aWxpdHk7IiwiXHJcblxyXG4vLyBlbGVtZW50QWRkZXJVdGlsaXR5LmpzXHJcbmNvbnN0IGdsb2JhbEhlbHBlclV0aWxpdHkgPSByZXF1aXJlKCcuL2dsb2JhbEhlbHBlclV0aWxpdHknKTtcclxuXHJcbmNvbnN0IGVsZW1lbnRBZGRlclV0aWxpdHkgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgeyBnZW5lcmF0ZVJhbmRvbVN0cmluZzogZ2VuZXJhdGVTdHJpbmcgfSA9IGdsb2JhbEhlbHBlclV0aWxpdHk7XHJcblxyXG4gICAgY29uc3QgZGVmYXVsdFN0eWxlcyA9IHtcclxuICAgICAgICBkaXY6IHtcclxuICAgICAgICAgICAgd2lkdGg6IFwiMzAwcHhcIixcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjMwMHB4XCIsXHJcbiAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcclxuICAgICAgICAgICAgYm9yZGVyTGVmdDogXCI1cHggc29saWQgYmx1ZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgICAgd2lkdGg6IFwiMzAwcHhcIixcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjMwcHhcIixcclxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjVweFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnV0dG9uOiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjEwMHB4XCIsXHJcbiAgICAgICAgICAgIGhlaWdodDogXCI0MHB4XCIsXHJcbiAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcImJsdWVcIixcclxuICAgICAgICAgICAgY29sb3I6IFwid2hpdGVcIixcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjVweFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Bhbjoge1xyXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjVweFwiLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxNnB4XCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcImJsYWNrXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhcHBseVN0eWxlcyA9IChlbGVtZW50LCBzdHlsZXMpID0+IHtcclxuICAgICAgICBpZiAoIWVsZW1lbnQgfHwgIXN0eWxlcykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gc3R5bGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHlsZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW3Byb3BlcnR5XSA9IHN0eWxlc1twcm9wZXJ0eV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFkZEVsZW1lbnRXaXRoUHJvbWlzZSA9IChcclxuICAgICAgICB7IGVsZW1lbnRUeXBlLCBhZGRUb0JvZHksIHBhcmVudEVsZW1lbnRJZCwgc3R5bGUsIGlubmVyVGV4dCwgb25DbGljaywgc2hvd0lubmVyVGV4dCB9ID0ge1xyXG4gICAgICAgICAgICBlbGVtZW50VHlwZTogXCJcIixcclxuICAgICAgICAgICAgYWRkVG9Cb2R5OiBmYWxzZSxcclxuICAgICAgICAgICAgcGFyZW50RWxlbWVudElkOiBcIlwiLFxyXG4gICAgICAgICAgICBzdHlsZToge30sXHJcbiAgICAgICAgICAgIGlubmVyVGV4dDogXCJcIiwgICAgICAgICAgICBcclxuICAgICAgICAgICAgb25DbGljazogKCkgPT4geyB9LFxyXG4gICAgICAgICAgICBzaG93SW5uZXJUZXh0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgIWVsZW1lbnRUeXBlIHx8XHJcbiAgICAgICAgICAgICAgICAhW1wiZGl2XCIsIFwiaW5wdXRcIiwgXCJidXR0b25cIiwgXCJzcGFuXCJdLmluY2x1ZGVzKFxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRUeXBlLnRyaW0oKS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgSW52YWxpZCBlbGVtZW50VHlwZSBwcm92aWRlZCAnJHtlbGVtZW50VHlwZX0nYCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgYWRkVG9Cb2R5ICYmXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50SWQgJiZcclxuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnRJZC50cmltKCkubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBbQW1iaWd1b3VzIHNpdHVhdGlvbl06IEJvdGggYWRkVG9Cb2R5IDogJyR7YWRkVG9Cb2R5fScgYW5kIHBhcmVudEVsZW1lbnRJZCA6ICcke3BhcmVudEVsZW1lbnRJZH0nIHtBIG5vbi1lbXB0eSB2YWx1ZX0gc2hvdWxkIG5vdCBiZSBwcm92aWRlZC5gXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICFhZGRUb0JvZHkgJiZcclxuICAgICAgICAgICAgICAgICghcGFyZW50RWxlbWVudElkIHx8IHBhcmVudEVsZW1lbnRJZC50cmltKCkubGVuZ3RoIDwgMSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgVW5hYmxlIHRvIGNyZWF0ZSBlbGVtZW50IHdpdGggYWRkVG9Cb2R5Oicke2FkZFRvQm9keX0nIGFuZCBwYXJlbnRFbGVtZW50SWQgOiAnJHtwYXJlbnRFbGVtZW50SWR9JyB7QW4gaW52YWxpZCB2YWx1ZX0gaXMgcHJvdmlkZWQgc2ltdWx0YW5lb3VzbHkuYFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWFkZFRvQm9keSAmJiBwYXJlbnRFbGVtZW50SWQpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYXJlbnRFbGVtZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgUGFyZW50IEVsZW1lbnQgd2l0aCBJRCAnJHtwYXJlbnRFbGVtZW50SWR9JyBkb2VzIG5vdCBleGlzdC5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGh0bWxFbGVtZW50VG9CZUNyZWF0ZWQgPSBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGdlbmVyYXRlU3RyaW5nKHsgbGVuZ3RoOiAyMCwgcHJlZml4OiBlbGVtZW50VHlwZSB9KTtcclxuICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50VHlwZS50cmltKCkudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImRpdlwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImlucHV0XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYnV0dG9uXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic3BhblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50VG9CZUNyZWF0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBodG1sRWxlbWVudFRvQmVDcmVhdGVkLmlkID0gaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5U3R5bGVzKGh0bWxFbGVtZW50VG9CZUNyZWF0ZWQsIGRlZmF1bHRTdHlsZXNbZWxlbWVudFR5cGVdKTtcclxuICAgICAgICAgICAgICAgICAgICBhcHBseVN0eWxlcyhodG1sRWxlbWVudFRvQmVDcmVhdGVkLCBzdHlsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG93SW5uZXJUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50VG9CZUNyZWF0ZWQuaW5uZXJUZXh0ID0gaW5uZXJUZXh0IHx8IGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFR5cGUgPT09IFwiaW5wdXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbEVsZW1lbnRUb0JlQ3JlYXRlZC5wbGFjZWhvbGRlciA9IGlubmVyVGV4dCB8fCBpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ2xpY2sgJiYgdHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sRWxlbWVudFRvQmVDcmVhdGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRUb0JvZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkb2N1bWVudC5ib2R5LmFwcGVuZChodG1sRWxlbWVudFRvQmVDcmVhdGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbEVsZW1lbnRUb0JlQ3JlYXRlZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaHRtbEVsZW1lbnRUb0JlQ3JlYXRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxFbGVtZW50VG9CZUNyZWF0ZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWh0bWxFbGVtZW50VG9CZUNyZWF0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChcclxuICAgICAgICAgICAgICAgICAgICBuZXcgRXJyb3IoYEVycm9yIG9jY3VycmVkIHdoaWxlIGNyZWF0aW5nIGVsZW1lbnQgb2YgdHlwZSAnJHtlbGVtZW50VHlwZX0nYClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRFbGVtZW50V2l0aFByb21pc2UsXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBlbGVtZW50QWRkZXJVdGlsaXR5OyIsIlxyXG5cclxuXHJcblxyXG4vLyBnbG9iYWxIZWxwZXJVdGlsaXR5LmpzXHJcbmNvbnN0IGdsb2JhbEhlbHBlclV0aWxpdHkgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgY2hhcmFjdGVycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODlcIjtcclxuICAgIGNvbnN0IGdlbmVyYXRlUmFuZG9tU3RyaW5nID0gKHsgbGVuZ3RoLCBwcmVmaXggfSA9IHsgbGVuZ3RoOiAxMCwgcHJlZml4OiBcIlwiIH0pID0+IHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gcHJlZml4ID8gYCR7cHJlZml4LnRvVXBwZXJDYXNlKCl9X2AgOiBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnMubGVuZ3RoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNvbnZlckh0bWxFbGVtZW50VG9Kc29uID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBjb25zdCBqc29uID0ge1xyXG4gICAgICAgICAgICB0YWdOYW1lOiBlbGVtZW50Py50YWdOYW1lIHx8IFwiXCIsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHt9LFxyXG4gICAgICAgICAgICBpbm5lclRleHQ6IGVsZW1lbnQ/LmlubmVyVGV4dCB8fCBcIlwiLFxyXG4gICAgICAgICAgICBzdHlsZXM6IHt9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm4ganNvbjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgYXR0ciBvZiBlbGVtZW50LmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAganNvbi5hdHRyaWJ1dGVzW2F0dHIubmFtZV0gPSBhdHRyLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBzdHlsZSBvZiBlbGVtZW50LnN0eWxlKSB7XHJcbiAgICAgICAgICAgIGpzb24uc3R5bGVzW3N0eWxlXSA9IGVsZW1lbnQuc3R5bGVbc3R5bGVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2VuZXJhdGVSYW5kb21TdHJpbmcsXHJcbiAgICAgICAgY29udmVySHRtbEVsZW1lbnRUb0pzb24sXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxIZWxwZXJVdGlsaXR5OyIsIi8vIGluaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHkuanNcclxuXHJcbi8vIEltcG9ydCBkZXBlbmRlbmNpZXNcclxuY29uc3QgIExPR0dFUiAgPSByZXF1aXJlKCcuL2xvZ2dlclV0aWxpdHknKTsgLy8gQWRqdXN0IHRoZSBwYXRoIGFzIG5lZWRlZFxyXG5jb25zdCB7IHN0eWxlczogY3NzU3R5bGVzIH0gPSByZXF1aXJlKCcuL2Nzc1N0eWxlc1V0aWxpdHknKTsgLy8gQWRqdXN0IHRoZSBwYXRoIGFzIG5lZWRlZFxyXG5jb25zdCB7IGFkZEVsZW1lbnRXaXRoUHJvbWlzZSB9ID0gcmVxdWlyZSgnLi9lbGVtZW50QWRkZXJVdGlsaXR5Jyk7IC8vIEFkanVzdCB0aGUgcGF0aCBhcyBuZWVkZWRcclxuXHJcbi8vIERlZmluZSBpbml0aWFsIGNvbXBvbmVudHNcclxuY29uc3QgY29tcG9uZW50cyA9IFtcclxuICAgIHtcclxuICAgICAgICBlbGVtZW50VHlwZTogXCJkaXZcIixcclxuICAgICAgICBhZGRUb0JvZHk6IHRydWUsXHJcbiAgICAgICAgc3R5bGU6IGNzc1N0eWxlcy5kaXYsXHJcbiAgICAgICAgbmFtZTogXCJDb250YWluZXIgZGl2XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiYnV0dG9uXCIsXHJcbiAgICAgICAgYWRkVG9Cb2R5OiB0cnVlLFxyXG4gICAgICAgIHN0eWxlOiBjc3NTdHlsZXMuZGl2LCAvLyBUaGlzIHNlZW1zIGluY29ycmVjdCwgaXQgc2hvdWxkIGJlIGNzc1N0eWxlcy5idXR0b25cclxuICAgICAgICBpbm5lclRleHQ6IFwiUmVzdGFydFwiLFxyXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IHsgfSxcclxuICAgICAgICBuYW1lOiBcIkJ1dHRvbiB0byBiZSBhZGRlZCBpbiBjb250YWluZXIgZGl2XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZWxlbWVudFR5cGU6IFwiZGl2XCIsXHJcbiAgICAgICAgYWRkVG9Cb2R5OiB0cnVlLFxyXG4gICAgICAgIHN0eWxlOiBjc3NTdHlsZXMuZGl2LFxyXG4gICAgICAgIG5hbWU6IFwiTWVzc2FnZSBsb2dnZXIgZGl2XCJcclxuICAgIH1cclxuXTtcclxuXHJcbi8vIE1haW4gZnVuY3Rpb24gdG8gY3JlYXRlIGluaXRpYWwgY29tcG9uZW50c1xyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVJbml0aWFsQ29tcG9uZW50cyhzdWNjZXNzQ2FsbGJhY2sgPSAoKSA9PiB7IH0sIGZhaWxDYWxsYmFjayA9ICgpID0+IHsgfSwgYWRkQnV0dG9uID0gZmFsc2UsIHJlc3RhcnRCdXR0b25PbkNsaWNrID0gKCkgPT4geyB9KSB7XHJcbiAgICBsZXQgbXlDb250YWluZXJEaXZJZCA9IG51bGw7XHJcbiAgICBsZXQgY29tcG9uZW50c0NyZWF0ZWRTdWNjZXNzZnVsbHkgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBBZGRpbmcgcmVzdGFydCBidXR0b24gaWYgcmVxdWlyZWRcclxuICAgIGlmIChhZGRCdXR0b24pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkRWxlbWVudCA9IGF3YWl0IGFkZEVsZW1lbnRXaXRoUHJvbWlzZSh7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50VHlwZTogXCJidXR0b25cIixcclxuICAgICAgICAgICAgICAgIGFkZFRvQm9keTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGlubmVyVGV4dDogXCJSZXN0YXJ0XCIsXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiByZXN0YXJ0QnV0dG9uT25DbGljayxcclxuICAgICAgICAgICAgICAgIHNob3dJbm5lclRleHQ6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIExPR0dFUi5pbmZvKGAke2NyZWF0ZWRFbGVtZW50LnRhZ05hbWV9IGlzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IHdpdGggaWQ6ICcke2NyZWF0ZWRFbGVtZW50LmlkfSchYCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgTE9HR0VSLmVycm9yKGBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGRpbmcgaW5pdGlhbCBkaXZcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbmV3bHlBZGRlZERpdiA9IGF3YWl0IGFkZEVsZW1lbnRXaXRoUHJvbWlzZSh7XHJcbiAgICAgICAgICAgIGVsZW1lbnRUeXBlOiBcImRpdlwiLFxyXG4gICAgICAgICAgICBhZGRUb0JvZHk6IHRydWUsXHJcbiAgICAgICAgICAgIHN0eWxlOiBjc3NTdHlsZXMuZGl2LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIExPR0dFUi5zdWNjZXNzKGBbU3VjY2Vzc106IENyZWF0ZWQgZGl2OiAke25ld2x5QWRkZWREaXYuaWR9YCk7XHJcbiAgICAgICAgbXlDb250YWluZXJEaXZJZCA9IG5ld2x5QWRkZWREaXYuaWQ7XHJcbiAgICAgICAgTE9HR0VSLnJlZ2lzdGVyTG9nZ2luZ0NvbmZpZyhuZXdseUFkZGVkRGl2KTtcclxuXHJcbiAgICAgICAgY29tcG9uZW50c0NyZWF0ZWRTdWNjZXNzZnVsbHkgPSB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBMT0dHRVIuZXJyb3IoYFtXYXJuaW5nXTogRXJyb3Igb2NjdXJyZWQ6ICR7ZXJyb3J9YCk7XHJcbiAgICAgICAgTE9HR0VSLmVycm9yKGBbJHtuZXcgRGF0ZSgpfV06IFN0b3BwaW5nIGVsZW1lbnQgY3JlYXRpb24gZHVlIHRvIGVycm9yLmApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsaW5nIHN1Y2Nlc3Mgb3IgZmFpbHVyZSBjYWxsYmFja3NcclxuICAgIGlmIChjb21wb25lbnRzQ3JlYXRlZFN1Y2Nlc3NmdWxseSkge1xyXG4gICAgICAgIExPR0dFUi5pbmZvKGBBbGwgaW5pdGlhbCBjb21wb25lbnRzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IWApO1xyXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhteUNvbnRhaW5lckRpdklkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgTE9HR0VSLmVycm9yKGBTdG9wcGluZyBhcyBlcnJvciBvY2N1cnJlZCBpbiBpbml0aWFsIGNvbXBvbmVudHMgY3JlYXRpb24uYCk7XHJcbiAgICAgICAgZmFpbENhbGxiYWNrKGBTdG9wcGluZyBhcyBlcnJvciBvY2N1cnJlZCBpbiBpbml0aWFsIGNvbXBvbmVudHMgY3JlYXRpb24uYCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEV4cG9ydGluZyB0aGUgZnVuY3Rpb25cclxubW9kdWxlLmV4cG9ydHMgPSB7IGNyZWF0ZUluaXRpYWxDb21wb25lbnRzIH07XHJcbiIsIi8vIGxvZ2dlclV0aWxpdHkuanNcclxuXHJcbmxldCByZWdpc3RlcmVkRWxlbWVudCA9IG51bGw7XHJcblxyXG5jb25zdCB2YWxpZENvbmZpZyA9ICgpID0+IHtcclxuICAgIGlmIChyZWdpc3RlcmVkRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICAgIFwiTm8gdmFsaWQgYXBwZW5kZXIgZm91bmQuIExvZ2dpbmcgdXRpbGl0eSBpcyBub3QgaW5pdGlhbGl6ZWQgcHJvcGVybHkuIE9ubHkgY29uc29sZSBsb2dzIHdpbGwgYmUgc2hvd24gLlwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCByZWdpc3RlckxvZ2dpbmdDb25maWcgPSAoZWxlbWVudCwgZWxlbWVudElkKSA9PiB7XHJcbiAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgIHJlZ2lzdGVyZWRFbGVtZW50ID0gZWxlbWVudDtcclxuICAgIH0gZWxzZSBpZiAoZWxlbWVudElkKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG4gICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICByZWdpc3RlcmVkRWxlbWVudCA9IGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8vID09PSBjcmVhdGluZyBzcGFucyBmb3IgYXBwcm9wcmlhdGUgbG9nIGxldmVsID09PT09PT09PT09PT09XHJcblxyXG5jb25zdCBnZXRTdHlsZXNGb3JUeXBlID0gKHR5cGUgPSAnY29udGFpbmVyJykgPT4ge1xyXG4gICAgY29uc3QgYmFzZVN0eWxlID0ge1xyXG4gICAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgIC8vcGFkZGluZzogJzVweCcsXHJcbiAgICAgICAgbWFyZ2luOiAnM3B4JyxcclxuICAgICAgICBib3JkZXJSYWRpdXM6ICczcHgnLFxyXG4gICAgICAgIHdoaXRlU3BhY2U6IFwicHJlLXdyYXBcIixcclxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snXHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgICBjYXNlICd0cmFjZSc6XHJcbiAgICAgICAgY2FzZSAnZGVidWcnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uYmFzZVN0eWxlLCBjb2xvcjogJ3JlZCcsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgY2FzZSAnd2Fybic6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5iYXNlU3R5bGUsIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAneWVsbG93JyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdpbmZvJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLmJhc2VTdHlsZSwgY29sb3I6ICdibHVlJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLmJhc2VTdHlsZSwgY29sb3I6ICdncmVlbicsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLmJhc2VTdHlsZSxcclxuICAgICAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGFwcGx5U3R5bGVzID0gKGVsZW1lbnQsIHN0eWxlcykgPT4ge1xyXG4gICAgaWYgKCFlbGVtZW50IHx8ICFzdHlsZXMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHN0eWxlcykge1xyXG4gICAgICAgIGlmIChzdHlsZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbcHJvcGVydHldID0gc3R5bGVzW3Byb3BlcnR5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVNZXNzYWdlU3BhbiA9ICh0eXBlID0gJycsIGxvZ01lc3NhZ2UgPSAnJykgPT4ge1xyXG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGFwcGx5U3R5bGVzKHNwYW4sIGdldFN0eWxlc0ZvclR5cGUodHlwZSkpO1xyXG4gICAgLy8gc3Bhbi5pbm5lckhUTUwgPSBgPGI+WyR7dHlwZS50b1VwcGVyQ2FzZSgpfV06IDwvYj5bJHt0ZXh0LnRpbWVzdGFtcH1dOiAke3RleHQubG9nTWVzc2FnZX1gO1xyXG4gICAgLy8gc3Bhbi5pbm5lckhUTUwgPSBgPGI+WyR7dHlwZS50b1VwcGVyQ2FzZSgpfV06IDwvYj5bJHtuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9XTogPHByZT4ke2xvZ01lc3NhZ2V9PC9wcmU+YDtcclxuICAgIHNwYW4uaW5uZXJIVE1MID0gYDxiPlske3R5cGUudG9VcHBlckNhc2UoKX1dOiA8L2I+WyR7bmV3IERhdGUoKS50b1N0cmluZygpfV06ICR7bG9nTWVzc2FnZX1gO1xyXG4gICAgcmV0dXJuIHNwYW47XHJcbn07XHJcblxyXG4vLyA9PT09IEFwcGVuZGluZyB0byBkaXZcclxuY29uc3QgYXBwZW5kSW5uZXJIdG1sVG9FbGVtZW50ID0gKG1lc3NhZ2UsIGxvZ0xldmVsID0gXCJpbmZvXCIpID0+IHtcclxuICAgIGlmICghdmFsaWRDb25maWcoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIHJlZ2lzdGVyZWRFbGVtZW50LmlubmVySFRNTCArPSBzb21lO1xyXG4gICAgY29uc3QgbWVzc2FnZVNwYW4gPSBjcmVhdGVNZXNzYWdlU3Bhbihsb2dMZXZlbCwgbWVzc2FnZSk7XHJcbiAgICByZWdpc3RlcmVkRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlU3Bhbik7XHJcbn07XHJcblxyXG5jb25zdCByZXNldElubmVySHRtbFRvRWxlbWVudCA9ICgpID0+IHtcclxuICAgIGlmICghdmFsaWRDb25maWcoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyZWRFbGVtZW50LmlubmVySFRNTCA9IGA8Yj5Mb2dzIHRvIGJlIGRpc3BsYXllZDotPC9iPmA7XHJcbn07XHJcblxyXG5jb25zdCByZXNldCA9ICgpID0+IHtcclxuICAgIHJlc2V0SW5uZXJIdG1sVG9FbGVtZW50KCk7XHJcbn07XHJcblxyXG5jb25zdCBsb2dUb0NvbnNvbGUgPSAobWVzc2FnZSwgbG9nTGV2ZWwgPSAnaW5mbycpID0+IHtcclxuICAgIGlmIChsb2dMZXZlbCAmJiBtZXNzYWdlKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2dMZXZlbCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaW5mb1wiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFxyXG4gICAgICAgICAgICAgICAgICAgIGBbJHtsb2dMZXZlbC50cmltKCkudG9VcHBlckNhc2UoKX1dOiBbJHtuZXcgRGF0ZSgpfV06ICR7bWVzc2FnZX1gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YXJuXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgICAgICAgICAgICAgYFske2xvZ0xldmVsLnRyaW0oKS50b1VwcGVyQ2FzZSgpfV06IFske25ldyBEYXRlKCl9XTogJHttZXNzYWdlfWBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcclxuICAgICAgICAgICAgICAgICAgICBgWyR7bG9nTGV2ZWwudHJpbSgpLnRvVXBwZXJDYXNlKCl9XTogWyR7bmV3IERhdGUoKX1dOiAke21lc3NhZ2V9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgYFske2xvZ0xldmVsLnRyaW0oKS50b1VwcGVyQ2FzZSgpfV06IFske25ldyBEYXRlKCl9XTogJHttZXNzYWdlfWBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRlYnVnXCI6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKFxyXG4gICAgICAgICAgICAgICAgICAgIGBbJHtsb2dMZXZlbC50cmltKCkudG9VcHBlckNhc2UoKX1dOiBbJHtuZXcgRGF0ZSgpfV06ICR7bWVzc2FnZX1gXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ0cmFjZVwiOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS50cmFjZShcclxuICAgICAgICAgICAgICAgICAgICBgWyR7bG9nTGV2ZWwudHJpbSgpLnRvVXBwZXJDYXNlKCl9XTogWyR7bmV3IERhdGUoKX1dOiAke21lc3NhZ2V9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbnZhbGlkL1Vua25vd24gTG9nIExldmVsOiAnJHtsb2dMZXZlbH0nLmApXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICAgICBgWyR7bG9nTGV2ZWwudHJpbSgpLnRvVXBwZXJDYXNlKCl9XTogWyR7bmV3IERhdGUoKX1dOiAke21lc3NhZ2V9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZyA9IChsb2dMZXZlbCA9IFwiaW5mb1wiLCAuLi5tZXNzYWdlKSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgICAgIWxvZ0xldmVsIHx8XHJcbiAgICAgICAgIVtcImluZm9cIiwgXCJ3YXJuXCIsIFwic3VjY2Vzc1wiLCBcImVycm9yXCIsIFwiZGVidWdcIiwgXCJ0cmFjZVwiXS5pbmNsdWRlcyhcclxuICAgICAgICAgICAgbG9nTGV2ZWwudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICApXHJcbiAgICApIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgYEludmFsaWQvVW5rbm93biBMb2cgTGV2ZWw6ICcke2xvZ0xldmVsfScuIFVuYWJsZSB0byBsb2cgbWVzc2FnZS5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKCFtZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEludmFsaWQgTWVzc2FnZTogJyR7bWVzc2FnZX0nLiBVbmFibGUgdG8gbG9nIG1lc3NhZ2UuYCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ1RvQ29uc29sZShtZXNzYWdlLCBsb2dMZXZlbCk7XHJcblxyXG4gICAgYXBwZW5kSW5uZXJIdG1sVG9FbGVtZW50KG1lc3NhZ2UsIGxvZ0xldmVsKTtcclxufTtcclxuXHJcbmNvbnN0IGluZm8gPSAoLi4ubWVzc2FnZSkgPT4gbG9nKFwiaW5mb1wiLCBtZXNzYWdlKTtcclxuY29uc3Qgd2FybmluZyA9ICguLi5tZXNzYWdlKSA9PiBsb2coXCJ3YXJuXCIsIG1lc3NhZ2UpO1xyXG5jb25zdCBzdWNjZXNzID0gKC4uLm1lc3NhZ2UpID0+IGxvZyhcInN1Y2Nlc3NcIiwgbWVzc2FnZSk7XHJcbmNvbnN0IGVycm9yID0gKC4uLm1lc3NhZ2UpID0+IGxvZyhcImVycm9yXCIsIG1lc3NhZ2UpO1xyXG5jb25zdCB0cmFjZSA9ICguLi5tZXNzYWdlKSA9PiBsb2coXCJ0cmFjZVwiLCBtZXNzYWdlKTtcclxuY29uc3QgZGVidWcgPSAoLi4ubWVzc2FnZSkgPT4gbG9nKFwiZGVidWdcIiwgbWVzc2FnZSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHJlZ2lzdGVyTG9nZ2luZ0NvbmZpZyxcclxuICAgIGluZm8sXHJcbiAgICB3YXJuaW5nLFxyXG4gICAgc3VjY2VzcyxcclxuICAgIGVycm9yLFxyXG4gICAgdHJhY2UsXHJcbiAgICBkZWJ1ZyxcclxuICAgIHJlc2V0LFxyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gbWFpbi5qcyAob3IgYW55IG90aGVyIG1vZHVsZSB3aGVyZSB5b3Ugd2FudCB0byB1c2UgY3JlYXRlSW5pdGlhbENvbXBvbmVudHMpXHJcblxyXG4vLyBSZXF1aXJlIHRoZSBtb2R1bGUgd2hlcmUgY3JlYXRlSW5pdGlhbENvbXBvbmVudHMgaXMgZGVmaW5lZFxyXG5jb25zdCB7IGNyZWF0ZUluaXRpYWxDb21wb25lbnRzIH0gPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3YxL2luaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHknKTtcclxuY29uc3QgTE9HR0VSID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy92MS9sb2dnZXJVdGlsaXR5Jyk7XHJcblxyXG4vLyBEZWZpbmUgc3VjY2VzcyBhbmQgZmFpbCBjYWxsYmFja3NcclxuY29uc3Qgc3VjY2Vzc0NhbGxiYWNrID0gKGNvbnRhaW5lcklkKSA9PiB7XHJcbiAgICBMT0dHRVIuaW5mbyhgSW5pdGlhbGl6YXRpb24gc3VjY2VlZGVkISBDb250YWluZXIgZGl2IGlkOiAke2NvbnRhaW5lcklkfWApO1xyXG4gICAgLy8gQWRkaXRpb25hbCBsb2dpYyBhZnRlciBzdWNjZXNzZnVsIGluaXRpYWxpemF0aW9uXHJcbn07XHJcblxyXG5jb25zdCBmYWlsQ2FsbGJhY2sgPSAoZXJyb3IpID0+IHtcclxuICAgIExPR0dFUi5lcnJvcihgSW5pdGlhbGl6YXRpb24gZmFpbGVkOiAke2Vycm9yfWApO1xyXG4gICAgLy8gQWRkaXRpb25hbCBlcnJvciBoYW5kbGluZyBsb2dpY1xyXG59O1xyXG5cclxuLy8gRGVmaW5lIGFuIG9wdGlvbmFsIHJlc3RhcnQgYnV0dG9uIGNsaWNrIGhhbmRsZXJcclxuY29uc3QgcmVzdGFydEJ1dHRvbk9uQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICBMT0dHRVIuaW5mbygnUmVzdGFydCBidXR0b24gY2xpY2tlZCEnKTtcclxuICAgIC8vIEFkZGl0aW9uYWwgbG9naWMgZm9yIHJlc3RhcnQgYnV0dG9uIGNsaWNrXHJcbn07XHJcblxyXG4vLyBDYWxsIGNyZWF0ZUluaXRpYWxDb21wb25lbnRzIHdpdGggbmVjZXNzYXJ5IGFyZ3VtZW50c1xyXG5jcmVhdGVJbml0aWFsQ29tcG9uZW50cyhzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjaywgdHJ1ZSwgcmVzdGFydEJ1dHRvbk9uQ2xpY2spO1xyXG4iXSwibmFtZXMiOlsiY3NzU3R5bGVzVXRpbGl0eSIsInN0eWxlcyIsImRpdiIsImZvbnRTaXplIiwicGFkZGluZyIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyIiwiYm9yZGVyTGVmdCIsImlucHV0IiwiYmFja2dyb3VuZENvbG9yIiwiYnV0dG9uIiwic3BhbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJnbG9iYWxIZWxwZXJVdGlsaXR5IiwicmVxdWlyZSIsImVsZW1lbnRBZGRlclV0aWxpdHkiLCJnZW5lcmF0ZVN0cmluZyIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiZGVmYXVsdFN0eWxlcyIsImNvbG9yIiwiYm9yZGVyUmFkaXVzIiwiYXBwbHlTdHlsZXMiLCJlbGVtZW50IiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsInN0eWxlIiwiYWRkRWxlbWVudFdpdGhQcm9taXNlIiwiX3JlZiIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImVsZW1lbnRUeXBlIiwiYWRkVG9Cb2R5IiwicGFyZW50RWxlbWVudElkIiwiaW5uZXJUZXh0Iiwib25DbGljayIsInNob3dJbm5lclRleHQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcmVudEVsZW1lbnQiLCJpbmNsdWRlcyIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsIkVycm9yIiwiY29uY2F0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImh0bWxFbGVtZW50VG9CZUNyZWF0ZWQiLCJpZCIsInByZWZpeCIsImNyZWF0ZUVsZW1lbnQiLCJwbGFjZWhvbGRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiYXBwZW5kIiwiYXBwZW5kQ2hpbGQiLCJjaGFyYWN0ZXJzIiwicmVzdWx0IiwidG9VcHBlckNhc2UiLCJpIiwiY2hhckF0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29udmVySHRtbEVsZW1lbnRUb0pzb24iLCJqc29uIiwidGFnTmFtZSIsImF0dHJpYnV0ZXMiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwiYXR0ciIsInZhbHVlIiwibmFtZSIsImVyciIsImUiLCJmIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwieSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibWFyayIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiYXdyYXAiLCJhc3luYyIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJfYXN5bmNUb0dlbmVyYXRvciIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJMT0dHRVIiLCJfcmVxdWlyZSIsImNzc1N0eWxlcyIsIl9yZXF1aXJlMiIsImNvbXBvbmVudHMiLCJjcmVhdGVJbml0aWFsQ29tcG9uZW50cyIsIl9jcmVhdGVJbml0aWFsQ29tcG9uZW50cyIsIl9jYWxsZWUiLCJzdWNjZXNzQ2FsbGJhY2siLCJmYWlsQ2FsbGJhY2siLCJhZGRCdXR0b24iLCJyZXN0YXJ0QnV0dG9uT25DbGljayIsIm15Q29udGFpbmVyRGl2SWQiLCJjb21wb25lbnRzQ3JlYXRlZFN1Y2Nlc3NmdWxseSIsImNyZWF0ZWRFbGVtZW50IiwibmV3bHlBZGRlZERpdiIsIl9hcmdzIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsImluZm8iLCJ0MCIsImVycm9yIiwibWVzc2FnZSIsInN1Y2Nlc3MiLCJyZWdpc3RlckxvZ2dpbmdDb25maWciLCJ0MSIsIkRhdGUiLCJyZWdpc3RlcmVkRWxlbWVudCIsInZhbGlkQ29uZmlnIiwiY29uc29sZSIsIndhcm4iLCJlbGVtZW50SWQiLCJlbCIsImdldFN0eWxlc0ZvclR5cGUiLCJiYXNlU3R5bGUiLCJtYXJnaW4iLCJ3aGl0ZVNwYWNlIiwiZGlzcGxheSIsIl9vYmplY3RTcHJlYWQiLCJjcmVhdGVNZXNzYWdlU3BhbiIsImxvZ01lc3NhZ2UiLCJpbm5lckhUTUwiLCJ0b1N0cmluZyIsImFwcGVuZElubmVySHRtbFRvRWxlbWVudCIsImxvZ0xldmVsIiwibWVzc2FnZVNwYW4iLCJyZXNldElubmVySHRtbFRvRWxlbWVudCIsImxvZ1RvQ29uc29sZSIsImRlYnVnIiwidHJhY2UiLCJsb2ciLCJfbGVuIiwiQXJyYXkiLCJfa2V5IiwiX2xlbjIiLCJfa2V5MiIsIndhcm5pbmciLCJfbGVuMyIsIl9rZXkzIiwiX2xlbjQiLCJfa2V5NCIsIl9sZW41IiwiX2tleTUiLCJfbGVuNiIsIl9rZXk2IiwiX2xlbjciLCJfa2V5NyIsImNvbnRhaW5lcklkIl0sInNvdXJjZVJvb3QiOiIifQ==