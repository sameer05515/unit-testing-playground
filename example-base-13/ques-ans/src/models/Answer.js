/**
 * Answer Entity Model
 * Fields: id, questionId, answer, createdAt, updatedAt
 */
class Answer {
  constructor(id, questionId, answer) {
    this.id = id;
    this.questionId = questionId;
    this.answer = answer;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(answer) {
    this.answer = answer || this.answer;
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Answer;
