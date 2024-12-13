/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************!*\
  !*** ./src/scripts/custom/first-script.ts ***!
  \********************************************/

// Function to create a styled element
var createElementWithStyles = function (tag, attributes, innerHTML, styles) {
    if (attributes === void 0) { attributes = {}; }
    if (innerHTML === void 0) { innerHTML = ''; }
    if (styles === void 0) { styles = {}; }
    var element = document.createElement(tag);
    Object.keys(attributes).forEach(function (attr) { return element.setAttribute(attr, attributes[attr]); });
    element.innerHTML = innerHTML;
    // Apply styles from the JSON object
    Object.keys(styles).forEach(function (styleKey) {
        element.style[styleKey] = styles[styleKey];
    });
    return element;
};
// Function to create a div with id 'tables' and a table with numbers from 1 to 10
var createTableDiv = function () {
    // Define styles for the div
    var divStyles = {
        border: '1px solid #000',
        padding: '10px',
        margin: '10px',
        width: '200px',
    };
    // Define styles for the table
    var tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    // Define styles for table cells
    var cellStyles = {
        border: '1px solid #000',
        padding: '5px',
        textAlign: 'center',
    };
    // Create the div with id 'tables'
    var tableDiv = createElementWithStyles('div', { id: 'tables' }, '', divStyles);
    // Create the table element
    var table = createElementWithStyles('table', {}, '', tableStyles);
    // Populate the table with numbers from 1 to 10
    for (var i = 1; i <= 10; i++) {
        var row = createElementWithStyles('tr');
        var cell = createElementWithStyles('td', {}, i.toString(), cellStyles);
        row.appendChild(cell);
        table.appendChild(row);
    }
    // Append the table to the div
    tableDiv.appendChild(table);
    // Append the div to the body (or any other element as needed)
    document.body.appendChild(tableDiv);
};
// Call the function to create the div and table
createTableDiv();

/******/ })()
;
//# sourceMappingURL=first-script.js.map