/**
 * Question Entity Model
 * Fields: id, question, tags, createdAt, updatedAt
 */
class Question {
  constructor(id, question, tags = []) {
    this.id = id;
    this.question = question;
    this.tags = Array.isArray(tags) ? tags : [tags].filter(Boolean);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(question, tags) {
    this.question = question || this.question;
    this.tags = tags !== undefined ? (Array.isArray(tags) ? tags : [tags].filter(Boolean)) : this.tags;
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Question;
