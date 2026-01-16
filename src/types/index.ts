// ── Site Configuration Types ────────────────────────────────────

export interface Social {
    name: string;
    url: string;
    icon: string;
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
    details: string[];
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    points: string[];
}

export interface Skills {
    languages: string[];
    frameworks: string[];
    tools: string[];
    domains: string[];
}

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    highlights: string[];
    github: string;
    demo: string;
}

export interface Certification {
    name: string;
    issuer: string;
    year: string;
}

export interface SiteConfig {
    // Personal Info
    name: string;
    tagline: string;
    location: string;
    phone: string;
    email: string;
    resumeUrl: string;

    // Arrays
    socials: Social[];
    about: string[];
    education: Education[];
    experience: Experience[];
    projects: Project[];
    certifications: Certification[];

    // Skills object
    skills: Skills;
}

// ── Component Props Types ───────────────────────────────────────

export interface WelcomePageProps {
    onEnter: () => void;
}

export interface ResumeGateProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ProjectCardProps {
    project: Project;
    index: number;
}

export interface ComputersProps {
    isMobile: boolean;
}

export interface SectionWrapperProps {
    idName: string;
}
