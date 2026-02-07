import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questionAPI } from '../services/api';
import './QuestionList.css';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getAll();
      setQuestions(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load questions. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByTag = async (e) => {
    e.preventDefault();
    if (!searchTag.trim()) {
      loadQuestions();
      return;
    }

    try {
      setLoading(true);
      const response = await questionAPI.searchByTag(searchTag.trim());
      setQuestions(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to search questions by tag.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      await questionAPI.delete(id);
      setQuestions(questions.filter(q => q.id !== id));
    } catch (err) {
      alert('Failed to delete question.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  return (
    <div className="question-list-container">
      <div className="header">
        <h1>Q&A System</h1>
        <div className="header-actions">
          <Link to="/analytics" className="btn btn-secondary">
            Tag Analytics
          </Link>
          <Link to="/questions/new" className="btn btn-primary">
            Ask a Question
          </Link>
        </div>
      </div>

      <form onSubmit={handleSearchByTag} className="search-form">
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
        {searchTag && (
          <button
            type="button"
            onClick={() => {
              setSearchTag('');
              loadQuestions();
            }}
            className="btn btn-link"
          >
            Clear
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      {questions.length === 0 ? (
        <div className="empty-state">
          <p>No questions found.</p>
          <Link to="/questions/new" className="btn btn-primary">
            Ask the First Question
          </Link>
        </div>
      ) : (
        <div className="questions-grid">
          {questions.map((question) => (
            <div key={question.id} className="question-card">
              <div className="question-header">
                <Link to={`/questions/${question.id}`} className="question-title">
                  {question.question}
                </Link>
                <div className="question-actions">
                  <Link
                    to={`/questions/${question.id}/edit`}
                    className="btn-icon"
                    title="Edit"
                  >
                    ✏️
                  </Link>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="btn-icon"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="question-tags">
                {question.tags && question.tags.length > 0 ? (
                  question.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="tag tag-empty">No tags</span>
                )}
              </div>
              <div className="question-meta">
                <span className="meta-item">
                  Created: {new Date(question.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionList;
