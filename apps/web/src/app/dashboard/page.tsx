import { redirect } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { checkSubscriptionLimits, getCurrentUser } from '@/lib/auth';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const limits = checkSubscriptionLimits(user);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CC Copilot
              </h1>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {user.subscription?.plan.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name || user.email}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Welcome to your AI-powered content creation workspace</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ideas This Month</CardDescription>
              <CardTitle className="text-2xl">
                {limits.ideas.used}
                {limits.ideas.limit !== Infinity && (
                  <span className="text-sm font-normal text-gray-500">/ {limits.ideas.limit}</span>
                )}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Content Generated</CardDescription>
              <CardTitle className="text-2xl">
                {limits.generations.used}
                {limits.generations.limit !== Infinity && (
                  <span className="text-sm font-normal text-gray-500">
                    / {limits.generations.limit}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Subscription Status</CardDescription>
              <CardTitle className="text-lg">
                <Badge
                  variant={user.subscription?.status === 'ACTIVE' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {user.subscription?.status?.replace('_', ' ')}
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Trial Days Left</CardDescription>
              <CardTitle className="text-2xl">
                {user.subscription?.trialEnd
                  ? Math.max(
                      0,
                      Math.ceil(
                        (new Date(user.subscription.trialEnd).getTime() - Date.now()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )
                  : 'N/A'}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Capture New Idea
              </CardTitle>
              <CardDescription>Transform your raw ideas into structured content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create Idea</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                AI Generator
              </CardTitle>
              <CardDescription>Generate hooks, scripts, and captions instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Generate Content
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Content Library
              </CardTitle>
              <CardDescription>Browse and manage your generated content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                View Library
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest content creation activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">🚀 Ready to get started?</p>
              <p className="text-sm">
                Create your first idea or generate content to see your activity here
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
