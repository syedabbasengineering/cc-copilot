import { PrismaClient } from '@prisma/client';
import { dbConfig } from './db-config';

declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma Client with optimized configuration
const createPrismaClient = () => {
  return new PrismaClient({
    // Logging configuration
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'info', 'warn', 'error']
      : ['warn', 'error'],
    
    // Error formatting
    errorFormat: 'pretty',
    
    datasources: {
      db: {
        url: dbConfig.connection.url,
      },
    },
  });
};

// Singleton pattern to prevent multiple instances
const prisma = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = prisma;
}

// Performance monitoring can be added later with proper typing

export { prisma };

// Database connection utilities
export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
    throw error;
  }
}

// Health check
export async function dbHealthCheck() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    return { 
      status: 'unhealthy', 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString() 
    };
  }
}

// Transaction wrapper
export async function withTransaction<T>(
  callback: (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => Promise<T>
): Promise<T> {
  return prisma.$transaction(callback);
}

// Common query helpers
export const queries = {
  // User queries
  getUserById: (id: string) => 
    prisma.user.findUnique({
      where: { id },
      include: {
        userSettings: true,
        subscription: true,
      },
    }),

  getUserByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
      include: {
        userSettings: true,
        subscription: true,
      },
    }),

  // Idea queries
  getUserIdeas: (userId: string, limit = 10, offset = 0) =>
    prisma.idea.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        generatedContent: true,
        performanceData: true,
      },
    }),

  // Analytics queries
  getUserAnalytics: (userId: string, days = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return prisma.userAnalytics.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: 'asc' },
    });
  },

  // Performance queries
  getTopPerformingContent: (userId: string, limit = 10) =>
    prisma.generatedContent.findMany({
      where: { userId },
      orderBy: {
        performanceData: {
          _count: 'desc',
        },
      },
      take: limit,
      include: {
        idea: true,
        performanceData: true,
      },
    }),
};