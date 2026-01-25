import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testService } from '../services/dataService';
import type { Test } from '../types';

export default function TestList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTests = async () => {
      try {
        const allTests = await testService.getAll();
        setTests(allTests);
      } catch (error) {
        console.error('Failed to load tests:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTests();
  }, []);

  if (loading) {
    return <div className="loading">Loading tests...</div>;
  }

  return (
    <div>
      <h1>Available Tests</h1>
      {tests.length === 0 ? (
        <div className="empty-state">
          <h3>No tests available</h3>
          <p>Contact your administrator to create tests.</p>
        </div>
      ) : (
        <div className="test-grid">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <h3>{test.name}</h3>
              <p>{test.description}</p>
              <div className="test-meta">
                <span>⏱️ {test.duration} min</span>
                <span>📝 {test.questionLimit} questions</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Link to={`/test/${test.id}/attempt`} className="btn btn-primary">
                  Start Test
                </Link>
                <Link to={`/leaderboard/${test.id}`} className="btn btn-secondary">
                  Leaderboard
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
