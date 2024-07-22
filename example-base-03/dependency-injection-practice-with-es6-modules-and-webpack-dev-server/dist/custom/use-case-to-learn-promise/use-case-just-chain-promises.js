/******/ (() => { // webpackBootstrap
/*!**************************************************************************************!*\
  !*** ./src/scripts/custom/use-case-to-learn-promise/use-case-just-chain-promises.js ***!
  \**************************************************************************************/
var btn = document.createElement("button");
btn.innerText = "Click Me";
var value = 1;
var step = 1;
var success = false;
var clickHandler = function clickHandler() {
  console.clear();
  console.log("value: ".concat(value));
  var promise = new Promise(function (resolve, reject) {
    resolve(value);
  });
  promise.then(function (val) {
    var n = val + 6;
    console.log(n);
    step++;
    return n;
  }).then(function (val) {
    var n = val * 2;
    console.log(n);
    if (n % 4 === 0) {
      throw new Error("Failed as my calculated value: {".concat(n, "} is divisible by 4"));
    } else {
      step++;
    }
    return n;
  }).then(function (val) {
    var n = val / 2;
    console.log(n);
    if (n % 3 === 0) {
      throw new Error("Failed as my calculated value: {".concat(n, "} is divisible by 3"));
    } else {
      step++;
    }
    return n;
  }).then(function (val) {
    var n = val - 6;
    console.log(n);
    step++;
    return n;
  }).then(function (val) {
    console.log(val, val === value);
    success = true;
  })["catch"](function (err) {
    return console.error(err);
  })["finally"](function () {
    if (success && success === true) {
      console.log("Job done!!, ".concat(success));
    } else {
      console.error("Job failed in step: ".concat(step));
    }
    value += 1;
    success = false;
    step = 1;
  });
};
btn.addEventListener("click", clickHandler);
document.body.appendChild(btn);
/******/ })()
;
//# sourceMappingURL=use-case-just-chain-promises.js.map