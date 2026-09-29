import Test from '../models/Test.js';
import Question from '../models/Question.js';

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .populate('createdBy', 'name email')
      .populate('questionIds', 'text topic difficulty')
      .select('-__v');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('questionIds', 'text topic difficulty marks')
      .select('-__v');

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    await test.populate('createdBy', 'name email');
    await test.populate('questionIds', 'text topic difficulty');
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('questionIds', 'text topic difficulty')
      .select('-__v');

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
