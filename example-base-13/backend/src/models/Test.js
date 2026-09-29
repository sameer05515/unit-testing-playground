import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    comment: 'Duration in minutes',
  },
  questionLimit: {
    type: Number,
    required: true,
    min: 1,
  },
  questionIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Question',
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Test', testSchema);
