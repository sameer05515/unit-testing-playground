export class Counter {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  increment() {
    this.value++;
    return this.value;
  }

  decrement() {
    this.value--;
    return this.value;
  }

  reset() {
    this.value = 0;
  }

  getValue() {
    return this.value;
  }
}
