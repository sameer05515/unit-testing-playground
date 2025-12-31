import { User, Company, Project, Resume } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-234-567-8900',
  },
  {
    id: 'user-2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1-234-567-8901',
  },
  {
    id: 'user-3',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
  },
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 'company-1',
    name: 'TechCorp Inc.',
    description: 'Leading technology solutions provider',
  },
  {
    id: 'company-2',
    name: 'DataSystems Ltd.',
    description: 'Enterprise data management solutions',
  },
  {
    id: 'company-3',
    name: 'CloudServices Co.',
    description: 'Cloud infrastructure and services',
  },
  {
    id: 'company-4',
    name: 'WebSolutions Inc.',
    description: 'Web development and consulting',
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    companyId: 'company-1',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution',
  },
  {
    id: 'project-2',
    companyId: 'company-1',
    name: 'Mobile Banking App',
    description: 'iOS and Android banking application',
  },
  {
    id: 'project-3',
    companyId: 'company-2',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics and reporting',
  },
  {
    id: 'project-4',
    companyId: 'company-2',
    name: 'ETL Pipeline System',
    description: 'Data extraction and transformation',
  },
  {
    id: 'project-5',
    companyId: 'company-3',
    name: 'Cloud Migration Project',
    description: 'Legacy system migration to cloud',
  },
  {
    id: 'project-6',
    companyId: 'company-4',
    name: 'CMS Platform',
    description: 'Content management system',
  },
];

// Mock Resumes
export const mockResumes: Resume[] = [
  {
    id: 'resume-1',
    userId: 'user-1',
    title: 'Senior Software Engineer Resume',
    personalInformation: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-234-567-8900',
      address: '123 Main St, New York, NY 10001',
      summary: 'Experienced full-stack developer with 8+ years in web development',
    },
    experiences: [
      {
        id: 'exp-1',
        companyId: 'company-1',
        companyName: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        startDate: '2020-01-15',
        endDate: '2023-12-31',
        projects: [
          {
            projectId: 'project-1',
            projectName: 'E-Commerce Platform',
            startDate: '2020-01-15',
            endDate: '2022-06-30',
            techStacks: [
              { name: 'React', level: 'Expert' },
              { name: 'Node.js', level: 'Expert' },
              { name: 'PostgreSQL', level: 'Advanced' },
              { name: 'AWS', level: 'Intermediate' },
            ],
            rolesAndResponsibilities: [
              { description: 'Led frontend development team of 5 developers' },
              { description: 'Designed and implemented RESTful APIs' },
              { description: 'Optimized database queries improving performance by 40%' },
              { description: 'Implemented CI/CD pipelines using Jenkins' },
            ],
          },
          {
            projectId: 'project-2',
            projectName: 'Mobile Banking App',
            startDate: '2022-07-01',
            endDate: '2023-12-31',
            techStacks: [
              { name: 'React Native', level: 'Expert' },
              { name: 'TypeScript', level: 'Expert' },
              { name: 'GraphQL', level: 'Advanced' },
              { name: 'Docker', level: 'Intermediate' },
            ],
            rolesAndResponsibilities: [
              { description: 'Developed cross-platform mobile application' },
              { description: 'Integrated biometric authentication' },
              { description: 'Implemented real-time transaction notifications' },
              { description: 'Collaborated with security team for compliance' },
            ],
          },
        ],
      },
      {
        id: 'exp-2',
        companyId: 'company-4',
        companyName: 'WebSolutions Inc.',
        position: 'Software Engineer',
        startDate: '2018-06-01',
        endDate: '2019-12-31',
        projects: [
          {
            projectId: 'project-6',
            projectName: 'CMS Platform',
            startDate: '2018-06-01',
            endDate: '2019-12-31',
            techStacks: [
              { name: 'Vue.js', level: 'Advanced' },
              { name: 'Express.js', level: 'Advanced' },
              { name: 'MongoDB', level: 'Intermediate' },
            ],
            rolesAndResponsibilities: [
              { description: 'Built responsive admin dashboard' },
              { description: 'Implemented content versioning system' },
              { description: 'Created RESTful API endpoints' },
            ],
          },
        ],
      },
    ],
    educations: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science',
        institution: 'State University',
        fieldOfStudy: 'Computer Science',
        startDate: '2014-09-01',
        endDate: '2018-05-31',
        grade: '3.8/4.0',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'resume-2',
    userId: 'user-1',
    title: 'Full Stack Developer Resume',
    personalInformation: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-234-567-8900',
      summary: 'Full-stack developer specializing in modern web technologies',
    },
    experiences: [
      {
        id: 'exp-3',
        companyId: 'company-1',
        companyName: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        startDate: '2020-01-15',
        projects: [
          {
            projectId: 'project-2',
            projectName: 'Mobile Banking App',
            startDate: '2022-07-01',
            techStacks: [
              { name: 'React Native', level: 'Expert' },
              { name: 'TypeScript', level: 'Expert' },
            ],
            rolesAndResponsibilities: [
              { description: 'Leading mobile app development' },
              { description: 'Architecting scalable solutions' },
            ],
          },
        ],
      },
    ],
    educations: [
      {
        id: 'edu-2',
        degree: 'Bachelor of Science',
        institution: 'State University',
        fieldOfStudy: 'Computer Science',
        startDate: '2014-09-01',
        endDate: '2018-05-31',
      },
    ],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'resume-3',
    userId: 'user-2',
    title: 'Data Engineer Resume',
    personalInformation: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1-234-567-8901',
      address: '456 Oak Ave, San Francisco, CA 94102',
      summary: 'Data engineer with expertise in big data technologies',
    },
    experiences: [
      {
        id: 'exp-4',
        companyId: 'company-2',
        companyName: 'DataSystems Ltd.',
        position: 'Data Engineer',
        startDate: '2021-03-01',
        projects: [
          {
            projectId: 'project-3',
            projectName: 'Data Analytics Dashboard',
            startDate: '2021-03-01',
            endDate: '2022-12-31',
            techStacks: [
              { name: 'Python', level: 'Expert' },
              { name: 'Apache Spark', level: 'Advanced' },
              { name: 'Kafka', level: 'Advanced' },
              { name: 'Tableau', level: 'Intermediate' },
            ],
            rolesAndResponsibilities: [
              { description: 'Built real-time data processing pipelines' },
              { description: 'Designed data warehouse architecture' },
              { description: 'Created interactive dashboards for stakeholders' },
            ],
          },
          {
            projectId: 'project-4',
            projectName: 'ETL Pipeline System',
            startDate: '2023-01-01',
            techStacks: [
              { name: 'Python', level: 'Expert' },
              { name: 'Airflow', level: 'Advanced' },
              { name: 'PostgreSQL', level: 'Advanced' },
            ],
            rolesAndResponsibilities: [
              { description: 'Developed scalable ETL processes' },
              { description: 'Optimized data transformation workflows' },
              { description: 'Implemented data quality checks' },
            ],
          },
        ],
      },
    ],
    educations: [
      {
        id: 'edu-3',
        degree: 'Master of Science',
        institution: 'Tech Institute',
        fieldOfStudy: 'Data Science',
        startDate: '2019-09-01',
        endDate: '2021-05-31',
        grade: '4.0/4.0',
      },
      {
        id: 'edu-4',
        degree: 'Bachelor of Science',
        institution: 'State University',
        fieldOfStudy: 'Mathematics',
        startDate: '2015-09-01',
        endDate: '2019-05-31',
        grade: '3.9/4.0',
      },
    ],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'resume-4',
    userId: 'user-3',
    title: 'Cloud Architect Resume',
    personalInformation: {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      address: '789 Pine St, Seattle, WA 98101',
      summary: 'Cloud architect with 10+ years of experience',
    },
    experiences: [
      {
        id: 'exp-5',
        companyId: 'company-3',
        companyName: 'CloudServices Co.',
        position: 'Cloud Architect',
        startDate: '2019-01-01',
        projects: [
          {
            projectId: 'project-5',
            projectName: 'Cloud Migration Project',
            startDate: '2019-01-01',
            endDate: '2021-06-30',
            techStacks: [
              { name: 'AWS', level: 'Expert' },
              { name: 'Kubernetes', level: 'Expert' },
              { name: 'Terraform', level: 'Advanced' },
              { name: 'Docker', level: 'Expert' },
            ],
            rolesAndResponsibilities: [
              { description: 'Led migration of 50+ applications to AWS' },
              { description: 'Designed microservices architecture' },
              { description: 'Implemented infrastructure as code' },
              { description: 'Reduced infrastructure costs by 30%' },
            ],
          },
        ],
      },
    ],
    educations: [
      {
        id: 'edu-5',
        degree: 'Bachelor of Science',
        institution: 'Engineering College',
        fieldOfStudy: 'Computer Engineering',
        startDate: '2010-09-01',
        endDate: '2014-05-31',
        grade: '3.7/4.0',
      },
    ],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
];

