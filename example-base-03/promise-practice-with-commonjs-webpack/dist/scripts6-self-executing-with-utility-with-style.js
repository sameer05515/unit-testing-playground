/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/*!************************************************************************!*\
  !*** ./src/scripts/scripts6-self-executing-with-utility-with-style.js ***!
  \************************************************************************/
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
  document.addEventListener("DOMContentLoaded", function () {
    // Create select element
    var select = document.createElement("select");
    select.id = "mySelect";

    // Apply styles to select element
    Object.keys(styles.select).forEach(function (styleKey) {
      select.style[styleKey] = styles.select[styleKey];
    });

    // Add options to the select element
    globalConstants.SCRIPTS_OPTIONS.forEach(function (optionData) {
      var option = document.createElement("option");
      option.value = optionData.value;
      option.innerText = optionData.label;
      select.appendChild(option);
    });

    // Create a div to display selected value
    var displayDiv = document.createElement("div");
    displayDiv.id = "display";
    displayDiv.innerText = "Selected value will be displayed here";

    // Apply styles to displayDiv element
    Object.keys(styles.displayDiv).forEach(function (styleKey) {
      displayDiv.style[styleKey] = styles.displayDiv[styleKey];
    });

    // Add event listener to select element
    select.addEventListener("change", function () {
      clearExtraComponents();
      var selectedScript = select.value;
      loadScript(selectedScript).then(function (script) {
        displayDiv.innerText = "Selected: ".concat(selectedScript, ",\nStatus: ").concat(script.src, " is loaded successfully!!");
      }, function (error) {
        displayDiv.innerText = "Selected: ".concat(selectedScript, ",\nStatus: Error: ").concat(error.message);
      });
    });

    // Append elements to the body
    document.body.appendChild(select);
    document.body.appendChild(displayDiv);

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
        if (element === select || element === displayDiv) {
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
  });
})();
console.log("scripts6-self-executing-with-utility-with-style.js script loaded successfully");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0czYtc2VsZi1leGVjdXRpbmctd2l0aC11dGlsaXR5LXdpdGgtc3R5bGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSxJQUFNQSxlQUFlLEdBQUksWUFBTTtFQUMzQixJQUFNQyxXQUFXLEdBQUcsQ0FDaEI7SUFBRUMsSUFBSSxFQUFFLHdCQUF3QjtJQUFFQyxRQUFRLEVBQUU7RUFBTSxDQUFDLEVBQ25EO0lBQUVELElBQUksRUFBRSwwQkFBMEI7SUFBRUMsUUFBUSxFQUFFO0VBQU0sQ0FBQyxFQUNyRDtJQUFFRCxJQUFJLEVBQUUsMEJBQTBCO0lBQUVDLFFBQVEsRUFBRTtFQUFLLENBQUM7RUFDcEQ7RUFDQTtJQUFFRCxJQUFJLEVBQUU7RUFBc0UsQ0FBQyxFQUMvRTtJQUFDQSxJQUFJLEVBQUMsNkJBQTZCO0lBQUVDLFFBQVEsRUFBQztFQUFLLENBQUMsRUFDcEQ7SUFBQ0QsSUFBSSxFQUFDLDZCQUE2QjtJQUFFQyxRQUFRLEVBQUM7RUFBSyxDQUFDLEVBQ3BEO0lBQUNELElBQUksRUFBQywrQ0FBK0M7SUFBRUMsUUFBUSxFQUFDO0VBQUssQ0FBQyxFQUN0RTtJQUFDRCxJQUFJLEVBQUMsZ0JBQWdCO0lBQUVDLFFBQVEsRUFBQztFQUFLLENBQUMsQ0FDMUM7RUFFRCxJQUFNQyxlQUFlLEdBQUdILFdBQVcsQ0FBQ0ksR0FBRyxDQUFDLFVBQUNDLENBQUM7SUFBQSxPQUFNO01BQzVDQyxLQUFLLEVBQUUsQ0FBQ0QsQ0FBQyxDQUFDSCxRQUFRLHdCQUFBSyxNQUFBLENBQXdCRixDQUFDLENBQUNKLElBQUksSUFBS0ksQ0FBQyxDQUFDSixJQUFJO01BQzNETyxLQUFLLEVBQUVILENBQUMsQ0FBQ0o7SUFDYixDQUFDO0VBQUEsQ0FBQyxDQUFDO0VBRUgsT0FBTztJQUNIRSxlQUFlLEVBQWZBO0VBQ0osQ0FBQztBQUNMLENBQUMsQ0FBRSxDQUFDO0FBRUpNLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHWCxlQUFlOzs7Ozs7VUN4QmhDO1VBQ0E7O1VB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QUksQ0FBQ2MsV0FBVyxDQUFDRCxPQUFPLENBQUM7UUFDcEM7TUFDRjtNQUVBLElBQU1FLFlBQVksR0FBR3BDLFFBQVEsQ0FBQzRCLElBQUksQ0FBQ0csUUFBUTtNQUMzQyxLQUFLLElBQUlDLEVBQUMsR0FBR0ksWUFBWSxDQUFDSCxNQUFNLEdBQUcsQ0FBQyxFQUFFRCxFQUFDLElBQUksQ0FBQyxFQUFFQSxFQUFDLEVBQUUsRUFBRTtRQUNqRCxJQUFNRSxRQUFPLEdBQUdFLFlBQVksQ0FBQ0osRUFBQyxDQUFDO1FBQy9CLElBQ0dFLFFBQU8sQ0FBQ0csT0FBTyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxLQUFLLFFBQVEsSUFDekNKLFFBQU8sQ0FBQ0csT0FBTyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxLQUFLLE9BQU8sSUFDMUNKLFFBQU8sQ0FBQ0csT0FBTyxDQUFDQyxXQUFXLENBQUMsQ0FBQyxLQUFLLFFBQVEsS0FDeENKLFFBQU8sQ0FBQy9CLEVBQUUsS0FBSyxlQUFlLElBQUkrQixRQUFPLENBQUMvQixFQUFFLEtBQUssZ0JBQWdCLENBQUUsRUFDdEU7VUFDQTtRQUNGLENBQUMsTUFBTTtVQUNMSCxRQUFRLENBQUM0QixJQUFJLENBQUNPLFdBQVcsQ0FBQ0QsUUFBTyxDQUFDO1FBQ3BDO01BQ0Y7SUFDRjtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsRUFBRSxDQUFDO0FBRUpLLE9BQU8sQ0FBQ0MsR0FBRyxDQUNULCtFQUNGLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LW5vZGUtcHJvamVjdC8uL3NyYy9tb2R1bGVzL3YxL2dsb2JhbENvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9teS1ub2RlLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvc2NyaXB0czYtc2VsZi1leGVjdXRpbmctd2l0aC11dGlsaXR5LXdpdGgtc3R5bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZ2xvYmFsQ29uc3RhbnRzLmpzXHJcbmNvbnN0IGdsb2JhbENvbnN0YW50cyA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JpcHROYW1lcyA9IFtcclxuICAgICAgICB7IGxpbms6IFwibm9uLWV4aXN0aW5nLXNjcmlwdC5qc1wiLCBleHRlcm5hbDogZmFsc2UgfSxcclxuICAgICAgICB7IGxpbms6IFwiYmFzaWMtcHJvbWlzZS1zeW50YXgxLmpzXCIsIGV4dGVybmFsOiBmYWxzZSB9LFxyXG4gICAgICAgIHsgbGluazogJ2Jhc2ljLXByb21pc2Utc3ludGF4NC5qcycsIGV4dGVybmFsOiBmYWxzZX0sXHJcbiAgICAgICAgLy8gLi4uIG90aGVyIHNjcmlwdCBuYW1lc1xyXG4gICAgICAgIHsgbGluazogXCJmZXRjaC1hcGktbGVhcm5pbmcvZ2V0LWFsbC1lbXBsb3llZXMtdjMtd2l0aC1jb25zb2xlLWFuZC11dGlsaXR5LmpzXCIgfSxcclxuICAgICAgICB7bGluazonYmFzaWMtcHJvbWlzZS1zeW50YXg0LXYyLmpzJywgZXh0ZXJuYWw6ZmFsc2V9LFxyXG4gICAgICAgIHtsaW5rOidiYXNpYy1wcm9taXNlLXN5bnRheDQtdjMuanMnLCBleHRlcm5hbDpmYWxzZX0sXHJcbiAgICAgICAge2xpbms6J2luaXRpYWxDb25zb2xlQ29tcG9uZW50Q3JlYXRvclV0aWxpdHkudGVzdC5qcycsIGV4dGVybmFsOmZhbHNlfSxcclxuICAgICAgICB7bGluazonZDMtcHJhY3RpY2UuanMnLCBleHRlcm5hbDpmYWxzZX0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IFNDUklQVFNfT1BUSU9OUyA9IHNjcmlwdE5hbWVzLm1hcCgodikgPT4gKHtcclxuICAgICAgICB2YWx1ZTogIXYuZXh0ZXJuYWwgPyBgLi4vLi4vZGlzdC9jdXN0b20vJHt2Lmxpbmt9YCA6IHYubGluayxcclxuICAgICAgICBsYWJlbDogdi5saW5rLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgU0NSSVBUU19PUFRJT05TLFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsQ29uc3RhbnRzOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcclxuXHJcbmNvbnN0IGdsb2JhbENvbnN0YW50cz0gcmVxdWlyZSgnLi4vbW9kdWxlcy92MS9nbG9iYWxDb25zdGFudHMnKTtcclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgc2VsZWN0OiB7XHJcbiAgICAgIHdpZHRoOiBcIjIwMHB4XCIsXHJcbiAgICAgIHBhZGRpbmc6IFwiMTBweFwiLFxyXG4gICAgICBmb250U2l6ZTogXCIxNnB4XCIsXHJcbiAgICAgIGJvcmRlclJhZGl1czogXCI1cHhcIixcclxuICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXHJcbiAgICAgIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsXHJcbiAgICB9LFxyXG4gICAgZGlzcGxheURpdjoge1xyXG4gICAgICBwYWRkaW5nOiBcIjEwcHhcIixcclxuICAgICAgZm9udFNpemU6IFwiMThweFwiLFxyXG4gICAgICBjb2xvcjogXCIjMzMzXCIsXHJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZjlmOWY5XCIsXHJcbiAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2RkZFwiLFxyXG4gICAgICBib3JkZXJSYWRpdXM6IFwiNXB4XCIsXHJcbiAgICAgIG1hcmdpblRvcDogXCIxMHB4XCIsXHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIENyZWF0ZSBzZWxlY3QgZWxlbWVudFxyXG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICAgIHNlbGVjdC5pZCA9IFwibXlTZWxlY3RcIjtcclxuXHJcbiAgICAvLyBBcHBseSBzdHlsZXMgdG8gc2VsZWN0IGVsZW1lbnRcclxuICAgIE9iamVjdC5rZXlzKHN0eWxlcy5zZWxlY3QpLmZvckVhY2goKHN0eWxlS2V5KSA9PiB7XHJcbiAgICAgIHNlbGVjdC5zdHlsZVtzdHlsZUtleV0gPSBzdHlsZXMuc2VsZWN0W3N0eWxlS2V5XTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBvcHRpb25zIHRvIHRoZSBzZWxlY3QgZWxlbWVudFxyXG4gICAgZ2xvYmFsQ29uc3RhbnRzLlNDUklQVFNfT1BUSU9OUy5mb3JFYWNoKChvcHRpb25EYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvbkRhdGEudmFsdWU7XHJcbiAgICAgIG9wdGlvbi5pbm5lclRleHQgPSBvcHRpb25EYXRhLmxhYmVsO1xyXG4gICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGRpdiB0byBkaXNwbGF5IHNlbGVjdGVkIHZhbHVlXHJcbiAgICBjb25zdCBkaXNwbGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpc3BsYXlEaXYuaWQgPSBcImRpc3BsYXlcIjtcclxuICAgIGRpc3BsYXlEaXYuaW5uZXJUZXh0ID0gXCJTZWxlY3RlZCB2YWx1ZSB3aWxsIGJlIGRpc3BsYXllZCBoZXJlXCI7XHJcblxyXG4gICAgLy8gQXBwbHkgc3R5bGVzIHRvIGRpc3BsYXlEaXYgZWxlbWVudFxyXG4gICAgT2JqZWN0LmtleXMoc3R5bGVzLmRpc3BsYXlEaXYpLmZvckVhY2goKHN0eWxlS2V5KSA9PiB7XHJcbiAgICAgIGRpc3BsYXlEaXYuc3R5bGVbc3R5bGVLZXldID0gc3R5bGVzLmRpc3BsYXlEaXZbc3R5bGVLZXldO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIHNlbGVjdCBlbGVtZW50XHJcbiAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNsZWFyRXh0cmFDb21wb25lbnRzKCk7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkU2NyaXB0ID0gc2VsZWN0LnZhbHVlO1xyXG4gICAgICBsb2FkU2NyaXB0KHNlbGVjdGVkU2NyaXB0KS50aGVuKFxyXG4gICAgICAgIChzY3JpcHQpID0+IHtcclxuICAgICAgICAgIGRpc3BsYXlEaXYuaW5uZXJUZXh0ID0gYFNlbGVjdGVkOiAke3NlbGVjdGVkU2NyaXB0fSxcXG5TdGF0dXM6ICR7c2NyaXB0LnNyY30gaXMgbG9hZGVkIHN1Y2Nlc3NmdWxseSEhYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgZGlzcGxheURpdi5pbm5lclRleHQgPSBgU2VsZWN0ZWQ6ICR7c2VsZWN0ZWRTY3JpcHR9LFxcblN0YXR1czogRXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFwcGVuZCBlbGVtZW50cyB0byB0aGUgYm9keVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXNwbGF5RGl2KTtcclxuXHJcbiAgICAvLyBGdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0XHJcbiAgICBmdW5jdGlvbiBsb2FkU2NyaXB0KHNyYykge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XHJcbiAgICAgICAgc2NyaXB0LnNyYyA9IHNyYztcclxuICAgICAgICBzY3JpcHQub25sb2FkID0gKCkgPT4gcmVzb2x2ZShzY3JpcHQpO1xyXG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCkgPT5cclxuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFNjcmlwdCBsb2FkIGVycm9yIGZvciAke3NyY31gKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoc2NyaXB0KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnVuY3Rpb24gdG8gY2xlYXIgZXh0cmEgY29tcG9uZW50c1xyXG4gICAgZnVuY3Rpb24gY2xlYXJFeHRyYUNvbXBvbmVudHMoKSB7XHJcbiAgICAgIGNvbnN0IGJvZHlFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkuY2hpbGRyZW47XHJcbiAgICAgIGZvciAobGV0IGkgPSBib2R5RWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gYm9keUVsZW1lbnRzW2ldO1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSBzZWxlY3QgfHwgZWxlbWVudCA9PT0gZGlzcGxheURpdikge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBoZWFkRWxlbWVudHMgPSBkb2N1bWVudC5oZWFkLmNoaWxkcmVuO1xyXG4gICAgICBmb3IgKGxldCBpID0gaGVhZEVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGhlYWRFbGVtZW50c1tpXTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwic2NyaXB0XCIgJiZcclxuICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwic3R5bGVcIikgfHxcclxuICAgICAgICAgIChlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzY3JpcHRcIiAmJlxyXG4gICAgICAgICAgICAoZWxlbWVudC5pZCA9PT0gXCJteWJhc2Utc2NyaXB0XCIgfHwgZWxlbWVudC5pZCA9PT0gXCJ1dGlsaXR5LXNjcmlwdFwiKSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59KSgpO1xyXG5cclxuY29uc29sZS5sb2coXHJcbiAgXCJzY3JpcHRzNi1zZWxmLWV4ZWN1dGluZy13aXRoLXV0aWxpdHktd2l0aC1zdHlsZS5qcyBzY3JpcHQgbG9hZGVkIHN1Y2Nlc3NmdWxseVwiXHJcbik7XHJcbiJdLCJuYW1lcyI6WyJnbG9iYWxDb25zdGFudHMiLCJzY3JpcHROYW1lcyIsImxpbmsiLCJleHRlcm5hbCIsIlNDUklQVFNfT1BUSU9OUyIsIm1hcCIsInYiLCJ2YWx1ZSIsImNvbmNhdCIsImxhYmVsIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJzdHlsZXMiLCJzZWxlY3QiLCJ3aWR0aCIsInBhZGRpbmciLCJmb250U2l6ZSIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsIm1hcmdpbkJvdHRvbSIsImRpc3BsYXlEaXYiLCJjb2xvciIsImJhY2tncm91bmRDb2xvciIsIm1hcmdpblRvcCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic3R5bGVLZXkiLCJzdHlsZSIsIm9wdGlvbkRhdGEiLCJvcHRpb24iLCJpbm5lclRleHQiLCJhcHBlbmRDaGlsZCIsImNsZWFyRXh0cmFDb21wb25lbnRzIiwic2VsZWN0ZWRTY3JpcHQiLCJsb2FkU2NyaXB0IiwidGhlbiIsInNjcmlwdCIsInNyYyIsImVycm9yIiwibWVzc2FnZSIsImJvZHkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIm9ubG9hZCIsIm9uZXJyb3IiLCJFcnJvciIsImhlYWQiLCJhcHBlbmQiLCJib2R5RWxlbWVudHMiLCJjaGlsZHJlbiIsImkiLCJsZW5ndGgiLCJlbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJoZWFkRWxlbWVudHMiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==