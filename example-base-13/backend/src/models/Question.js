import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 2;
      },
      message: 'Question must have at least 2 options',
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0 && v < this.options.length;
      },
      message: 'Correct answer must be a valid option index',
    },
  },
  topic: {
    type: String,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  marks: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Question', questionSchema);
