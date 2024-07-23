/******/ (() => { // webpackBootstrap
/*!******************************************************************************************!*\
  !*** ./src/scripts/custom/use-case-to-learn-promise/use-case-just-chain-promises-0.1.js ***!
  \******************************************************************************************/
var btn = document.createElement("button");
btn.innerText = "Click Me";
var value = 1;
var step = 1;
var success = false;
var logValue = function logValue(val, stepMessage) {
  console.log(stepMessage, val);
  step++;
  return val;
};
var checkDivisibility = function checkDivisibility(val, divisor, stepMessage) {
  if (val % divisor === 0) {
    throw new Error("Failed as my calculated value: ".concat(val, " is divisible by ").concat(divisor));
  }
  return logValue(val, stepMessage);
};
var clickHandler = function clickHandler() {
  console.clear();
  console.log("value: ".concat(value));
  new Promise(function (resolve) {
    return resolve(value);
  }).then(function (val) {
    return logValue(val + 6, "After addition:");
  }).then(function (val) {
    return checkDivisibility(val * 2, 4, "After multiplication:");
  }).then(function (val) {
    return checkDivisibility(val / 2, 3, "After division:");
  }).then(function (val) {
    return logValue(val - 6, "After subtraction:");
  }).then(function (val) {
    console.log(val, val === value);
    success = true;
  })["catch"](function (err) {
    return console.error(err);
  })["finally"](function () {
    if (success) {
      console.log("Job done!!");
    } else {
      console.error("Job failed in step: ".concat(step));
    }
    value += 1;
    success = false; // Reset success flag for next click
    step = 1; // Reset step counter for next click
  });
};
btn.addEventListener("click", clickHandler);
document.body.appendChild(btn);
/******/ })()
;
//# sourceMappingURL=use-case-just-chain-promises-0.1.js.map