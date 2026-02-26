
export type Theme = 'dark' | 'light';
export type AccentColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan';

export interface UserPreferences {
    theme: Theme;
    accentColor: AccentColor;
}

export interface ProjectImage {
    url: string;
    caption?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    images: ProjectImage[];
    coverImage: string;
    client?: string;
    projectType?: string;
    tools?: string[];
    demoUrl?: string;
}

export interface Skill {
    name: string;
    level: number;
}

export interface ExperienceItem {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    university: string;
    period: string;
}

export interface SiteContent {
    home: {
        title: string;
        subtitle: string;
        profileImage: string;
        description: string;
    };
    about: {
        title: string;
        description1: string;
        description2: string;
        image: string;
        skills: Skill[];
    };
    experience: {
        title: string;
        items: ExperienceItem[];
    };
    education: {
        title: string;
        items: EducationItem[];
    };
    projects: Project[];
    contact: {
        title: string;
        email: string;
        phone: string;
        address: string;
    };
}
