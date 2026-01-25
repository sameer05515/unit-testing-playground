import { Link } from 'react-router-dom';
import type { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="navbar">
      <h1>MCQ Examination System</h1>
      <div className="navbar-right">
        <Link to="/">Tests</Link>
        <Link to="/history">My Attempts</Link>
        {user.role === 'admin' && <Link to="/admin">Admin</Link>}
        <span>{user.name} ({user.role})</span>
        <button className="btn btn-secondary" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
