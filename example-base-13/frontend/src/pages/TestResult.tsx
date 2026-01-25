import { useParams, Link } from 'react-router-dom';
import { attemptService, testService } from '../services/dataService';
import type { Attempt } from '../types';

export default function TestResult() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const attempt = attemptService.getById(attemptId!);
  const test = attempt ? testService.getById(attempt.testId) : null;

  if (!attempt || !test) {
    return <div>Attempt not found</div>;
  }

  // Story 5: View Result Summary
  const correctCount = attempt.answers.filter((a) => a.isCorrect).length;
  const incorrectCount = attempt.answers.filter((a) => !a.isCorrect && a.selectedOption !== null).length;
  const unansweredCount = attempt.answers.filter((a) => a.selectedOption === null).length;
  const totalMarks = attempt.questions.reduce((sum, q) => sum + q.marks, 0);
  const percentage = totalMarks > 0 ? Math.round((attempt.totalScore / totalMarks) * 100) : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div>
      <div className="result-summary">
        <h2>Test Completed!</h2>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          {attempt.totalScore} / {totalMarks}
        </div>
        <div style={{ fontSize: '1.5rem' }}>{percentage}%</div>

        <div className="result-stats">
          <div className="stat-item">
            <div className="label">Correct</div>
            <div className="value" style={{ color: '#27ae60' }}>
              {correctCount}
            </div>
          </div>
          <div className="stat-item">
            <div className="label">Incorrect</div>
            <div className="value" style={{ color: '#e74c3c' }}>
              {incorrectCount}
            </div>
          </div>
          <div className="stat-item">
            <div className="label">Unanswered</div>
            <div className="value" style={{ color: '#f39c12' }}>
              {unansweredCount}
            </div>
          </div>
          <div className="stat-item">
            <div className="label">Time Taken</div>
            <div className="value">{attempt.timeTaken ? formatTime(attempt.timeTaken) : 'N/A'}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Question Review</h2>
        {attempt.questions.map((question, index) => {
          const answer = attempt.answers.find((a) => a.questionId === question.id);
          const isCorrect = answer?.isCorrect ?? false;
          const isUnanswered = answer?.selectedOption === null;

          return (
            <div
              key={question.id}
              className={`question-review ${isCorrect ? 'correct' : isUnanswered ? 'unanswered' : 'incorrect'}`}
            >
              <h3>
                Question {index + 1}: {question.text}
              </h3>
              <div style={{ marginTop: '0.5rem' }}>
                {question.options.map((option, optIndex) => {
                  const isSelected = answer?.selectedOption === optIndex;
                  const isCorrectOption = optIndex === question.correctAnswer;

                  return (
                    <div
                      key={optIndex}
                      style={{
                        padding: '0.5rem',
                        margin: '0.25rem 0',
                        background: isCorrectOption
                          ? '#d4edda'
                          : isSelected
                          ? '#f8d7da'
                          : 'transparent',
                        border: isCorrectOption ? '2px solid #27ae60' : '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    >
                      {option}
                      {isCorrectOption && ' ✓ Correct'}
                      {isSelected && !isCorrectOption && ' ✗ Your Answer'}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
                Marks: {answer?.marksObtained ?? 0} / {question.marks}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link to="/" className="btn btn-primary">
          Back to Tests
        </Link>
        <Link to="/history" className="btn btn-secondary">
          View All Attempts
        </Link>
        <Link to={`/leaderboard/${test.id}`} className="btn btn-secondary">
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}
