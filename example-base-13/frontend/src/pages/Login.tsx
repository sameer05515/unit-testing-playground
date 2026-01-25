import { useState } from 'react';
import { userService } from '../services/dataService';
import './Login.css';

interface LoginProps {
  onLogin: (userId: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const users = userService.getAllUsers();

  const handleLogin = () => {
    if (selectedUserId) {
      onLogin(selectedUserId);
    }
  };

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
