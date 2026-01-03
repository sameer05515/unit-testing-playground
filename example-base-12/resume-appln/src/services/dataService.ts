import { User, Company, Project, Resume } from '../types';
import { mockUsers, mockCompanies, mockProjects, mockResumes } from './mockData';

export class DataService {
  // Users
  static getUsers(): User[] {
    return mockUsers;
  }

  static getUserById(userId: string): User | undefined {
    return mockUsers.find((u) => u.id === userId);
  }

  // Companies
  static getCompanies(): Company[] {
    return mockCompanies;
  }

  static getCompanyById(companyId: string): Company | undefined {
    return mockCompanies.find((c) => c.id === companyId);
  }

  // Projects
  static getProjects(): Project[] {
    return mockProjects;
  }

  static getProjectsByCompanyId(companyId: string): Project[] {
    return mockProjects.filter((p) => p.companyId === companyId);
  }

  static getProjectById(projectId: string): Project | undefined {
    return mockProjects.find((p) => p.id === projectId);
  }

  // Resumes
  static getResumes(): Resume[] {
    return mockResumes;
  }

  static getResumesByUserId(userId: string): Resume[] {
    return mockResumes.filter((r) => r.userId === userId);
  }

  static getResumeById(resumeId: string): Resume | undefined {
    return mockResumes.find((r) => r.id === resumeId);
  }
}

