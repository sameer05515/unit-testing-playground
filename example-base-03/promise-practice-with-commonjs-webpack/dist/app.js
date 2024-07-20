/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/basic/module1.js":
/*!**************************************!*\
  !*** ./src/modules/basic/module1.js ***!
  \**************************************/
/***/ ((module) => {

// module1.js
function greet(name) {
  console.log("Hello, ".concat(name, "!"));
}
module.exports = {
  greet: greet
};

/***/ }),

/***/ "./src/modules/basic/module2.js":
/*!**************************************!*\
  !*** ./src/modules/basic/module2.js ***!
  \**************************************/
/***/ ((module) => {

// module2.js
function calculateSquare(num) {
  return num * num;
}
var calculateSum = function calculateSum() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return initialValue + 1;
};
module.exports = {
  calculateSquare: calculateSquare,
  calculateSum: calculateSum
};

/***/ }),

/***/ "./src/modules/v1/globalConstants.js":
/*!*******************************************!*\
  !*** ./src/modules/v1/globalConstants.js ***!
  \*******************************************/
/***/ ((module) => {

// globalConstants.js
var globalConstants = function () {
  var scriptNames = [{
    link: "non-existing-script.js",
    external: false
  }, {
    link: "basic-promise-syntax1.js",
    external: false
  }, {
    link: 'basic-promise-syntax4.js',
    external: false
  },
  // ... other script names
  {
    link: "fetch-api-learning/get-all-employees-v3-with-console-and-utility.js"
  }, {
    link: 'basic-promise-syntax4-v2.js',
    external: false
  }, {
    link: 'basic-promise-syntax4-v3.js',
    external: false
  }, {
    link: 'initialConsoleComponentCreatorUtility.test.js',
    external: false
  }, {
    link: 'd3-practice.js',
    external: false
  }];
  var SCRIPTS_OPTIONS = scriptNames.map(function (v) {
    return {
      value: !v.external ? "../../dist/custom/".concat(v.link) : v.link,
      label: v.link
    };
  });
  return {
    SCRIPTS_OPTIONS: SCRIPTS_OPTIONS
  };
}();
module.exports = globalConstants;

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
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
// app.js
var _require = __webpack_require__(/*! ../modules/basic/module1 */ "./src/modules/basic/module1.js"),
  greet = _require.greet;
var _require2 = __webpack_require__(/*! ../modules/basic/module2 */ "./src/modules/basic/module2.js"),
  calculateSquare = _require2.calculateSquare,
  calculateSum = _require2.calculateSum;
var globalConstants = __webpack_require__(/*! ../modules/v1/globalConstants */ "./src/modules/v1/globalConstants.js");
(function () {
  var styles = {
    select: {
      width: "200px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "20px"
    },
    displayDiv: {
      padding: "10px",
      fontSize: "18px",
      color: "#333",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "5px",
      marginTop: "10px"
    }
  };
  var count = 0;
  var MAX = 3;
  var mySelectComp = null;
  var displayDiv = null;

  // Function to load a script
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = function () {
        return resolve(script);
      };
      script.onerror = function () {
        return reject(new Error("Script load error for ".concat(src)));
      };
      document.head.append(script);
    });
  }

  // Function to clear extra components
  function clearExtraComponents() {
    var bodyElements = document.body.children;
    for (var i = bodyElements.length - 1; i >= 0; i--) {
      var element = bodyElements[i];
      if (element === mySelectComp || element === displayDiv || element.id === "my-header-h1-i-hate-vandana") {
        continue;
      } else {
        document.body.removeChild(element);
      }
    }
    var headElements = document.head.children;
    for (var _i = headElements.length - 1; _i >= 0; _i--) {
      var _element = headElements[_i];
      if (_element.tagName.toLowerCase() !== "script" && _element.tagName.toLowerCase() !== "style" || _element.tagName.toLowerCase() === "script" && (_element.id === "mybase-script" || _element.id === "utility-script")) {
        continue;
      } else {
        document.head.removeChild(_element);
      }
    }
  }
  var createInitialComponents1 = function createInitialComponents1() {
    var btn = document.createElement('button');
    btn.innerText = 'Reload';
    btn.onclick = function () {
      greet("Premedra Kumar clicked at ".concat(new Date()));
      count = calculateSum(count);
      console.log('SQUARE: ' + calculateSquare(count));
      if (count > MAX) {
        count = 0;
        console.log('Resetting count');
      }
    };
    document.body.appendChild(btn);
  };
  var createInitialComponents2 = function createInitialComponents2() {
    // Create select element
    mySelectComp = document.createElement("select");
    mySelectComp.id = "mySelect";

    // Apply styles to select element
    Object.keys(styles.select).forEach(function (styleKey) {
      mySelectComp.style[styleKey] = styles.select[styleKey];
    });

    // Add options to the mySelectComp element
    globalConstants.SCRIPTS_OPTIONS.forEach(function (optionData) {
      var option = document.createElement("option");
      option.value = optionData.value;
      option.innerText = optionData.label;
      mySelectComp.appendChild(option);
    });

    // Create a div to display selected value
    displayDiv = document.createElement("div");
    displayDiv.id = "display";
    displayDiv.innerText = "Selected value will be displayed here";

    // Apply styles to displayDiv element
    Object.keys(styles.displayDiv).forEach(function (styleKey) {
      displayDiv.style[styleKey] = styles.displayDiv[styleKey];
    });

    // Add event listener to mySelectComp element
    mySelectComp.addEventListener("change", function () {
      clearExtraComponents();
      var selectedScript = mySelectComp.value;
      loadScript(selectedScript).then(function (script) {
        displayDiv.innerText = "Selected: ".concat(selectedScript, ",\nStatus: ").concat(script.src, " is loaded successfully!!");
      }, function (error) {
        displayDiv.innerText = "Selected: ".concat(selectedScript, ",\nStatus: Error: ").concat(error.message);
      });
    });

    // Append elements to the body
    document.body.appendChild(mySelectComp);
    document.body.appendChild(displayDiv);
  };

  // createInitialComponents1();

  //createInitialComponents2();

  document.addEventListener("DOMContentLoaded", createInitialComponents2);
})();
console.log("app.js script loaded successfully");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7SUFDdkNPLFFBQVEsQ0FBQ1MsSUFBSSxDQUFDYyxXQUFXLENBQUNwQyxVQUFVLENBQUM7RUFDekMsQ0FBQzs7RUFFRDs7RUFFQTs7RUFFQWEsUUFBUSxDQUFDZ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUVSLHdCQUF3QixDQUFDO0FBQzNFLENBQUMsRUFBRSxDQUFDO0FBR0pyRSxPQUFPLENBQUNDLEdBQUcsQ0FDUCxtQ0FDSixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS1ub2RlLXByb2plY3QvLi9zcmMvbW9kdWxlcy9iYXNpYy9tb2R1bGUxLmpzIiwid2VicGFjazovL215LW5vZGUtcHJvamVjdC8uL3NyYy9tb2R1bGVzL2Jhc2ljL21vZHVsZTIuanMiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0Ly4vc3JjL21vZHVsZXMvdjEvZ2xvYmFsQ29uc3RhbnRzLmpzIiwid2VicGFjazovL215LW5vZGUtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS1ub2RlLXByb2plY3QvLi9zcmMvc2NyaXB0cy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbW9kdWxlMS5qc1xyXG5mdW5jdGlvbiBncmVldChuYW1lKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgSGVsbG8sICR7bmFtZX0hYCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBncmVldCB9O1xyXG4iLCIvLyBtb2R1bGUyLmpzXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVNxdWFyZShudW0pIHtcclxuICAgIHJldHVybiBudW0gKiBudW07XHJcbn1cclxuXHJcbmNvbnN0IGNhbGN1bGF0ZVN1bT0oaW5pdGlhbFZhbHVlPTApPT4gaW5pdGlhbFZhbHVlKzE7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgY2FsY3VsYXRlU3F1YXJlLCBjYWxjdWxhdGVTdW0gfTtcclxuIiwiLy8gZ2xvYmFsQ29uc3RhbnRzLmpzXHJcbmNvbnN0IGdsb2JhbENvbnN0YW50cyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JpcHROYW1lcyA9IFtcclxuICAgICAgICB7IGxpbms6IFwibm9uLWV4aXN0aW5nLXNjcmlwdC5qc1wiLCBleHRlcm5hbDogZmFsc2UgfSxcclxuICAgICAgICB7IGxpbms6IFwiYmFzaWMtcHJvbWlzZS1zeW50YXgxLmpzXCIsIGV4dGVybmFsOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgbGluazogJ2Jhc2ljLXByb21pc2Utc3ludGF4NC5qcycsIGV4dGVybmFsOiBmYWxzZX0sXHJcbiAgICAgICAgLy8gLi4uIG90aGVyIHNjcmlwdCBuYW1lc1xyXG4gICAgICAgIHsgbGluazogXCJmZXRjaC1hcGktbGVhcm5pbmcvZ2V0LWFsbC1lbXBsb3llZXMtdjMtd2l0aC1jb25zb2xlLWFuZC11dGlsaXR5LmpzXCIgfSxcclxuICAgICAgICB7bGluazonYmFzaWMtcHJvbWlzZS1zeW50YXg0LXYyLmpzJywgZXh0ZXJuYWw6ZmFsc2V9LFxyXG4gICAgICAgIHtsaW5rOidiYXNpYy1wcm9taXNlLXN5bnRheDQtdjMuanMnLCBleHRlcm5hbDpmYWxzZX0sXHJcbiAgICAgICAge2xpbms6J2luaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHkudGVzdC5qcycsIGV4dGVybmFsOmZhbHNlfSxcclxuICAgICAgICB7bGluazonZDMtcHJhY3RpY2UuanMnLCBleHRlcm5hbDpmYWxzZX0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IFNDUklQVFNfT1BUSU9OUyA9IHNjcmlwdE5hbWVzLm1hcCgodikgPT4gKHtcclxuICAgICAgICB2YWx1ZTogIXYuZXh0ZXJuYWwgPyBgLi4vLi4vZGlzdC9jdXN0b20vJHt2Lmxpbmt9YCA6IHYubGluayxcclxuICAgICAgICBsYWJlbDogdi5saW5rLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgU0NSSVBUU19PUFRJT05TLFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsQ29uc3RhbnRzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBhcHAuanNcclxuY29uc3QgeyBncmVldCB9ID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9iYXNpYy9tb2R1bGUxJyk7XHJcbmNvbnN0IHsgY2FsY3VsYXRlU3F1YXJlLCBjYWxjdWxhdGVTdW0gfSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvYmFzaWMvbW9kdWxlMicpO1xyXG5jb25zdCBnbG9iYWxDb25zdGFudHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL3YxL2dsb2JhbENvbnN0YW50cycpO1xyXG5cclxuKCgpID0+IHtcclxuXHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgc2VsZWN0OiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBcIjIwMHB4XCIsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxNnB4XCIsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1cHhcIixcclxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNwbGF5RGl2OiB7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxOHB4XCIsXHJcbiAgICAgICAgICAgIGNvbG9yOiBcIiMzMzNcIixcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNmOWY5ZjlcIixcclxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjZGRkXCIsXHJcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1cHhcIixcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjEwcHhcIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgY29uc3QgTUFYID0gMztcclxuICAgIGxldCBteVNlbGVjdENvbXAgPSBudWxsO1xyXG4gICAgbGV0IGRpc3BsYXlEaXY9IG51bGw7XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdFxyXG4gICAgZnVuY3Rpb24gbG9hZFNjcmlwdChzcmMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gc3JjO1xyXG4gICAgICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZShzY3JpcHQpO1xyXG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpID0+XHJcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBTY3JpcHQgbG9hZCBlcnJvciBmb3IgJHtzcmN9YCkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZChzY3JpcHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmN0aW9uIHRvIGNsZWFyIGV4dHJhIGNvbXBvbmVudHNcclxuICAgIGZ1bmN0aW9uIGNsZWFyRXh0cmFDb21wb25lbnRzKCkge1xyXG4gICAgICAgIGNvbnN0IGJvZHlFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGJvZHlFbGVtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYm9keUVsZW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gbXlTZWxlY3RDb21wIHx8IGVsZW1lbnQgPT09IGRpc3BsYXlEaXYgfHwgZWxlbWVudC5pZCA9PT0gXCJteS1oZWFkZXItaDEtaS1oYXRlLXZhbmRhbmFcIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBoZWFkRWxlbWVudHMgPSBkb2N1bWVudC5oZWFkLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBoZWFkRWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGhlYWRFbGVtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSBcInNjcmlwdFwiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwic3R5bGVcIikgfHxcclxuICAgICAgICAgICAgICAgIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzY3JpcHRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChlbGVtZW50LmlkID09PSBcIm15YmFzZS1zY3JpcHRcIiB8fCBlbGVtZW50LmlkID09PSBcInV0aWxpdHktc2NyaXB0XCIpKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgY3JlYXRlSW5pdGlhbENvbXBvbmVudHMxID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSAnUmVsb2FkJztcclxuICAgICAgICBidG4ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgZ3JlZXQoYFByZW1lZHJhIEt1bWFyIGNsaWNrZWQgYXQgJHtuZXcgRGF0ZSgpfWApO1xyXG4gICAgICAgICAgICBjb3VudCA9IGNhbGN1bGF0ZVN1bShjb3VudCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTUVVBUkU6ICcgKyBjYWxjdWxhdGVTcXVhcmUoY291bnQpKTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID4gTUFYKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzZXR0aW5nIGNvdW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjcmVhdGVJbml0aWFsQ29tcG9uZW50czIgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIHNlbGVjdCBlbGVtZW50XHJcbiAgICAgICAgbXlTZWxlY3RDb21wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgICAgICBteVNlbGVjdENvbXAuaWQgPSBcIm15U2VsZWN0XCI7XHJcblxyXG4gICAgICAgIC8vIEFwcGx5IHN0eWxlcyB0byBzZWxlY3QgZWxlbWVudFxyXG4gICAgICAgIE9iamVjdC5rZXlzKHN0eWxlcy5zZWxlY3QpLmZvckVhY2goKHN0eWxlS2V5KSA9PiB7XHJcbiAgICAgICAgICAgIG15U2VsZWN0Q29tcC5zdHlsZVtzdHlsZUtleV0gPSBzdHlsZXMuc2VsZWN0W3N0eWxlS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIG9wdGlvbnMgdG8gdGhlIG15U2VsZWN0Q29tcCBlbGVtZW50XHJcbiAgICAgICAgZ2xvYmFsQ29uc3RhbnRzLlNDUklQVFNfT1BUSU9OUy5mb3JFYWNoKChvcHRpb25EYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvbkRhdGEudmFsdWU7XHJcbiAgICAgICAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBvcHRpb25EYXRhLmxhYmVsO1xyXG4gICAgICAgICAgICBteVNlbGVjdENvbXAuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IHRvIGRpc3BsYXkgc2VsZWN0ZWQgdmFsdWVcclxuICAgICAgICBkaXNwbGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBkaXNwbGF5RGl2LmlkID0gXCJkaXNwbGF5XCI7XHJcbiAgICAgICAgZGlzcGxheURpdi5pbm5lclRleHQgPSBcIlNlbGVjdGVkIHZhbHVlIHdpbGwgYmUgZGlzcGxheWVkIGhlcmVcIjtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgc3R5bGVzIHRvIGRpc3BsYXlEaXYgZWxlbWVudFxyXG4gICAgICAgIE9iamVjdC5rZXlzKHN0eWxlcy5kaXNwbGF5RGl2KS5mb3JFYWNoKChzdHlsZUtleSkgPT4ge1xyXG4gICAgICAgICAgICBkaXNwbGF5RGl2LnN0eWxlW3N0eWxlS2V5XSA9IHN0eWxlcy5kaXNwbGF5RGl2W3N0eWxlS2V5XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIG15U2VsZWN0Q29tcCBlbGVtZW50XHJcbiAgICAgICAgbXlTZWxlY3RDb21wLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGVhckV4dHJhQ29tcG9uZW50cygpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFNjcmlwdCA9IG15U2VsZWN0Q29tcC52YWx1ZTtcclxuICAgICAgICAgICAgbG9hZFNjcmlwdChzZWxlY3RlZFNjcmlwdCkudGhlbihcclxuICAgICAgICAgICAgICAgIChzY3JpcHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGl2LmlubmVyVGV4dCA9IGBTZWxlY3RlZDogJHtzZWxlY3RlZFNjcmlwdH0sXFxuU3RhdHVzOiAke3NjcmlwdC5zcmN9IGlzIGxvYWRlZCBzdWNjZXNzZnVsbHkhIWA7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheURpdi5pbm5lclRleHQgPSBgU2VsZWN0ZWQ6ICR7c2VsZWN0ZWRTY3JpcHR9LFxcblN0YXR1czogRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBcHBlbmQgZWxlbWVudHMgdG8gdGhlIGJvZHlcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG15U2VsZWN0Q29tcCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXNwbGF5RGl2KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjcmVhdGVJbml0aWFsQ29tcG9uZW50czEoKTtcclxuXHJcbiAgICAvL2NyZWF0ZUluaXRpYWxDb21wb25lbnRzMigpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGNyZWF0ZUluaXRpYWxDb21wb25lbnRzMik7XHJcbn0pKCk7XHJcblxyXG5cclxuY29uc29sZS5sb2coXHJcbiAgICBcImFwcC5qcyBzY3JpcHQgbG9hZGVkIHN1Y2Nlc3NmdWxseVwiXHJcbik7Il0sIm5hbWVzIjpbImdyZWV0IiwibmFtZSIsImNvbnNvbGUiLCJsb2ciLCJjb25jYXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiY2FsY3VsYXRlU3F1YXJlIiwibnVtIiwiY2FsY3VsYXRlU3VtIiwiaW5pdGlhbFZhbHVlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiZ2xvYmFsQ29uc3RhbnRzIiwic2NyaXB0TmFtZXMiLCJsaW5rIiwiZXh0ZXJuYWwiLCJTQ1JJUFRTX09QVElPTlMiLCJtYXAiLCJ2IiwidmFsdWUiLCJsYWJlbCIsIl9yZXF1aXJlIiwicmVxdWlyZSIsIl9yZXF1aXJlMiIsInN0eWxlcyIsInNlbGVjdCIsIndpZHRoIiwicGFkZGluZyIsImZvbnRTaXplIiwiYm9yZGVyUmFkaXVzIiwiYm9yZGVyIiwibWFyZ2luQm90dG9tIiwiZGlzcGxheURpdiIsImNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwibWFyZ2luVG9wIiwiY291bnQiLCJNQVgiLCJteVNlbGVjdENvbXAiLCJsb2FkU2NyaXB0Iiwic3JjIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzY3JpcHQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvbmxvYWQiLCJvbmVycm9yIiwiRXJyb3IiLCJoZWFkIiwiYXBwZW5kIiwiY2xlYXJFeHRyYUNvbXBvbmVudHMiLCJib2R5RWxlbWVudHMiLCJib2R5IiwiY2hpbGRyZW4iLCJpIiwiZWxlbWVudCIsImlkIiwicmVtb3ZlQ2hpbGQiLCJoZWFkRWxlbWVudHMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjcmVhdGVJbml0aWFsQ29tcG9uZW50czEiLCJidG4iLCJpbm5lclRleHQiLCJvbmNsaWNrIiwiRGF0ZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlSW5pdGlhbENvbXBvbmVudHMyIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJzdHlsZUtleSIsInN0eWxlIiwib3B0aW9uRGF0YSIsIm9wdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZWxlY3RlZFNjcmlwdCIsInRoZW4iLCJlcnJvciIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9