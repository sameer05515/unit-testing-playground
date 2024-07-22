/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/lib/utils.js":
/*!*****************************!*\
  !*** ./src/js/lib/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createConsoleAndRegisterMyId: () => (/* binding */ createConsoleAndRegisterMyId)
/* harmony export */ });
/* harmony import */ var _utils_initial_console_component_initialConsoleComponentCreatorUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/initial-console-component/initialConsoleComponentCreatorUtility.js */ "./src/js/utils/initial-console-component/initialConsoleComponentCreatorUtility.js");
/* harmony import */ var _utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/log/loggerUtility.js */ "./src/js/utils/log/loggerUtility.js");


var createConsoleAndRegisterMyId = function createConsoleAndRegisterMyId() {
  var successHandler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  var failHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var restartHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  _utils_initial_console_component_initialConsoleComponentCreatorUtility_js__WEBPACK_IMPORTED_MODULE_0__.initialConsoleComponentCreatorUtility.createInitialComponents(function (myContainerDivId) {
    _utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"].registerLoggingConfig(null, myContainerDivId);
    _utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"].success("[Success]: myContainerDivId: ".concat(myContainerDivId));
    _utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"].info("I am from v2.1. We will learn javascript dependency-injection in this version");
    successHandler({
      consoleDivId: myContainerDivId,
      LOGGER: _utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"]
    });
  }, function (errorMessage) {
    console.log("[Fail]: ".concat(errorMessage));
    failHandler(errorMessage);
  }, true, function () {
    _utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"].info('I am clicked. Will do restart work');
    restartHandler(_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
  });
};


/***/ }),

/***/ "./src/js/utils/element-add/elementAdderUtility-v3.js":
/*!************************************************************!*\
  !*** ./src/js/utils/element-add/elementAdderUtility-v3.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_globalHelperUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global/globalHelperUtility.js */ "./src/js/utils/global/globalHelperUtility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// elementAdderUtility-v3.js

/**
 * Element Adder Utility Module.
 * @module elementAdderUtility
 */



/**
 * Utility for adding elements to the DOM.
 * @module elementAdderUtility
 */
var elementAdderUtility = function () {
  /**
   * Validates parameters for element creation.
   * @param {Object} params - Parameters for creating the element.
   * @returns {Object} Validation result.
   */
  var validateParams = function validateParams(_ref) {
    var elementType = _ref.elementType,
      addToBody = _ref.addToBody,
      parentElementId = _ref.parentElementId;
    if (addToBody) {
      return {
        isValid: false,
        error: "addToBody is deprecated in v2. Please provide valid parentElementId with addToBody 'false'. Currently provided value for addToBody '".concat(addToBody, "'")
      };
    } else if (!elementType || !["div", "input", "button", "span", "select", "h1", "h2", "h3", "p", "ul", "li", "img", "a", "header", "footer", "section", "article"].includes(elementType.trim().toLowerCase())) {
      return {
        isValid: false,
        error: "Invalid elementType provided '".concat(elementType, "'")
      };
    } else if (!addToBody && (!parentElementId || parentElementId.trim().length < 1)) {
      return {
        isValid: false,
        error: "Unable to create element with addToBody:'".concat(addToBody, "' and parentElementId : '").concat(parentElementId, "' {An invalid value} is provided simultaneously.")
      };
    } else if (!addToBody && parentElementId) {
      var parentElement = document.getElementById(parentElementId);
      if (!parentElement) {
        return {
          isValid: false,
          error: "Parent Element with ID '".concat(parentElementId, "' does not exist.")
        };
      }
      return {
        isValid: true,
        parentElement: parentElement
      };
    }
    return {
      isValid: true
    };
  };

  /**
   * Common logic for element creation.
   * @param {HTMLElement} element - The element to be created.
   * @param {Object} params - Parameters for creating the element.
   */
  var applyCommonAttributes = function applyCommonAttributes(element, _ref2) {
    var id = _ref2.id,
      innerText = _ref2.innerText,
      style = _ref2.style,
      onClick = _ref2.onClick;
    element.id = id;
    _global_globalHelperUtility_js__WEBPACK_IMPORTED_MODULE_0__.styleUtility.applyStyles(element, _objectSpread(_objectSpread({}, _global_globalHelperUtility_js__WEBPACK_IMPORTED_MODULE_0__.styleUtility.getDefaultStyle(element.tagName)), style));
    element.appendChild(document.createTextNode(innerText || id));
    element.appendChild(document.createElement('br'));
    if (onClick) element.addEventListener("click", onClick);
  };

  /**
   * Adds a new HTML element with specified attributes and returns it.
   * @param {Object} params - Parameters for creating the element.
   * @param {string} params.elementType - The type of the element to create (e.g., 'div', 'input').
   * @param {boolean} params.addToBody - Whether to add the element directly to the body.
   * @param {string} [params.parentElementId] - The ID of the parent element to add the new element to.
   * @param {Object} [params.style] - An object containing the styles to apply to the element.
   * @param {string} [params.innerText] - The inner text or placeholder text for the element.
   * @param {Function} [params.onClick] - A callback function to attach to the element's click event.
   * @param {Array} [params.options] - An array of options for the select element.
   * @returns {Promise<HTMLElement>} A promise that resolves to the created HTML element.
   */
  var addElementWithPromise = function addElementWithPromise() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        elementType: "",
        addToBody: false,
        parentElementId: "",
        style: {},
        innerText: "",
        onClick: function onClick() {},
        options: []
      },
      elementType = _ref3.elementType,
      addToBody = _ref3.addToBody,
      parentElementId = _ref3.parentElementId,
      style = _ref3.style,
      innerText = _ref3.innerText,
      onClick = _ref3.onClick,
      options = _ref3.options;
    return new Promise(function (resolve, reject) {
      var _validateParams = validateParams({
          elementType: elementType,
          addToBody: addToBody,
          parentElementId: parentElementId
        }),
        isValid = _validateParams.isValid,
        error = _validateParams.error,
        parentElement = _validateParams.parentElement;
      if (!isValid) {
        reject(new Error(error));
        return;
      }
      var id = _global_globalHelperUtility_js__WEBPACK_IMPORTED_MODULE_0__.idUtility.generateId({
        length: 20,
        prefix: elementType
      });
      var htmlElementToBeCreated;
      switch (elementType.trim().toLowerCase()) {
        case "div":
        case "input":
        case "button":
        case "span":
        case "h1":
        case "h2":
        case "h3":
        case "p":
        case "ul":
        case "li":
        case "header":
        case "footer":
        case "section":
        case "article":
          htmlElementToBeCreated = document.createElement(elementType);
          applyCommonAttributes(htmlElementToBeCreated, {
            id: id,
            innerText: innerText,
            style: style,
            onClick: onClick
          });
          if (elementType === "input") htmlElementToBeCreated.placeholder = innerText || id;
          if (elementType === "a") htmlElementToBeCreated.href = '#';
          break;
        case "select":
          htmlElementToBeCreated = document.createElement(elementType);
          applyCommonAttributes(htmlElementToBeCreated, {
            id: id,
            innerText: innerText,
            style: style,
            onClick: onClick
          });
          if (options && Array.isArray(options)) {
            options.forEach(function (optionData) {
              var option = document.createElement("option");
              option.value = optionData.value;
              option.innerText = optionData.label;
              htmlElementToBeCreated.appendChild(option);
            });
          }
          htmlElementToBeCreated.addEventListener("change", onClick);
          break;
        case "img":
          htmlElementToBeCreated = document.createElement(elementType);
          applyCommonAttributes(htmlElementToBeCreated, {
            id: id,
            innerText: innerText,
            style: style,
            onClick: onClick
          });
          htmlElementToBeCreated.src = innerText || '';
          break;
        default:
          reject(new Error("Error occurred while loading elementType '".concat(elementType, "'")));
          return;
      }
      parentElement.appendChild(htmlElementToBeCreated);
      resolve(htmlElementToBeCreated);
    });
  };
  return {
    addElementWithPromise: addElementWithPromise
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elementAdderUtility);

/***/ }),

/***/ "./src/js/utils/element-add/elementAdderUtility.js":
/*!*********************************************************!*\
  !*** ./src/js/utils/element-add/elementAdderUtility.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _global_globalHelperUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global/globalHelperUtility.js */ "./src/js/utils/global/globalHelperUtility.js");
/**
 * Element Adder Utility Module.
 * @module elementAdderUtility
 */


var elementAdderUtility = function () {
  var generateString = _global_globalHelperUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].generateRandomString;

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

  /**
   * Adds a new HTML element with specified attributes and returns it.
   * @param {Object} params - Parameters for creating the element.
   * @param {string} params.elementType - The type of the element to create (e.g., 'div', 'input').
   * @param {boolean} params.addToBody - Whether to add the element directly to the body.
   * @param {string} [params.parentElementId] - The ID of the parent element to add the new element to.
   * @param {Object} [params.style] - An object containing the styles to apply to the element.
   * @param {string} [params.innerText] - The inner text or placeholder text for the element.
   * @param {Function} [params.onClick] - A callback function to attach to the element's click event.
   * @param {Array} [params.options] - An array of options for the select element.
   * @returns {Promise<HTMLElement>} A promise that resolves to the created HTML element.
   */
  var addElementWithPromise = function addElementWithPromise() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        elementType: "",
        addToBody: false,
        parentElementId: "",
        style: {},
        innerText: "",
        onClick: function onClick() {},
        options: []
      },
      elementType = _ref.elementType,
      addToBody = _ref.addToBody,
      parentElementId = _ref.parentElementId,
      style = _ref.style,
      innerText = _ref.innerText,
      onClick = _ref.onClick,
      options = _ref.options;
    return new Promise(function (resolve, reject) {
      var parentElement = null;
      if (!elementType || !["div", "input", "button", "span", "select", "h1", "h2", "h3", "p", "ul", "li", "img", "a", "header", "footer", "section", "article"].includes(elementType.trim().toLowerCase())) {
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
        case "h1":
        case "h2":
        case "h3":
        case "p":
        case "ul":
        case "li":
        case "header":
        case "footer":
        case "section":
        case "article":
          htmlElementToBeCreated = document.createElement(elementType);
          htmlElementToBeCreated.id = id;
          applyStyles(htmlElementToBeCreated, style || getDefaultStyle(elementType));
          // htmlElementToBeCreated.innerText = innerText || id;
          var textNode = document.createTextNode(innerText || id);
          htmlElementToBeCreated.appendChild(textNode);
          if (elementType === "input") {
            htmlElementToBeCreated.placeholder = innerText || id;
          }
          if (elementType === "a") {
            htmlElementToBeCreated.href = '#';
          }
          if (onClick) {
            htmlElementToBeCreated.addEventListener("click", onClick);
          }
          if (addToBody) {
            document.body.append(htmlElementToBeCreated);
          } else {
            parentElement.appendChild(htmlElementToBeCreated);
          }
          resolve(htmlElementToBeCreated);
          break;
        case "select":
          htmlElementToBeCreated = document.createElement(elementType);
          htmlElementToBeCreated.id = id;
          applyStyles(htmlElementToBeCreated, style || getDefaultStyle(elementType));
          if (options && Array.isArray(options)) {
            options.forEach(function (optionData) {
              var option = document.createElement("option");
              option.value = optionData.value;
              option.innerText = optionData.label;
              htmlElementToBeCreated.appendChild(option);
            });
          }
          if (onClick) {
            htmlElementToBeCreated.addEventListener("change", onClick);
          }
          if (addToBody) {
            document.body.append(htmlElementToBeCreated);
          } else {
            parentElement.appendChild(htmlElementToBeCreated);
          }
          resolve(htmlElementToBeCreated);
          break;
        case "img":
          htmlElementToBeCreated = document.createElement(elementType);
          htmlElementToBeCreated.id = id;
          applyStyles(htmlElementToBeCreated, style || getDefaultStyle(elementType));
          htmlElementToBeCreated.src = innerText || '';
          if (onClick) {
            htmlElementToBeCreated.addEventListener("click", onClick);
          }
          if (addToBody) {
            document.body.append(htmlElementToBeCreated);
          } else {
            parentElement.appendChild(htmlElementToBeCreated);
          }
          resolve(htmlElementToBeCreated);
          break;
        default:
          reject(new Error("Error occurred while loading elementType '".concat(elementType, "'")));
          break;
      }
    });
  };
  return {
    addElementWithPromise: addElementWithPromise
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (elementAdderUtility);

/***/ }),

/***/ "./src/js/utils/global/cssStylesUtility.js":
/*!*************************************************!*\
  !*** ./src/js/utils/global/cssStylesUtility.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cssStylesUtility);

/***/ }),

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

/***/ "./src/js/utils/initial-console-component/initialConsoleComponentCreatorUtility.js":
/*!*****************************************************************************************!*\
  !*** ./src/js/utils/initial-console-component/initialConsoleComponentCreatorUtility.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialConsoleComponentCreatorUtility: () => (/* binding */ initialConsoleComponentCreatorUtility)
/* harmony export */ });
/* harmony import */ var _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../log/loggerUtility.js */ "./src/js/utils/log/loggerUtility.js");
/* harmony import */ var _global_cssStylesUtility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global/cssStylesUtility.js */ "./src/js/utils/global/cssStylesUtility.js");
/* harmony import */ var _element_add_elementAdderUtility_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../element-add/elementAdderUtility.js */ "./src/js/utils/element-add/elementAdderUtility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }



var initialConsoleComponentCreatorUtility = function () {
  var styles = _global_cssStylesUtility_js__WEBPACK_IMPORTED_MODULE_1__["default"].styles;
  var addElementWithPromise = _element_add_elementAdderUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].addElementWithPromise;
  var components = [{
    elementType: 'div',
    addToBody: true,
    style: styles.div,
    name: 'Container div'
  }, {
    elementType: 'button',
    addToBody: true,
    style: styles.div,
    innerText: 'Restart',
    onClick: function onClick() {},
    name: 'button to be added in container div'
  }, {
    elementType: 'div',
    addToBody: true,
    style: styles.div,
    name: 'message logger div'
  }];
  var createInitialComponents = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var successCallback,
        failCallback,
        addButton,
        restartButtonOnClick,
        myContainerDivId,
        componentsCreatedSuccesfully,
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
            componentsCreatedSuccesfully = false;
            if (addButton && addButton === true) {
              addElementWithPromise({
                elementType: 'button',
                addToBody: true,
                innerText: 'Restart',
                onClick: restartButtonOnClick
              }).then(function (createdElement) {
                _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].info("".concat(createdElement.tagName, " is created successfully with id:'").concat(createdElement.id, "'!"));
              }, function (error) {
                return _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].error("Error: ".concat(error.message));
              });
            }
            _context.prev = 7;
            _context.next = 10;
            return addElementWithPromise({
              elementType: 'div',
              addToBody: true,
              style: _objectSpread(_objectSpread({}, styles.div), {}, {
                overflowY: 'auto',
                width: "500px",
                height: "100px"
              })
            });
          case 10:
            newlyAddedDiv = _context.sent;
            _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].success("[Success]: Created div: ".concat(newlyAddedDiv.id));
            myContainerDivId = newlyAddedDiv.id;
            _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerLoggingConfig(newlyAddedDiv);
            _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].reset();
            _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].success("Created div: ".concat(myContainerDivId));
            componentsCreatedSuccesfully = true;
            _context.next = 23;
            break;
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](7);
            _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].error("[Warning]: Error occured: ".concat(_context.t0));
            _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].error("[".concat(new Date(), "]: Stopping element creation due to error."));
          case 23:
            if (componentsCreatedSuccesfully) {
              _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].info("All initial components created successfully!");
              successCallback(myContainerDivId);
            } else {
              _log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].error("Stopping as error occurred in initial components creation.");
              failCallback("Stopping as error occurred in initial components creation.");
            }
          case 24:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[7, 19]]);
    }));
    return function createInitialComponents() {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    createInitialComponents: createInitialComponents
  };
}();

/***/ }),

/***/ "./src/js/utils/log/loggerUtility.js":
/*!*******************************************!*\
  !*** ./src/js/utils/log/loggerUtility.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.js */ "./src/js/utils/log/styles.js");
/* harmony import */ var _validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation.js */ "./src/js/utils/log/validation.js");


var LoggerUtility = function LoggerUtility() {
  var registeredElement = null;
  var createMessageSpan = function createMessageSpan() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var logMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var span = document.createElement('span');
    (0,_styles_js__WEBPACK_IMPORTED_MODULE_0__.applyStyles)(span, (0,_styles_js__WEBPACK_IMPORTED_MODULE_0__.getStylesForType)(type));
    span.innerHTML = "<b>[".concat(type.toUpperCase(), "]: </b>[").concat(new Date().toString(), "]: ").concat(logMessage);
    return span;
  };
  var appendInnerHtmlToElement = function appendInnerHtmlToElement(message) {
    var logLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    if (!(0,_validation_js__WEBPACK_IMPORTED_MODULE_1__.validConfig)(registeredElement)) {
      return;
    }
    var messageSpan = createMessageSpan(logLevel, message);
    registeredElement.appendChild(messageSpan);
  };
  var resetInnerHtmlToElement = function resetInnerHtmlToElement() {
    if (!(0,_validation_js__WEBPACK_IMPORTED_MODULE_1__.validConfig)(registeredElement)) {
      return;
    }
    registeredElement.innerHTML = "<b>Logs to be displayed:-</b>";
  };
  var logToConsole = function logToConsole(message) {
    var logLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
    if (logLevel && message) {
      var logFunction = console[logLevel] || console.log;
      logFunction("[".concat(logLevel.trim().toUpperCase(), "]: [").concat(new Date(), "]: ").concat(message));
    }
  };
  var log = function log() {
    var logLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'info';
    for (var _len = arguments.length, message = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      message[_key - 1] = arguments[_key];
    }
    var validLogLevels = ['info', 'warn', 'success', 'error', 'debug', 'trace', 'reset'];
    if (!validLogLevels.includes(logLevel.trim().toLowerCase())) {
      console.log("Invalid/Unknown Log Level: '".concat(logLevel, "'. Unable to log message."));
      return;
    } else if (!message) {
      console.log("Invalid Message: '".concat(message, "'. Unable to log message."));
      return;
    }
    if (logLevel === 'reset') {
      console.clear();
      resetInnerHtmlToElement();
      return;
    }
    logToConsole(message, logLevel);
    appendInnerHtmlToElement(message, logLevel);
  };
  var info = function info() {
    for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      message[_key2] = arguments[_key2];
    }
    return log('info', message);
  };
  var warning = function warning() {
    for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      message[_key3] = arguments[_key3];
    }
    return log('warn', message);
  };
  var success = function success() {
    for (var _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      message[_key4] = arguments[_key4];
    }
    return log('success', message);
  };
  var error = function error() {
    for (var _len5 = arguments.length, message = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      message[_key5] = arguments[_key5];
    }
    return log('error', message);
  };
  var trace = function trace() {
    for (var _len6 = arguments.length, message = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      message[_key6] = arguments[_key6];
    }
    return log('trace', message);
  };
  var debug = function debug() {
    for (var _len7 = arguments.length, message = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      message[_key7] = arguments[_key7];
    }
    return log('debug', message);
  };
  // const reset = () => resetInnerHtmlToElement();
  var reset = function reset() {
    return log('reset', ['Console is about to cleaned up']);
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

  // Public interface
  return {
    registerLoggingConfig: registerLoggingConfig,
    info: info,
    warning: warning,
    success: success,
    error: error,
    trace: trace,
    debug: debug,
    reset: reset
  };
};
var loggerUtility = LoggerUtility();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loggerUtility);

/***/ }),

/***/ "./src/js/utils/log/styles.js":
/*!************************************!*\
  !*** ./src/js/utils/log/styles.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: () => (/* binding */ applyStyles),
/* harmony export */   getStylesForType: () => (/* binding */ getStylesForType)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getStylesForType = function getStylesForType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'container';
  var baseStyle = {
    color: 'black',
    margin: '3px',
    borderRadius: '3px',
    whiteSpace: 'pre-wrap',
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

/***/ }),

/***/ "./src/js/utils/log/validation.js":
/*!****************************************!*\
  !*** ./src/js/utils/log/validation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerLoggingConfig: () => (/* binding */ registerLoggingConfig),
/* harmony export */   validConfig: () => (/* binding */ validConfig)
/* harmony export */ });
var validConfig = function validConfig(registeredElement) {
  if (registeredElement) {
    return true;
  } else {
    console.warn("No valid appender found. Logging utility is not initialized properly. Only console logs will be shown.");
    return false;
  }
};
var registerLoggingConfig = function registerLoggingConfig(element, elementId) {
  var registeredElement = null;
  if (element) {
    registeredElement = element;
  } else if (elementId) {
    var el = document.getElementById(elementId);
    if (el) {
      registeredElement = el;
    }
  }
  return registeredElement;
};

/***/ }),

/***/ "./src/modules/util/elementAdderUtility-examples/arrayUtility.js":
/*!***********************************************************************!*\
  !*** ./src/modules/util/elementAdderUtility-examples/arrayUtility.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNumbersArray: () => (/* binding */ createNumbersArray)
/* harmony export */ });
var createNumbersArray = function createNumbersArray(number) {
  return Array.from({
    length: number
  }, function (_, index) {
    return index + 1;
  });
};


/***/ }),

/***/ "./src/modules/util/elementAdderUtility-examples/colorUtility.js":
/*!***********************************************************************!*\
  !*** ./src/modules/util/elementAdderUtility-examples/colorUtility.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomColor: () => (/* binding */ getRandomColor)
/* harmony export */ });
var colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Brown", "Cyan", "Magenta"];
var getRandomColor = function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
};


/***/ }),

/***/ "./src/modules/util/elementAdderUtility-examples/elementUtility.js":
/*!*************************************************************************!*\
  !*** ./src/modules/util/elementAdderUtility-examples/elementUtility.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElementsArray: () => (/* binding */ createElementsArray)
/* harmony export */ });
/* harmony import */ var _arrayUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayUtility */ "./src/modules/util/elementAdderUtility-examples/arrayUtility.js");
/* harmony import */ var _colorUtility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorUtility */ "./src/modules/util/elementAdderUtility-examples/colorUtility.js");


var createElementsArray = function createElementsArray(numberOfElements) {
  var addToBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var parentElementId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return (0,_arrayUtility__WEBPACK_IMPORTED_MODULE_0__.createNumbersArray)(numberOfElements).map(function () {
    return {
      elementType: "div",
      addToBody: addToBody,
      parentElementId: parentElementId,
      style: {
        margin: '5px',
        padding: '5px',
        minHeight: "100px",
        backgroundColor: (0,_colorUtility__WEBPACK_IMPORTED_MODULE_1__.getRandomColor)()
      }
    };
  });
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
/*!********************************************************************!*\
  !*** ./src/scripts/custom/elementAdderUtility-examples/custom4.js ***!
  \********************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   childrenCreator: () => (/* binding */ childrenCreator),
/* harmony export */   myLogic: () => (/* binding */ myLogic)
/* harmony export */ });
/* harmony import */ var _js_utils_element_add_elementAdderUtility_v3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../js/utils/element-add/elementAdderUtility-v3.js */ "./src/js/utils/element-add/elementAdderUtility-v3.js");
/* harmony import */ var _js_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/lib/utils.js */ "./src/js/lib/utils.js");
/* harmony import */ var _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../js/utils/log/loggerUtility.js */ "./src/js/utils/log/loggerUtility.js");
/* harmony import */ var _modules_util_elementAdderUtility_examples_elementUtility_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../modules/util/elementAdderUtility-examples/elementUtility.js */ "./src/modules/util/elementAdderUtility-examples/elementUtility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var myLogic = function () {
  var createdHTMLElementsIdArray = [];
  var createHTMLElement = function createHTMLElement(element) {
    return _js_utils_element_add_elementAdderUtility_v3_js__WEBPACK_IMPORTED_MODULE_0__["default"].addElementWithPromise(element).then(function (createdElement) {
      createdHTMLElementsIdArray.push(createdElement.id);
      if (element.children && element.children.length > 0) {
        createdElement.style.display = "flex";
        createdElement.style.flexDirection = "row";
        var childPromises = element.children.map(function (child, index) {
          child.parentElementId = createdElement.id;
          child.addToBody = false;
          child.innerText = "".concat(index + 1, "th Child of ").concat(createdElement.id);
          child.style = _objectSpread(_objectSpread({}, child.style), {}, {
            flex: 1
          });
          return createHTMLElement(child);
        });
        return Promise.all(childPromises);
      }
    })["catch"](function (error) {
      _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].error("Error creating element:", error);
    });
  };
  var createHTMLElementsFromArray = function createHTMLElementsFromArray(elementsArray) {
    createdHTMLElementsIdArray = [];
    var elementPromises = elementsArray.map(function (elm) {
      return createHTMLElement(elm);
    });
    Promise.all(elementPromises)["catch"](function (error) {
      _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].info(error.message);
    })["finally"](function () {
      _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].info("Finished calculation for given set of array: ".concat(JSON.stringify(createdHTMLElementsIdArray, null, 2)));
      _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].success("Total elements created:- ".concat(createdHTMLElementsIdArray.length));
    });
  };
  return {
    createHTMLElementsFromArray: createHTMLElementsFromArray
  };
}();
var childrenCreator = function () {
  var createChildren = function createChildren() {
    var providedChildArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var parentElementId = arguments.length > 1 ? arguments[1] : undefined;
    var parentElm = (0,_modules_util_elementAdderUtility_examples_elementUtility_js__WEBPACK_IMPORTED_MODULE_3__.createElementsArray)(providedChildArray.length, false, parentElementId);
    parentElm = parentElm.map(function (elm, index) {
      return _objectSpread(_objectSpread({}, elm), {}, {
        children: (0,_modules_util_elementAdderUtility_examples_elementUtility_js__WEBPACK_IMPORTED_MODULE_3__.createElementsArray)(providedChildArray[index] || 0, false)
      });
    });
    return parentElm;
  };
  return {
    createChildren: createChildren
  };
}();

var createHTMLElementsFromArray = myLogic.createHTMLElementsFromArray;
var createChildren = childrenCreator.createChildren;
var myContainerDiv = document.createElement("div");
myContainerDiv.id = "premendra-kumar";
myContainerDiv.style.padding = "10px";
(0,_js_lib_utils_js__WEBPACK_IMPORTED_MODULE_1__.createConsoleAndRegisterMyId)(function (successResponse) {
  console.clear();
  var createdElementDiv = document.getElementById(successResponse.consoleDivId);
  createdElementDiv.style.width = "95%";
  _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].info("[Success]: ", JSON.stringify(successResponse));
  //reshuffle();
}, function (errorMessage) {
  _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].error("[Fail]: ", errorMessage);
}, function (LOGGERR) {
  _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].reset();
  _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_2__["default"].info("Console cleared.====================================================");
  myContainerDiv.replaceChildren();
  var arr = createChildren([2, 2], "premendra-kumar");
  //LOGGER.info("createChildren: ", JSON.stringify(arr, null, 2));
  createHTMLElementsFromArray(arr);
});
document.body.appendChild(myContainerDiv);
/******/ })()
;
//# sourceMappingURL=custom4.js.map