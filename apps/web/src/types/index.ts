// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name?: string;
  brandVoice?: string;
  preferredPlatforms?: Platform[];
  subscriptionStatus: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  brandVoice: string;
  preferredPlatforms: Platform[];
  defaultTone: ContentTone;
  autoSave: boolean;
}

// Content Types
export interface IdeaInput {
  type: 'text' | 'voice';
  content: string;
  transcription?: string;
  metadata: {
    duration?: number;
    wordCount: number;
    detectedTopics: string[];
    language?: string;
  };
}

export interface ProcessedIdea {
  id: string;
  userId: string;
  rawContent: string;
  processedContent: {
    mainTopic: string;
    keyPoints: string[];
    suggestedTone: ContentTone;
    targetAudience: string;
    contentType: ContentType;
  };
  voiceUrl?: string;
  tags: string[];
  status: IdeaStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedContent {
  id: string;
  ideaId: string;
  contentType: GeneratedContentType;
  platform: Platform;
  content: string;
  metadata: {
    hookType?: HookType;
    wordCount: number;
    estimatedDuration: number;
    confidence: number;
    variations?: string[];
  };
  performanceData?: PerformanceData;
  createdAt: Date;
}

export interface Hook {
  text: string;
  type: HookType;
  score: number;
  platform: Platform;
  reasoning: string;
}

export interface Script {
  id: string;
  platform: Platform;
  duration: number;
  structure: {
    hook: string; // 0-3 seconds
    context: string; // 4-10 seconds
    mainContent: string; // 11-40 seconds
    callToAction: string; // 41-45+ seconds
  };
  wordCount: number;
  estimatedEngagement: number;
}

export interface Caption {
  text: string;
  hashtags: string[];
  callToAction: string;
  platform: Platform;
  characterCount: number;
}

export interface Template {
  id: string;
  name: string;
  category: ContentCategory;
  platform: Platform;
  formula: string;
  variables: Record<string, string>;
  successRate: number;
  updatedAt: Date;
}

export interface PerformanceData {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagementRate: number;
  completionRate: number;
  clickThroughRate?: number;
  impressions?: number;
}

// Enum Types
export enum Platform {
  TIKTOK = 'tiktok',
  INSTAGRAM_REELS = 'instagram_reels',
  YOUTUBE_SHORTS = 'youtube_shorts',
  ALL = 'all',
}

export enum ContentType {
  EDUCATIONAL = 'educational',
  ENTERTAINMENT = 'entertainment',
  INSPIRATIONAL = 'inspirational',
  PROMOTIONAL = 'promotional',
  STORYTELLING = 'storytelling',
  TUTORIAL = 'tutorial',
}

export enum ContentTone {
  PROFESSIONAL = 'professional',
  CASUAL = 'casual',
  FRIENDLY = 'friendly',
  AUTHORITATIVE = 'authoritative',
  HUMOROUS = 'humorous',
  INSPIRING = 'inspiring',
}

export enum HookType {
  QUESTION = 'question',
  STATEMENT = 'statement',
  STATISTIC = 'statistic',
  STORY = 'story',
  CONTROVERSIAL = 'controversial',
  PROMISE = 'promise',
}

export enum GeneratedContentType {
  HOOK = 'hook',
  SCRIPT = 'script',
  CAPTION = 'caption',
  HASHTAGS = 'hashtags',
  CTA = 'cta',
}

export enum IdeaStatus {
  DRAFT = 'draft',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum SubscriptionStatus {
  FREE_TRIAL = 'free_trial',
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  BUSINESS = 'business',
  CANCELLED = 'cancelled',
}

export enum ContentCategory {
  BUSINESS = 'business',
  LIFESTYLE = 'lifestyle',
  EDUCATION = 'education',
  ENTERTAINMENT = 'entertainment',
  FITNESS = 'fitness',
  FOOD = 'food',
  TRAVEL = 'travel',
  TECHNOLOGY = 'technology',
  FASHION = 'fashion',
  OTHER = 'other',
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface IdeaCaptureForm {
  content: string;
  platform: Platform;
  contentType: ContentType;
  tone: ContentTone;
  tags: string[];
}

export interface ContentGenerationRequest {
  ideaId: string;
  platform: Platform;
  contentTypes: GeneratedContentType[];
  options?: {
    hookVariations?: number;
    tone?: ContentTone;
    length?: 'short' | 'medium' | 'long';
    includeHashtags?: boolean;
  };
}

// Analytics Types
export interface UserAnalytics {
  totalIdeas: number;
  totalGenerated: number;
  avgEngagementRate: number;
  topPerformingPlatform: Platform;
  contentTypeBreakdown: Record<ContentType, number>;
  weeklyStats: {
    week: string;
    ideas: number;
    generated: number;
  }[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
