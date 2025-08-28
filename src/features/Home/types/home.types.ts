export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}