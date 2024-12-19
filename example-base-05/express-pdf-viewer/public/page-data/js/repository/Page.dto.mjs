class Page {
  constructor(name = "Name Missing!!", link = "", description = "", children = []) {
    this.name = name;
    this.link = link;
    this.description = description;
    this.children = Array.isArray(children)
      ? children.map((child) => (child instanceof Page ? child : Page.fromData(child)))
      : [];
  }

  static fromData({ name = "Name Missing!!", link = "", children = [], description = "" } = {}) {
    return new Page(name, link, description, children);
  }
}

export default Page;
