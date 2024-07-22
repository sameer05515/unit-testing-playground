const btn = document.createElement("button");
btn.innerText = "Click Me";
let value = 1;
let step = 1;
let success = false;

const logValue = (val, stepMessage) => {
  console.log(stepMessage, val);
  step++;
  return val;
};

const checkDivisibility = (val, divisor, stepMessage) => {
  if (val % divisor === 0) {
    throw new Error(`Failed as my calculated value: ${val} is divisible by ${divisor}`);
  }
  return logValue(val, stepMessage);
};

const clickHandler = () => {
  console.clear();
  console.log(`value: ${value}`);

  new Promise((resolve) => resolve(value))
    .then((val) => logValue(val + 6, "After addition:"))
    .then((val) => checkDivisibility(val * 2, 4, "After multiplication:"))
    .then((val) => checkDivisibility(val / 2, 3, "After division:"))
    .then((val) => logValue(val - 6, "After subtraction:"))
    .then((val) => {
      console.log(val, val === value);
      success = true;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      if (success) {
        console.log("Job done!!");
      } else {
        console.error(`Job failed in step: ${step}`);
      }
      value += 1;
      success = false; // Reset success flag for next click
      step = 1; // Reset step counter for next click
    });
};

btn.addEventListener("click", clickHandler);
document.body.appendChild(btn);
