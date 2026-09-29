export function isEven(number) {
  return number % 2 === 0;
}

export function factorial(number) {
  if (number < 0) {
    throw new Error("Number must be non-negative");
  }

  if (number === 0 || number === 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

export function filterAdults(users) {
  return users.filter(user => user.age >= 18);
}
