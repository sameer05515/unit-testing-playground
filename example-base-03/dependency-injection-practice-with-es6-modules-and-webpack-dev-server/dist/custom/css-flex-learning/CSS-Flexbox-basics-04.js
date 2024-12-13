/******/ (() => { // webpackBootstrap
/*!***********************************************************************!*\
  !*** ./src/scripts/custom/css-flex-learning/CSS-Flexbox-basics-04.js ***!
  \***********************************************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: '#f0f0f0'
  },
  item: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '2px',
    margin: '3px',
    textAlign: 'center',
    flex: '0 1 30%',
    boxSizing: 'border-box'
  }
};
var applyStyles = function applyStyles(element, styles) {
  for (var property in styles) {
    element.style[property] = styles[property];
  }
};
var createElement = function createElement(tag) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var innerHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var styles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var element = document.createElement(tag);
  Object.keys(attributes).forEach(function (attr) {
    return element.setAttribute(attr, attributes[attr]);
  });
  applyStyles(element, styles);
  element.innerHTML = innerHTML;
  return element;
};
var elements = [{
  type: 'div',
  style: styles.container,
  children: []
}];
var childrenCount = 0;
var numberOfItems = 3;
var addChildren = function addChildren(containerEl) {
  elements[0].children.push({
    type: 'div',
    style: _objectSpread(_objectSpread({}, styles.item), {}, {
      flex: "0 1 calc(".concat(100 / numberOfItems, "% - 6px)")
    }),
    innerHTML: "Item ".concat(++childrenCount)
  });
  render(elements, containerEl);
};
var render = function render(elementList) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  parent.innerHTML = ''; // Clear the parent content before rendering
  elementList.forEach(function (_ref) {
    var type = _ref.type,
      style = _ref.style,
      children = _ref.children,
      innerHTML = _ref.innerHTML;
    var element = createElement(type, {}, innerHTML, style);
    if (children && Array.isArray(children) && children.length > 0) {
      children.forEach(function (child) {
        var childElement = createElement(child.type, {}, child.innerHTML, child.style);
        element.appendChild(childElement);
      });
    }
    parent.appendChild(element);
  });
};
var myContainerDiv = createElement('div', {}, '', {});
var myButtonContainerDiv = createElement('div', {}, '', {});
var myElementsContainerDiv = createElement('div', {}, '', {});
var buttonAddEl = createElement('button', {}, 'Add', {});
var buttonIncreaseEl = createElement('button', {}, "Increase Elements in Row {".concat(numberOfItems, "}"), {});
myButtonContainerDiv.appendChild(buttonAddEl);
myButtonContainerDiv.appendChild(buttonIncreaseEl);
myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);
document.body.appendChild(myContainerDiv);
var intervalId;
buttonAddEl.addEventListener('click', function () {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(function () {
    addChildren(myElementsContainerDiv);
  }, 10);
  setTimeout(function () {
    clearInterval(intervalId);
  }, 1000);
});
buttonIncreaseEl.addEventListener('click', function () {
  buttonIncreaseEl.innerHTML = "Increase Elements in Row {".concat(++numberOfItems, "}");
  elements[0].children.forEach(function (child) {
    child.style.flex = "0 1 calc(".concat(100 / numberOfItems, "% - 6px)");
  });
  render(elements, myElementsContainerDiv);
});
/******/ })()
;
//# sourceMappingURL=CSS-Flexbox-basics-04.js.map