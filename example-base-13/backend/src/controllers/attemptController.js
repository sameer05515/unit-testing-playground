import Attempt from '../models/Attempt.js';
import Test from '../models/Test.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

export const createAttempt = async (req, res) => {
  try {
    const { testId, userId } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    // Get random questions
    let questions;
    if (test.questionIds && test.questionIds.length > 0) {
      // Use questions from test if specified
      const availableQuestions = await Question.find({
        _id: { $in: test.questionIds },
      });
      const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
      questions = shuffled.slice(0, test.questionLimit);
    } else {
      // Get random questions from all questions
      const allQuestions = await Question.aggregate([
        { $sample: { size: test.questionLimit } },
      ]);
      questions = allQuestions;
    }

    if (!questions || questions.length === 0) {
      return res.status(400).json({ error: 'No questions available for this test' });
    }

    // Convert questions to plain objects and ensure _id is converted to string
    const questionsData = questions.map((q) => {
      const questionId = q._id ? (q._id.toString ? q._id.toString() : String(q._id)) : (q.id || null);
      return {
        id: questionId,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        topic: q.topic || null,
        difficulty: q.difficulty || null,
        marks: q.marks || 1,
      };
    });

    // Initialize answers
    const answers = questionsData.map((q) => ({
      questionId: q.id,
      selectedOption: null,
      isCorrect: false,
      marksObtained: 0,
    }));

    const attempt = new Attempt({
      testId,
      userId,
      status: 'in_progress',
      answers,
      questions: questionsData,
    });

    await attempt.save();
    await attempt.populate('testId', 'name description duration');
    await attempt.populate('userId', 'name email');

    // Convert to plain object and ensure questions array is properly formatted
    const attemptObj = attempt.toObject();
    
    // Ensure questions array has proper id fields
    if (attemptObj.questions && Array.isArray(attemptObj.questions)) {
      attemptObj.questions = attemptObj.questions.map((q) => {
        if (q && typeof q === 'object') {
          return {
            ...q,
            id: q.id || (q._id ? String(q._id) : null),
          };
        }
        return q;
      });
    }

    res.status(201).json(attemptObj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAttemptById = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.id)
      .populate('testId', 'name description duration')
      .populate('userId', 'name email')
      .select('-__v');

    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }
    res.json(attempt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttemptsByUser = async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.params.userId })
      .populate('testId', 'name description')
      .populate('userId', 'name email')
      .sort({ startedAt: -1 })
      .select('-__v');
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAttemptsByTest = async (req, res) => {
  try {
    const attempts = await Attempt.find({ testId: req.params.testId })
      .populate('userId', 'name email')
      .sort({ totalScore: -1, timeTaken: 1 })
      .select('-__v');
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { attemptId, questionId, selectedOption } = req.body;

    const attempt = await Attempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    if (attempt.status === 'completed') {
      return res.status(400).json({ error: 'Attempt already completed' });
    }

    const question = attempt.questions.find(
      (q) => q.id.toString() === questionId
    );
    if (!question) {
      return res.status(404).json({ error: 'Question not found in attempt' });
    }

    const answerIndex = attempt.answers.findIndex(
      (a) => a.questionId.toString() === questionId
    );
    if (answerIndex === -1) {
      return res.status(404).json({ error: 'Answer not found' });
    }

    const isCorrect = selectedOption === question.correctAnswer;
    const marksObtained = isCorrect ? question.marks : 0;

    attempt.answers[answerIndex] = {
      questionId: question.id,
      selectedOption,
      isCorrect,
      marksObtained,
    };

    await attempt.save();
    res.json(attempt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const finishAttempt = async (req, res) => {
  try {
    const { attemptId } = req.body;

    const attempt = await Attempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    if (attempt.status === 'completed') {
      return res.status(400).json({ error: 'Attempt already completed' });
    }

    // Mark unanswered questions as wrong
    attempt.answers.forEach((answer, index) => {
      if (answer.selectedOption === null) {
        const question = attempt.questions.find(
          (q) => q.id.toString() === answer.questionId.toString()
        );
        answer.isCorrect = false;
        answer.marksObtained = 0;
      }
    });

    // Calculate total score
    attempt.totalScore = attempt.answers.reduce(
      (sum, a) => sum + a.marksObtained,
      0
    );

    attempt.status = 'completed';
    attempt.submittedAt = new Date();
    const started = new Date(attempt.startedAt).getTime();
    const submitted = new Date(attempt.submittedAt).getTime();
    attempt.timeTaken = Math.floor((submitted - started) / 1000);

    await attempt.save();
    await attempt.populate('testId', 'name description');
    await attempt.populate('userId', 'name email');

    res.json(attempt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { testId } = req.params;

    const attempts = await Attempt.find({
      testId,
      status: 'completed',
    })
      .populate('userId', 'name email')
      .sort({ totalScore: -1, timeTaken: 1 })
      .select('-__v');

    // Assign ranks (handle ties)
    let currentRank = 1;
    const leaderboard = attempts.map((attempt, index) => {
      if (index > 0 && attempts[index - 1].totalScore === attempt.totalScore) {
        // Same rank as previous
        return {
          userId: attempt.userId._id,
          userName: attempt.userId.name,
          score: attempt.totalScore,
          timeTaken: attempt.timeTaken || 0,
          rank: attempts[index - 1].rank || currentRank,
        };
      } else {
        const rank = currentRank;
        currentRank++;
        return {
          userId: attempt.userId._id,
          userName: attempt.userId.name,
          score: attempt.totalScore,
          timeTaken: attempt.timeTaken || 0,
          rank,
        };
      }
    });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
