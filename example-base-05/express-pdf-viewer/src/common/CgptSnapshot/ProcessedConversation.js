class ProcessedConversation {
  constructor(id = "", slug = "", order = 0, location = "", isLatest = false, createdOn = "", createdBy = "") {
    if (!id || !slug || !order || !location || !createdOn || !createdBy) {
      throw new Error("Missing data");
    }
    this.id = id;
    this.slug = slug;
    this.order = order;
    this.location = location;
    this.isLatest = isLatest;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
  }
  static fromData({ id = "", slug = "", order = 0, location = "", isLatest = false, createdOn = "", createdBy = "" }) {
    return new ProcessedConversation(id, slug, order, location, isLatest, createdOn, createdBy);
  }
}

module.exports = ProcessedConversation;
