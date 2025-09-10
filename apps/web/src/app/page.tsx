import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Redirect authenticated users to dashboard
  const { userId } = await auth();
  if (userId) {
    redirect('/dashboard');
  }
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Content Creation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Transform your ideas into high-performing short-form video scripts, hooks, and captions
            optimized for TikTok, Instagram Reels, and YouTube Shorts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/sign-up">
            <Button size="lg" className="px-8">
              Get Started Free
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline" className="px-8">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Hook Generator
              </CardTitle>
              <CardDescription>
                Create attention-grabbing hooks that capture viewers in the first 3 seconds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate 5+ hook variations using proven formulas for maximum engagement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                Script Writer
              </CardTitle>
              <CardDescription>
                Platform-optimized scripts that maintain your brand voice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                30-60 second scripts structured for maximum retention and engagement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Performance Tracking
              </CardTitle>
              <CardDescription>Track performance and get repurposing suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyze what works and get AI-powered suggestions for your next viral hit
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
