export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  description?: string;
}

export interface TechStack {
  name: string;
  level?: string; // e.g., "Expert", "Intermediate", "Beginner"
}

export interface RoleAndResponsibility {
  description: string;
}

export interface ProjectExperience {
  projectId: string;
  projectName: string;
  startDate: string;
  endDate?: string;
  techStacks: TechStack[];
  rolesAndResponsibilities: RoleAndResponsibility[];
}

export interface Experience {
  id: string;
  companyId: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string; // null if current job
  projects: ProjectExperience[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
}

export interface PersonalInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  summary?: string;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  personalInformation: PersonalInformation;
  experiences: Experience[];
  educations: Education[];
  createdAt: string;
  updatedAt: string;
}

