import { useParams, Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import '../App.css';

function UserResumesPage() {
  const { userId } = useParams<{ userId: string }>();
  const user = userId ? DataService.getUserById(userId) : undefined;
  const resumes = userId ? DataService.getResumesByUserId(userId) : [];

  if (!user) {
    return (
      <div>
        <Link to="/users" className="back-button">← Back to Users</Link>
        <div className="empty-state">
          <p>User not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/users" className="back-button">← Back to Users</Link>
      <div className="page-header">
        <h1>Resumes - {user.firstName} {user.lastName}</h1>
        <p>{user.email}</p>
      </div>

      {resumes.length === 0 ? (
        <div className="empty-state">
          <p>No resumes found for this user.</p>
        </div>
      ) : (
        <div className="card-list">
          {resumes.map((resume) => (
            <Link
              key={resume.id}
              to={`/resumes/${resume.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card">
                <h3>{resume.title}</h3>
                <p>
                  {resume.personalInformation.firstName}{' '}
                  {resume.personalInformation.lastName}
                </p>
                <div className="card-meta">
                  {resume.experiences.length} experience(s), {resume.educations.length} education(s)
                </div>
                <div className="card-meta" style={{ marginTop: '0.5rem' }}>
                  Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </div>
                <div className="card-meta" style={{ marginTop: '0.5rem' }}>
                  Click to view details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserResumesPage;

