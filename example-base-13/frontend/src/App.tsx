import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { userService } from './services/dataService';
import type { User } from './types';
import Navbar from './components/Navbar';
import TestList from './pages/TestList';
import TestAttempt from './pages/TestAttempt';
import TestResult from './pages/TestResult';
import AttemptHistory from './pages/AttemptHistory';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import QuestionBank from './pages/QuestionBank';
import CreateTest from './pages/CreateTest';
import Login from './pages/Login';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const user = await userService.getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    };
    loadUser();
  }, []);

  const handleLogin = async (userId: string) => {
    userService.setCurrentUser(userId);
    const user = await userService.getCurrentUser();
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('mcq_current_user');
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={currentUser} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TestList />} />
            <Route path="/test/:testId/attempt" element={<TestAttempt />} />
            <Route path="/attempt/:attemptId/result" element={<TestResult />} />
            <Route path="/history" element={<AttemptHistory />} />
            <Route path="/leaderboard/:testId" element={<Leaderboard />} />
            {currentUser.role === 'admin' && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/questions" element={<QuestionBank />} />
                <Route path="/admin/test/create" element={<CreateTest />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
