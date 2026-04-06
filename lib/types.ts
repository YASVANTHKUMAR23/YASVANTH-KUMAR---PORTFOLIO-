export interface Experience {
  id: number;
  title: string;
  description: string;
  icon: string;
  isLeftNode: boolean;
  date: string;
  location: string;
}

export interface Project {
  id: string;
  folderLabel?: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  imageUrl: string;
  location?: string;
  tech?: string[];
  github?: string;
  demo?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  desc: string;
  img: string;
  link: string;
}

export interface FooterData {
  name: string;
  description: string;
  navLinks: { label: string; href: string }[];
  socialLinks: { label: string; url: string }[];
  copyright: string;
}

export interface ContactData {
  heading: string;
  description: string;
  formLabels: {
    name: string;
    email: string;
    message: string;
  };
}
