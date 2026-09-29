import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';
import QuestionDetail from './components/QuestionDetail';
import TagAnalytics from './components/TagAnalytics';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/questions/new" element={<QuestionForm />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/questions/:id/edit" element={<QuestionForm />} />
          <Route path="/analytics" element={<TagAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
