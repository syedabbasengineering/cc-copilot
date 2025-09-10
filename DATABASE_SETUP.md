# Database & Authentication Setup Guide

This guide will walk you through setting up the complete database and authentication system for CC Copilot.

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- A [Supabase](https://supabase.com) account
- A [Clerk](https://clerk.com) account

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Set project details:
   - **Name**: `cc-copilot`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Get Database URLs

Once your project is ready:

1. Go to **Settings** → **Database**
2. Copy these connection strings:
   - **Connection string (URI)** → This becomes your `DATABASE_URL`
   - **Direct connection (URI)** → This becomes your `DIRECT_URL`

### 3. Configure Environment Variables

Update your `.env.local` file:

```env
# Database URLs from Supabase
DATABASE_URL="postgresql://postgres:your_password@db.your_project.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:your_password@db.your_project.supabase.co:5432/postgres"
```

### 4. Run Database Migration

```bash
cd apps/web

# Generate Prisma client
npm run db:generate

# Push the schema to your database (for development)
npm run db:push

# OR create and run a migration (for production)
npm run db:migrate
```

### 5. Seed the Database (Optional)

To populate your database with sample data for development:

```bash
npm run db:seed
```

This will create:
- 3 sample users with different subscription tiers
- Sample ideas and generated content
- Performance data and analytics
- Content templates
- A sample team

## 🔐 Authentication Setup (Clerk)

### 1. Create Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Add application"
3. Set application details:
   - **Name**: `CC Copilot`
   - **Choose how users will sign in**: Email + Password (recommended)
   - You can also enable Google, GitHub, etc.
4. Click "Create application"

### 2. Get Clerk Keys

From your Clerk dashboard:

1. Go to **API Keys**
2. Copy these values to your `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_key_here"
```

### 3. Configure Clerk Webhook (Important!)

To sync users between Clerk and your database:

1. In Clerk Dashboard, go to **Webhooks**
2. Click "Add Endpoint"
3. Set **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - For local development: Use [ngrok](https://ngrok.com) or similar
   - For production: Use your actual domain
4. **Subscribe to events**:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. Click "Create"
6. Copy the **Webhook Secret** to your `.env.local`:

```env
CLERK_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

### 4. Configure Clerk Settings

In your Clerk Dashboard:

1. **User & Authentication** → **Email, Phone, Username**:
   - Enable **Email address** (required)
   - Optionally enable phone or username
   
2. **User & Authentication** → **Social Connections**:
   - Enable Google, GitHub, or other OAuth providers if desired

3. **Customization** → **Appearance**:
   - Customize the sign-in/up forms to match your brand
   - Upload logo and set colors

## 🚀 Testing the Setup

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test Authentication Flow

1. Visit `http://localhost:3000`
2. Click "Get Started Free"
3. Create a new account
4. Verify you're redirected to `/dashboard`
5. Check that the user appears in your database:

```bash
npm run db:studio
```

This opens Prisma Studio where you can view your database records.

### 3. Test Database Operations

In Prisma Studio, verify:
- User record was created with correct email/name
- UserSettings record was created
- Subscription record was created with FREE_TRIAL status

## 🔧 Database Commands Reference

```bash
# Generate Prisma client (run after schema changes)
npm run db:generate

# Push schema changes to database (development)
npm run db:push

# Create and run migrations (production)
npm run db:migrate

# Deploy migrations to production
npm run db:migrate:prod

# Reset database (careful!)
npm run db:reset

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database browser)
npm run db:studio
```

## 📊 Database Schema Overview

The database includes these main entities:

### Core Models
- **User**: User accounts with subscription info
- **UserSettings**: User preferences and configuration
- **Idea**: Raw content ideas from users
- **GeneratedContent**: AI-generated hooks, scripts, captions
- **Template**: Reusable content templates

### Analytics & Performance
- **PerformanceData**: Social media metrics
- **UserAnalytics**: Daily user activity aggregates

### Subscription & Billing
- **Subscription**: Subscription status and billing info

### Team Features (Business Plan)
- **Team**: Team workspaces
- **TeamMember**: Team membership and roles

## 🔒 Security Considerations

### Database Security
- Connection strings use SSL encryption
- Database is behind Supabase's security layer
- Row Level Security (RLS) can be enabled in Supabase

### Authentication Security
- Clerk handles all authentication logic
- Passwords are never stored in your database
- JWT tokens are managed by Clerk
- Webhook signatures are verified

### API Security
- All protected routes require valid Clerk session
- Middleware enforces authentication
- User data is isolated by user ID

## 🚨 Troubleshooting

### Common Database Issues

**"Database connection failed"**
- Check your DATABASE_URL and DIRECT_URL
- Verify Supabase project is running
- Check if your IP is allowlisted in Supabase

**"Migration failed"**
- Check if you have conflicting schema changes
- Verify database permissions
- Try `npm run db:reset` (development only)

**"Prisma client not generated"**
- Run `npm run db:generate`
- Restart your development server

### Common Authentication Issues

**"Clerk keys not working"**
- Verify you're using the correct environment keys
- Check if keys are from the right Clerk application
- Make sure NEXT_PUBLIC_ prefix is used for publishable key

**"Webhook not receiving events"**
- Check webhook URL is accessible
- Verify webhook secret matches
- Check webhook event subscriptions
- Use ngrok for local development testing

**"User not appearing in database"**
- Check webhook is configured correctly
- Verify webhook secret
- Check server logs for webhook errors
- Test webhook endpoint manually

## 📈 Monitoring & Maintenance

### Database Monitoring
- Use Supabase dashboard for query performance
- Monitor connection pool usage
- Set up alerts for failed queries
- Regular backup verification

### Authentication Monitoring
- Monitor sign-up conversion rates in Clerk
- Track authentication errors
- Monitor webhook success rates
- Set up alerts for authentication failures

### Performance Optimization
- Database query optimization with Prisma
- Connection pooling configuration
- Proper database indexing
- Regular cleanup of old data

---

## 🆘 Need Help?

- **Database Issues**: [Supabase Documentation](https://supabase.com/docs)
- **Authentication Issues**: [Clerk Documentation](https://clerk.com/docs)
- **Prisma Issues**: [Prisma Documentation](https://www.prisma.io/docs)

**Your database and authentication system is now ready! 🎉**