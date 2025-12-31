import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CompaniesPage from './pages/CompaniesPage';
import CompanyProjectsPage from './pages/CompanyProjectsPage';
import UsersPage from './pages/UsersPage';
import UserResumesPage from './pages/UserResumesPage';
import ResumeDetailPage from './pages/ResumeDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Resume Application
            </Link>
            <div className="nav-links">
              <Link to="/companies" className="nav-link">
                Companies
              </Link>
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<div className="home-page">
              <h1>Welcome to Resume Application</h1>
              <p>Navigate to Companies or Users to get started.</p>
            </div>} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/:companyId/projects" element={<CompanyProjectsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId/resumes" element={<UserResumesPage />} />
            <Route path="/resumes/:resumeId" element={<ResumeDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

