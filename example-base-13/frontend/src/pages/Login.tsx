import { useState, useEffect } from 'react';
import { userService } from '../services/dataService';
import type { User } from '../types';
import './Login.css';

interface LoginProps {
  onLogin: (userId: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const allUsers = await userService.getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleLogin = () => {
    if (selectedUserId) {
      onLogin(selectedUserId);
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="loading">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to MCQ System</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li
              key={user.id}
              className={`user-item ${selectedUserId === user.id ? 'selected' : ''}`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <div>
                <strong>{user.name}</strong>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {user.email} • {user.role}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={!selectedUserId}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
