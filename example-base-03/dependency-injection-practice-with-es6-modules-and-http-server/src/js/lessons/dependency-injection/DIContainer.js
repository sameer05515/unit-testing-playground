// DIContainer.js
class DIContainer {
  constructor() {
    this.services = {};
  }

  register(name, dependency) {
    this.services[name] = dependency;
  }

  get(name) {
    return this.services[name];
  }
}

export default DIContainer;
