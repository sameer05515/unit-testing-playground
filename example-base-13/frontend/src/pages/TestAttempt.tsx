import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { testService, attemptService } from '../services/dataService';
import { userService } from '../services/dataService';
import type { Question, Test, User } from '../types';

export default function TestAttempt() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeTest = async () => {
      try {
        const user = await userService.getCurrentUser();
        if (!user) {
          navigate('/');
          return;
        }
        setCurrentUser(user);

        const testData = await testService.getById(testId!);
        if (!testData) {
          navigate('/');
          return;
        }
        setTest(testData);

        // Story 1: Start MCQ Test - Create attempt (backend handles random questions)
        const attempt = await attemptService.create(testData.id, user.id);
        setAttemptId(attempt.id);
        setQuestions(attempt.questions);

        // Start timer (Story 9: Timer Auto Submit)
        const durationSeconds = testData.duration * 60;
        setTimeLeft(durationSeconds);

        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize test:', error);
        navigate('/');
      }
    };

    if (testId) {
      initializeTest();
    }
  }, [testId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0 || !attemptId) return;

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
  }, [timeLeft, attemptId]);

  const handleAutoSubmit = async () => {
    if (!attemptId) return;
    await handleFinish();
  };

  const handleOptionSelect = async (questionId: string, optionIndex: number) => {
    if (!attemptId) return;

    // Story 3: Submit Answer - Auto save on click
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionIndex }));
    try {
      await attemptService.submitAnswer(attemptId, questionId, optionIndex);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleFinish = async () => {
    if (!attemptId || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Story 4: Finish Test & Score
      const finishedAttempt = await attemptService.finish(attemptId);
      if (finishedAttempt) {
        navigate(`/attempt/${attemptId}/result`);
      }
    } catch (error) {
      console.error('Failed to finish attempt:', error);
      setIsSubmitting(false);
    }
  };

  if (loading || !test || questions.length === 0) {
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
