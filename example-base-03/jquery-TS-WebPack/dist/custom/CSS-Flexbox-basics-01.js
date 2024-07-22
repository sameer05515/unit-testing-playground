/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*****************************************************!*\
  !*** ./src/scripts/custom/CSS-Flexbox-basics-01.ts ***!
  \*****************************************************/

var styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '10vh',
        backgroundColor: '#f0f0f0',
    },
    item: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '2px',
        margin: '3px',
        textAlign: 'center',
        flex: '1 1 50px',
    }
};
var applyStyles = function (element, styles) {
    for (var property in styles) {
        element.style[property] = styles[property];
    }
};
var createElement = function (tag, attributes, innerHTML, styles) {
    if (attributes === void 0) { attributes = {}; }
    if (innerHTML === void 0) { innerHTML = ''; }
    if (styles === void 0) { styles = {}; }
    var element = document.createElement(tag);
    Object.keys(attributes).forEach(function (attr) { return element.setAttribute(attr, attributes[attr]); });
    applyStyles(element, styles);
    element.innerHTML = innerHTML;
    return element;
};
var elements = [
    {
        type: 'div', style: styles.container, children: [
        // Initially no children, will be added dynamically
        ]
    }
];
var childrenCount = 0;
var addChildren = function (containerEl) {
    var _a;
    containerEl.innerHTML = '';
    (_a = elements[0].children) === null || _a === void 0 ? void 0 : _a.push({
        type: 'div', style: styles.item, innerHTML: "Item ".concat(++childrenCount)
    });
    render(elements, containerEl);
};
var render = function (elementList, parent) {
    if (parent === void 0) { parent = document.body; }
    elementList.forEach(function (_a) {
        var type = _a.type, style = _a.style, children = _a.children, innerHTML = _a.innerHTML;
        var element = createElement(type, {}, innerHTML || '', style || {});
        if (children && Array.isArray(children) && children.length > 0) {
            children.forEach(function (child) {
                var childElement = createElement(child.type, {}, child.innerHTML || '', child.style || {});
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
var intervalId = null;
buttonEl.addEventListener('click', function () {
    if (intervalId)
        clearInterval(intervalId);
    intervalId = setInterval(function () {
        addChildren(myElementsContainerDiv);
    }, 10);
    setTimeout(function () {
        if (intervalId)
            clearInterval(intervalId);
    }, 1000);
});

/******/ })()
;
//# sourceMappingURL=CSS-Flexbox-basics-01.js.map