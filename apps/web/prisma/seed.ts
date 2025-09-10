import { PrismaClient } from '@prisma/client';
import {
  Platform,
  ContentType,
  ContentTone,
  GeneratedContentType,
  IdeaStatus,
  SubscriptionStatus,
  SubscriptionPlan,
  ContentCategory,
  TeamRole,
} from '@prisma/client';

const prisma = new PrismaClient();

const sampleUsers = [
  {
    email: 'john@example.com',
    name: 'John Creator',
    brandVoice: 'Professional yet approachable. Focus on educational content with clear, actionable insights.',
    preferredPlatforms: [Platform.TIKTOK, Platform.INSTAGRAM_REELS],
    subscriptionStatus: SubscriptionStatus.ACTIVE,
  },
  {
    email: 'sarah@example.com', 
    name: 'Sarah Influencer',
    brandVoice: 'Fun, energetic, and relatable. Love using humor and personal stories to connect.',
    preferredPlatforms: [Platform.YOUTUBE_SHORTS, Platform.INSTAGRAM_REELS],
    subscriptionStatus: SubscriptionStatus.FREE_TRIAL,
  },
  {
    email: 'mike@business.com',
    name: 'Mike Business',
    brandVoice: 'Authority in business and entrepreneurship. Direct, value-driven content.',
    preferredPlatforms: [Platform.ALL],
    subscriptionStatus: SubscriptionStatus.ACTIVE,
  },
];

const sampleIdeas = [
  {
    rawContent: 'Share 5 productivity tips that actually work for busy entrepreneurs',
    contentType: ContentType.EDUCATIONAL,
    targetPlatform: Platform.TIKTOK,
    tags: ['productivity', 'entrepreneurship', 'business', 'tips'],
    status: IdeaStatus.COMPLETED,
    wordCount: 12,
  },
  {
    rawContent: 'My morning routine that changed my life completely',
    contentType: ContentType.INSPIRATIONAL,
    targetPlatform: Platform.INSTAGRAM_REELS,
    tags: ['morning routine', 'lifestyle', 'habits', 'self improvement'],
    status: IdeaStatus.COMPLETED,
    wordCount: 9,
  },
  {
    rawContent: 'Why most people fail at social media marketing and how to fix it',
    contentType: ContentType.EDUCATIONAL,
    targetPlatform: Platform.YOUTUBE_SHORTS,
    tags: ['social media', 'marketing', 'business', 'strategy'],
    status: IdeaStatus.PROCESSING,
    wordCount: 13,
  },
  {
    rawContent: 'Funny things that happen when you work from home',
    contentType: ContentType.ENTERTAINMENT,
    targetPlatform: Platform.ALL,
    tags: ['work from home', 'humor', 'relatable', 'remote work'],
    status: IdeaStatus.DRAFT,
    wordCount: 10,
  },
];

const sampleHooks = [
  "Did you know that 90% of entrepreneurs waste 3 hours daily on these productivity mistakes?",
  "I tried this morning routine for 30 days and here's what happened...",
  "Stop doing social media marketing wrong! Here's what actually works:",
  "Working from home be like... (you'll definitely relate to #3)",
  "This one productivity hack saved me 15 hours per week",
];

const sampleScripts = [
  {
    platform: Platform.TIKTOK,
    content: `Hook: "Did you know that 90% of entrepreneurs waste 3 hours daily on these productivity mistakes?"

Context: "I used to be one of them until I discovered these 5 game-changing tips."

Main Content: "Tip 1: Time-blocking - schedule everything, even breaks. Tip 2: The 2-minute rule - if it takes less than 2 minutes, do it now. Tip 3: Batch similar tasks together. Tip 4: Use the Pomodoro technique for deep work. Tip 5: Review and adjust weekly."

CTA: "Which tip will you try first? Comment below!"`,
  },
  {
    platform: Platform.INSTAGRAM_REELS,
    content: `Hook: "I tried this morning routine for 30 days and here's what happened..."

Context: "I was skeptical at first, but the results speak for themselves."

Main Content: "Day 1-10: Struggled to wake up early but felt more focused. Day 11-20: Energy levels skyrocketed, productivity increased by 40%. Day 21-30: Completely transformed my mindset and daily performance."

CTA: "Ready to transform your mornings? Save this post and tag someone who needs this!"`,
  },
];

const sampleTemplates = [
  {
    name: 'Question Hook Formula',
    category: ContentCategory.EDUCATION,
    platform: Platform.ALL,
    contentType: GeneratedContentType.HOOK,
    formula: 'Did you know that {statistic}% of {target_audience} {common_problem}?',
    variables: {
      statistic: '90, 85, 75, 95',
      target_audience: 'entrepreneurs, creators, business owners, professionals',
      common_problem: 'make this mistake, waste time on this, struggle with this, ignore this',
    },
    successRate: 0.87,
  },
  {
    name: 'Transformation Story Formula',
    category: ContentCategory.LIFESTYLE,
    platform: Platform.INSTAGRAM_REELS,
    contentType: GeneratedContentType.SCRIPT,
    formula: 'I tried {activity} for {duration} and here\'s what happened... Day 1-{period1}: {early_results}. Day {period2}: {major_change}. Day {final_period}: {final_outcome}.',
    variables: {
      activity: 'this morning routine, cold showers, meditation, journaling',
      duration: '30 days, 60 days, 90 days, 6 months',
      period1: '10, 7, 14',
      period2: '15-20, 21-30, 30-45',
      final_period: '30, 60, 90',
    },
    successRate: 0.92,
  },
  {
    name: 'Problem-Solution Formula',
    category: ContentCategory.BUSINESS,
    platform: Platform.ALL,
    contentType: GeneratedContentType.SCRIPT,
    formula: 'Stop {wrong_approach}! Here\'s what actually works: {solution_1}, {solution_2}, {solution_3}. Try this instead: {actionable_step}.',
    variables: {
      wrong_approach: 'posting randomly, copying competitors, chasing trends, ignoring analytics',
      solution_1: 'focus on your audience, create original content, stay consistent',
      solution_2: 'engage authentically, provide value, solve real problems', 
      solution_3: 'measure what matters, iterate based on data, build community',
    },
    successRate: 0.84,
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (be careful in production!)
  if (process.env.NODE_ENV === 'development') {
    await prisma.performanceData.deleteMany();
    await prisma.generatedContent.deleteMany();
    await prisma.userAnalytics.deleteMany();
    await prisma.idea.deleteMany();
    await prisma.userSettings.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.template.deleteMany();
    await prisma.teamMember.deleteMany();
    await prisma.team.deleteMany();
    await prisma.user.deleteMany();
    console.log('🗑️  Cleared existing data');
  }

  // Create users with settings and subscriptions
  const createdUsers = [];
  for (const userData of sampleUsers) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        userSettings: {
          create: {
            defaultTone: ContentTone.FRIENDLY,
            autoSave: true,
            emailNotifications: true,
          },
        },
        subscription: {
          create: {
            status: userData.subscriptionStatus,
            plan: userData.subscriptionStatus === SubscriptionStatus.FREE_TRIAL 
              ? SubscriptionPlan.FREE_TRIAL 
              : SubscriptionPlan.PROFESSIONAL,
            trialStart: userData.subscriptionStatus === SubscriptionStatus.FREE_TRIAL 
              ? new Date() 
              : undefined,
            trialEnd: userData.subscriptionStatus === SubscriptionStatus.FREE_TRIAL 
              ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
              : undefined,
          },
        },
      },
      include: {
        userSettings: true,
        subscription: true,
      },
    });
    createdUsers.push(user);
  }
  console.log(`👥 Created ${createdUsers.length} users`);

  // Create ideas for users
  let ideaCount = 0;
  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i];
    
    // Create 2-3 ideas per user
    for (let j = 0; j < sampleIdeas.length; j++) {
      if (j % createdUsers.length === i) {
        const ideaData = sampleIdeas[j];
        const processedContent = {
          mainTopic: ideaData.tags[0],
          keyPoints: ideaData.tags,
          suggestedTone: ContentTone.FRIENDLY,
          targetAudience: 'content creators',
          contentType: ideaData.contentType,
        };

        const idea = await prisma.idea.create({
          data: {
            ...ideaData,
            userId: user.id,
            processedContent,
            estimatedDuration: 30 + Math.random() * 30, // 30-60 seconds
          },
        });

        // Create generated content for completed ideas
        if (ideaData.status === IdeaStatus.COMPLETED) {
          // Create hook
          await prisma.generatedContent.create({
            data: {
              ideaId: idea.id,
              userId: user.id,
              contentType: GeneratedContentType.HOOK,
              platform: ideaData.targetPlatform,
              content: sampleHooks[j % sampleHooks.length],
              metadata: {
                hookType: 'question',
                confidence: 0.85 + Math.random() * 0.15,
                variations: 3,
              },
            },
          });

          // Create script
          const scriptIndex = Math.min(j, sampleScripts.length - 1);
          await prisma.generatedContent.create({
            data: {
              ideaId: idea.id,
              userId: user.id,
              contentType: GeneratedContentType.SCRIPT,
              platform: sampleScripts[scriptIndex].platform,
              content: sampleScripts[scriptIndex].content,
              metadata: {
                wordCount: 120 + Math.random() * 80,
                estimatedDuration: 45 + Math.random() * 15,
                confidence: 0.8 + Math.random() * 0.2,
              },
            },
          });

          // Create performance data
          await prisma.performanceData.create({
            data: {
              userId: user.id,
              ideaId: idea.id,
              platform: ideaData.targetPlatform,
              views: Math.floor(Math.random() * 10000) + 1000,
              likes: Math.floor(Math.random() * 500) + 50,
              shares: Math.floor(Math.random() * 50) + 5,
              comments: Math.floor(Math.random() * 100) + 10,
              saves: Math.floor(Math.random() * 200) + 20,
              engagementRate: 0.03 + Math.random() * 0.07, // 3-10%
              completionRate: 0.6 + Math.random() * 0.4, // 60-100%
              impressions: Math.floor(Math.random() * 50000) + 10000,
            },
          });
        }

        ideaCount++;
      }
    }
  }
  console.log(`💡 Created ${ideaCount} ideas with generated content`);

  // Create templates
  for (const templateData of sampleTemplates) {
    await prisma.template.create({
      data: {
        ...templateData,
        timesUsed: Math.floor(Math.random() * 100) + 10,
      },
    });
  }
  console.log(`📋 Created ${sampleTemplates.length} templates`);

  // Create analytics data for the past 30 days
  const today = new Date();
  for (const user of createdUsers) {
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      await prisma.userAnalytics.create({
        data: {
          userId: user.id,
          date,
          ideasCreated: Math.floor(Math.random() * 3), // 0-2 ideas per day
          contentGenerated: Math.floor(Math.random() * 5), // 0-4 pieces per day
          totalViews: Math.floor(Math.random() * 1000) + 100,
          totalEngagement: Math.floor(Math.random() * 50) + 10,
          avgEngagementRate: 0.02 + Math.random() * 0.08, // 2-10%
        },
      });
    }
  }
  console.log(`📊 Created analytics data for ${createdUsers.length} users over 30 days`);

  // Create a team for business user
  const businessUser = createdUsers.find(u => u.email === 'mike@business.com');
  if (businessUser) {
    const team = await prisma.team.create({
      data: {
        name: 'Business Content Team',
        slug: 'business-content-team',
        ownerId: businessUser.id,
      },
    });

    // Add other users as team members
    for (const user of createdUsers) {
      if (user.id !== businessUser.id) {
        await prisma.teamMember.create({
          data: {
            teamId: team.id,
            userId: user.id,
            role: TeamRole.MEMBER,
          },
        });
      }
    }
    console.log(`👥 Created team with ${createdUsers.length - 1} members`);
  }

  console.log('✅ Database seeding completed successfully!');
  
  // Print summary
  const userCount = await prisma.user.count();
  const ideaCount2 = await prisma.idea.count();
  const contentCount = await prisma.generatedContent.count();
  const templateCount = await prisma.template.count();
  
  console.log('\n📈 Seeding Summary:');
  console.log(`   Users: ${userCount}`);
  console.log(`   Ideas: ${ideaCount2}`);
  console.log(`   Generated Content: ${contentCount}`);
  console.log(`   Templates: ${templateCount}`);
  console.log(`   Analytics Records: ${userCount * 30}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });