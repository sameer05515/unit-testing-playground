import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { questionAPI } from '../services/api';
import './QuestionForm.css';

const QuestionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [question, setQuestion] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      loadQuestion();
    }
  }, [id, isEdit]);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getById(id);
      const q = response.data.data;
      setQuestion(q.question || '');
      setTags(Array.isArray(q.tags) ? q.tags.join(', ') : '');
    } catch (err) {
      setError('Failed to load question.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) {
      setError('Question text is required.');
      return;
    }

    try {
      setLoading(true);
      const tagsArray = tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      if (isEdit) {
        await questionAPI.update(id, question.trim(), tagsArray);
      } else {
        await questionAPI.create(question.trim(), tagsArray);
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save question.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && loading && !question) {
    return <div className="loading">Loading question...</div>;
  }

  return (
    <div className="question-form-container">
      <div className="form-header">
        <h1>{isEdit ? 'Edit Question' : 'Ask a Question'}</h1>
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="question">Question *</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            rows="5"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas (e.g., javascript, react, nodejs)"
            disabled={loading}
          />
          <small className="form-hint">
            Separate multiple tags with commas
          </small>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEdit ? 'Update Question' : 'Submit Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
