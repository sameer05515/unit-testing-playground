import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { testService, questionService, userService } from '../services/dataService';
import type { Question } from '../types';

export default function CreateTest() {
  const navigate = useNavigate();
  const currentUser = userService.getCurrentUser();
  const allQuestions = questionService.getAll();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 10,
    questionLimit: 10,
    questionIds: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    // Story 6: Admin Create Test
    const test = testService.create({
      ...formData,
      createdBy: currentUser.id,
    });

    navigate('/admin');
  };

  const toggleQuestion = (questionId: string) => {
    setFormData((prev) => {
      if (prev.questionIds.includes(questionId)) {
        return { ...prev, questionIds: prev.questionIds.filter((id) => id !== questionId) };
      } else {
        return { ...prev, questionIds: [...prev.questionIds, questionId] };
      }
    });
  };

  const topics = Array.from(new Set(allQuestions.map((q) => q.topic).filter(Boolean)));
  const [filterTopic, setFilterTopic] = useState<string>('');

  const filteredQuestions = allQuestions.filter((q) => {
    if (filterTopic && q.topic !== filterTopic) return false;
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Create New Test</h1>
        <Link to="/admin" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Test Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                required
              />
            </div>

            <div className="form-group">
              <label>Question Limit *</label>
              <input
                type="number"
                min="1"
                value={formData.questionLimit}
                onChange={(e) => setFormData({ ...formData, questionLimit: parseInt(e.target.value) || 1 })}
                required
              />
              <small style={{ color: '#7f8c8d' }}>
                Number of random questions to show per attempt
              </small>
            </div>
          </div>

          <div className="form-group">
            <label>Select Questions (Optional - if none selected, random questions will be used)</label>
            <div style={{ marginBottom: '1rem' }}>
              <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
                <option value="">All Topics</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ecf0f1', padding: '1rem', borderRadius: '4px' }}>
              {filteredQuestions.length === 0 ? (
                <div className="empty-state">
                  <p>No questions available. Create questions first!</p>
                  <Link to="/admin/questions" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Go to Question Bank
                  </Link>
                </div>
              ) : (
                <>
                  {filteredQuestions.map((question) => (
                    <div
                      key={question.id}
                      style={{
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        border: formData.questionIds.includes(question.id) ? '2px solid #3498db' : '1px solid #ecf0f1',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: formData.questionIds.includes(question.id) ? '#ebf5fb' : 'white',
                      }}
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'start' }}>
                        <input
                          type="checkbox"
                          checked={formData.questionIds.includes(question.id)}
                          onChange={() => toggleQuestion(question.id)}
                          style={{ marginRight: '0.5rem', marginTop: '0.25rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <strong>{question.text}</strong>
                          <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                            {question.topic && `📚 ${question.topic} • `}
                            {question.difficulty && `⚡ ${question.difficulty} • `}
                            ⭐ {question.marks} marks
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <small style={{ color: '#7f8c8d' }}>
              Selected: {formData.questionIds.length} questions. If less than question limit, random questions will be used.
            </small>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-success">
              Create Test
            </button>
            <Link to="/admin" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
