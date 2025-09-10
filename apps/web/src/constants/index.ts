import { ContentTone, ContentType, HookType, Platform } from '@/types';

// Platform Configuration
export const PLATFORM_CONFIG = {
  [Platform.TIKTOK]: {
    name: 'TikTok',
    maxDuration: 60,
    optimalDuration: [15, 30],
    aspectRatio: '9:16',
    hashtagLimit: 100, // characters
    captionLimit: 2200,
    color: '#FE2C55',
  },
  [Platform.INSTAGRAM_REELS]: {
    name: 'Instagram Reels',
    maxDuration: 90,
    optimalDuration: [15, 30],
    aspectRatio: '9:16',
    hashtagLimit: 30, // number of hashtags
    captionLimit: 2200,
    color: '#E4405F',
  },
  [Platform.YOUTUBE_SHORTS]: {
    name: 'YouTube Shorts',
    maxDuration: 60,
    optimalDuration: [15, 45],
    aspectRatio: '9:16',
    hashtagLimit: 15, // number of hashtags
    captionLimit: 1000,
    color: '#FF0000',
  },
} as const;

// Content Type Configuration
export const CONTENT_TYPE_CONFIG = {
  [ContentType.EDUCATIONAL]: {
    name: 'Educational',
    description: 'Teach or inform your audience',
    icon: '🎓',
    suggestedTones: [ContentTone.PROFESSIONAL, ContentTone.AUTHORITATIVE, ContentTone.FRIENDLY],
  },
  [ContentType.ENTERTAINMENT]: {
    name: 'Entertainment',
    description: 'Engage and amuse your audience',
    icon: '🎭',
    suggestedTones: [ContentTone.HUMOROUS, ContentTone.CASUAL, ContentTone.FRIENDLY],
  },
  [ContentType.INSPIRATIONAL]: {
    name: 'Inspirational',
    description: 'Motivate and inspire your audience',
    icon: '✨',
    suggestedTones: [ContentTone.INSPIRING, ContentTone.AUTHORITATIVE, ContentTone.FRIENDLY],
  },
  [ContentType.PROMOTIONAL]: {
    name: 'Promotional',
    description: 'Promote products or services',
    icon: '📢',
    suggestedTones: [ContentTone.PROFESSIONAL, ContentTone.FRIENDLY, ContentTone.CASUAL],
  },
  [ContentType.STORYTELLING]: {
    name: 'Storytelling',
    description: 'Share stories and experiences',
    icon: '📚',
    suggestedTones: [ContentTone.CASUAL, ContentTone.FRIENDLY, ContentTone.INSPIRING],
  },
  [ContentType.TUTORIAL]: {
    name: 'Tutorial',
    description: 'Step-by-step instructions',
    icon: '🔧',
    suggestedTones: [ContentTone.PROFESSIONAL, ContentTone.FRIENDLY, ContentTone.AUTHORITATIVE],
  },
} as const;

// Hook Type Configuration
export const HOOK_TYPE_CONFIG = {
  [HookType.QUESTION]: {
    name: 'Question',
    description: 'Start with an engaging question',
    examples: ['Did you know that...?', 'What would you do if...?', 'Why do most people...?'],
  },
  [HookType.STATEMENT]: {
    name: 'Bold Statement',
    description: 'Make a strong, attention-grabbing statement',
    examples: ['This changed everything for me', 'Nobody talks about this', 'The truth is...'],
  },
  [HookType.STATISTIC]: {
    name: 'Statistic/Fact',
    description: 'Start with a surprising statistic or fact',
    examples: ["95% of people don't know this", 'In just 30 seconds...', 'Studies show that...'],
  },
  [HookType.STORY]: {
    name: 'Story',
    description: 'Begin with a personal story or anecdote',
    examples: [
      'Last week, something crazy happened',
      'I used to think...',
      'My biggest mistake was...',
    ],
  },
  [HookType.CONTROVERSIAL]: {
    name: 'Controversial',
    description: 'Start with a controversial or contrarian take',
    examples: ['Unpopular opinion:', "Everyone's doing this wrong", 'This is why I disagree...'],
  },
  [HookType.PROMISE]: {
    name: 'Promise/Benefit',
    description: 'Promise a specific benefit or outcome',
    examples: [
      'By the end of this video...',
      'This will save you hours',
      "In 60 seconds, you'll learn...",
    ],
  },
} as const;

// Script Structure Templates
export const SCRIPT_STRUCTURES = {
  standard: {
    name: 'Standard Structure',
    sections: [
      { name: 'Hook', duration: 3, percentage: 15 },
      { name: 'Context', duration: 7, percentage: 35 },
      { name: 'Main Content', duration: 30, percentage: 40 },
      { name: 'Call to Action', duration: 5, percentage: 10 },
    ],
  },
  tutorial: {
    name: 'Tutorial Structure',
    sections: [
      { name: 'Hook', duration: 3, percentage: 10 },
      { name: 'Preview', duration: 5, percentage: 15 },
      { name: 'Step-by-Step', duration: 40, percentage: 70 },
      { name: 'Call to Action', duration: 7, percentage: 5 },
    ],
  },
  story: {
    name: 'Story Structure',
    sections: [
      { name: 'Hook', duration: 3, percentage: 10 },
      { name: 'Setup', duration: 10, percentage: 20 },
      { name: 'Conflict/Climax', duration: 25, percentage: 55 },
      { name: 'Resolution/CTA', duration: 7, percentage: 15 },
    ],
  },
} as const;

// Popular Hashtags by Category
export const POPULAR_HASHTAGS = {
  [ContentType.EDUCATIONAL]: [
    '#LearnOnTikTok',
    '#Educational',
    '#DidYouKnow',
    '#Learning',
    '#Knowledge',
    '#Facts',
    '#Tutorial',
    '#HowTo',
  ],
  [ContentType.ENTERTAINMENT]: [
    '#Funny',
    '#Comedy',
    '#Entertainment',
    '#Viral',
    '#Fun',
    '#Laugh',
    '#Humor',
    '#Trending',
  ],
  [ContentType.INSPIRATIONAL]: [
    '#Motivation',
    '#Inspiration',
    '#Mindset',
    '#Success',
    '#Goals',
    '#SelfImprovement',
    '#Positivity',
    '#Growth',
  ],
  [ContentType.PROMOTIONAL]: [
    '#SmallBusiness',
    '#Entrepreneur',
    '#Product',
    '#Sale',
    '#Business',
    '#Brand',
    '#Marketing',
    '#Promotion',
  ],
  [ContentType.STORYTELLING]: [
    '#StoryTime',
    '#PersonalStory',
    '#Experience',
    '#Life',
    '#Journey',
    '#Sharing',
    '#RealTalk',
    '#MyStory',
  ],
  [ContentType.TUTORIAL]: [
    '#Tutorial',
    '#HowTo',
    '#StepByStep',
    '#Learn',
    '#DIY',
    '#Tips',
    '#Guide',
    '#Hack',
  ],
} as const;

// Call to Action Templates
export const CTA_TEMPLATES = {
  engagement: [
    'Let me know what you think in the comments!',
    'Which one would you choose? Comment below!',
    'Tag someone who needs to see this!',
    "What's your experience with this? Share below!",
  ],
  follow: [
    'Follow for more content like this!',
    'Hit that follow button if this helped you!',
    "Don't miss out - follow for daily tips!",
    'Follow me for more insider secrets!',
  ],
  save: [
    'Save this for later!',
    'Bookmark this post for when you need it!',
    "Save this - you'll thank me later!",
    "Don't lose this - hit save now!",
  ],
  share: [
    'Share this with someone who needs to hear it!',
    'Send this to a friend who would love this!',
    'Share if you found this helpful!',
    'Pass this along to help others!',
  ],
} as const;

// Subscription Limits
export const SUBSCRIPTION_LIMITS = {
  free_trial: {
    ideas: Infinity,
    generations: Infinity,
    duration: 3, // days
  },
  starter: {
    ideas: 100,
    generations: 300,
    analyticsHistory: 30, // days
  },
  professional: {
    ideas: Infinity,
    generations: Infinity,
    analyticsHistory: 90, // days
    teamMembers: 1,
  },
  business: {
    ideas: Infinity,
    generations: Infinity,
    analyticsHistory: 365, // days
    teamMembers: 5,
    prioritySupport: true,
  },
} as const;

// API Endpoints
export const API_ROUTES = {
  // Auth
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    SESSION: '/api/auth/session',
    LOGOUT: '/api/auth/logout',
  },
  // Ideas
  IDEAS: {
    CREATE: '/api/ideas/create',
    LIST: '/api/ideas/list',
    GET: (id: string) => `/api/ideas/${id}`,
    UPDATE: (id: string) => `/api/ideas/${id}`,
    DELETE: (id: string) => `/api/ideas/${id}`,
  },
  // Content Generation
  GENERATE: {
    HOOK: '/api/generate/hook',
    SCRIPT: '/api/generate/script',
    CAPTION: '/api/generate/caption',
    FULL: '/api/generate/full',
  },
  // Voice Processing
  VOICE: {
    TRANSCRIBE: '/api/voice/transcribe',
    ANALYZE: '/api/voice/analyze',
  },
  // Performance
  PERFORMANCE: {
    TRACK: '/api/performance/track',
    ANALYTICS: '/api/performance/analytics',
    SUGGESTIONS: '/api/performance/suggestions',
  },
  // Templates
  TEMPLATES: {
    LIST: '/api/templates/list',
    GET: (id: string) => `/api/templates/${id}`,
    APPLY: '/api/templates/apply',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  SUBSCRIPTION_LIMIT: 'You have reached your subscription limit.',
  AI_SERVICE_ERROR: 'AI service is temporarily unavailable.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  IDEA_CREATED: 'Idea saved successfully!',
  CONTENT_GENERATED: 'Content generated successfully!',
  SETTINGS_UPDATED: 'Settings updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;
