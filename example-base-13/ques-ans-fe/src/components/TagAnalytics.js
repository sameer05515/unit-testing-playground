import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tagAPI } from '../services/api';
import './TagAnalytics.css';

const TagAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await tagAPI.getAnalytics();
      setAnalytics(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load tag analytics.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <Link to="/" className="btn btn-primary">Back to Questions</Link>
      </div>
    );
  }

  return (
    <div className="tag-analytics-container">
      <div className="analytics-header">
        <Link to="/" className="btn btn-secondary">
          ← Back to Questions
        </Link>
        <h1>Tag Analytics</h1>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Questions</h3>
          <p className="summary-value">{analytics.totalQuestions || 0}</p>
        </div>
        <div className="summary-card">
          <h3>Total Tags</h3>
          <p className="summary-value">{analytics.totalTags || 0}</p>
        </div>
      </div>

      {analytics.sorted && analytics.sorted.length > 0 ? (
        <div className="analytics-table">
          <h2>Tag Usage</h2>
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Usage Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {analytics.sorted.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className="tag">{item.tag}</span>
                  </td>
                  <td>{item.count}</td>
                  <td>
                    <Link
                      to={`/?search=${encodeURIComponent(item.tag)}`}
                      className="btn btn-link"
                    >
                      View Questions
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No tags found. Start asking questions with tags!</p>
        </div>
      )}
    </div>
  );
};

export default TagAnalytics;
