/******/ (() => { // webpackBootstrap
/*!********************************************************!*\
  !*** ./src/scripts/custom/basic-promise-syntax4-v3.js ***!
  \********************************************************/
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// circleModule.js

var defaultCircleValues = {
  radius: 100,
  leftPadding: 300,
  topPadding: 400
};
var styles = {
  circle: {
    transitionProperty: "width, height",
    transitionDuration: "5s",
    position: "fixed",
    transform: "translateX(-50%) translateY(-50%)",
    backgroundColor: "red",
    borderRadius: "50%"
  },
  container: {
    // display: "flex",
    // flexDirection: "column",
    //alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    border: "1px solid #ccc" // Added border style
    //overflowY: "auto", // Added overflowY style
  },
  circleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    border: "1px solid #ccc",
    // Added border style
    overflowY: "auto" // Added overflowY style
  },
  input: {
    padding: "5px",
    fontSize: "16px",
    width: "200px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
function applyStyles(element, styles) {
  for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];
    element.style[key] = value;
  }
}
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
  var myCircleContainerDiv = document.getElementById('myCircleContainerDiv');
  if (!myCircleContainerDiv) {
    console.error("No div with id 'myCircleContainerDiv' found");
    return;
  }

  // Clear existing circles
  myCircleContainerDiv.innerHTML = '';
  var div = document.createElement("div");
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";
  div.className = "circle";
  applyStyles(div, styles.circle);
  myCircleContainerDiv.append(div);
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
  style.innerHTML = "\n      body{\n      overflow-y: auto;\n      }\n      .circle {\n          transition-property: width, height;\n          transition-duration: 5s;\n          position: fixed;\n          transform: translateX(-50%) translateY(-50%);\n          background-color: red;\n          border-radius: 50%;\n      }\n    ";
  document.head.appendChild(style);
}
function createControls() {
  var myCircleContainerDiv = document.createElement('div');
  myCircleContainerDiv.id = 'myCircleContainerDiv';
  applyStyles(myCircleContainerDiv, styles.circleContainer); // Apply circleContainer styles here

  var containerDiv = document.createElement('div');
  var radiusInputEl = document.createElement("input");
  radiusInputEl.type = "text";
  radiusInputEl.id = "radiusInputElId";
  radiusInputEl.placeholder = "Enter radius {Default value is: 100}";
  applyStyles(radiusInputEl, styles.input);
  var leftPaddingInputEl = document.createElement("input");
  leftPaddingInputEl.type = "text";
  leftPaddingInputEl.id = "leftPaddingInputElId";
  leftPaddingInputEl.placeholder = "Enter Left Padding {Default value is: 70}";
  applyStyles(leftPaddingInputEl, styles.input);
  var topPaddingInputEl = document.createElement("input");
  topPaddingInputEl.type = "text";
  topPaddingInputEl.id = "topPaddingInputElId";
  topPaddingInputEl.placeholder = "Enter Top Padding {Default value is: 70}";
  applyStyles(topPaddingInputEl, styles.input);
  var button = document.createElement("button");
  button.innerText = "Click me";
  button.onclick = function () {
    var radius = +document.getElementById("radiusInputElId").value || defaultCircleValues.radius;
    var leftPadding = +document.getElementById("leftPaddingInputElId").value || defaultCircleValues.leftPadding;
    var topPadding = +document.getElementById("topPaddingInputElId").value || defaultCircleValues.topPadding;
    console.log("radius: ".concat(radius, ", leftPadding: ").concat(leftPadding, ", topPadding: ").concat(topPadding));
    check(radius, leftPadding, topPadding);
  };
  applyStyles(button, styles.button);
  containerDiv.appendChild(radiusInputEl);
  containerDiv.appendChild(leftPaddingInputEl);
  containerDiv.appendChild(topPaddingInputEl);
  containerDiv.appendChild(button);
  document.body.appendChild(containerDiv);
  document.body.appendChild(myCircleContainerDiv);
}
function initialize() {
  console.log('Initialization code runs');
  initializeStyles();
  createControls();
}
initialize();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxDQUFrQjdDLFdBQVcsb0JBQUE2QyxNQUFBLENBQWlCNUMsVUFBVSxDQUFFLENBQUM7SUFDeEZxQyxLQUFLLENBQUN2QyxNQUFNLEVBQUVDLFdBQVcsRUFBRUMsVUFBVSxDQUFDO0VBQzFDLENBQUM7RUFDRHlCLFdBQVcsQ0FBQ0gsTUFBTSxFQUFFckIsTUFBTSxDQUFDcUIsTUFBTSxDQUFDO0VBRWxDa0QsWUFBWSxDQUFDSCxXQUFXLENBQUNJLGFBQWEsQ0FBQztFQUN2Q0QsWUFBWSxDQUFDSCxXQUFXLENBQUNNLGtCQUFrQixDQUFDO0VBQzVDSCxZQUFZLENBQUNILFdBQVcsQ0FBQ08saUJBQWlCLENBQUM7RUFDM0NKLFlBQVksQ0FBQ0gsV0FBVyxDQUFDL0MsTUFBTSxDQUFDO0VBQ2hDNEIsUUFBUSxDQUFDOEIsSUFBSSxDQUFDWCxXQUFXLENBQUNHLFlBQVksQ0FBQztFQUV2Q3RCLFFBQVEsQ0FBQzhCLElBQUksQ0FBQ1gsV0FBVyxDQUFDcEIsb0JBQW9CLENBQUM7QUFDbkQ7QUFFQSxTQUFTZ0MsVUFBVUEsQ0FBQSxFQUFHO0VBQ2xCN0IsT0FBTyxDQUFDMkIsR0FBRyxDQUFDLDBCQUEwQixDQUFDO0VBQ3ZDYixnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCSSxjQUFjLENBQUMsQ0FBQztBQUNwQjtBQUVBVyxVQUFVLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktbm9kZS1wcm9qZWN0Ly4vc3JjL3NjcmlwdHMvY3VzdG9tL2Jhc2ljLXByb21pc2Utc3ludGF4NC12My5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjaXJjbGVNb2R1bGUuanNcclxuXHJcbmNvbnN0IGRlZmF1bHRDaXJjbGVWYWx1ZXMgPSB7XHJcbiAgICByYWRpdXM6IDEwMCxcclxuICAgIGxlZnRQYWRkaW5nOiAzMDAsXHJcbiAgICB0b3BQYWRkaW5nOiA0MDAsXHJcbn07XHJcblxyXG5jb25zdCBzdHlsZXMgPSB7XHJcbiAgICBjaXJjbGU6IHtcclxuICAgICAgICB0cmFuc2l0aW9uUHJvcGVydHk6IFwid2lkdGgsIGhlaWdodFwiLFxyXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogXCI1c1wiLFxyXG4gICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXHJcbiAgICB9LFxyXG4gICAgY29udGFpbmVyOiB7XHJcbiAgICAgICAgLy8gZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAgLy8gZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcclxuICAgICAgICAvL2FsaWduSXRlbXM6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgZ2FwOiBcIjEwcHhcIixcclxuICAgICAgICBtYXJnaW5Ub3A6IFwiMjBweFwiLFxyXG4gICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgI2NjY1wiLCAvLyBBZGRlZCBib3JkZXIgc3R5bGVcclxuICAgICAgICAvL292ZXJmbG93WTogXCJhdXRvXCIsIC8vIEFkZGVkIG92ZXJmbG93WSBzdHlsZVxyXG4gICAgfSxcclxuICAgIGNpcmNsZUNvbnRhaW5lcjoge1xyXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXHJcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcclxuICAgICAgICBnYXA6IFwiMTBweFwiLFxyXG4gICAgICAgIG1hcmdpblRvcDogXCIyMHB4XCIsXHJcbiAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsIC8vIEFkZGVkIGJvcmRlciBzdHlsZVxyXG4gICAgICAgIG92ZXJmbG93WTogXCJhdXRvXCIsIC8vIEFkZGVkIG92ZXJmbG93WSBzdHlsZVxyXG4gICAgfSxcclxuICAgIGlucHV0OiB7XHJcbiAgICAgICAgcGFkZGluZzogXCI1cHhcIixcclxuICAgICAgICBmb250U2l6ZTogXCIxNnB4XCIsXHJcbiAgICAgICAgd2lkdGg6IFwiMjAwcHhcIixcclxuICAgIH0sXHJcbiAgICBidXR0b246IHtcclxuICAgICAgICBwYWRkaW5nOiBcIjEwcHggMjBweFwiLFxyXG4gICAgICAgIGZvbnRTaXplOiBcIjE2cHhcIixcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzRDQUY1MFwiLFxyXG4gICAgICAgIGNvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcclxuICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xyXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoc3R5bGVzKSkge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVjayhyYWRpdXMgPSBkZWZhdWx0Q2lyY2xlVmFsdWVzLnJhZGl1cywgbGVmdFBhZGRpbmcgPSBkZWZhdWx0Q2lyY2xlVmFsdWVzLmxlZnRQYWRkaW5nLCB0b3BQYWRkaW5nID0gZGVmYXVsdENpcmNsZVZhbHVlcy50b3BQYWRkaW5nKSB7XHJcbiAgICBzaG93Q2lyY2xlKHJhZGl1cyArIGxlZnRQYWRkaW5nLCByYWRpdXMgKyB0b3BQYWRkaW5nLCByYWRpdXMpLnRoZW4oKGRpdikgPT4ge1xyXG4gICAgICAgIGRpdi5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xyXG4gICAgICAgIGRpdi5zdHlsZS5saW5lSGVpZ2h0ID0gYCR7cmFkaXVzICogMn1weGA7XHJcbiAgICAgICAgZGl2LnN0eWxlLnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgZGl2LmFwcGVuZChcIkhlbGxvLCB3b3JsZCFcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0NpcmNsZShjeCwgY3ksIHJhZGl1cykge1xyXG4gICAgY29uc3QgbXlDaXJjbGVDb250YWluZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDaXJjbGVDb250YWluZXJEaXYnKTtcclxuICAgIGlmICghbXlDaXJjbGVDb250YWluZXJEaXYpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBObyBkaXYgd2l0aCBpZCAnbXlDaXJjbGVDb250YWluZXJEaXYnIGZvdW5kYCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsZWFyIGV4aXN0aW5nIGNpcmNsZXNcclxuICAgIG15Q2lyY2xlQ29udGFpbmVyRGl2LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuc3R5bGUud2lkdGggPSAwO1xyXG4gICAgZGl2LnN0eWxlLmhlaWdodCA9IDA7XHJcbiAgICBkaXYuc3R5bGUubGVmdCA9IGN4ICsgXCJweFwiO1xyXG4gICAgZGl2LnN0eWxlLnRvcCA9IGN5ICsgXCJweFwiO1xyXG4gICAgZGl2LmNsYXNzTmFtZSA9IFwiY2lyY2xlXCI7XHJcbiAgICBhcHBseVN0eWxlcyhkaXYsIHN0eWxlcy5jaXJjbGUpO1xyXG4gICAgbXlDaXJjbGVDb250YWluZXJEaXYuYXBwZW5kKGRpdik7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS53aWR0aCA9IHJhZGl1cyAqIDIgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZS5oZWlnaHQgPSByYWRpdXMgKiAyICsgXCJweFwiO1xyXG5cclxuICAgICAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgICAgICBkaXYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRpdik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVTdHlsZXMoKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICAgIHN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCI7XHJcbiAgICBzdHlsZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIGJvZHl7XHJcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XHJcbiAgICAgIH1cclxuICAgICAgLmNpcmNsZSB7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiB3aWR0aCwgaGVpZ2h0O1xyXG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNXM7XHJcbiAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgfVxyXG4gICAgYDtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDb250cm9scygpIHtcclxuICAgIGNvbnN0IG15Q2lyY2xlQ29udGFpbmVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBteUNpcmNsZUNvbnRhaW5lckRpdi5pZCA9ICdteUNpcmNsZUNvbnRhaW5lckRpdic7XHJcbiAgICBhcHBseVN0eWxlcyhteUNpcmNsZUNvbnRhaW5lckRpdiwgc3R5bGVzLmNpcmNsZUNvbnRhaW5lcik7IC8vIEFwcGx5IGNpcmNsZUNvbnRhaW5lciBzdHlsZXMgaGVyZVxyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1c0lucHV0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICByYWRpdXNJbnB1dEVsLnR5cGUgPSBcInRleHRcIjtcclxuICAgIHJhZGl1c0lucHV0RWwuaWQgPSBcInJhZGl1c0lucHV0RWxJZFwiO1xyXG4gICAgcmFkaXVzSW5wdXRFbC5wbGFjZWhvbGRlciA9IFwiRW50ZXIgcmFkaXVzIHtEZWZhdWx0IHZhbHVlIGlzOiAxMDB9XCI7XHJcbiAgICBhcHBseVN0eWxlcyhyYWRpdXNJbnB1dEVsLCBzdHlsZXMuaW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IGxlZnRQYWRkaW5nSW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGxlZnRQYWRkaW5nSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICBsZWZ0UGFkZGluZ0lucHV0RWwuaWQgPSBcImxlZnRQYWRkaW5nSW5wdXRFbElkXCI7XHJcbiAgICBsZWZ0UGFkZGluZ0lucHV0RWwucGxhY2Vob2xkZXIgPSBcIkVudGVyIExlZnQgUGFkZGluZyB7RGVmYXVsdCB2YWx1ZSBpczogNzB9XCI7XHJcbiAgICBhcHBseVN0eWxlcyhsZWZ0UGFkZGluZ0lucHV0RWwsIHN0eWxlcy5pbnB1dCk7XHJcblxyXG4gICAgY29uc3QgdG9wUGFkZGluZ0lucHV0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICB0b3BQYWRkaW5nSW5wdXRFbC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICB0b3BQYWRkaW5nSW5wdXRFbC5pZCA9IFwidG9wUGFkZGluZ0lucHV0RWxJZFwiO1xyXG4gICAgdG9wUGFkZGluZ0lucHV0RWwucGxhY2Vob2xkZXIgPSBcIkVudGVyIFRvcCBQYWRkaW5nIHtEZWZhdWx0IHZhbHVlIGlzOiA3MH1cIjtcclxuICAgIGFwcGx5U3R5bGVzKHRvcFBhZGRpbmdJbnB1dEVsLCBzdHlsZXMuaW5wdXQpO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJDbGljayBtZVwiO1xyXG4gICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFkaXVzSW5wdXRFbElkXCIpLnZhbHVlIHx8IGRlZmF1bHRDaXJjbGVWYWx1ZXMucmFkaXVzO1xyXG4gICAgICAgIGNvbnN0IGxlZnRQYWRkaW5nID0gK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdFBhZGRpbmdJbnB1dEVsSWRcIikudmFsdWUgfHwgZGVmYXVsdENpcmNsZVZhbHVlcy5sZWZ0UGFkZGluZztcclxuICAgICAgICBjb25zdCB0b3BQYWRkaW5nID0gK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wUGFkZGluZ0lucHV0RWxJZFwiKS52YWx1ZSB8fCBkZWZhdWx0Q2lyY2xlVmFsdWVzLnRvcFBhZGRpbmc7XHJcbiAgICAgICAgY29uc29sZS5sb2coYHJhZGl1czogJHtyYWRpdXN9LCBsZWZ0UGFkZGluZzogJHtsZWZ0UGFkZGluZ30sIHRvcFBhZGRpbmc6ICR7dG9wUGFkZGluZ31gKTtcclxuICAgICAgICBjaGVjayhyYWRpdXMsIGxlZnRQYWRkaW5nLCB0b3BQYWRkaW5nKTtcclxuICAgIH07XHJcbiAgICBhcHBseVN0eWxlcyhidXR0b24sIHN0eWxlcy5idXR0b24pO1xyXG5cclxuICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChyYWRpdXNJbnB1dEVsKTtcclxuICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChsZWZ0UGFkZGluZ0lucHV0RWwpO1xyXG4gICAgY29udGFpbmVyRGl2LmFwcGVuZENoaWxkKHRvcFBhZGRpbmdJbnB1dEVsKTtcclxuICAgIGNvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXJEaXYpOyBcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG15Q2lyY2xlQ29udGFpbmVyRGl2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXphdGlvbiBjb2RlIHJ1bnMnKTtcclxuICAgIGluaXRpYWxpemVTdHlsZXMoKTtcclxuICAgIGNyZWF0ZUNvbnRyb2xzKCk7XHJcbn1cclxuXHJcbmluaXRpYWxpemUoKTtcclxuIl0sIm5hbWVzIjpbImRlZmF1bHRDaXJjbGVWYWx1ZXMiLCJyYWRpdXMiLCJsZWZ0UGFkZGluZyIsInRvcFBhZGRpbmciLCJzdHlsZXMiLCJjaXJjbGUiLCJ0cmFuc2l0aW9uUHJvcGVydHkiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwb3NpdGlvbiIsInRyYW5zZm9ybSIsImJhY2tncm91bmRDb2xvciIsImJvcmRlclJhZGl1cyIsImNvbnRhaW5lciIsImdhcCIsIm1hcmdpblRvcCIsImJvcmRlciIsImNpcmNsZUNvbnRhaW5lciIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsIm92ZXJmbG93WSIsImlucHV0IiwicGFkZGluZyIsImZvbnRTaXplIiwid2lkdGgiLCJidXR0b24iLCJjb2xvciIsImN1cnNvciIsImFwcGx5U3R5bGVzIiwiZWxlbWVudCIsIl9pIiwiX09iamVjdCRlbnRyaWVzIiwiT2JqZWN0IiwiZW50cmllcyIsImxlbmd0aCIsIl9PYmplY3QkZW50cmllcyRfaSIsIl9zbGljZWRUb0FycmF5Iiwia2V5IiwidmFsdWUiLCJzdHlsZSIsImNoZWNrIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwic2hvd0NpcmNsZSIsInRoZW4iLCJkaXYiLCJsaW5lSGVpZ2h0IiwiY29uY2F0IiwidGV4dEFsaWduIiwiYXBwZW5kIiwiY3giLCJjeSIsIm15Q2lyY2xlQ29udGFpbmVyRGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvbnNvbGUiLCJlcnJvciIsImlubmVySFRNTCIsImNyZWF0ZUVsZW1lbnQiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwiY2xhc3NOYW1lIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaW5pdGlhbGl6ZVN0eWxlcyIsInR5cGUiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVDb250cm9scyIsImlkIiwiY29udGFpbmVyRGl2IiwicmFkaXVzSW5wdXRFbCIsInBsYWNlaG9sZGVyIiwibGVmdFBhZGRpbmdJbnB1dEVsIiwidG9wUGFkZGluZ0lucHV0RWwiLCJpbm5lclRleHQiLCJvbmNsaWNrIiwibG9nIiwiYm9keSIsImluaXRpYWxpemUiXSwic291cmNlUm9vdCI6IiJ9