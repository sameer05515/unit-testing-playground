export class ETLPipelineStep {
  constructor(name = "", description = "") {
    this.name = name;
    this.description = description;
  }
  static fromData({ name = "", description = "" }) {
    return new ETLPipelineStep(name, description);
  }
}

export class ETLPipeline {
  constructor(title = "", steps = [], completionMessage = "") {
    this.title = title;
    this.steps = steps;
    this.completionMessage = completionMessage;
  }
  static fromData({ title = "", steps = [], completionMessage = "" }) {
    return new ETLPipeline(title, steps, completionMessage);
  }
}
