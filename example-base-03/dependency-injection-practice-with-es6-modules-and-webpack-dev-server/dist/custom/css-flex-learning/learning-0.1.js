/******/ (() => { // webpackBootstrap
/*!**************************************************************!*\
  !*** ./src/scripts/custom/css-flex-learning/learning-0.1.js ***!
  \**************************************************************/
function createContainerWithGeneralInfo() {
  // Create the main container div
  var container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.padding = '10px';
  container.style.border = '1px solid #ccc';
  container.style.margin = '10px';
  container.style.borderRadius = '8px';

  // Create the generalInfo div
  var generalInfo = document.createElement('div');
  generalInfo.style.display = 'flex';
  // generalInfo.style.justifyContent = 'space-between';
  generalInfo.style.padding = '10px';
  generalInfo.style.border = '1px solid #ccc';
  generalInfo.style.marginTop = '10px';
  generalInfo.style.borderRadius = '8px';

  // Create the first child div with text "div1"
  var div1 = document.createElement('div');
  div1.innerText = 'div1';
  div1.style.flex = '1';
  div1.style.padding = '10px';
  // div1.style.border = '1px solid #ccc';
  div1.style.marginRight = '10px';
  div1.style.borderRadius = '8px';

  // Create the second child div with text "div2"
  var div2 = document.createElement('div');
  div2.innerText = 'div2';
  div2.style.flex = '1';
  div2.style.padding = '10px';
  // div2.style.border = '1px solid #ccc';
  div2.style.borderRadius = '8px';

  // Append the child divs to the generalInfo div
  generalInfo.appendChild(div1);
  generalInfo.appendChild(div2);

  // Append the generalInfo div to the container div
  container.appendChild(generalInfo);

  // Append the container div to the body or any specific container
  document.body.appendChild(container);
}

// Call the function to create and add the divs to the document
createContainerWithGeneralInfo();
/******/ })()
;
//# sourceMappingURL=learning-0.1.js.map