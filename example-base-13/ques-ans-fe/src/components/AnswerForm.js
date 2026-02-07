import React, { useState, useEffect } from 'react';
import { answerAPI } from '../services/api';
import './AnswerForm.css';

const AnswerForm = ({ questionId, answerId, initialAnswer = '', onSubmitted, onCancel }) => {
  const isEdit = !!answerId;
  const [answer, setAnswer] = useState(initialAnswer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAnswer(initialAnswer);
  }, [initialAnswer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!answer.trim()) {
      setError('Answer text is required.');
      return;
    }

    try {
      setLoading(true);
      if (isEdit) {
        await answerAPI.update(answerId, answer.trim());
      } else {
        await answerAPI.create(questionId, answer.trim());
      }
      onSubmitted();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save answer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={isEdit ? "Edit your answer..." : "Enter your answer..."}
          rows="4"
          required
          disabled={loading}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEdit ? 'Update Answer' : 'Submit Answer'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AnswerForm;
