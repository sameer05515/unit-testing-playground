import { useParams, Link } from 'react-router-dom';
import { DataService } from '../services/dataService';
import '../App.css';

function ResumeDetailPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const resume = resumeId ? DataService.getResumeById(resumeId) : undefined;

  if (!resume) {
    return (
      <div>
        <Link to="/users" className="back-button">← Back to Users</Link>
        <div className="empty-state">
          <p>Resume not found.</p>
        </div>
      </div>
    );
  }

  const user = DataService.getUserById(resume.userId);

  return (
    <div>
      <Link to={`/users/${resume.userId}/resumes`} className="back-button">
        ← Back to Resumes
      </Link>
      <div className="resume-detail">
        <div className="page-header">
          <h1>{resume.title}</h1>
          <p>Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
        </div>

        {/* Personal Information */}
        <div className="resume-section">
          <h2>Personal Information</h2>
          <div className="personal-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">
                {resume.personalInformation.firstName}{' '}
                {resume.personalInformation.lastName}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{resume.personalInformation.email}</span>
            </div>
            {resume.personalInformation.phone && (
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">
                  {resume.personalInformation.phone}
                </span>
              </div>
            )}
            {resume.personalInformation.address && (
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">
                  {resume.personalInformation.address}
                </span>
              </div>
            )}
          </div>
          {resume.personalInformation.summary && (
            <div style={{ marginTop: '1rem' }}>
              <span className="info-label">Summary</span>
              <p style={{ color: '#34495e', marginTop: '0.5rem' }}>
                {resume.personalInformation.summary}
              </p>
            </div>
          )}
        </div>

        {/* Experiences */}
        <div className="resume-section">
          <h2>Work Experience</h2>
          {resume.experiences.length === 0 ? (
            <p style={{ color: '#7f8c8d' }}>No work experience listed.</p>
          ) : (
            resume.experiences.map((experience) => {
              const startDate = new Date(experience.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              });
              const endDate = experience.endDate
                ? new Date(experience.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Present';

              return (
                <div key={experience.id} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <div className="experience-title">{experience.position}</div>
                      <div className="experience-company">{experience.companyName}</div>
                    </div>
                    <div className="experience-dates">
                      {startDate} - {endDate}
                    </div>
                  </div>

                  {experience.projects.length > 0 && (
                    <div>
                      <h3>Projects</h3>
                      {experience.projects.map((project) => {
                        const projectStartDate = new Date(
                          project.startDate
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        });
                        const projectEndDate = project.endDate
                          ? new Date(project.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Present';

                        return (
                          <div key={project.projectId} className="project-item">
                            <h4>
                              {project.projectName} ({projectStartDate} - {projectEndDate})
                            </h4>

                            {project.techStacks.length > 0 && (
                              <div>
                                <div className="info-label" style={{ marginBottom: '0.5rem' }}>
                                  Tech Stack:
                                </div>
                                <div className="tech-stacks">
                                  {project.techStacks.map((tech, index) => (
                                    <span
                                      key={index}
                                      className={`tech-tag ${tech.level ? 'with-level' : ''}`}
                                      title={tech.level}
                                    >
                                      {tech.name}
                                      {tech.level && ` (${tech.level})`}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {project.rolesAndResponsibilities.length > 0 && (
                              <div>
                                <div className="info-label" style={{ marginBottom: '0.5rem' }}>
                                  Roles & Responsibilities:
                                </div>
                                <ul className="responsibilities">
                                  {project.rolesAndResponsibilities.map((role, index) => (
                                    <li key={index}>{role.description}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Education */}
        <div className="resume-section">
          <h2>Education</h2>
          {resume.educations.length === 0 ? (
            <p style={{ color: '#7f8c8d' }}>No education details listed.</p>
          ) : (
            resume.educations.map((education) => {
              const startDate = new Date(education.startDate).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              });
              const endDate = education.endDate
                ? new Date(education.endDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Present';

              return (
                <div key={education.id} className="education-item">
                  <div className="education-header">
                    <div>
                      <div className="experience-title">{education.degree}</div>
                      <div className="experience-company">{education.institution}</div>
                      {education.fieldOfStudy && (
                        <div style={{ color: '#7f8c8d', marginTop: '0.25rem' }}>
                          {education.fieldOfStudy}
                        </div>
                      )}
                    </div>
                    <div className="experience-dates">
                      {startDate} - {endDate}
                    </div>
                  </div>
                  {education.grade && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <span className="info-label">Grade: </span>
                      <span className="info-value">{education.grade}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeDetailPage;

