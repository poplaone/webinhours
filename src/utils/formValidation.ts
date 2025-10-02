import { z } from 'zod';

// URL validation schema
const urlSchema = z.string()
  .trim()
  .url({ message: "Please enter a valid URL" })
  .max(2048, { message: "URL must be less than 2048 characters" });

// Slug validation schema
const slugSchema = z.string()
  .trim()
  .min(1, { message: "Slug is required" })
  .max(100, { message: "Slug must be less than 100 characters" })
  .regex(/^[a-z0-9-]+$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens" });

// Website upload form validation schema
export const websiteUploadSchema = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  
  description: z.string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(2000, { message: "Description must be less than 2000 characters" }),
  
  category: z.string()
    .min(1, { message: "Category is required" }),
  
  price: z.number()
    .min(0, { message: "Price must be non-negative" })
    .max(999999.99, { message: "Price must be less than 1,000,000" }),
  
  preview_url: urlSchema,
  
  demo_url: z.union([
    urlSchema,
    z.literal(''),
    z.undefined()
  ]).optional(),
  
  slug: slugSchema,
  
  tags: z.array(z.string().trim().max(50)).optional(),
  
  technologies: z.array(z.string().trim().max(50)).optional(),
  
  features: z.array(z.string().trim().max(200)).optional(),
  
  inclusions: z.array(z.string().trim().max(200)).optional(),
});

// AI Agent upload form validation schema
export const aiAgentUploadSchema = z.object({
  title: z.string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must be less than 200 characters" }),
  
  description: z.string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(2000, { message: "Description must be less than 2000 characters" }),
  
  category: z.string()
    .min(1, { message: "Category is required" }),
  
  agent_type: z.string()
    .min(1, { message: "Agent type is required" }),
  
  price: z.number()
    .min(0, { message: "Price must be non-negative" })
    .max(999999.99, { message: "Price must be less than 1,000,000" }),
  
  preview_url: urlSchema,
  
  demo_url: z.union([
    urlSchema,
    z.literal(''),
    z.undefined()
  ]).optional(),
  
  tags: z.array(z.string().trim().max(50)).optional(),
  
  technologies: z.array(z.string().trim().max(50)).optional(),
  
  features: z.array(z.string().trim().max(200)).optional(),
  
  use_cases: z.array(z.string().trim().max(200)).optional(),
  
  inclusions: z.array(z.string().trim().max(200)).optional(),
});

// Auth form validation schemas
export const signInSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" }),
});

export const signUpSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  
  fullName: z.string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must be less than 100 characters" }),
});

// Profile update validation schema
export const profileUpdateSchema = z.object({
  full_name: z.string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must be less than 100 characters" })
    .optional(),
  
  company: z.string()
    .trim()
    .max(200, { message: "Company name must be less than 200 characters" })
    .optional(),
  
  avatar_url: z.union([
    urlSchema,
    z.literal(''),
    z.undefined()
  ]).optional(),
});

// Sanitize HTML content to prevent XSS
export const sanitizeHtml = (html: string): string => {
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Sanitize user input for safe display
export const sanitizeUserInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 10000); // Limit length to prevent DoS
};

// Validate and sanitize URL for external redirects
export const sanitizeExternalUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
};

export type WebsiteUploadFormData = z.infer<typeof websiteUploadSchema>;
export type AIAgentUploadFormData = z.infer<typeof aiAgentUploadSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
