import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testService, questionService, attemptService } from '../services/dataService';
import { userService } from '../services/dataService';
import type { Question } from '../types';

export default function TestAttempt() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const currentUser = userService.getCurrentUser();

  const [test, setTest] = useState(testService.getById(testId!));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!test || !currentUser) {
      navigate('/');
      return;
    }

    // Story 2: Fetch Random MCQs
    const randomQuestions = questionService.getRandom(test.questionLimit);
    setQuestions(randomQuestions);

    // Story 1: Start MCQ Test - Create attempt
    const attempt = attemptService.create(test.id, currentUser.id, randomQuestions);
    setAttemptId(attempt.id);

    // Start timer (Story 9: Timer Auto Submit)
    const durationSeconds = test.duration * 60;
    setTimeLeft(durationSeconds);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testId]);

  const handleAutoSubmit = async () => {
    if (!attemptId) return;
    await handleFinish();
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (!attemptId) return;

    // Story 3: Submit Answer - Auto save on click
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionIndex }));
    attemptService.submitAnswer(attemptId, questionId, optionIndex);
  };

  const handleFinish = async () => {
    if (!attemptId || isSubmitting) return;
    setIsSubmitting(true);

    // Story 4: Finish Test & Score
    const finishedAttempt = attemptService.finish(attemptId);
    if (finishedAttempt) {
      navigate(`/attempt/${attemptId}/result`);
    }
  };

  if (!test || questions.length === 0) {
    return <div className="loading">Loading test...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedOptions[currentQuestion.id] ?? null;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft < 60;

  return (
    <div className="test-container">
      <div className={`timer ${isWarning ? 'warning' : ''}`}>
        ⏱️ Time Remaining: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="question-card">
        <h3>
          Question {currentQuestionIndex + 1} of {questions.length}
        </h3>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{currentQuestion.text}</p>

        <ul className="options-list">
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              className={`option-item ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(currentQuestion.id, index)}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={selectedOption === index}
                onChange={() => handleOptionSelect(currentQuestion.id, index)}
              />
              {option}
            </li>
          ))}
        </ul>
      </div>

      <div className="test-actions">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <div>
          {questions.map((_, index) => (
            <button
              key={index}
              className="btn btn-secondary"
              style={{
                margin: '0 0.25rem',
                padding: '0.5rem',
                minWidth: '40px',
                background: selectedOptions[questions[index].id] !== undefined ? '#27ae60' : '#95a5a6',
              }}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Next
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleFinish} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Finish Test'}
          </button>
        )}
      </div>
    </div>
  );
}
