import { useState } from 'react';
import { Link } from 'react-router-dom';
import { questionService } from '../services/dataService';
import type { Question, Difficulty } from '../types';

export default function QuestionBank() {
  const [questions, setQuestions] = useState(questionService.getAll());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterTopic, setFilterTopic] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');

  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    topic: '',
    difficulty: 'easy' as Difficulty,
    marks: 1,
  });

  const topics = Array.from(new Set(questions.map((q) => q.topic).filter(Boolean)));

  const filteredQuestions = questions.filter((q) => {
    if (filterTopic && q.topic !== filterTopic) return false;
    if (filterDifficulty && q.difficulty !== filterDifficulty) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      questionService.update(editingId, formData);
    } else {
      questionService.create(formData);
    }
    setQuestions(questionService.getAll());
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      topic: '',
      difficulty: 'easy',
      marks: 1,
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (question: Question) => {
    setFormData({
      text: question.text,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      topic: question.topic || '',
      difficulty: question.difficulty || 'easy',
      marks: question.marks,
    });
    setEditingId(question.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      questionService.delete(id);
      setQuestions(questionService.getAll());
    }
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, ''] });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const removeOption = (index: number) => {
    if (formData.options.length <= 2) return;
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Question Bank</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Question'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2>{editingId ? 'Edit Question' : 'Create New Question'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Question Text *</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Options * (Minimum 2, mark correct answer)</label>
              {formData.options.map((option, index) => (
                <div key={index} className="options-input">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === index}
                    onChange={() => setFormData({ ...formData, correctAnswer: index })}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                  {formData.options.length > 2 && (
                    <button type="button" className="btn btn-danger" onClick={() => removeOption(index)}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={addOption} style={{ marginTop: '0.5rem' }}>
                + Add Option
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Topic</label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="e.g., Math, Geography"
                />
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Marks *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.marks}
                  onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-success">
                {editingId ? 'Update Question' : 'Create Question'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label>Filter by Topic</label>
            <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
              <option value="">All Topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label>Filter by Difficulty</label>
            <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Questions ({filteredQuestions.length})</h2>
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <p>No questions found. Create your first question!</p>
          </div>
        ) : (
          <div>
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                style={{
                  padding: '1rem',
                  marginBottom: '1rem',
                  border: '1px solid #ecf0f1',
                  borderRadius: '4px',
                  background: '#f8f9fa',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{question.text}</h3>
                    <ul style={{ listStyle: 'none', marginBottom: '0.5rem' }}>
                      {question.options.map((option, index) => (
                        <li key={index} style={{ padding: '0.25rem 0' }}>
                          {index === question.correctAnswer ? '✓ ' : '  '}
                          {option}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                      {question.topic && <span>📚 {question.topic}</span>}
                      {question.difficulty && <span>⚡ {question.difficulty}</span>}
                      <span>⭐ {question.marks} marks</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" onClick={() => handleEdit(question)} style={{ padding: '0.5rem 1rem' }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(question.id)} style={{ padding: '0.5rem 1rem' }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
