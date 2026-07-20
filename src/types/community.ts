export type CommunityCategory = 'role-play' | 'code' | 'creative' | 'analysis' | 'general' | 'technique';

export interface CommunityExample {
  id: string;
  title: string;
  description: string;
  prompt: string;
  expectedOutput?: string;
  author: string;
  authorAvatar?: string;
  category: CommunityCategory;
  tags: string[];
  likes: number;
  createdAt: number;
  updatedAt?: number;
  isFeatured?: boolean;
  model?: string; // Target model if specific
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface CommunityExampleDetail extends CommunityExample {
  usageCount?: number;
  comments?: CommunityComment[];
  relatedExamples?: string[]; // IDs of related examples
}

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  createdAt: number;
  likes: number;
}

export interface CommunityFilter {
  category?: CommunityCategory;
  search?: string;
  sortBy?: 'newest' | 'popular' | 'featured';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface CommunityStats {
  totalExamples: number;
  totalAuthors: number;
  totalLikes: number;
  categoryCounts: Record<CommunityCategory, number>;
}
