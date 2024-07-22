/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils/global/globalConstants.js":
/*!************************************************!*\
  !*** ./src/js/utils/global/globalConstants.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var globalConstants = function () {
  var scriptNames = [{
    link: "non-existing-script.js",
    external: false
  },
  // { link: "basic-promise-syntax1.js", external: false },
  // { link: "basic-promise-syntax2.js", external: false },
  // { link: "basic-promise-syntax3.js", external: false },
  // { link: "basic-promise-syntax4.js", external: false },
  // { link: "image-reload-script.js", external: false },
  // { link: "add-and-remove-elements-on-click.js", external: false },
  // { link: "add-and-remove-scripts-on-click.js", external: false },
  // { link: "utility-functions-consumer.js", external: false },
  // { link: "add-and-remove-elements-on-click-with-utility.js", external: false },
  // { link: "reuse-promise-for-set-of-given-values-with-promise-allSettled-1.js", external: false },
  // { link: "reuse-promise-for-set-of-given-values-with-promise-allSettled-2.js", external: false },
  // { link: "reuse-promise-for-set-of-given-values-with-runSequentially-with-async-await.js", external: false },
  // { link: "reuse-promise-for-set-of-given-values-with-runSequentially-promiseChain.js", external: false },
  // { link: "promiseChain-example-1.js", external: false },
  // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-1.js", external: false },
  // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-2.js", external: false },
  // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-3.js", external: false },
  // { link: "spans-with-inline-styles-to-show-error-warning-info-and-success-messages-4.js", external: false },
  // { link: "create-a-div-for-given-xml-string.js" },
  // { link: "convert-a-given-xml-string-into-a-json-object.js" },
  // { link: "promise-dot-all-use-case.js" },
  // { link: "promiseChain-example-2.js" },
  // { link: "object-to-a-new-array.js" },
  //////{link: 'elementAdderUtility-examples/custom1.js'},
  // {link: 'elementAdderUtility-examples/custom2.js'},
  // {link: 'elementAdderUtility-examples/custom3.js'},
  {
    link: 'chart-usage/attendance-visualization-v3.js'
  }, {
    link: 'elementAdderUtility-examples/custom0.1.js'
  }, {
    link: 'elementAdderUtility-examples/custom4.js'
  }, {
    link: 'use-case-to-learn-promise/use-case-01.js'
  }, {
    link: 'use-case-to-learn-promise/use-case-02.js'
  }, {
    link: 'use-case-to-learn-promise/use-case-03-batching-requests.js'
  }, {
    link: 'use-case-to-learn-promise/use-case-04-sequential-processing.js'
  }, {
    link: 'css-flex-learning/CSS-Flexbox-basics-01.js'
  }, {
    link: 'css-flex-learning/CSS-Flexbox-basics-02.js'
  }, {
    link: 'css-flex-learning/CSS-Flexbox-basics-03.js'
  }, {
    link: 'css-flex-learning/CSS-Flexbox-basics-04.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.1.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.2.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.3.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.4.js'
  }, {
    link: 'css-flex-learning/elements/button/button-attributes.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.4.1.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.4.2.js'
  }, {
    link: 'css-flex-learning/elements/button/buttons-style-0.4.2.1.js'
  }, {
    link: 'css-flex-learning/elements/select/select-style-0.1.js'
  }, {
    link: 'css-flex-learning/elements/select/select-style-0.2.js'
  }, {
    link: 'css-flex-learning/elements/select/select-style-0.3.js'
  }, {
    link: 'css-flex-learning/elements/select/custom-dropdown-0.1.js'
  }, {
    link: 'css-flex-learning/elements/input/input-style-0.1.js'
  }, {
    link: 'css-flex-learning/elements/input/custom-dropdown-0.2.js'
  }, {
    link: 'css-flex-learning/elements/label/label-style-0.1.js'
  }, {
    link: 'css-flex-learning/elements/tooltip/tooltip-style-0.1.js'
  }, {
    link: 'use-case-to-learn-promise/use-case-just-chain-promises.js'
  }, {
    link: 'use-case-to-learn-promise/use-case-just-chain-promises-0.1.js'
  }, {
    link: 'use-case-to-learn-promise/chaining-in-cleaner-way.js'
  }, {
    link: 'use-case-to-learn-promise/chaining-in-cleaner-way-0.1.js'
  }, {
    link: 'graphql-consume/gql-demo-0.1.js'
  }, {
    link: 'graphql-consume/gql-demo-0.2.js'
  }, {
    link: 'css-flex-learning/learning-0.1.js'
  }, {
    link: 'css-flex-learning/learning-0.2.js'
  }, {
    link: 'graphql-consume/gql-demo-0.3.js'
  }, {
    link: 'graphql-consume/gql-demo-0.3.1.js'
  }, {
    link: 'markdown-to-html/md-to-html-v1.0.js'
  }];
  var SCRIPTS_OPTIONS = scriptNames.map(function (v) {
    return {
      value: !v.external || v.external !== true ? "/dist/custom/".concat(v.link) : v.link,
      label: v.link
    };
  });
  return {
    SCRIPTS_OPTIONS: SCRIPTS_OPTIONS
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globalConstants);

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
/*!*********************************************!*\
  !*** ./src/scripts/main-v0.0.2-snapshot.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../js/utils/log/loggerUtility.js */ "./src/js/utils/log/loggerUtility.js");
/* harmony import */ var _js_utils_global_globalConstants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../js/utils/global/globalConstants.js */ "./src/js/utils/global/globalConstants.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


var styles = {
  mainDiv: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  h1: {
    color: '#333',
    marginBottom: '10px'
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
    marginBottom: '20px'
  },
  selectedPersonDiv: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff'
  }
};
(function () {
  //===================== Utility Functions ====================

  var isValidSelectedScript = function isValidSelectedScript(selectedScript) {
    return selectedScript && _typeof(selectedScript) === "object" && !Array.isArray(selectedScript) && typeof selectedScript.execute === "function";
  };

  // Function to create an element with attributes and styles
  var createElement = function createElement(tag) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var innerHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var styles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var element = document.createElement(tag);
    Object.keys(attributes).forEach(function (attr) {
      return element.setAttribute(attr, attributes[attr]);
    });
    Object.assign(element.style, styles);
    element.innerHTML = innerHTML;
    return element;
  };

  // Function to load a script
  var loadScript = function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = createElement('script', {
        src: src,
        type: 'module'
      });
      script.onload = function () {
        return resolve(script);
      };
      script.onerror = function () {
        return reject(new Error("Script load error for ".concat(src)));
      };
      document.head.append(script);
    });
  };

  // Function to clear extra components
  var clearExtraComponents = function clearExtraComponents() {
    _toConsumableArray(document.body.children).forEach(function (child) {
      if (child === myMainDiv || ["meri-tag-line-wali-id-DO-NOT-DELETE", "meri-tag-line-wali-id2-DO-NOT-DELETE"].includes(child.id)) {
        console.log('skipping to delete preserved elements');
        return;
      }
      document.body.removeChild(child);
    });
    _toConsumableArray(document.head.children).forEach(function (child) {
      if (!['script', 'style'].includes(child.tagName.toLowerCase()) || ['mybase-script', 'utility-script', 'd3-script'].includes(child.id)) return;
      document.head.removeChild(child);
    });
  };

  //===================== Main Script ====================

  var myMainDiv = createElement('div', {
    id: 'mathru-ki-bijli-ka-hindola'
  }, '', styles.mainDiv);
  var myH1 = createElement('div', {}, "\n        <h1>Check the console for output - Premendra Kumar</h1>\n        <h1 style=\"color:red;\">main-v0.0.2-snapshot.js</h1>\n        <h1>Select Component Example</h1>\n        <span style=\"display: block; white-space: pre;\">\n            In this component, we have created a combo; on change of this, we are executing functions defined in passed self-executing functions\n        </span>\n    ", styles.h1);
  var selectedPersonDiv = createElement('div', {}, '', styles.selectedPersonDiv);
  var select = createElement('select', {
    id: "mySelect"
  }, '', styles.select);
  var defaultOption = createElement('option', {
    disabled: true,
    selected: true
  }, "Select Option");
  select.appendChild(defaultOption);
  _js_utils_global_globalConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].SCRIPTS_OPTIONS.forEach(function (optionData, index) {
    var option = createElement('option', {
      value: index
    }, optionData.label);
    select.appendChild(option);
  });
  var selectedScript = null;
  var handleSelectOptionsChange = function handleSelectOptionsChange(event) {
    clearExtraComponents();
    var selectedOption = event.target.options[event.target.selectedIndex];
    selectedScript = _js_utils_global_globalConstants_js__WEBPACK_IMPORTED_MODULE_1__["default"].SCRIPTS_OPTIONS[selectedOption.value].value;
    _js_utils_log_loggerUtility_js__WEBPACK_IMPORTED_MODULE_0__["default"].info("[OPTION SELECTED]", selectedScript);
    loadScript(selectedScript).then(function (script) {
      selectedPersonDiv.innerHTML = "Selected: <strong>".concat(selectedScript, "</strong> Status: <span style=\"color: green;\"><strong>").concat(script.src, " is loaded successfully!!</strong></span>");
    })["catch"](function (error) {
      selectedPersonDiv.innerHTML = "Selected: <strong>".concat(selectedScript, "</strong> Status: <span style=\"color: red;\"><strong>Error: ").concat(error.message, "</strong></span>");
    });
  };
  select.addEventListener("change", handleSelectOptionsChange);
  myMainDiv.append(myH1, select, selectedPersonDiv);
  document.body.appendChild(myMainDiv);
})();
/******/ })()
;
//# sourceMappingURL=main-v0.0.2-snapshot.js.map