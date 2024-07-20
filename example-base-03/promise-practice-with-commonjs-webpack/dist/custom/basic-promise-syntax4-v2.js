/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/custom/basic-promise-syntax4-v2.js":
/*!********************************************************!*\
  !*** ./src/scripts/custom/basic-promise-syntax4-v2.js ***!
  \********************************************************/
/***/ ((module) => {

// circleModule.js

var defaultCircleValues = {
  radius: 100,
  leftPadding: 70,
  topPadding: 70
};
function check() {
  var radius = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultCircleValues.radius;
  var leftPadding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCircleValues.leftPadding;
  var topPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultCircleValues.topPadding;
  showCircle(radius + leftPadding, radius + topPadding, radius).then(function (div) {
    div.style.fontSize = "20px";
    div.style.lineHeight = "".concat(radius * 2, "px");
    div.style.textAlign = "center";
    div.append("Hello, world!");
  });
}
function showCircle(cx, cy, radius) {
  var div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";
  div.className = "circle";
  document.body.append(div);
  return new Promise(function (resolve) {
    setTimeout(function () {
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";
      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 0);
  });
}
function initializeStyles() {
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = "\n      .circle {\n          transition-property: width, height;\n          transition-duration: 5s;\n          position: fixed;\n          transform: translateX(-50%) translateY(-50%);\n          background-color: red;\n          border-radius: 50%;\n      }\n    ";
  document.head.appendChild(style);
}
function createControls() {
  var myContainerDiv = document.createElement('div');
  var radiusInputEl = document.createElement("input");
  radiusInputEl.type = "text";
  radiusInputEl.id = "radiusInputElId";
  radiusInputEl.placeholder = "Enter radius {Default value is: 100}";
  var leftPaddingInputEl = document.createElement("input");
  leftPaddingInputEl.type = "text";
  leftPaddingInputEl.id = "leftPaddingInputElId";
  leftPaddingInputEl.placeholder = "Enter Left Padding {Default value is: 70}";
  var topPaddingInputEl = document.createElement("input");
  topPaddingInputEl.type = "text";
  topPaddingInputEl.id = "topPaddingInputElId";
  topPaddingInputEl.placeholder = "Enter Top Padding {Default value is: 70}";
  var button = document.createElement("button");
  button.innerText = "Click me";
  button.onclick = function () {
    var radius = +document.getElementById("radiusInputElId").value || defaultCircleValues.radius;
    var leftPadding = +document.getElementById("leftPaddingInputElId").value || defaultCircleValues.leftPadding;
    var topPadding = +document.getElementById("topPaddingInputElId").value || defaultCircleValues.topPadding;
    console.log("radius: ".concat(radius, ", leftPadding: ").concat(leftPadding, ", topPadding: ").concat(topPadding));
    check(radius, leftPadding, topPadding);
  };
  myContainerDiv.appendChild(radiusInputEl);
  myContainerDiv.appendChild(document.createElement('br'));
  myContainerDiv.appendChild(leftPaddingInputEl);
  myContainerDiv.appendChild(document.createElement('br'));
  myContainerDiv.appendChild(topPaddingInputEl);
  myContainerDiv.appendChild(document.createElement('br'));
  myContainerDiv.appendChild(button);
  document.body.appendChild(myContainerDiv);
}
function initialize() {
  console.log('Initialization code runs');
  initializeStyles();
  createControls();
}
module.exports = {
  initialize: initialize,
  check: check,
  showCircle: showCircle
};

// main.js
// const circleModule = require('./circleModule.js');

// document.addEventListener('DOMContentLoaded', (event) => {
//   initialize();
// });

initialize();

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/custom/basic-promise-syntax4-v2.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVZBO0FBQ0YsQ0FBQzs7QUFHRDtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTRDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7VUNySFo7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LW5vZGUtcHJvamVjdC8uL3NyYy9zY3JpcHRzL2N1c3RvbS9iYXNpYy1wcm9taXNlLXN5bnRheDQtdjIuanMiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LW5vZGUtcHJvamVjdC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL215LW5vZGUtcHJvamVjdC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjaXJjbGVNb2R1bGUuanNcclxuXHJcbmNvbnN0IGRlZmF1bHRDaXJjbGVWYWx1ZXMgPSB7XHJcbiAgICByYWRpdXM6IDEwMCxcclxuICAgIGxlZnRQYWRkaW5nOiA3MCxcclxuICAgIHRvcFBhZGRpbmc6IDcwLFxyXG4gIH07XHJcbiAgXHJcbiAgZnVuY3Rpb24gY2hlY2soXHJcbiAgICByYWRpdXMgPSBkZWZhdWx0Q2lyY2xlVmFsdWVzLnJhZGl1cyxcclxuICAgIGxlZnRQYWRkaW5nID0gZGVmYXVsdENpcmNsZVZhbHVlcy5sZWZ0UGFkZGluZyxcclxuICAgIHRvcFBhZGRpbmcgPSBkZWZhdWx0Q2lyY2xlVmFsdWVzLnRvcFBhZGRpbmdcclxuICApIHtcclxuICAgIHNob3dDaXJjbGUocmFkaXVzICsgbGVmdFBhZGRpbmcsIHJhZGl1cyArIHRvcFBhZGRpbmcsIHJhZGl1cykudGhlbigoZGl2KSA9PiB7XHJcbiAgICAgIGRpdi5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xyXG4gICAgICBkaXYuc3R5bGUubGluZUhlaWdodCA9IGAke3JhZGl1cyAqIDJ9cHhgO1xyXG4gICAgICBkaXYuc3R5bGUudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgZGl2LmFwcGVuZChcIkhlbGxvLCB3b3JsZCFcIik7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gc2hvd0NpcmNsZShjeCwgY3ksIHJhZGl1cykge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuc3R5bGUud2lkdGggPSAwO1xyXG4gICAgZGl2LnN0eWxlLmhlaWdodCA9IDA7XHJcbiAgICBkaXYuc3R5bGUubGVmdCA9IGN4ICsgXCJweFwiO1xyXG4gICAgZGl2LnN0eWxlLnRvcCA9IGN5ICsgXCJweFwiO1xyXG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiY2lyY2xlXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChkaXYpO1xyXG4gIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHJhZGl1cyAqIDIgKyBcInB4XCI7XHJcbiAgICAgICAgZGl2LnN0eWxlLmhlaWdodCA9IHJhZGl1cyAqIDIgKyBcInB4XCI7XHJcbiAgXHJcbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XHJcbiAgICAgICAgICBkaXYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgaGFuZGxlcik7XHJcbiAgICAgICAgICByZXNvbHZlKGRpdik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGluaXRpYWxpemVTdHlsZXMoKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCI7XHJcbiAgICBzdHlsZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIC5jaXJjbGUge1xyXG4gICAgICAgICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogd2lkdGgsIGhlaWdodDtcclxuICAgICAgICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDVzO1xyXG4gICAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgIH1cclxuICAgIGA7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICB9XHJcbiAgXHJcbiAgZnVuY3Rpb24gY3JlYXRlQ29udHJvbHMoKSB7XHJcbiAgICBjb25zdCBteUNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIFxyXG4gICAgY29uc3QgcmFkaXVzSW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHJhZGl1c0lucHV0RWwudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgcmFkaXVzSW5wdXRFbC5pZCA9IFwicmFkaXVzSW5wdXRFbElkXCI7XHJcbiAgICByYWRpdXNJbnB1dEVsLnBsYWNlaG9sZGVyID0gXCJFbnRlciByYWRpdXMge0RlZmF1bHQgdmFsdWUgaXM6IDEwMH1cIjtcclxuICBcclxuICAgIGNvbnN0IGxlZnRQYWRkaW5nSW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGxlZnRQYWRkaW5nSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBsZWZ0UGFkZGluZ0lucHV0RWwuaWQgPSBcImxlZnRQYWRkaW5nSW5wdXRFbElkXCI7XHJcbiAgICBsZWZ0UGFkZGluZ0lucHV0RWwucGxhY2Vob2xkZXIgPSBcIkVudGVyIExlZnQgUGFkZGluZyB7RGVmYXVsdCB2YWx1ZSBpczogNzB9XCI7XHJcbiAgXHJcbiAgICBjb25zdCB0b3BQYWRkaW5nSW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHRvcFBhZGRpbmdJbnB1dEVsLnR5cGUgPSBcInRleHRcIjtcclxuICAgIHRvcFBhZGRpbmdJbnB1dEVsLmlkID0gXCJ0b3BQYWRkaW5nSW5wdXRFbElkXCI7XHJcbiAgICB0b3BQYWRkaW5nSW5wdXRFbC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgVG9wIFBhZGRpbmcge0RlZmF1bHQgdmFsdWUgaXM6IDcwfVwiO1xyXG4gIFxyXG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIkNsaWNrIG1lXCI7XHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHJhZGl1cyA9ICtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhZGl1c0lucHV0RWxJZFwiKS52YWx1ZSB8fCBkZWZhdWx0Q2lyY2xlVmFsdWVzLnJhZGl1cztcclxuICAgICAgbGV0IGxlZnRQYWRkaW5nID0gK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdFBhZGRpbmdJbnB1dEVsSWRcIikudmFsdWUgfHwgZGVmYXVsdENpcmNsZVZhbHVlcy5sZWZ0UGFkZGluZztcclxuICAgICAgbGV0IHRvcFBhZGRpbmcgPSArZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b3BQYWRkaW5nSW5wdXRFbElkXCIpLnZhbHVlIHx8IGRlZmF1bHRDaXJjbGVWYWx1ZXMudG9wUGFkZGluZztcclxuICAgICAgY29uc29sZS5sb2coYHJhZGl1czogJHtyYWRpdXN9LCBsZWZ0UGFkZGluZzogJHtsZWZ0UGFkZGluZ30sIHRvcFBhZGRpbmc6ICR7dG9wUGFkZGluZ31gKTtcclxuICAgICAgY2hlY2socmFkaXVzLCBsZWZ0UGFkZGluZywgdG9wUGFkZGluZyk7XHJcbiAgICB9O1xyXG4gIFxyXG4gICAgbXlDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQocmFkaXVzSW5wdXRFbCk7XHJcbiAgICBteUNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcclxuICAgIG15Q29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGxlZnRQYWRkaW5nSW5wdXRFbCk7XHJcbiAgICBteUNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpKTtcclxuICAgIG15Q29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRvcFBhZGRpbmdJbnB1dEVsKTtcclxuICAgIG15Q29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpO1xyXG4gICAgbXlDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobXlDb250YWluZXJEaXYpO1xyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgY29uc29sZS5sb2coJ0luaXRpYWxpemF0aW9uIGNvZGUgcnVucycpO1xyXG4gICAgaW5pdGlhbGl6ZVN0eWxlcygpO1xyXG4gICAgY3JlYXRlQ29udHJvbHMoKTtcclxuICB9XHJcbiAgXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0aWFsaXplLFxyXG4gICAgY2hlY2ssXHJcbiAgICBzaG93Q2lyY2xlXHJcbiAgfTtcclxuXHJcblxyXG4gIC8vIG1haW4uanNcclxuLy8gY29uc3QgY2lyY2xlTW9kdWxlID0gcmVxdWlyZSgnLi9jaXJjbGVNb2R1bGUuanMnKTtcclxuXHJcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoZXZlbnQpID0+IHtcclxuLy8gICBpbml0aWFsaXplKCk7XHJcbi8vIH0pO1xyXG5cclxuaW5pdGlhbGl6ZSgpO1xyXG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2N1c3RvbS9iYXNpYy1wcm9taXNlLXN5bnRheDQtdjIuanNcIik7XG4iLCIiXSwibmFtZXMiOlsiZGVmYXVsdENpcmNsZVZhbHVlcyIsInJhZGl1cyIsImxlZnRQYWRkaW5nIiwidG9wUGFkZGluZyIsImNoZWNrIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic2hvd0NpcmNsZSIsInRoZW4iLCJkaXYiLCJzdHlsZSIsImZvbnRTaXplIiwibGluZUhlaWdodCIsImNvbmNhdCIsInRleHRBbGlnbiIsImFwcGVuZCIsImN4IiwiY3kiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJjbGFzc05hbWUiLCJib2R5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5pdGlhbGl6ZVN0eWxlcyIsInR5cGUiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVDb250cm9scyIsIm15Q29udGFpbmVyRGl2IiwicmFkaXVzSW5wdXRFbCIsImlkIiwicGxhY2Vob2xkZXIiLCJsZWZ0UGFkZGluZ0lucHV0RWwiLCJ0b3BQYWRkaW5nSW5wdXRFbCIsImJ1dHRvbiIsImlubmVyVGV4dCIsIm9uY2xpY2siLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsImluaXRpYWxpemUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==