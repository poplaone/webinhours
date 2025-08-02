export interface AIAgent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  price: number;
  preview_url: string;
  demo_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  inclusions?: string[];
  agent_type: string;
  model_info?: any;
  use_cases?: string[];
  status: string;
  is_featured: boolean;
  views_count: number;
  usage_count: number;
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

export interface AIAgentInsert {
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  price: number;
  preview_url: string;
  demo_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  inclusions?: string[];
  agent_type?: string;
  model_info?: any;
  use_cases?: string[];
  status?: string;
  approved_at?: string;
  user_id?: string;
}

export interface AIAgentUpdate {
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  price?: number;
  preview_url?: string;
  demo_url?: string;
  thumbnail_url?: string;
  images?: string[];
  technologies?: string[];
  features?: string[];
  inclusions?: string[];
  agent_type?: string;
  model_info?: any;
  use_cases?: string[];
  status?: string;
  is_featured?: boolean;
  featured_at?: string;
  approved_at?: string;
  views_count?: number;
  usage_count?: number;
  rating_average?: number;
  rating_count?: number;
}

export interface AIAgentFilters {
  category?: string;
  tags?: string[];
  status?: string;
  featured?: boolean;
  search?: string;
  agent_type?: string;
  includeAll?: boolean;
}