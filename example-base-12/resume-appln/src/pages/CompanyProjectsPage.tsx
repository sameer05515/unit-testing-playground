import { useParams, Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import '../App.css';

function CompanyProjectsPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const company = companyId ? DataService.getCompanyById(companyId) : undefined;
  const projects = companyId ? DataService.getProjectsByCompanyId(companyId) : [];

  if (!company) {
    return (
      <div>
        <Link to="/companies" className="back-button">← Back to Companies</Link>
        <div className="empty-state">
          <p>Company not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/companies" className="back-button">← Back to Companies</Link>
      <div className="page-header">
        <h1>Projects - {company.name}</h1>
        <p>{company.description || 'Projects for this company'}</p>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects found for this company.</p>
        </div>
      ) : (
        <div className="card-list">
          {projects.map((project) => (
            <div key={project.id} className="card">
              <h3>{project.name}</h3>
              {project.description && <p>{project.description}</p>}
              <div className="card-meta">Project ID: {project.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyProjectsPage;

