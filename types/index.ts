import { IconType } from 'react-icons';

export interface Skill {
  name: string;
  icon: IconType;
  frameworks?: string[];
}

export interface Project {
  title: string;
  description: string;
  category: 'personal' | 'university' | 'hackathon' | 'zemi';
  tags: string[];
  image: string;
  url: string;
  github: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Author {
  name: string;
  nameEn: string;
  catchphrase: string;
  bio: string;
  email: string;
  github: string;
}

export interface University {
  name: string;
  entranceYear: number;
}

export interface SkillCategories {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  tools: Skill[];
}

export interface SiteConfig {
  author: Author;
  university: University;
  skills: SkillCategories;
  projects: Project[];
  timeline: TimelineEvent[];
}
