// Database configuration and connection pooling
import { env } from '@/lib/env';

export const dbConfig = {
  // Connection pool settings
  connectionPool: {
    // Maximum number of connections in the pool
    max: parseInt(process.env.DB_POOL_MAX || '20'),
    
    // Minimum number of connections to maintain
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    
    // Connection timeout in milliseconds
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '10000'),
    
    // Idle timeout in milliseconds
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
  },

  // Query timeout settings
  queryTimeout: {
    // Default query timeout in milliseconds
    default: parseInt(process.env.DB_QUERY_TIMEOUT || '60000'),
    
    // Long-running query timeout (for reports, analytics)
    longRunning: parseInt(process.env.DB_LONG_QUERY_TIMEOUT || '300000'),
    
    // Short query timeout (for quick lookups)
    short: parseInt(process.env.DB_SHORT_QUERY_TIMEOUT || '5000'),
  },

  // Retry configuration
  retry: {
    attempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3'),
    delay: parseInt(process.env.DB_RETRY_DELAY || '1000'),
    maxDelay: parseInt(process.env.DB_MAX_RETRY_DELAY || '10000'),
  },

  // Connection string configuration
  connection: {
    url: env.DATABASE_URL,
    directUrl: env.DIRECT_URL,
    
    // SSL configuration
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false,
    } : false,
    
    // Additional connection options
    options: {
      // Enable connection pooling
      pgbouncer: process.env.PGBOUNCER_ENABLED === 'true',
      
      // Connection pool mode for PgBouncer
      poolMode: process.env.PGBOUNCER_POOL_MODE || 'transaction',
      
      // Schema to use
      schema: process.env.DB_SCHEMA || 'public',
    },
  },
};

// Connection pool monitoring
export class ConnectionPoolMonitor {
  private static instance: ConnectionPoolMonitor;
  private metrics = {
    totalConnections: 0,
    activeConnections: 0,
    idleConnections: 0,
    failedConnections: 0,
    avgResponseTime: 0,
    slowQueries: 0,
  };

  static getInstance(): ConnectionPoolMonitor {
    if (!ConnectionPoolMonitor.instance) {
      ConnectionPoolMonitor.instance = new ConnectionPoolMonitor();
    }
    return ConnectionPoolMonitor.instance;
  }

  updateMetrics(data: Partial<typeof this.metrics>) {
    Object.assign(this.metrics, data);
  }

  getMetrics() {
    return { ...this.metrics };
  }

  logConnectionStatus() {
    console.log('📊 Database Connection Pool Status:', {
      ...this.metrics,
      timestamp: new Date().toISOString(),
    });
  }
}

// Database performance utilities
export class DatabasePerformance {
  private static queryTimes: Map<string, number[]> = new Map();

  static startQuery(queryId: string): () => void {
    const startTime = Date.now();
    
    return () => {
      const duration = Date.now() - startTime;
      
      if (!this.queryTimes.has(queryId)) {
        this.queryTimes.set(queryId, []);
      }
      
      const times = this.queryTimes.get(queryId)!;
      times.push(duration);
      
      // Keep only last 100 measurements
      if (times.length > 100) {
        times.shift();
      }
      
      // Log slow queries
      if (duration > dbConfig.queryTimeout.default / 2) {
        console.warn(`🐌 Slow query detected: ${queryId} took ${duration}ms`);
        
        ConnectionPoolMonitor.getInstance().updateMetrics({
          slowQueries: ConnectionPoolMonitor.getInstance().getMetrics().slowQueries + 1,
        });
      }
      
      // Update average response time
      const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
      ConnectionPoolMonitor.getInstance().updateMetrics({
        avgResponseTime: avgTime,
      });
    };
  }

  static getQueryStats(queryId: string) {
    const times = this.queryTimes.get(queryId) || [];
    if (times.length === 0) {
      return null;
    }

    const sorted = times.slice().sort((a, b) => a - b);
    return {
      count: times.length,
      avg: times.reduce((sum, time) => sum + time, 0) / times.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  static getAllStats() {
    const stats: Record<string, any> = {};
    for (const [queryId] of this.queryTimes) {
      stats[queryId] = this.getQueryStats(queryId);
    }
    return stats;
  }
}

// Connection pool configuration for different environments
export const getPoolConfig = () => {
  const baseConfig = {
    connectionLimit: dbConfig.connectionPool.max,
    queueLimit: 0, // No limit on queue
  };

  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        ...baseConfig,
        connectionLimit: Math.min(dbConfig.connectionPool.max, 20),
        idleTimeout: 30000,
        acquireTimeout: 10000,
      };
    
    case 'development':
      return {
        ...baseConfig,
        connectionLimit: Math.min(dbConfig.connectionPool.max, 5),
        idleTimeout: 10000,
        acquireTimeout: 5000,
      };
    
    case 'test':
      return {
        ...baseConfig,
        connectionLimit: 2,
        idleTimeout: 1000,
        acquireTimeout: 2000,
      };
    
    default:
      return baseConfig;
  }
};

// Environment-specific database URLs
export const getDatabaseUrl = () => {
  // Use direct connection for migrations and development
  if (process.env.NODE_ENV === 'development' || process.env.PRISMA_CLI_BINARY_TARGETS) {
    return env.DIRECT_URL || env.DATABASE_URL;
  }
  
  // Use pooled connection for production
  return env.DATABASE_URL;
};

// Health check configuration
export const healthCheckConfig = {
  // How often to run health checks (milliseconds)
  interval: parseInt(process.env.DB_HEALTH_CHECK_INTERVAL || '30000'),
  
  // Timeout for health check queries
  timeout: parseInt(process.env.DB_HEALTH_CHECK_TIMEOUT || '5000'),
  
  // Number of failed checks before marking as unhealthy
  failureThreshold: parseInt(process.env.DB_HEALTH_CHECK_FAILURES || '3'),
  
  // Number of successful checks to mark as healthy again
  successThreshold: parseInt(process.env.DB_HEALTH_CHECK_SUCCESS || '2'),
};