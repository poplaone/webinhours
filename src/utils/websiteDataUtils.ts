
interface WebsiteFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  preview_url: string;
  demo_url?: string;
  slug?: string;
}

interface WebsiteDataParams {
  data: WebsiteFormData;
  thumbnailUrl: string;
  tags: string[];
  technologies: string[];
  features: string[];
  inclusions: string[];
  isAdmin: boolean;
}

export const prepareWebsiteData = ({
  data,
  thumbnailUrl,
  tags,
  technologies,
  features,
  inclusions,
  isAdmin,
}: WebsiteDataParams) => {
  // Determine status based on user role
  const websiteStatus = isAdmin ? 'approved' as const : 'pending' as const;

  const websiteData = {
    title: data.title,
    description: data.description,
    category: data.category,
    price: data.price,
    preview_url: data.preview_url,
    demo_url: data.demo_url || null,
    thumbnail_url: thumbnailUrl,
    slug: data.slug || null,
    tags: tags.length > 0 ? tags : null,
    technologies: technologies.length > 0 ? technologies : null,
    features: features.length > 0 ? features : null,
    inclusions: inclusions.length > 0 ? inclusions : null,
    status: websiteStatus, // Explicitly set status with proper typing
    // Only set approved_at if admin
    ...(isAdmin && { approved_at: new Date().toISOString() })
  };

  return websiteData;
};
