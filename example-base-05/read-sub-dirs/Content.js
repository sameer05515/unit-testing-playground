class Content {
  constructor(path = "", type = "", parentId = "") {
    this.path = path;
    this.type = type;
    this.parentId = parentId;
  }
  static fromData({ path = "", type = "", parentId = "" }) {
    return new Content(path, type, parentId);
  }
}

module.exports = Content;
