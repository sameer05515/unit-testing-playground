/******/ (() => { // webpackBootstrap
/*!***********************************************************************!*\
  !*** ./src/scripts/custom/css-flex-learning/CSS-Flexbox-basics-02.js ***!
  \***********************************************************************/
var styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // Ensures items start from the beginning without extra space
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
    flex: '1 1 30%',
    // Set to 30% to ensure three items per row
    boxSizing: 'border-box' // Ensure padding and border are included in the width
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
  children: [
    // { type: 'div', style: styles.item, innerHTML: 'Item 1' },
    // { type: 'div', style: styles.item, innerHTML: 'Item 2' },
    // { type: 'div', style: styles.item, innerHTML: 'Item 3' },
    // { type: 'div', style: styles.item, innerHTML: 'Item 4' },
  ]
}];
var childrenCount = 0;
var addChildren = function addChildren(containerEl) {
  containerEl.innerHTML = '';
  elements[0].children.push({
    type: 'div',
    style: styles.item,
    innerHTML: "Item ".concat(++childrenCount)
  });
  render(elements, containerEl);
};
var render = function render(elementList) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
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
var buttonEl = createElement('button', {}, 'Add', {});
myButtonContainerDiv.appendChild(buttonEl);
myContainerDiv.appendChild(myButtonContainerDiv);
myContainerDiv.appendChild(myElementsContainerDiv);
document.body.appendChild(myContainerDiv);
var intervalId;
buttonEl.addEventListener('click', function () {
  // elements.children=[];
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(function () {
    addChildren(myElementsContainerDiv);
  }, 10);
  setTimeout(function () {
    clearInterval(intervalId);
  }, 1000);
});
/******/ })()
;
//# sourceMappingURL=CSS-Flexbox-basics-02.js.map