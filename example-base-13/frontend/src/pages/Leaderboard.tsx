import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { leaderboardService, testService } from '../services/dataService';
import type { Test, LeaderboardEntry } from '../types';

export default function Leaderboard() {
  const { testId } = useParams<{ testId: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (testId) {
          const testData = await testService.getById(testId);
          setTest(testData || null);
          
          const leaderboardData = await leaderboardService.getByTestId(testId);
          setEntries(leaderboardData);
        }
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [testId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getRankBadgeClass = (rank: number) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return 'bronze';
    return 'default';
  };

  if (loading) {
    return <div className="loading">Loading leaderboard...</div>;
  }

  return (
    <div>
      <h1>Leaderboard: {test?.name || 'Test'}</h1>
      {entries.length === 0 ? (
        <div className="empty-state">
          <h3>No completed attempts yet</h3>
          <p>Be the first to complete this test!</p>
          {test && (
            <Link to={`/test/${test.id}/attempt`} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Start Test
            </Link>
          )}
        </div>
      ) : (
        <div className="card">
          {entries.map((entry) => (
            <div key={entry.userId} className="leaderboard-item">
              <div className={`rank-badge ${getRankBadgeClass(entry.rank)}`}>
                {entry.rank}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{entry.userName}</div>
                <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                  Score: {entry.score} • Time: {formatTime(entry.timeTaken)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="btn btn-secondary">
          Back to Tests
        </Link>
      </div>
    </div>
  );
}
