import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { questionAPI, answerAPI } from '../services/api';
import AnswerForm from './AnswerForm';
import './QuestionDetail.css';

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [editingAnswerId, setEditingAnswerId] = useState(null);

  useEffect(() => {
    loadQuestion();
  }, [id]);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      const response = await questionAPI.getById(id);
      const data = response.data.data;
      setQuestion(data);
      setAnswers(data.answers || []);
      setError(null);
    } catch (err) {
      setError('Failed to load question.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      await questionAPI.delete(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete question.');
      console.error(err);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm('Are you sure you want to delete this answer?')) {
      return;
    }

    try {
      await answerAPI.delete(answerId);
      setAnswers(answers.filter(a => a.id !== answerId));
    } catch (err) {
      alert('Failed to delete answer.');
      console.error(err);
    }
  };

  const handleAnswerSubmitted = () => {
    setShowAnswerForm(false);
    loadQuestion();
  };

  const handleAnswerUpdated = () => {
    setEditingAnswerId(null);
    loadQuestion();
  };

  if (loading) {
    return <div className="loading">Loading question...</div>;
  }

  if (error || !question) {
    return (
      <div className="error-container">
        <div className="error-message">{error || 'Question not found'}</div>
        <Link to="/" className="btn btn-primary">Back to Questions</Link>
      </div>
    );
  }

  return (
    <div className="question-detail-container">
      <div className="question-detail-header">
        <Link to="/" className="btn btn-secondary">
          ← Back to Questions
        </Link>
        <div className="question-actions">
          <Link
            to={`/questions/${id}/edit`}
            className="btn btn-secondary"
          >
            Edit Question
          </Link>
          <button
            onClick={handleDeleteQuestion}
            className="btn btn-danger"
          >
            Delete Question
          </button>
        </div>
      </div>

      <div className="question-detail">
        <h1 className="question-title">{question.question}</h1>
        
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
          <span>Created: {new Date(question.createdAt).toLocaleString()}</span>
          {question.updatedAt !== question.createdAt && (
            <span>Updated: {new Date(question.updatedAt).toLocaleString()}</span>
          )}
        </div>
      </div>

      <div className="answers-section">
        <div className="answers-header">
          <h2>Answers ({answers.length})</h2>
          {!showAnswerForm && (
            <button
              onClick={() => setShowAnswerForm(true)}
              className="btn btn-primary"
            >
              Submit Answer
            </button>
          )}
        </div>

        {showAnswerForm && (
          <AnswerForm
            questionId={parseInt(id)}
            onSubmitted={handleAnswerSubmitted}
            onCancel={() => setShowAnswerForm(false)}
          />
        )}

        {answers.length === 0 ? (
          <div className="empty-state">
            <p>No answers yet. Be the first to answer!</p>
          </div>
        ) : (
          <div className="answers-list">
            {answers.map((answer) => (
              <div key={answer.id} className="answer-card">
                {editingAnswerId === answer.id ? (
                  <AnswerForm
                    questionId={parseInt(id)}
                    answerId={answer.id}
                    initialAnswer={answer.answer}
                    onSubmitted={handleAnswerUpdated}
                    onCancel={() => setEditingAnswerId(null)}
                  />
                ) : (
                  <>
                    <div className="answer-content">{answer.answer}</div>
                    <div className="answer-meta">
                      <span>
                        {new Date(answer.createdAt).toLocaleString()}
                        {answer.updatedAt !== answer.createdAt && ' (edited)'}
                      </span>
                      <div className="answer-actions">
                        <button
                          onClick={() => setEditingAnswerId(answer.id)}
                          className="btn-icon"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteAnswer(answer.id)}
                          className="btn-icon"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;
