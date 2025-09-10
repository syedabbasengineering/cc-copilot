import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Skip build-time validation for development
  env: {
    SKIP_ENV_VALIDATION: process.env.NODE_ENV === 'development' ? 'true' : undefined,
  },
  
  // Output configuration
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  
  // Image configuration
  images: {
    domains: ['img.clerk.com'], // For Clerk user avatars
  },
  
  // Redirects for authentication flow
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/sign-in',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/sign-up',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;