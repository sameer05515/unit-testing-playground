const btn = document.createElement("button");
btn.innerText = "Click Me";
let value = 1;
let step = 1;
let success = false;
const clickHandler = () => {
  console.clear();
  console.log(`value: ${value}`);
  const promise = new Promise((resolve, reject) => {
    resolve(value);
  });

  promise
    .then((val) => {
      const n = val + 6;
      console.log(n);
      step++;
      return n;
    })
    .then((val) => {
      const n = val * 2;
      console.log(n);
      if (n % 4 === 0) {
        throw new Error(
          `Failed as my calculated value: {${n}} is divisible by 4`
        );
      } else {
        step++;
      }
      return n;
    })
    .then((val) => {
      const n = val / 2;

      console.log(n);
      if (n % 3 === 0) {
        throw new Error(
          `Failed as my calculated value: {${n}} is divisible by 3`
        );
      } else {
        step++;
      }
      return n;
    })
    .then((val) => {
      const n = val - 6;
      console.log(n);
      step++;
      return n;
    })
    .then((val) => {
      console.log(val, val === value);
      success = true;
    })
    .catch((err) => console.error(err))
    .finally(() => {
      if (success && success===true) {
        console.log(`Job done!!, ${success}`);
      } else {
        console.error(`Job failed in step: ${step}`);
      }
      value += 1;
      success=false;
      step=1;
    });
};

btn.addEventListener("click", clickHandler);
document.body.appendChild(btn);
