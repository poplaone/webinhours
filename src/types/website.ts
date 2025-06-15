
export interface Website {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  price: number;
  preview_url: string;
  demo_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  inclusions?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'featured' | 'archived';
  is_featured: boolean;
  views_count: number;
  downloads_count: number;
  rating_average?: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
  featured_at?: string;
  approved_at?: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface WebsiteInsert {
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  price: number;
  preview_url: string;
  demo_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  inclusions?: string[];
  status?: 'pending' | 'approved' | 'rejected' | 'featured' | 'archived';
  approved_at?: string;
  user_id?: string;
}

export interface WebsiteUpdate {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  price?: number;
  preview_url?: string;
  demo_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  inclusions?: string[];
  status?: 'pending' | 'approved' | 'rejected' | 'featured' | 'archived';
  is_featured?: boolean;
  featured_at?: string;
  approved_at?: string;
  views_count?: number;
  downloads_count?: number;
  rating_average?: number;
  rating_count?: number;
}

export interface WebsiteFilters {
  category?: string;
  tags?: string[];
  status?: string;
  featured?: boolean;
  search?: string;
  includeAll?: boolean;
}
