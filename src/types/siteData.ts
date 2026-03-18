export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  instagram?: string;
  website?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  availability: {
    enabled: boolean;
    text: string;
  };
  heroDescription: string;
  heroTags: string[];
  photoUrl: string;
  social: SocialLinks;
  whatsapp: {
    number: string;
    message: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface MetricItem {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface ContentCard {
  title: string;
  icon: string;
  text: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  categoryIds: string[];
  techTags: string[];
  imageUrl: string;
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
  iconUrl: string;
  description: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  verifyUrl: string;
}

export interface CourseItem {
  title: string;
  platform: string;
  date: string;
  hours: number;
  certificateUrl?: string;
  coverUrl?: string;
}

export interface SiteData {
  profile: Profile;
  nav: {
    items: NavItem[];
    cta: {
      label: string;
      mode: 'whatsapp';
    };
  };
  metricsHero: MetricItem[];
  aboutCards: ContentCard[];
  values: ContentCard[];
  projects: {
    categories: ProjectCategory[];
    items: ProjectItem[];
  };
  skills: SkillItem[];
  certifications: CertificationItem[];
  courses: CourseItem[];
  contact: {
    email: string;
    phone: string;
    location: string;
    formEndpoint?: string;
  };
  footer: {
    shortBio: string;
    credits: string;
  };
}
