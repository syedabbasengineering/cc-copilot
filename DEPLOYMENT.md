# Deployment Guide

## Vercel Deployment Setup

This project is configured for automatic deployment on Vercel with CI/CD pipeline via GitHub Actions.

### 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/syedabbasengineering/cc-copilot)

### 🔧 Manual Setup

#### 1. Vercel Project Setup

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Import Repository**: 
   - Go to Vercel Dashboard → "Add New" → "Project"
   - Import `syedabbasengineering/cc-copilot` from GitHub
   - Set **Root Directory** to `apps/web`
   - Framework will auto-detect as Next.js

#### 2. Environment Variables

Set these in Vercel Project Settings → Environment Variables:

**Required:**
```env
DATABASE_URL=your_supabase_database_url
DIRECT_URL=your_supabase_direct_url
OPENAI_API_KEY=your_openai_api_key
NEXTAUTH_SECRET=generate_random_32_char_string
NEXTAUTH_URL=https://your-domain.vercel.app
```

**Optional (for future phases):**
```env
CLERK_SECRET_KEY=your_clerk_secret
ANTHROPIC_API_KEY=your_claude_api_key
STRIPE_SECRET_KEY=your_stripe_secret
POSTHOG_KEY=your_posthog_key
```

#### 3. Build & Deploy Settings

Vercel will automatically detect:
- **Framework**: Next.js
- **Build Command**: `cd apps/web && npm run build`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `npm install`

#### 4. GitHub Actions Setup (Optional)

For advanced CI/CD, set these GitHub repository secrets:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id  
VERCEL_PROJECT_ID=your_vercel_project_id
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url
OPENAI_API_KEY=your_openai_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_production_url
```

**To get Vercel tokens:**
1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Create new token for GitHub Actions
3. For Org/Project IDs, check your `.vercel/project.json` after first deployment

### 🌍 Domain Setup

#### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` environment variable
4. Update any hardcoded URLs in the application

### 📊 Monitoring & Analytics

#### Built-in Vercel Analytics
- Automatically enabled for all deployments
- View at Vercel Dashboard → Analytics

#### Performance Monitoring
- **Vercel Speed Insights**: Enabled by default
- **Web Vitals**: Tracked automatically
- **Real User Monitoring**: Available in project dashboard

### 🔄 Deployment Pipeline

#### Automatic Deployments:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets preview deployment
- **Development**: Push to any branch creates preview

#### Manual Deployment:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 🚨 Troubleshooting

#### Common Issues:

**Build Fails:**
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Verify build command in `vercel.json`

**TypeScript Errors:**
```bash
cd apps/web
npm run type-check
```

**Database Connection:**
- Ensure `DATABASE_URL` is accessible from Vercel
- Check Supabase connection pooling settings
- Verify IP allowlisting if using restricted access

**Environment Variables:**
- Variables set in Vercel override `.env.local`
- Redeploy after changing environment variables
- Use `VERCEL_ENV` to check deployment environment

### 📈 Performance Optimization

#### Automatic Optimizations:
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Static Generation**: Pages pre-rendered when possible
- **Edge Functions**: API routes run on Vercel Edge Network

#### Manual Optimizations:
- Enable **Turbopack** for faster builds
- Use **Next.js Bundle Analyzer** to optimize bundle size
- Implement **ISR** (Incremental Static Regeneration) for dynamic content
- Configure **CDN caching** headers

### 🔐 Security

#### Automatic Security:
- **HTTPS**: Enabled by default
- **Security Headers**: Configured in `next.config.js`
- **Environment Variables**: Encrypted at rest

#### Manual Security:
- Set up **CSP headers** for production
- Enable **Vercel Firewall** if available
- Configure **rate limiting** for API routes
- Use **Vercel Password Protection** for staging

### 📝 Deploy Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Build passes locally (`npm run build`)
- [ ] TypeScript checks pass (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Testing completed
- [ ] Custom domain configured (if applicable)
- [ ] Analytics and monitoring set up
- [ ] Error tracking configured (Sentry recommended)

### 🆘 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **GitHub Actions**: [docs.github.com/actions](https://docs.github.com/actions)

---

**Production URL**: `https://cc-copilot.vercel.app` (after deployment)
**Status**: ✅ Ready for Deployment