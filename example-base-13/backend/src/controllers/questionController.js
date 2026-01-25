import Question from '../models/Question.js';

export const getAllQuestions = async (req, res) => {
  try {
    const { topic, difficulty } = req.query;
    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter).select('-__v');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).select('-__v');
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandomQuestions = async (req, res) => {
  try {
    const { limit = 10, excludeIds = [] } = req.query;
    const limitNum = parseInt(limit);
    const excludeArray = Array.isArray(excludeIds) ? excludeIds : excludeIds.split(',').filter(Boolean);

    const filter = excludeArray.length > 0 ? { _id: { $nin: excludeArray } } : {};
    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: limitNum } },
    ]);

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
