import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Question from '../models/Question.js';
import Test from '../models/Test.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mcq-system';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Question.deleteMany({});
    await Test.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      role: 'admin',
    });

    const studentUser = await User.create({
      name: 'Student User',
      email: 'student@test.com',
      role: 'student',
    });

    console.log('✅ Created users');

    // Create questions
    const questions = await Question.create([
      {
        text: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        topic: 'Math',
        difficulty: 'easy',
        marks: 1,
      },
      {
        text: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
        topic: 'Geography',
        difficulty: 'easy',
        marks: 1,
      },
      {
        text: 'Which is a prime number?',
        options: ['4', '6', '7', '8'],
        correctAnswer: 2,
        topic: 'Math',
        difficulty: 'medium',
        marks: 2,
      },
      {
        text: 'What is React?',
        options: ['A database', 'A JavaScript library', 'A programming language', 'An operating system'],
        correctAnswer: 1,
        topic: 'Programming',
        difficulty: 'easy',
        marks: 1,
      },
      {
        text: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        topic: 'Programming',
        difficulty: 'hard',
        marks: 3,
      },
      {
        text: 'What is the largest planet in our solar system?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 2,
        topic: 'Science',
        difficulty: 'easy',
        marks: 1,
      },
      {
        text: 'What does HTML stand for?',
        options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
        correctAnswer: 0,
        topic: 'Programming',
        difficulty: 'easy',
        marks: 1,
      },
      {
        text: 'What is the square root of 64?',
        options: ['6', '7', '8', '9'],
        correctAnswer: 2,
        topic: 'Math',
        difficulty: 'easy',
        marks: 1,
      },
    ]);

    console.log('✅ Created questions');

    // Create test
    const test = await Test.create({
      name: 'Sample Math Test',
      description: 'Basic mathematics questions',
      duration: 10,
      questionLimit: 3,
      questionIds: [questions[0]._id, questions[2]._id, questions[7]._id],
      createdBy: adminUser._id,
    });

    console.log('✅ Created test');
    console.log('\n📊 Seed Data Summary:');
    console.log(`   Users: ${await User.countDocuments()}`);
    console.log(`   Questions: ${await Question.countDocuments()}`);
    console.log(`   Tests: ${await Test.countDocuments()}`);
    console.log('\n✅ Seeding completed successfully!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
