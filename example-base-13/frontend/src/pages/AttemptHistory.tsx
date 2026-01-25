import { Link } from 'react-router-dom';
import { attemptService, testService, userService } from '../services/dataService';

export default function AttemptHistory() {
  const currentUser = userService.getCurrentUser();
  const attempts = currentUser ? attemptService.getByUserId(currentUser.id) : [];
  const tests = testService.getAll();

  const getTestName = (testId: string) => {
    return tests.find((t) => t.id === testId)?.name || 'Unknown Test';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div>
      <h1>My Attempt History</h1>
      {attempts.length === 0 ? (
        <div className="empty-state">
          <h3>No attempts yet</h3>
          <p>Start taking tests to see your history here.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Browse Tests
          </Link>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Date</th>
                <th>Score</th>
                <th>Time Taken</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => {
                const totalMarks = attempt.questions.reduce((sum, q) => sum + q.marks, 0);
                return (
                  <tr key={attempt.id}>
                    <td>{getTestName(attempt.testId)}</td>
                    <td>{formatDate(attempt.startedAt)}</td>
                    <td>
                      <strong>
                        {attempt.totalScore} / {totalMarks}
                      </strong>
                    </td>
                    <td>{formatTime(attempt.timeTaken)}</td>
                    <td>
                      <span
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          background: attempt.status === 'completed' ? '#d4edda' : '#fff3cd',
                          color: attempt.status === 'completed' ? '#155724' : '#856404',
                        }}
                      >
                        {attempt.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                    <td>
                      {attempt.status === 'completed' && (
                        <Link to={`/attempt/${attempt.id}/result`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                          Review
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
