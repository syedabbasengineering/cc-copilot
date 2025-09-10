import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { User, Subscription, UserSettings } from '@prisma/client';
import { redirect } from 'next/navigation';

// Types for user data
export type UserWithSubscription = User & {
  subscription: Subscription | null;
  userSettings: UserSettings | null;
};

// Get current authenticated user from Clerk
export async function getCurrentUser(): Promise<UserWithSubscription | null> {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return null;
    }

    // Get user from database with subscription and settings
    const user = await prisma.user.findUnique({
      where: { id: clerkUser.id },
      include: {
        subscription: true,
        userSettings: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get current user ID (throws if not authenticated)
export async function requireAuth(): Promise<string> {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return userId;
}

// Get current user with subscription check
export async function requireUserWithSubscription(): Promise<UserWithSubscription> {
  const userId = await requireAuth();
  
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      userSettings: true,
    },
  });

  if (!user) {
    // If user doesn't exist in DB but is authenticated, create them
    const clerkUser = await currentUser();
    if (!clerkUser) {
      redirect('/sign-in');
    }

    const newUser = await createUserFromClerk(clerkUser);
    return newUser;
  }

  return user;
}

// Create user in database from Clerk user data
export async function createUserFromClerk(clerkUser: {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<UserWithSubscription> {
  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null;

  const user = await prisma.user.create({
    data: {
      id: clerkUser.id,
      email,
      name,
      userSettings: {
        create: {
          defaultTone: 'FRIENDLY',
          autoSave: true,
          emailNotifications: true,
        },
      },
      subscription: {
        create: {
          status: 'FREE_TRIAL',
          plan: 'FREE_TRIAL',
          trialStart: new Date(),
          trialEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        },
      },
    },
    include: {
      subscription: true,
      userSettings: true,
    },
  });

  return user;
}

// Check if user has valid subscription
export function hasValidSubscription(user: UserWithSubscription): boolean {
  if (!user.subscription) {
    return false;
  }

  const { status, trialEnd } = user.subscription;

  // Check if trial is still valid
  if (status === 'FREE_TRIAL' || status === 'TRIALING') {
    return trialEnd ? new Date() < trialEnd : false;
  }

  // Check if subscription is active
  return status === 'ACTIVE';
}

// Check subscription limits
export function checkSubscriptionLimits(user: UserWithSubscription) {
  const { monthlyIdeas, monthlyGenerations, lastResetAt } = user;
  const { status } = user.subscription || {};

  // Reset monthly counters if it's a new month
  const now = new Date();
  const lastReset = new Date(lastResetAt);
  const shouldReset = 
    now.getMonth() !== lastReset.getMonth() || 
    now.getFullYear() !== lastReset.getFullYear();

  if (shouldReset) {
    // Reset counters (this would typically be done via a separate cron job)
    console.log('Monthly limits should be reset for user:', user.id);
  }

  // Define limits based on subscription plan
  const limits = {
    ideas: getIdeaLimit(status),
    generations: getGenerationLimit(status),
  };

  return {
    ideas: {
      used: monthlyIdeas,
      limit: limits.ideas,
      remaining: Math.max(0, limits.ideas - monthlyIdeas),
      canCreate: monthlyIdeas < limits.ideas,
    },
    generations: {
      used: monthlyGenerations,
      limit: limits.generations,
      remaining: Math.max(0, limits.generations - monthlyGenerations),
      canGenerate: monthlyGenerations < limits.generations,
    },
  };
}

// Get idea limit based on subscription status
function getIdeaLimit(status: string | undefined): number {
  switch (status) {
    case 'FREE_TRIAL':
    case 'TRIALING':
      return Infinity; // No limit during trial
    case 'ACTIVE':
      return Infinity; // For now, no limits for paid users
    default:
      return 0; // No subscription
  }
}

// Get generation limit based on subscription status
function getGenerationLimit(status: string | undefined): number {
  switch (status) {
    case 'FREE_TRIAL':
    case 'TRIALING':
      return Infinity; // No limit during trial
    case 'ACTIVE':
      return Infinity; // For now, no limits for paid users
    default:
      return 0; // No subscription
  }
}

// Update user usage counters
export async function incrementUserUsage(
  userId: string,
  type: 'ideas' | 'generations'
): Promise<void> {
  const updateData = type === 'ideas' 
    ? { monthlyIdeas: { increment: 1 } }
    : { monthlyGenerations: { increment: 1 } };

  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
}

// Check if user can perform an action based on subscription
export async function canPerformAction(
  userId: string,
  action: 'create_idea' | 'generate_content'
): Promise<{ allowed: boolean; reason?: string }> {
  const user = await requireUserWithSubscription();
  
  if (!hasValidSubscription(user)) {
    return { 
      allowed: false, 
      reason: 'Subscription expired. Please upgrade to continue.' 
    };
  }

  const limits = checkSubscriptionLimits(user);

  switch (action) {
    case 'create_idea':
      return {
        allowed: limits.ideas.canCreate,
        reason: limits.ideas.canCreate 
          ? undefined 
          : 'Monthly idea limit reached. Upgrade for unlimited ideas.',
      };
    
    case 'generate_content':
      return {
        allowed: limits.generations.canGenerate,
        reason: limits.generations.canGenerate 
          ? undefined 
          : 'Monthly generation limit reached. Upgrade for unlimited generations.',
      };
    
    default:
      return { allowed: false, reason: 'Unknown action' };
  }
}

// User role and permission checks
export function isAdmin(user: UserWithSubscription): boolean {
  // Add admin check logic here
  // For now, check if email is in admin list
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(user.email);
}

// Team membership checks
export async function getUserTeams(userId: string) {
  return await prisma.teamMember.findMany({
    where: { userId },
    include: {
      team: true,
    },
  });
}

// Check if user can access team resources
export async function canAccessTeam(userId: string, teamId: string): Promise<boolean> {
  const membership = await prisma.teamMember.findFirst({
    where: {
      userId,
      teamId,
    },
  });

  return !!membership;
}