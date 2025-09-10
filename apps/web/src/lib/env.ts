import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  CLERK_SECRET_KEY: z.string().min(1).optional(),
  CLERK_PUBLISHABLE_KEY: z.string().min(1).optional(),
  CLERK_WEBHOOK_SECRET: z.string().min(1).optional(),

  // AI Services
  OPENAI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  WHISPER_API_KEY: z.string().min(1).optional(),

  // Storage
  UPLOADTHING_SECRET: z.string().min(1).optional(),
  UPLOADTHING_APP_ID: z.string().min(1).optional(),

  // Analytics
  POSTHOG_KEY: z.string().min(1).optional(),
  POSTHOG_HOST: z.string().url().optional(),

  // Payment
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),

  // Social Media APIs (Phase 3)
  TIKTOK_CLIENT_KEY: z.string().min(1).optional(),
  TIKTOK_CLIENT_SECRET: z.string().min(1).optional(),
  INSTAGRAM_CLIENT_ID: z.string().min(1).optional(),
  INSTAGRAM_CLIENT_SECRET: z.string().min(1).optional(),
  YOUTUBE_API_KEY: z.string().min(1).optional(),

  // Vector Database
  PINECONE_API_KEY: z.string().min(1).optional(),
  PINECONE_INDEX_NAME: z.string().min(1).optional(),

  // Email
  RESEND_API_KEY: z.string().min(1).optional(),

  // App Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

const processEnv: Record<keyof Env, string | undefined> = {
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  WHISPER_API_KEY: process.env.WHISPER_API_KEY,
  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
  UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  POSTHOG_KEY: process.env.POSTHOG_KEY,
  POSTHOG_HOST: process.env.POSTHOG_HOST,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  TIKTOK_CLIENT_KEY: process.env.TIKTOK_CLIENT_KEY,
  TIKTOK_CLIENT_SECRET: process.env.TIKTOK_CLIENT_SECRET,
  INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
  INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

let env: Env;

try {
  env = envSchema.parse(processEnv);
} catch (error) {
  console.error('❌ Invalid environment variables:', error);
  throw new Error('Invalid environment variables');
}

export { env };