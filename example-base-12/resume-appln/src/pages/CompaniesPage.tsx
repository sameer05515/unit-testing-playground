import { Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import '../App.css';

function CompaniesPage() {
  const companies = DataService.getCompanies();

  return (
    <div>
      <div className="page-header">
        <h1>Companies</h1>
        <p>Select a company to view its projects</p>
      </div>

      {companies.length === 0 ? (
        <div className="empty-state">
          <p>No companies found.</p>
        </div>
      ) : (
        <div className="card-list">
          {companies.map((company) => (
            <Link
              key={company.id}
              to={`/companies/${company.id}/projects`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card">
                <h3>{company.name}</h3>
                {company.description && <p>{company.description}</p>}
                <div className="card-meta">
                  Click to view projects →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompaniesPage;

