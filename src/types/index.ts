export interface Paginated<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  is_home: boolean;
  created_at: string;
  updated_at: string;
}

export interface Showcase {
  id: number;
  title: string;
  slug: string;
  description: string;
  category_id: number;
  is_featured: boolean;
  status: boolean;
  featured_image: string;
  category?: Category;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  status: boolean;
  order: number;
}

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
}

export interface MenuItem {
  label: string;
  url: string;
  is_external: boolean;
}

export interface Menu {
  id: number;
  name: string;
  location: 'header' | 'footer';
  items: MenuItem[];
}

export interface Media {
  id: number;
  file_name: string;
  file_path: string;
  file_type: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  is_read: boolean;
  created_at: string;
}

export interface WebsiteSettings {
  site_name: string;
  site_description: string;
  logo: string;
  favicon: string;
  contact_email: string;
  phone: string;
  address: string;
}

export interface ActivityLog {
    id: number;
    admin: AdminUser;
    action: string;
    details: string;
    created_at: string;
}
