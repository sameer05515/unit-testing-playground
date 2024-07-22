/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!********************************************************************************!*\
  !*** ./src/scripts/custom/css-flex-learning/elements/label/label-style-0.1.js ***!
  \********************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../modules/common/ElementCreatorUtil */ "./src/modules/common/ElementCreatorUtil.js");
// Import necessary functions from ElementCreatorUtil.js


// Define styles
var styles = {
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  }
};

// Create a container div
var myContainerDiv = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createDiv)({}, "", {}, {});

// Create a label element
var myLabel = (0,_modules_common_ElementCreatorUtil__WEBPACK_IMPORTED_MODULE_0__.createLabel)({
  "for": 'myInput'
},
// Attributes
'My Custom Label',
// Inner HTML
styles.label,
// Styles
{} // Events
);

// Append the label to the container div
myContainerDiv.appendChild(myLabel);

// Append the container div to the body
document.body.appendChild(myContainerDiv);

// Optionally, add an input element associated with the label
var myInput = document.createElement('input');
myInput.id = 'myInput';
myContainerDiv.appendChild(myInput);
/******/ })()
;
//# sourceMappingURL=label-style-0.1.js.map