import { Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import '../App.css';

function UsersPage() {
  const users = DataService.getUsers();

  return (
    <div>
      <div className="page-header">
        <h1>Users</h1>
        <p>Select a user to view their resumes</p>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found.</p>
        </div>
      ) : (
        <div className="card-list">
          {users.map((user) => (
            <Link
              key={user.id}
              to={`/users/${user.id}/resumes`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card">
                <h3>{user.firstName} {user.lastName}</h3>
                <p>{user.email}</p>
                {user.phone && (
                  <div className="card-meta">Phone: {user.phone}</div>
                )}
                <div className="card-meta" style={{ marginTop: '0.5rem' }}>
                  Click to view resumes →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;

