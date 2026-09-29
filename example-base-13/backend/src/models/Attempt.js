import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  selectedOption: {
    type: Number,
    default: null,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  marksObtained: {
    type: Number,
    default: 0,
  },
}, { _id: false });

const attemptSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['in_progress', 'completed'],
    default: 'in_progress',
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
  },
  timeTaken: {
    type: Number,
    comment: 'Time taken in seconds',
  },
  answers: {
    type: [answerSchema],
    default: [],
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  questions: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
    comment: 'Snapshot of questions used in this attempt',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Attempt', attemptSchema);
