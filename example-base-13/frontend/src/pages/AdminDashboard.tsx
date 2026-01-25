import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testService } from '../services/dataService';
import type { Test } from '../types';

export default function AdminDashboard() {
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
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin/test/create" className="btn btn-primary">
          Create New Test
        </Link>
        <Link to="/admin/questions" className="btn btn-success">
          Manage Question Bank
        </Link>
      </div>

      <div className="card">
        <h2>All Tests ({tests.length})</h2>
        {tests.length === 0 ? (
          <div className="empty-state">
            <p>No tests created yet. Create your first test!</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Questions</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id}>
                  <td>
                    <strong>{test.name}</strong>
                  </td>
                  <td>{test.description}</td>
                  <td>{test.duration} min</td>
                  <td>{test.questionLimit}</td>
                  <td>{new Date(test.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
