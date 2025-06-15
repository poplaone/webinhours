
export interface WebsiteReviewModalProps {
  website: any | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, updates: any) => void;
}

export const statusOptions = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'featured', label: 'Featured' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'archived', label: 'Archived' },
];

export const specialTags = [
  'New', 'Featured', 'Hot', 'Popular', 'Trending', 'Premium', 
  'Best Seller', 'Editor\'s Choice', 'Recently Updated'
];
